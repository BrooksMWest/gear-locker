import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createType, updateType } from '../../api/typeData';

// NOT CURRENTLY USING ANY OF THIS!!! IT WILL BE USED AS A STRETCH GOAL FOR WHEN USERS CAN ADD THEIR OWN TYPES!!!
const initialState = {
  name: '',
};

function TypeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateType(formInput).then(() => router.push(`/type/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createType(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateType(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Type</h2>

      {/* NEW TYPE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Gear Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="What type classification would you like to add to your locker?"
          name="text"
          value={formInput.type}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Type</Button>
    </Form>
  );
}

TypeForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TypeForm.defaultProps = {
  obj: initialState,
};

export default TypeForm;
