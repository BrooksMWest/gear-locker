import React, { useEffect, useState } from 'react';
import SortButtons from '../components/sortGearButtons';
import { getAllGear } from '../api/gearData';
import { useAuth } from '../utils/context/authContext';
import GearCard from '../components/gearCard';

export default function AllGear() {
  // SET STATE FOR gear
  const [gear, setGear] = useState([]);

  // GET USER ID USING USEAUTH HOOK
  const { user } = useAuth();

  // CREATE A FUNCTION THAT MAKES AN API CALL TO GET ALL THE GEAR
  const getAlltheGear = () => {
    getAllGear(user.uid).then(setGear);
  };
  useEffect(() => {
    getAlltheGear();
  });
  return (
    <div>
      <h1>Current Gear
      </h1>
      <div>
        <SortButtons />
      </div>
      <div>
        {gear.map((gearItem) => (
          <GearCard key={gear.firebaseKey} gearObj={gearItem} onUpdate={getAlltheGear} />
        ))}
      </div>
    </div>
  );
}
