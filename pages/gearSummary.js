import React from 'react';

// this function renders the gear summary for the user
export default function GearSummary() {
  return (
    <div>
      <h1>Gear Summary Page</h1>
      <div>
        <h3>Instruments: {}</h3>
        <h3>Pro Audio and Recording Gear: {}</h3>
        <h3>Other Gear: {}</h3>
        <h3>Newest to me: {}</h3>
        <h3>Had the longest: {}</h3>
      </div>
    </div>
  );
}
