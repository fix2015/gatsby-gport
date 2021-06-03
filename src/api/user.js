// export const getUser = () => {
//   const user = localStorage.getItem("user")
//
//   if (!user) return {};
//
//   return JSON.parse(user);
// }
//
// export const clearUser = () => {
//   localStorage.removeItem("user")
//
//   return true;
// }
//
// export const updateUser = data => {
//   const user = getUser();
//
//   localStorage.setItem(
//     "user",
//     JSON.stringify({...user, ...data})
//   )
//
//   return user;
// }
//
// export const createUser = user => {
//   localStorage.setItem("user", JSON.stringify({...user}))
//
//   return user;
// }
//
// export const isLogin = () => {
//   const user = getUser();
//
//   if (!Object.keys(user).length) return false;
//
//   return true;
// }
