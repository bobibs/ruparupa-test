import { randomNumber } from '../../utils/format';

export const getData = async () => {
  const offset = randomNumber(1, 1000);
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=5`,
  );
  const data = await res.json();
  return data;
};

export const getDetailData = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data;
};

export const searchData = async (name) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
  );
  const data = await res.json();
  return data;
};
