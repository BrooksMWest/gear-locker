import React, { useEffect, useState } from 'react';
import { getAllGear } from '../api/gearData';
import { useAuth } from '../utils/context/authContext';
import { getTypes } from '../api/typeData';
// this function renders the gear summary for the user
export default function GearSummary() {
  // the next bunch are where we create the variables and sets the intitialized values in state The setter function updates the values
  const [numberOfInstruments, setNumberOfInstruments] = useState(0);
  const [numberOfAudioGear, setNumberOfAudioGear] = useState(0);
  const [numberOfOtherGear, setNumberOfOtherGear] = useState(0);
  const [mostRecentlyAcquired, setMostRecentlyAcquired] = useState('');
  const [firstAcquired, setFirstAcquired] = useState('');
  const [gearTypes, setGearTypes] = useState({});// also intitializes the empty object where the mapped gear types will be stored.
  const { user } = useAuth();

  useEffect(() => {
    getTypes(user.uid).then((types) => {
      const typesMap = {};
      types.forEach((type) => {
        typesMap[type.firebaseKey] = type.name;
      });
      setGearTypes(typesMap);
    });
    // Fetch all the gear for the user
    getAllGear(user.uid).then((gear) => {
      // Check if the gearTypes have been loaded
      if (Object.keys(gearTypes).length > 0) {
        // Filter and count the different types of gear
        const instruments = gear.filter((item) => gearTypes[item.typeId] === 'Instruments');
        const audioGear = gear.filter((item) => gearTypes[item.typeId] === 'Audio Gear');
        const otherGear = gear.filter((item) => gearTypes[item.typeId] === 'Other Gear');

        setNumberOfInstruments(instruments.length);
        setNumberOfAudioGear(audioGear.length);
        setNumberOfOtherGear(otherGear.length);

        // Sort by acquisition date to find the most recent and the oldest
        const sortedGear = gear.sort((a, b) => new Date(a.acquiredOn) - new Date(b.acquiredOn));

        if (sortedGear.length > 0) { // if there is at least one gear item, keep going to the next function
          setMostRecentlyAcquired(sortedGear[sortedGear.length - 1].name);
          setFirstAcquired(sortedGear[0].name);
        }
      }
    });
  }, [user, gearTypes]);

  return (
    <div>
      <h1>Gear Summary Page</h1>
      <div>
        <h3>Instruments: {numberOfInstruments}</h3>
        <h3>Pro Audio and Recording Gear: {numberOfAudioGear}</h3>
        <h3>Other Gear: {numberOfOtherGear}</h3>
        <h3>Newest to me: {mostRecentlyAcquired}</h3>
        <h3>Had the longest: {firstAcquired}</h3>
      </div>
    </div>
  );
}
