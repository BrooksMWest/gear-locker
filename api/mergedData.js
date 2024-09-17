import { getTypeGear, getSingleType, deleteSingleType } from './typeData';
import { getSingleGearItem, deleteGearItem } from './gearData';

//
const viewGearDetails = (gearFirebaseKey) => new Promise((resolve, reject) => { // gets the gearFirebaseKey passed in when it's used on the [firbaseKey].js gear details page when it accesses the database.
  getSingleGearItem(gearFirebaseKey)
    .then((gearObject) => {
      getSingleType(gearObject.typeId)// gets typeId when the gerObject is returned
        .then((typeObject) => {
          resolve({ ...gearObject, typeName: typeObject.name });// resolves the promise by combining the typeObject with the gearObject. ... is a spread operator - allows us to expand the elements of anything iterable. other things it can do: object merging, function arguments, array concentration
        });
    }).catch((error) => reject(error));// this happens if the fetch doesn't work
});

// function from simply books which i may use for stretch goals if i want to do something more with types
const viewTypeDetails = (typeFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleType(typeFirebaseKey), getTypeGear(typeFirebaseKey)])
    .then(([typeObject, typeGearArray]) => {
      resolve({ ...typeObject, gear: typeGearArray });
    }).catch((error) => reject(error));
});
// a function that deletes gear by type - also for stretch goals in case i want the user to be able delete whole types of gear
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
