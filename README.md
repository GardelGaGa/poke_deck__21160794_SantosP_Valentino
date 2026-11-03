# Pokémon Deck

Proyecto hecho con Vue 3 y Vite. Genera un mazo de 40 cartas de Pokémon de Kanto (los primeros 151) usando la PokeAPI.

Alumno: Valentino Gardel Santos Pérez - 21160794

## Qué muestra cada carta

- Nombre, número y PS
- Imagen
- Tipos en español
- 2 habilidades con su descripción
- Ataque, defensa y velocidad
- Altura, peso y experiencia base

## Cómo correrlo

    npm install
    npm run dev

Después abrir http://localhost:5173

## Notas

- Los Pokémon se piden en grupos de 10.
- Si un Pokémon no tiene imagen o tiene menos de 2 habilidades se pide otro.
- El botón "Nuevo mazo" genera otras 40 cartas.
