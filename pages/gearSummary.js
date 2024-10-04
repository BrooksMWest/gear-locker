import React from 'react';

// this function renders the gear summary for the user
export default function GearSummary() {
  return (
    <div>
      <h1 className="page-header-text">Gear Summary Page</h1>
      <h2>Gear Summary functionality coming soon!</h2>
      <div>
        <h1>Current Gear</h1>
        <h3>Instruments: {}</h3>
        <h3>Pro Audio and Recording Gear: {}</h3>
        <h3>Other Gear: {}</h3>
      </div>
      <div>
        <h1>Archived Gear</h1>
        <h3>Instruments: {}</h3>
        <h3>Pro Audio and Recording Gear: {}</h3>
        <h3>Other Gear: {}</h3>
      </div>
      <div>
        <h1>All Gear</h1>
        <h3>Instruments: {}</h3>
        <h3>Pro Audio and Recording Gear: {}</h3>
        <h3>Other Gear: {}</h3>
      </div>
    </div>
  );
}
