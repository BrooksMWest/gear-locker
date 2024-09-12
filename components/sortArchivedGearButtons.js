import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import addGear from '../pages/addGear';
import { getTypeGear } from '../api/typeData';

function SortArchivedButtons() {
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
          All Archived Gear
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getTypeGear}>
          Archived Instruments
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getTypeGear}>
          Archived Pro Audio and Recording Gear
        </Button>
        <Button type="button" size="lg" className="copy-btn" onClick={getTypeGear}>
          Other Archived Gear
        </Button>
      </div>
      <div>
        <Link href="/addGear" passHref>
          <Button type="button" size="lg" className="copy-btn" onClick={addGear}>
            Add Gear
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SortArchivedButtons;
