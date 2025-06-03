# 📱 App de Registro, Login y Chat

**Autores:** Mireya García y Paul Cabrera

Esta es una aplicación para celular donde los usuarios pueden:

- Crear una cuenta (reciben un correo de confirmación)
- Iniciar sesión con su correo y contraseña
- Chatear en tiempo real con otros usuarios

Todo esto se ve en una interfaz bonita y fácil de usar.

---

## 🛠️ Herramientas que usamos

- **Ionic** – Nos ayuda a crear la app para celular.
- **Node.js** – Para que el sistema funcione por detrás (el "backend").
- **Supabase** – Es una plataforma que usamos para guardar usuarios, verificar correos y manejar el chat. Es parecida a Firebase, pero libre y abierta.
- **JavaScript / TypeScript** – Son los lenguajes que usamos para programar la app.
- **Otras librerías** – Para mejorar formularios, mensajes y otras funciones.

---

## ✅ ¿Qué puede hacer esta app?

- Crear una cuenta con correo electrónico
- Verificar el correo antes de usar la app
- Iniciar sesión de forma segura
- Enviar y recibir mensajes en un chat en tiempo real
- Usar la app desde el celular fácilmente

---

## 📸 Imágenes de la app

 ![image](https://github.com/user-attachments/assets/09323c26-ebe4-47c1-9d22-32ebed27573e)

 ![image](https://github.com/user-attachments/assets/ef1e7cb6-2ca3-49aa-a20d-b75ce629d3e8)

 ![image](https://github.com/user-attachments/assets/004182e5-8d56-4980-842a-14292fc9d4cc)
 
 ![image](https://github.com/user-attachments/assets/1e6af9fb-28cd-47f8-8a6b-ad9278552e63)


project:
  name: "Chat con Ionic - Implementación de Captura de Fotos, Envío de Ubicación y Consumo de API de Pokémon"
  description: |
    Este proyecto es una aplicación de chat desarrollada con Ionic que incluye las siguientes funcionalidades:
    - Captura de fotos utilizando la cámara del dispositivo y su carga a Firebase.
    - Envío de ubicación en tiempo real del usuario utilizando la API de geolocalización.
    - Consumo de la API de Pokémon para enviar y recibir información sobre Pokémon dentro del chat.
    
requirements:
  - Node.js (versión LTS): "https://nodejs.org"
  - Ionic CLI:
      install: "npm install -g @ionic/cli"
  - Firebase: "Cuenta de Firebase para integrar el almacenamiento de imágenes."

installation:
  steps:
    - step: "Clonar el Repositorio"
      command: "git clone https://github.com/tu-usuario/chat-ionic.git"
    - step: "Instalar Dependencias"
      command: |
        cd chat-ionic
        npm install
    - step: "Configurar Firebase"
      description: |
        Este proyecto utiliza Firebase para almacenar las imágenes capturadas. Debes configurar Firebase en tu proyecto:
        1. Crea un proyecto en Firebase Console.
        2. Obtén tu configuración de Firebase desde el panel de configuración del proyecto.
        3. Abre `src/environments/environment.ts` y agrega la configuración de Firebase:
      firebase_config:
        apiKey: "TU_API_KEY"
        authDomain: "TU_AUTH_DOMAIN"
        projectId: "TU_PROJECT_ID"
        storageBucket: "TU_STORAGE_BUCKET"
        messagingSenderId: "TU_MESSAGING_SENDER_ID"
        appId: "TU_APP_ID"
        measurementId: "TU_MEASUREMENT_ID"
    - step: "Crear Módulos y Componentes"
      description: |
        Para capturar fotos, obtener ubicación y consumir la API de Pokémon, se han creado componentes en el proyecto:
        - CapturePhotoComponent: Captura una foto utilizando la cámara del dispositivo y la sube a Firebase.
        - LocationService: Obtiene la ubicación actual del usuario y la envía a través del chat.
        - PokemonService: Consume la API de Pokémon para mostrar información sobre Pokémon en el chat.
    - step: "Ejecutar el Proyecto"
      command: "ionic serve"

functionalities:
  capture_photos:
    description: |
      El componente `CapturePhotoComponent` permite a los usuarios capturar fotos utilizando la cámara de su dispositivo y subirlas a Firebase Storage. La imagen se muestra en el chat junto con el progreso de la carga.
    flow:
      - "El usuario presiona el botón 'Capturar Foto'."
      - "La cámara del dispositivo se activa y captura una imagen."
      - "La imagen se sube a Firebase Storage y se muestra en el chat con el progreso de la carga."
  location_sharing:
    description: |
      El componente `LocationService` obtiene la ubicación geográfica del usuario y la envía en tiempo real al chat. Utiliza la API de geolocalización del navegador para obtener la latitud y longitud.
    flow:
      - "El usuario presiona el botón 'Enviar Ubicación'."
      - "La aplicación obtiene la ubicación actual y la muestra en el chat."
  pokemon_api:
    description: |
      El componente `PokemonService` permite a los usuarios interactuar con la API de Pokémon. Los usuarios pueden enviar información sobre un Pokémon al chat buscando por nombre (por ejemplo, 'Pikachu').
    flow:
      - "El usuario escribe el nombre de un Pokémon en el chat o presiona el botón correspondiente (como 'Enviar Pikachu')."
      - "La aplicación obtiene la información del Pokémon desde la API y la muestra en el chat."

project_structure:
  root:
    src:
      app:
        capture-photo: "Componente para captura de fotos"
        location: "Servicio para ubicación"
        pokemon: "Servicio para la API de Pokémon"
        app.module.ts: "Módulo principal de la app"
      environments:
        environment.ts: "Configuración de Firebase"
      index.html: "Plantilla principal"
      main.ts: "Punto de entrada de la aplicación"
    ionic.config.json: "Configuración de Ionic"

additional_features:
  - "Progreso de carga de la imagen: La aplicación muestra el progreso de la carga de la imagen a Firebase Storage, permitiendo al usuario ver el estado de la carga."
  - "Manejo de errores: Se maneja el acceso a la cámara y a la ubicación del dispositivo con control de errores en caso de que no se permita el acceso o no se pueda obtener la información."

contributions:
  steps:
    - "Haz un fork del repositorio."
    - "Crea una nueva rama con tu funcionalidad."
    - "Realiza tus cambios y haz un commit."
    - "Envía un pull request para que revisemos tus cambios."

contact:
  email: "paulcabrera@epn.edu.ec.com"
  github: "https://github.com/PaulCabreraEPN"


 
