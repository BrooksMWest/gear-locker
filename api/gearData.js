import { clientCredentials } from '../utils/client';
// API CALLS FOR GEAR

const endpoint = clientCredentials.databaseURL;

const getAllGear = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// DELETE GEAR
const deleteGearItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// GET SINGLE GEAR ITEM
const getSingleGearItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE GEAR ITEM
const createGearItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear.json`, {
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

// UPDATE GEAR
const updateGear = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear/${payload.firebaseKey}.json`, {
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

const getGearByType = (firebaseKey) => new Promise((resolve, reject) => {
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

// API CALL FOR ALL ARCHIVED GEAR
const getArchivedGear = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear.json?orderBy="uid"&equalTo="${uid}"&orderBy="isArchived"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const archivedGear = Object.values(data).filter((item) => item.isArchived);
      resolve(archivedGear);
    })
    .catch(reject);
});
// API CALL FOR GETTING ALL CURRENT GEAR (NOT ARCHIVED GEAR)
const getCurrentGear = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear.json?orderBy="uid"&equalTo="${uid}"&orderBy="isArchived"&equalTo=false`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const currentGear = Object.values(data).filter((item) => !item.isArchived);
      resolve(currentGear);
    })
    .catch(reject);
});

// NOT USING YET!!! STRETCH GOAL!!!!!
const gearIsFavorite = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/gear.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const isFavorite = Object.values(data).filter((item) => item.favorite);
      resolve(isFavorite);
    })
    .catch(reject);
});
// make api calls for archived gear - getAllArchivedGear, deleteArchivedGearItem, createArchivedGearItem, getSingleArchivedGearItem, updateArchivedGear, get ArchivedgearByType
export {
  getAllGear,
  createGearItem,
  gearIsFavorite,
  deleteGearItem,
  getSingleGearItem,
  updateGear,
  getGearByType,
  getArchivedGear,
  getCurrentGear,
};
