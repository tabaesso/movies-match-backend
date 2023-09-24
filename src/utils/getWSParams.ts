export const getWSParams = (url: string, position: number) =>
  url.split('?')[1].split('&')[position].split('=')[1];
