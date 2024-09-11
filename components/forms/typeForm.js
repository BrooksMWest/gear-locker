import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createType, updateType } from '../../api/typeData';

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
      updateType(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
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
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Author Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the author's email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="First name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="last name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
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
            sale: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
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
