import { COLLECTION } from "@src/Constants"

export const createCollection = (db, {place}) => {
  delete place.documentId;

  return db.collection(COLLECTION).doc().set({...place, imgs: []});
}

export const updateCollection = (db, {documentId, place}) => {
  delete place.documentId;

  return db.collection(COLLECTION).doc(documentId).set(place);
}

export const getCollection = (db) => {
  return db.collection(COLLECTION);
}

export const getCollectionLimit = (db, limit) => {
  return db.collection(COLLECTION).orderBy('createdAt', 'desc').limit(limit);
}
export const getMoreCollectionLimit = (db, limit, key) => {
  return db.collection('places')
    .orderBy('createdAt', 'desc')
    .startAfter(key)
    .limit(limit)
}

export const deleteCollection = (db, documentId) => {
  return db.collection(COLLECTION).doc(documentId).delete();
}

export const getByAlias = (db, alias) => {
  return db.collection(COLLECTION).where('alias', '==', alias);
}

export const getByName = (db, name) => {
  return db.collection(COLLECTION).where('name', '==', name);
}

export const getByListByAlias = (db, alias) => {
  return db.collection(COLLECTION).where('alias', '==', alias);
}

export const getByListByType = (db, type) => {
  return db.collection(COLLECTION).where('type', '==', type);
}

export const isDublicate = (db, {name, alias}) => {
  return Promise.all([
    db.collection(COLLECTION).where("alias", "==", alias).get().then(doc => {
      return doc.empty;
    }),
    db.collection(COLLECTION).where("name", "==", name).get().then(doc => {
      return doc.empty;
    })
  ])
    .then( ( [ one, two ] ) => {
      return Promise.resolve(one && two);
    })
    .catch((e) => {
      console.error(e)
    })
}

export const loadFormatData = (ref) => {
  return new Promise((res, rej) => {
    ref.get()
      .then(snapshot => {
        if (snapshot.empty) {
          rej();
        }
        const collections = [];
        snapshot.forEach(doc => {
          collections.push({
            ...doc.data(),
            documentId: doc.id,
          })
        });

        res(collections);
      })
      .catch(err => {
        rej();
      });
  })
}

export const loadFormatDataOne = (ref) => {
  return new Promise((res, rej) => {
    ref.get()
      .then(snapshot => {
        if (snapshot.empty) {
          res({})
        }
        snapshot.forEach(doc => {
          res({
            ...doc.data(),
            documentId: doc.id,
          })
        });
      })
      .catch(err => {
        rej();
      });
  })
}

export const getListBySearch = async (db, obj) => {
  let ref = db.collection(COLLECTION);

  // let options = [];
  // for (var prop in obj) {
  //   if (typeof obj[prop] === "string") {
  //     if (obj[prop].length) {
  //       const search = obj[prop];
  //       console.log(`startAt(${search}).endAt(${search} + '\uf8ff')`)
  //       // ref = ref.orderBy(prop, "asc").startAt(search).endAt(search + '\uf8ff');
  //     }
  //   } else if (typeof obj[prop] === "boolean") {
  //     if (obj[prop]) {
  //       options.push(prop);
  //       // ref = ref.where('options', 'array-contains', prop);
  //       console.log(`where('options', 'array-contains', ${prop})`);
  //     }
  //   }
  // }

  // if(options.length){
  //   ref = ref.where('options', 'in', options)
  // }

  const places = await loadFormatData(ref);

  return queryForObj(obj, places);
}

export const queryForObj = (obj, places) => {
  let res = places;

  for (var prop in obj) {
    if (typeof obj[prop] === "string") {
      if (obj[prop].length) {
        res = res.filter(
          data =>
            data[prop].toLowerCase().search(obj[prop].toLowerCase()) !== -1
        )
      }
    } else if (typeof obj[prop] === "boolean") {
      if (obj[prop]) {
        res = res.filter(
          place => place.options.filter((data) => data === prop).length
        )
      }
    }
  }

  return res;
}























// api for localstorage
// export const get = () => {
//   const places = localStorage.getItem("places")
//
//   if (!places) return []
//
//   return JSON.parse(places)
// }
//
// export const getByAlias = alias => {
//   const places = localStorage.getItem("places")
//
//   if (!places) return null
//
//   return JSON.parse(places).filter(data => data.alias === alias)[0]
// }
//
// export const getListByType = type => {
//   const places = localStorage.getItem("places")
//
//   if (!places) return null
//
//   const res = JSON.parse(places)
//   const obj = TYPE.filter(data => data.alias === type)[0]
//   if (!obj) return null
//
//   return res.filter(data => data.type === obj.id)
// }
//
// export const getListByName = name => {
//   const places = localStorage.getItem("places")
//
//   if (!places) return null
//
//   const res = JSON.parse(places)
//
//   return res.filter(
//     data => data.name.toLowerCase().search(name.toLowerCase()) !== -1
//   )
// }
//
// export const getListBySearch = obj => {
//   const places = localStorage.getItem("places")
//
//   if (!places) return null
//
//   let res = JSON.parse(places)
//
//   for (var prop in obj) {
//     if (typeof obj[prop] === "string") {
//       if (obj[prop].length) {
//         res = res.filter(
//           data =>
//             data[prop].toLowerCase().search(obj[prop].toLowerCase()) !== -1
//         )
//       }
//     } else if (typeof obj[prop] === "boolean") {
//       if (obj[prop]) {
//         res = res.filter(
//           place => place.options.filter(({ name }) => name === prop).length
//         )
//       }
//     }
//   }
//
//   return res
// }
//
// export const put = place => {
//   const places = get()
//
//   localStorage.setItem(
//     "places",
//     JSON.stringify([...places.filter(data => data.id !== place.id), place])
//   )
//
//   return place
// }
//
// export const post = place => {
//   const places = get()
//   place.id = randormHash()
//
//   localStorage.setItem("places", JSON.stringify([...places, place]))
//
//   return place
// }
//
// export const deletePlace = ({ id }) => {
//   const places = get()
//
//   localStorage.setItem(
//     "places",
//     JSON.stringify([...places.filter(item => item.id !== id)])
//   )
//
//   return get()
// }
