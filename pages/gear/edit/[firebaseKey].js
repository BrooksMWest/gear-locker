import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GearForm from '../../../components/forms/gearForm';
import { getSingleGearItem } from '../../../api/gearData';

export default function EditGear() { // defines the react component, and react components always start with a capitol letter
  const [editItem, setEditItem] = useState({});// sets the state variable to an empty object that will hold the item we want to edit
  const router = useRouter();// hook that is used to access the router object where i can get the firebaseKey for the object i want to edit
  // grab the firebasekey
  const { firebaseKey } = router.query;// the variable that is used to grab  the specific gear item

  // make a call to the API to get the gear data
  useEffect(() => {
    getSingleGearItem(firebaseKey).then(setEditItem);// useEffect runs when the firebaseKey changes - then galls a function passing in the firebaseKey. THEN in sets the item we want to change
  }, [firebaseKey]);

  // pass object to form
  return (<GearForm obj={editItem} />); // where we pass the item (the one we want to edit) as a prop into the gear form
}
