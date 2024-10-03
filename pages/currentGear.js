import React, { useEffect, useState, useCallback } from 'react';
import SortButtons from '../components/sortGearButtons';
import { getCurrentGear } from '../api/gearData';
import { useAuth } from '../utils/context/authContext';
import GearCard from '../components/gearCard';
import TypePickerDropdown from '../components/forms/typePickerDropdown';

export default function CurrentGear() {
  // SET STATE FOR gear
  const [gear, setGear] = useState([]);
  // SETS THE STATE FOR SELECTED TYPE
  const [selectedTypeId, setSelectedTypeId] = useState('');

  // GET USER ID USING USEAUTH HOOK
  const { user } = useAuth();
  const getAllTheCurrentGear = useCallback(() => {
    getCurrentGear(user.uid).then(setGear);
  }, [user.uid, setGear]);

  // CREATE A FUNCTION THAT MAKES AN API CALL TO GET ALL THE GEAR
  useEffect(() => {
    getAllTheCurrentGear();
  }, [getAllTheCurrentGear]);

  const filteredGear = selectedTypeId === 'all' || selectedTypeId === ''
    ? gear
    : gear.filter((gearItem) => gearItem.typeId === selectedTypeId);

  return (
    <div>
      <h1 className="page-header-text">Current Gear
      </h1>
      <div>
        <TypePickerDropdown onTypeChange={setSelectedTypeId} />
        <SortButtons />
      </div>
      <div>
        <div className="gear-cards-container">
          {filteredGear.map((gearItem) => (
            <GearCard
              key={gearItem.firebaseKey}
              gearObj={gearItem}
              onUpdate={getAllTheCurrentGear}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
