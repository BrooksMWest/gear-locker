import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getTypes } from '../../api/typeData';
import { createGearItem, updateGear } from '../../api/gearData';

const initialState = {
  name: '',
  typeId: '',
  maker: '',
  acquiredOn: '',
  acquiredFrom: '',
  condition: '',
  serialNumber: '',
  description: '',
  isArchived: false,
  favorite: false,
  wantToSell: false,
  image: '',
  quantity: 1,
};

function GearForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [types, setTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTypes(user.uid).then(setTypes);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateGear(formInput).then(() => router.push(`/gear/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createGearItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGear(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Gear</h2>

      {/* GEAR NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Gear Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Gear Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TYPE OF GEAR INPUT (DROPDOWN)  */}
      <FloatingLabel controlId="floatingSelect" label="Type">
        <Form.Select
          aria-label="Type"
          name="typeId"
          onChange={handleChange}
          className="mb-3"
          key={formInput.typeId}
          value={formInput.typeId}
          required
        >
          <option value="">What kind of gear is it?</option>
          {
            types.map((type) => (
              <option
                key={type.firbaseKey}
                value={type.firebaseKey}
              >
                {type.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* MANUFACTURER INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Maker" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Manufacturer"
          name="maker"
          value={formInput.maker}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ACQUISITION DATE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="acquiredOn" className="mb-3">
        <Form.Control
          type="date"
          placeholder="Date Acquired"
          name="acquiredOn"
          value={formInput.acquiredOn}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FROM WHOM/WHERE  INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="acquiredFrom" className="mb-3">
        <Form.Control
          type="text"
          placeholder="where'd you get this thing?"
          name="acquiredFrom"
          value={formInput.acquiredFrom}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* CONDITION INPUT  */}

      <FloatingLabel controlId="floatingInput3" label="condition" className="mb-3">
        <Form.Control
          type="text"
          placeholder="condition"
          name="condition"
          value={formInput.condition}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SERIAL # INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="serial number" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter serial number if you've got it"
          name="serialNumber"
          value={formInput.serialNumber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="quantity" className="mb-3">
        <Form.Control
          type="number"
          placeholder="quantity"
          name="quantity"
          value={formInput.quantity}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* ADD AN IMAGE  */}
      <FloatingLabel controlId="floatingInput2" label="gear image link" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="wantToSell"
        name="wantToSell"
        label="want to sell?"
        checked={formInput.wantToSell}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            wantToSell: e.target.checked,
          }));
        }}
      />
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="isArchived"
        name="isArchived"
        label="Send this item
        to the archive?"
        checked={formInput.isArchived}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            isArchived: e.target.checked,
          }));
        }}
      />
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Gear</Button>
    </Form>
  );
}

GearForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    maker: PropTypes.string,
    acquiredOn: PropTypes.string,
    acquiredFrom: PropTypes.string,
    condition: PropTypes.string,
    serialNumber: PropTypes.string,
    isArchived: PropTypes.bool,
    favorite: PropTypes.bool,
    wantToSell: PropTypes.bool,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
  }),
};

GearForm.defaultProps = {
  obj: initialState,
};

export default GearForm;
