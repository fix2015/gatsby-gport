import {randormHash} from '@services/string'

export const get = () => {
  const place = localStorage.getItem('places');

  if(!place) return [];

  return JSON.parse(place);
}

export const getByAlias = (alias) => {
  const place = localStorage.getItem('places');

  if(!place) return {};

  return JSON.parse(place).filter((data) => data.alias === alias)[0];
}

export const put = (place) => {
  const places = get();

  localStorage.setItem('places', JSON.stringify([...places.filter((data) => data.id !== place.id), place]));

  return place;
}

export const post = (place) => {
  const places = get();
  place.id = randormHash();

  localStorage.setItem('places', JSON.stringify([...places, place]));

  return place;
}

export const deletePlace = ({ id }) => {
  const places = get();

  localStorage.setItem('places', JSON.stringify([...places.filter((item) => item.id !== id)]));

  return get();
}
