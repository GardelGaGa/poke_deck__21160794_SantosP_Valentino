const API = "https://pokeapi.co/api/v2";

async function pedir(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al pedir " + url);
  return res.json();
}

async function getHabilidad(nombre) {
  const data = await pedir(API + "/ability/" + nombre);
  const nombreEs = data.names.find((n) => n.language.name === "es");
  const textoEs = data.flavor_text_entries.find((f) => f.language.name === "es");

  return {
    nombre: nombreEs ? nombreEs.name : nombre,
    descripcion: textoEs ? textoEs.flavor_text.replace(/\s+/g, " ") : "Sin descripción",
  };
}

function getStat(stats, nombre) {
  return stats.find((s) => s.stat.name === nombre).base_stat;
}

async function getPokemon(id) {
  const data = await pedir(API + "/pokemon/" + id);
  const imagen = data.sprites.other["official-artwork"].front_default;

  if (!imagen || data.abilities.length < 2) {
    return null;
  }

  const habilidades = await Promise.all(
    data.abilities.slice(0, 2).map((h) => getHabilidad(h.ability.name))
  );

  return {
    id: data.id,
    nombre: data.name,
    imagen: imagen,
    tipos: data.types.map((t) => t.type.name),
    habilidades: habilidades,
    ps: getStat(data.stats, "hp"),
    ataque: getStat(data.stats, "attack"),
    defensa: getStat(data.stats, "defense"),
    velocidad: getStat(data.stats, "speed"),
    altura: data.height / 10,
    peso: data.weight / 10,
    experiencia: data.base_experience,
  };
}

export async function getDeck() {
  const ids = [];
  for (let i = 1; i <= 151; i++) {
    ids.push(i);
  }
  ids.sort(() => Math.random() - 0.5);

  const deck = [];
  let pos = 0;

  while (deck.length < 40 && pos < ids.length) {
    const faltan = 40 - deck.length;
    const lote = ids.slice(pos, pos + Math.min(10, faltan));
    pos += lote.length;

    const resultados = await Promise.all(lote.map((id) => getPokemon(id).catch(() => null)));
    resultados.forEach((p) => {
      if (p) deck.push(p);
    });
  }

  return deck;
}
