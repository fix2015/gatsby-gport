export const get = () => {
  const place = localStorage.getItem('places');

  if(!place) return [];

  return JSON.parse(place);
}

export const put = (place) => {
  const places = get();

  places.forEach((item) => {
    if(item.id === item.id){
      item = place;
    }
  })

  localStorage.setItem('places', [...places]);

  return get();
}

export const post = (place) => {
  const places = get();

  localStorage.setItem('places', [...places, place]);

  return get();
}

export const deletePlace = ({ id }) => {
  const places = get();

  localStorage.setItem('places', [...places.filter((item) => item.id !== id)]);

  return get();
}
