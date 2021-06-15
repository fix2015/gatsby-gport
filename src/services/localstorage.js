export const getStorage = (name, value) => {
  return localStorage.getItem(name, value);
}

export const setStorage = (name, value) => {
  return localStorage.setItem(name, value);
}

export const removeStorege = (name) => {
  return localStorage.removeItem(name);
}
