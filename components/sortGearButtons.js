import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import addGear from '../pages/addGear';
// import { getTypeGear } from '../api/typeData';
// import { getAllGear } from '../api/gearData';

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
        <div>
          <Link href="/addGear" passHref>
            <Button type="button" size="lg" className="copy-btn" onClick={addGear}>
              Add Gear
            </Button>
          </Link>
        </div>
        {/* <Button type="button" size="lg" className="copy-btn" onClick={getAllGear}>
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
        </Button> */}
      </div>
    </div>
  );
}

export default SortButtons;
