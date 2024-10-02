import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getTypes } from '../../api/typeData';

const initialState = { // defines what the initial state of the form should be. just empty strings
  id: '',
  name: '',
};

// eslint-disable-next-line react/prop-types
function ArchivedTypePickerDropdown({ obj, onTypeChange }) { // this functional component takest two props - an object and a callback function that runs when the type changes
  const [formInput, setFormInput] = useState(initialState); // starts with the formInput state and the setter function that sets the gearType in the form
  const [types, setTypes] = useState([]);// types is initialaized as an empty array and then sets the gear retrieved into that array
  const { user } = useAuth();// used to get a specific user's objects only

  useEffect(() => { // runs whenever the obj or user changes
    getTypes(user).then(setTypes); // first it gets types by user and then sets the fetched types for the form

    if (obj) setFormInput(obj);// if you get an object (a type in this case) put the object in the form.
  }, [obj, user]);

  const handleChange = (e) => { // event handler for when the user changes the form
    const { name, value } = e.target;// destructures/pulls the name and value properties from the event target, which is the form element being changed.
    setFormInput((prevState) => ({ // setter function that updates the formInput state
      ...prevState, // spread operator allows us to update specific part labeled name with a new value
      [name]: value,
    }));
    onTypeChange(value);// callback function passes in the updated value to notify the parent component about the change in selected type
  };

  return (
    <Form>
      <div>
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
            <option value="">What Gear Would you like to see?</option>
            <option value="all">All Archived Gear</option>
            {
    types.map((type) => (
      <option
        key={type.firebaseKey}
        value={type.firebaseKey}
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
// definition of the prop types we want to be passing as an obj
ArchivedTypePickerDropdown.propTypes = {
  obj: PropTypes.shape({
    typeId: PropTypes.string,
    name: PropTypes.string,
  }),
};
// default props is kind of a safety net incase no real props are passed - just sets them as the initial state
ArchivedTypePickerDropdown.defaultProps = {
  obj: initialState,
};

export default ArchivedTypePickerDropdown;
