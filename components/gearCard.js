import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteGearItem } from '../api/gearData';

function GearCard({ gearObj, onUpdate }) {
// FOR DELETE, WE NEED TO REMOVE THE GEAR AND HAVE THE VIEW RERENDER,
// SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE Gear
  const deleteThisGear = () => {
    if (window.confirm(`Delete ${gearObj.name}?`)) {
      deleteGearItem(gearObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem',
      margin: '10px',
      backgroundColor: gearObj.isArchived ? 'pink' : 'lightgreen',
    }}
    >
      <Card.Body>
        <Card.Title>{gearObj.maker}</Card.Title>
        <Card.Title>{gearObj.name}</Card.Title>
        <Card.Img variant="top" src={gearObj?.image || 'defaultImageUrl'} alt={gearObj?.name || 'No name'} style={{ height: '400px', width: '100%', objectFit: 'contain' }} />
        {/* DYNAMIC LINK TO VIEW THE GEAR DETAILS  */}
        <Link href={`/gear/${gearObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View Details</Button>
        </Link>
        {/* <Button variant="primary" onClick={archiveThisGear} className="m-2">
          Archive
        </Button> */}
        {/* DYNAMIC LINK TO EDIT THE GEAR DETAILS  */}
        <Link href={`/gear/edit/${gearObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGear} className="m-2">
          DELETE
        </Button>
        {gearObj.favorite && <span style={{ marginLeft: '10px' }}>❤️</span>}
        {gearObj.wantToSell && <span style={{ marginLeft: '10px' }}>💲</span>}
      </Card.Body>
    </Card>
  );
}

GearCard.propTypes = {
  gearObj: PropTypes.shape({
    name: PropTypes.string,
    maker: PropTypes.string,
    acquiredOn: PropTypes.string,
    acquiredFrom: PropTypes.string,
    condition: PropTypes.string,
    serialNumber: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
    wantToSell: PropTypes.bool,
    isArchived: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GearCard;
