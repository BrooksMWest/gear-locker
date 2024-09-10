import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

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
      <Link href="/currentGear" passHref>
        <Button type="button" size="lg" className="copy-btn">
          Take me to my gear
        </Button>
      </Link>
      <Link href="/archivedGear" passHref>
        <Button type="button" size="lg" className="copy-btn">
          Show me my archived gear
        </Button>
      </Link>
      <Link href="/addGear" passHref>
        <Button type="button" size="lg" className="copy-btn">
          add gear
        </Button>
      </Link>
    </div>
  );
}

export default WelcomeButtons;
