import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getArchivedGear } from '../api/gearData';
import ArchivedTypePickerDropdown from '../components/forms/archivedTypePickerDropdown';
import GearCard from '../components/gearCard';
import SortButtons from '../components/sortGearButtons';

export default function ArchivedGear() {
  // SET STATE FOR gear
  const [gear, setGear] = useState([]);
  // SETS THE STATE FOR SELECTED TYPE
  const [selectedTypeId, setSelectedTypeId] = useState('');

  // GET USER ID USING USEAUTH HOOK
  const { user } = useAuth();
  const getAllTheArchivedGear = useCallback(() => {
    getArchivedGear(user.uid).then(setGear);
  }, [user.uid, setGear]);

  // CREATE A FUNCTION THAT MAKES AN API CALL TO GET ALL THE GEAR
  useEffect(() => {
    getAllTheArchivedGear();
  }, [getAllTheArchivedGear]);

  const filteredGear = selectedTypeId === 'all' || selectedTypeId === ''
    ? gear
    : gear.filter((gearItem) => gearItem.typeId === selectedTypeId);

  return (
    <div>
      <h1>Archived Gear
      </h1>
      <div>
        <ArchivedTypePickerDropdown onTypeChange={setSelectedTypeId} />
      </div>
      <div>
        <div className="gear-cards-container">
          {filteredGear.map((gearItem) => (
            <GearCard
              key={gearItem.firebaseKey}
              gearObj={gearItem}
              onUpdate={getAllTheArchivedGear}
            />
          ))}
        </div>
        <SortButtons />
      </div>
    </div>
  );
}
