import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para obtener los Pokémon con paginación
  getPokemons(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  // Método para obtener información detallada de un Pokémon
  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
