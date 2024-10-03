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
      </div>
    </div>
  );
}

export default SortButtons;
