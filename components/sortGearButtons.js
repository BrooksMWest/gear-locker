import React from 'react';
import { Button } from 'react-bootstrap';
import addGear from '../pages/addGear';

function SortButtons() {
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {/* <Button type="button" size="lg" className="copy-btn" onClick={getCurrenturrentGear}>
          All Current Gear
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getCurrentInstruments}>
          Instruments
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getAudioGear}>
          Pro Audio and recording
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getOtherGear}>
          Other Gear
        </Button> */}
      </div>
      <div>
        <Button type="button" size="lg" className="copy-btn" onClick={addGear}>
          Add Gear
        </Button>
      </div>
    </>
  );
}

export default SortButtons;
