import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
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
      <Card.Img variant="top" src={gearObj.image} alt={gearObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{gearObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE GEAR DETAILS  */}
        <Link href={`/gear/${gearObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/book/edit/${gearObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisGear} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}
// EVERYTHING IN THE GEAR CARD NEEDS TO BE CHANGED TO ACCOMODATE THE THE STRUCTURE OF THE GEAR DATABASE!
GearCard.propTypes = {
  gearObj: PropTypes.shape({
    name: PropTypes.string,
    aquiredOn: PropTypes.instanceOf(Date),
    acquiredFrom: PropTypes.string,
    condition: PropTypes.string,
    serialNumber: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GearCard;
