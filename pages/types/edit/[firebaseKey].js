import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleType } from '../../../api/typeData';
import TypeForm from '../../../components/forms/typeForm';

export default function EditType() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleType(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<TypeForm obj={editItem} />);
}
