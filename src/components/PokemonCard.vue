<script setup>
import { computed } from "vue";
import { tipos } from "../utils/tipos.js";

const props = defineProps({
  pokemon: Object,
});

const color1 = computed(() => tipos[props.pokemon.tipos[0]].color);
const color2 = computed(() => {
  const tipo = props.pokemon.tipos[1] || props.pokemon.tipos[0];
  return tipos[tipo].color;
});

function ancho(valor) {
  return Math.min(100, (valor / 200) * 100) + "%";
}
</script>

<template>
  <div class="card" :style="{ background: `linear-gradient(160deg, ${color1}, ${color2})` }">
    <div class="card-top">
      <h2>{{ pokemon.nombre }}</h2>
      <span class="ps">PS {{ pokemon.ps }}</span>
    </div>

    <div class="imagen">
      <img :src="pokemon.imagen" :alt="pokemon.nombre" />
      <span class="numero">#{{ pokemon.id }}</span>
    </div>

    <div class="tipos">
      <span v-for="t in pokemon.tipos" :key="t" :style="{ background: tipos[t].color }">
        {{ tipos[t].nombre }}
      </span>
    </div>

    <div class="caja">
      <div v-for="h in pokemon.habilidades" :key="h.nombre" class="habilidad">
        <strong>{{ h.nombre }}</strong>
        <p>{{ h.descripcion }}</p>
      </div>
    </div>

    <div class="caja">
      <div class="stat">
        <span>Ataque</span>
        <div class="barra"><div :style="{ width: ancho(pokemon.ataque) }"></div></div>
        <span>{{ pokemon.ataque }}</span>
      </div>
      <div class="stat">
        <span>Defensa</span>
        <div class="barra"><div :style="{ width: ancho(pokemon.defensa) }"></div></div>
        <span>{{ pokemon.defensa }}</span>
      </div>
      <div class="stat">
        <span>Velocidad</span>
        <div class="barra"><div :style="{ width: ancho(pokemon.velocidad) }"></div></div>
        <span>{{ pokemon.velocidad }}</span>
      </div>
    </div>

    <div class="datos">
      <span>{{ pokemon.altura }} m</span>
      <span>{{ pokemon.peso }} kg</span>
      <span>{{ pokemon.experiencia }} exp</span>
    </div>
  </div>
</template>
