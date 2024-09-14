import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GearForm from '../../../components/forms/gearForm';
import { getSingleGearItem } from '../../../api/gearData';

export default function EditGear() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the gear data
  useEffect(() => {
    getSingleGearItem(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<GearForm obj={editItem} />);
}
