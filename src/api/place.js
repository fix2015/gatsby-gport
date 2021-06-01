import {randormHash} from '@services/string'
import {TYPE} from '@src/Constants'

export const get = () => {
  const places = localStorage.getItem('places');

  if(!places) return [];

  return JSON.parse(places);
}

export const getByAlias = (alias) => {
  const places = localStorage.getItem('places');

  if(!places) return null;

  return JSON.parse(places).filter((data) => data.alias === alias)[0];
}

export const getListByType = (type) => {
  const places = localStorage.getItem('places');

  if(!places) return null;

  const res = JSON.parse(places);
  const obj = TYPE.filter((data) => data.alias === type)[0];
  if(!obj) return null;

  return res.filter((data) => data.type === obj.id);
}

export const getListByName = (name) => {
  const places = localStorage.getItem('places');

  if(!places) return null;

  const res = JSON.parse(places);

  return res.filter((data) => data.name.toLowerCase().search(name.toLowerCase()) !== -1);
}

export const getListBySearch = (obj) => {
  const places = localStorage.getItem('places');

  if(!places) return null;

  let res = JSON.parse(places);

  for (var prop in obj) {
    if(typeof obj[prop] === 'string'){
      if(obj[prop].length){
        res = res.filter((data) => data[prop].toLowerCase().search(obj[prop].toLowerCase()) !== -1);
      }
    }else if(typeof obj[prop] === 'boolean'){
      if(obj[prop]){
        res = res.filter((place) => place.options.filter(({ name }) => name === prop).length);
      }
    }
  }

  return res;
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
