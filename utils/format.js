export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const gridColumn = (data) => {
  let col = '';
  data.forEach(() => (col += 'auto '));
  return col;
};
