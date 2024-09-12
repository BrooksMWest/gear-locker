import React from 'react';

export default function GearSummary() {
  return (
    <div>
      <h1>
        Gear Summary Page
      </h1>
      <div>
        <p>
          Instruments: numberOfInstruments
        </p>
        <p> Pro Audio and Recording Gear: numberOfAudioGear</p>
        <p> Other Gear: numberOfOthergGear</p>
        <p> Newest to me: mostRecentlyAcquired</p>
        <p> Had the longest: firstAcquired</p>
      </div>
    </div>
  );
}
