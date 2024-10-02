import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { viewGearDetails } from '../../api/mergedData';

export default function ViewGearItem() {
  const [gearDetails, setGearDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query; // router.query comes from useRouter in nextJs this extracts the firebaseKey from the router.query object and assigns it to the firebaseKey variable

  // make call to API layer to get the data
  useEffect(() => {
    viewGearDetails(firebaseKey).then(setGearDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Image src={gearDetails.image} alt={gearDetails.name} style={{ width: '600px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h1>
          {gearDetails.name}
        </h1>
        <h3>Quantity: {gearDetails.quantity}</h3>
        <h3>Type of Gear: {gearDetails.typeName}</h3>
        <h3> Manufacturer: {gearDetails.maker}</h3>
        <h3>Date Acquired: {gearDetails.acquiredOn}</h3>
        <h3>Acquired From: {gearDetails.acquiredFrom}</h3>
        <h3>Condition: {gearDetails.condition}</h3>
        <h3>Serial Number: {gearDetails.serialNumber}</h3>
        <h3>Description: {gearDetails.description}</h3>
        <h3>Favorite?: {gearDetails.favorite ? 'Yes ❤️' : 'No'} </h3>
        <h3>Want to Sell?: {gearDetails.wantToSell ? 'Yes 💲' : 'No'}</h3>
        <p />
      </div>
      <Link href={`/gear/edit/${gearDetails.firebaseKey}`} passHref>
        <Button variant="info" className="m-2">EDIT</Button>
      </Link>
    </div>
  );
}
