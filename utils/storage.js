const POKE_ID = 'pokeId';

export const setPokeId = (value) =>
  window.localStorage.setItem(POKE_ID, JSON.stringify(value));

export const getPokeId = () => window.localStorage.getItem(POKE_ID);
