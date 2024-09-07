import React from 'react';
import SortButtons from '../components/sortGearButtons';
import GearCard from '../components/gearCard';

export default function CurrentGear() {
  return (
    <div>
      <h1>Current Gear
      </h1>
      <div>
        <SortButtons />
      </div>
      <div>
        <GearCard />
      </div>
    </div>
  );
}
