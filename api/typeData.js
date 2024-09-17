import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));// if data exists give the Object.values - ObjectConstructor is built into javascript and in this case is used to extract the values from the data object and put them into an array
      } else {
        resolve([]);// if no data comes back resolve with this empty array
      }
    })
    .catch(reject);
});
// CREATE TYPE - NOT USING THIS YET - NEEDED FOR STRETCH GOAL!!!
const createType = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE TYPE
const getSingleType = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE TYPES - NOT USING THIS YET - STRETCH GOAL!!!!
const deleteSingleType = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE TYPE - NOT USING THIS YET - STRETCH GOAL!!!!!
const updateType = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET A SINGLE TYPE'S GEAR
const getTypeGear = (firebaseKey) => new Promise((resolve, reject) => {
  // this needs fixing
  fetch(`${endpoint}/gear.json?orderBy="typeId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// not using this yet - got from simply books but won't need it until i need to show gear favorites.
const favoriteTypes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getTypes,
  createType,
  getSingleType,
  deleteSingleType,
  updateType,
  favoriteTypes,
  getTypeGear,
};
