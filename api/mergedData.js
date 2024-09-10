import { getTypeGear, getSingleType, deleteSingleType } from './typeData';
import { getSingleGearItem, deleteGearItem } from './gearData';

const viewGearDetails = (gearFirebaseKey) => new Promise((resolve, reject) => {
  getSingleGearItem(gearFirebaseKey)
    .then((gearObject) => {
      getSingleType(gearObject.typeId)
        .then((typeObject) => {
          resolve({ typeObject, ...gearObject });
        });
    }).catch((error) => reject(error));
});

const viewTypeDetails = (typeFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleType(typeFirebaseKey), getTypeGear(typeFirebaseKey)])
    .then(([typeObject, typeGearArray]) => {
      resolve({ ...typeObject, gear: typeGearArray });
    }).catch((error) => reject(error));
});

const deleteTypeGear = (typeId) => new Promise((resolve, reject) => {
  getTypeGear(typeId).then((gearArray) => {
    console.warn(gearArray, 'Type Gear');
    const deleteGearPromises = gearArray.map((gear) => deleteGearItem(gear.firebaseKey));

    Promise.all(deleteGearPromises).then(() => {
      deleteSingleType(typeId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewGearDetails, viewTypeDetails, deleteTypeGear };
