import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

function WelcomeButtons() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Link href="allGear" passHref>
        <Button type="button" size="lg" className="copy-btn" style={{ marginBottom: '15px' }}>
          Take me to all of my gear
        </Button>
      </Link>
      <Link href="currentGear" passHref>
        <Button type="button" size="lg" className="copy-btn" style={{ marginBottom: '15px' }}>
          Take me to my current gear
        </Button>
      </Link>
      <Link href="/archivedGear" passHref>
        <Button type="button" size="lg" className="copy-btn" style={{ marginBottom: '15px' }}>
          Take me to my archived gear
        </Button>
      </Link>
      <Link href="/addGear" passHref>
        <Button type="button" size="lg" className="copy-btn" style={{ marginBottom: '15px' }}>
          Add gear to the locker
        </Button>
      </Link>
    </div>
  );
}

export default WelcomeButtons;
