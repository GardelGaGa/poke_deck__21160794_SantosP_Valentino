<script setup>
import { onMounted, ref } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import { getDeck } from "../services/pokeApi.js";

const cartas = ref([]);
const cargando = ref(false);
const error = ref("");

async function nuevoMazo() {
  cargando.value = true;
  error.value = "";
  cartas.value = [];

  try {
    cartas.value = await getDeck();
    if (cartas.value.length < 40) {
      error.value = "Solo se pudieron cargar " + cartas.value.length + " cartas de 40.";
    }
  } catch (e) {
    error.value = "No se pudo cargar el mazo, revisa tu conexión.";
  }

  cargando.value = false;
}

onMounted(nuevoMazo);
</script>

<template>
  <main>
    <header>
      <h1>Pokémon Deck</h1>
      <button @click="nuevoMazo" :disabled="cargando">
        {{ cargando ? "Cargando..." : "Nuevo mazo" }}
      </button>
    </header>

    <p v-if="error" class="error">{{ error }}</p>

    <div class="deck">
      <PokemonCard v-for="p in cartas" :key="p.id" :pokemon="p" />
    </div>

    <footer>Valentino Gardel Santos Pérez - 21160794</footer>
  </main>
</template>
