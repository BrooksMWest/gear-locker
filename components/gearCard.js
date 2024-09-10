import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteGear } from '../api/gearData';

function GearCard({ gearObj, onUpdate }) {
// FOR DELETE, WE NEED TO REMOVE THE GEAR AND HAVE THE VIEW RERENDER,
// SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE Gear
  const deleteThisGear = () => {
    if (window.confirm(`Delete ${gearObj.name}?`)) {
      deleteGear(gearObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={gearObj?.image || 'defaultImageUrl'} alt={gearObj?.name || 'No name'} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{gearObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE GEAR DETAILS  */}
        <Link href={`/gear/${gearObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE GEAR DETAILS  */}
        <Link href={`/gear/edit/${gearObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGear} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

GearCard.propTypes = {
  gearObj: PropTypes.shape({
    name: PropTypes.string,
    acquiredOn: PropTypes.string,
    acquiredFrom: PropTypes.string,
    condition: PropTypes.string,
    serialNumber: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GearCard;
