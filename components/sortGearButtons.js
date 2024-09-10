import React from 'react';
import { Button } from 'react-bootstrap';
import addGear from '../pages/addGear';
import { getTypeGear } from '../api/typeData';

function SortButtons() {
  return (
    <div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Button type="button" size="lg" className="copy-btn" onClick={getTypeGear}>
          All Current Gear
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getTypeGear}>
          Instruments
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getTypeGear}>
          Pro Audio and recording
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getTypeGear}>
          Other Gear
        </Button>
      </div>
      <div>
        <Button type="button" size="lg" className="copy-btn" onClick={addGear}>
          Add Gear
        </Button>
      </div>
    </div>
  );
}

export default SortButtons;
