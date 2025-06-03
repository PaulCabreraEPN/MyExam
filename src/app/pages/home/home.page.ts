import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { supabase } from 'src/app/supabase.clients';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PokemonService } from '../../services/pokemon.service';

interface PokemonList {
  results: { name: string, url: string }[];
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  photoUrl: string = '';  // Para almacenar la URL de la imagen capturada
  uploadPercent: number = 0;  // Para mostrar el progreso de la carga
  email = '';
  message = '';
  messages = signal<any[]>([]); // tipo rápido
  selectedFile: File | null = null; // Para almacenar la foto seleccionada

  pokemons: PokemonList['results'] = []; // Lista de Pokémon
  selectedPokemon: PokemonDetails | null = null; // Pokémon seleccionado
  limit = 10; // Número de pokemones por página
  offset = 0; // Desplazamiento de la lista de Pokémon

  pokemonButtons: { text: string, handler: () => void }[] = []; // Botones para mostrar

  constructor(
    private route: Router,
    private pokemonService: PokemonService,
    // Inyectamos el servicio de Pokémon
  ) {}

  async ngOnInit() {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        this.route.navigate(['/auth']);
      } else {
        this.email = data.user.email || '';
        await this.loadMessages();
        this.listenToMessages();
        this.loadPokemons(); // Cargar los Pokémon al iniciar
      }
    } catch (err) {
      console.error('Error al obtener usuario:', err);
      this.route.navigate(['/auth']);
    }
  }

  // Método para capturar la foto
  capturePhoto() {
    const videoElement = document.createElement('video');
    const constraints = {
      video: { facingMode: "user" }  // Utilizamos la cámara frontal por defecto
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();

        // Crear un canvas para capturar una imagen
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        videoElement.addEventListener('canplay', () => {
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          this.photoUrl = canvas.toDataURL('image/jpeg');  // Convertir la imagen a base64
          videoElement.pause();
          stream.getTracks().forEach(track => track.stop());  // Detener la cámara
        });
      })
      .catch((error) => {
        console.error('Error accediendo a la cámara: ', error);
      });
  }

  async logout() {
    await supabase.auth.signOut();
    this.route.navigate(['/auth']);
  }

  async loadMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      this.messages.set(data);
    }
  }

  async sendMessage() {
    if (!this.message.trim()) return;

    const { error } = await supabase.from('messages').insert([
      {
        content: this.message,
        sender: this.email
      }
    ]);

    if (!error) {
      this.message = '';
    } else {
      console.error('Error al enviar mensaje:', error);
    }
  }

  listenToMessages() {
    supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const current = this.messages();
          this.messages.set([...current, payload.new]);
        }
      )
      .subscribe();
  }

  // Método para cargar los Pokémon
  loadPokemons() {
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe((data: PokemonList) => {
      this.pokemons = data.results;

      // Generar los botones para los Pokémon
      this.pokemonButtons = this.pokemons.map(pokemon => ({
        text: pokemon.name,
        handler: () => this.selectPokemon(pokemon)
      }));
    });
  }

  // Método para seleccionar un Pokémon
  selectPokemon(pokemon: any) {
    this.pokemonService.getPokemonDetails(pokemon.url).subscribe((details: PokemonDetails) => {
      // Aquí formateamos la información del Pokémon y la asignamos al mensaje
      this.message = `Nombre: ${details.name}\nAltura: ${details.height} decímetros\nPeso: ${details.weight} hectogramos\nTipos: ${details.types.map((t: any) => t.type.name).join(', ')}`;
      this.sendMessage(); // Enviar la información como mensaje
    });
  }

  // Método para obtener la ubicación
  async getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Genera la URL de Google Maps
          const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

          // Enviar mensaje con la URL de Maps
          this.message = mapsUrl;
          this.sendMessage();
        },
        (error) => {
          console.error('Error al obtener la ubicación', error);
          alert('No se pudo obtener la ubicación.');
        }
      );
    } else {
      alert('La geolocalización no está soportada en este navegador.');
    }
  }

  // Método para abrir la cámara y capturar la imagen
  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Usar URI de la imagen
        source: CameraSource.Camera,      // Abrir la cámara
        quality: 90                      // Calidad de la imagen
      });

      // Convertir la URI de la foto en una imagen que podamos mostrar
      const imageUrl = photo.webPath;

      // Mostrar la imagen capturada en la aplicación
      this.message = imageUrl || ''; // Asignamos la URL de la imagen al mensaje
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      alert('No se pudo tomar la foto.');
    }
  }

  // Método para subir la imagen a Supabase Storage (opcional)
  async uploadImage(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('your_bucket_name') // Asegúrate de reemplazar 'your_bucket_name' con el nombre de tu bucket
      .upload(filePath, file);

    if (error) {
      console.error('Error al subir la imagen:', error);
      throw new Error('Error al subir la imagen');
    }

    // Obtener la URL pública del archivo subido
    const publicUrl = supabase.storage
      .from('your_bucket_name')
      .getPublicUrl(filePath);

    return publicUrl.data.publicUrl; // Devuelve la URL pública de la imagen
  }
}
