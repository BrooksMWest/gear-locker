import React, { useEffect, useState, useCallback } from 'react';
import SortButtons from '../components/sortGearButtons';
import { getAllGear } from '../api/gearData';
import { useAuth } from '../utils/context/authContext';
import GearCard from '../components/gearCard';
import TypePickerDropdown from '../components/forms/typePickerDropdown';

export default function AllGear() {
  // SET STATE FOR gear
  const [gear, setGear] = useState([]);

  // GET USER ID USING USEAUTH HOOK
  const { user } = useAuth();
  const getAllTheGear = useCallback(() => {
    getAllGear(user.uid).then(setGear);
  }, [user.uid, setGear]);
  // CREATE A FUNCTION THAT MAKES AN API CALL TO GET ALL THE GEAR
  useEffect(() => {
    getAllTheGear();
  }, [getAllTheGear]);
  return (
    <div>
      <h1>Current Gear
      </h1>
      <div>
        <TypePickerDropdown />
      </div>
      <div>
        <div className="gear-cards-container">
          {gear.map((gearItem) => (
            <GearCard key={gearItem.firebaseKey} gearObj={gearItem} onUpdate={getAllTheGear} />
          ))}
        </div>
        <SortButtons />
      </div>
    </div>
  );
}
