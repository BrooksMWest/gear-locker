import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { getTypes, updateType } from '../../api/typeData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  id: '',
  name: '',
};

// eslint-disable-next-line react/prop-types
function TypePickerDropdown({ obj, setValue }) {
  const [formInput, setFormInput] = useState(initialState);
  const [types, setTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTypes(user).then(setTypes);

    if (obj) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj) {
      updateType(formInput).then(() => router.push(`/types/${obj}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <FloatingLabel controlId="floatingSelect" label="Type">
          <Form.Select
            aria-label="Type"
            name="id"
            onChange={handleChange}
            className="mb-3"
            // key={formInput.id}
            value={formInput.id}
            required
          >
            <option value="">What Gear Would you like to see?</option>
            {
    types.map((type) => (
      <option
        key={types.id}
        value={types.id}
      >
        {type.name}
      </option>
    ))
  }
          </Form.Select>
        </FloatingLabel>
      </div>
    </Form>
  );
}

TypePickerDropdown.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

TypePickerDropdown.defaultProps = {
  obj: initialState,
};

export default TypePickerDropdown;
