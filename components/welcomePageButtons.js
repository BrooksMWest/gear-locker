import React from 'react';
import { Button } from 'react-bootstrap';
import CurrentGear from '../pages/currentGear';
import ArchivedGear from '../pages/archivedGear';
import addGear from '../pages/addGear';

function WelcomeButtons() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Button type="button" size="lg" className="copy-btn" onClick={CurrentGear}>
        Take me to my gear
      </Button>
      <Button type="button" size="lg" className="copy-btn" onClick={ArchivedGear}>
        Show me my archived gear
      </Button>
      <Button type="button" size="lg" className="copy-btn" onClick={addGear}>
        add gear
      </Button>
    </div>
  );
}

export default WelcomeButtons;
