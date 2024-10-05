import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { getTypes } from '../../api/typeData';
import { useAuth } from '../../utils/context/authContext';

const initialState = { // object that holds default values for the form - set to two empty strings
  typeId: '',
  name: '',
};

// eslint-disable-next-line react/prop-types
function TypePickerDropdown({ obj, onTypeChange }) { // functional component that takes two props - the obj and the the callback function to handle when the type changes
  const [formInput, setFormInput] = useState(initialState); // initializes the formInput state and sets the form to the initial state using the useState hook - it will hold the selected gear type's data.
  const [types, setTypes] = useState([]);// initializes and empty array to store the gear types and set them in the array called types
  const { user } = useAuth(); // useAuth hook destructures the user object so we can use it to get a specific user's types

  useEffect(() => { // runs whenever obj or user changes
    getTypes(user).then(setTypes);// get types is called passing in the user to get their types. THEN setter function sets the fetched types in the form

    if (obj) setFormInput(obj); // if types come back, put them in the form.
  }, [obj, user]);

  const handleChange = (e) => { // event handler triggered when the input value changes
    const { name, value } = e.target; // destructures the name and value properties from the event target, which is the element being changed in the form.
    setFormInput((prevState) => ({
      ...prevState, // spread operator spreads the prevState and updates the name field with the new value. its needed so we only change the name and nothing else in prevState.
      [name]: value,
    }));
    onTypeChange(value);// passes the updated value to the form
  };

  return (
    <Form>
      <div>
        <FloatingLabel controlId="floatingSelect" label="What type of gear would you like to see?">
          <Form.Select
            aria-label="Type"
            name="typeId"
            onChange={handleChange}
            className="mb-3"
            key={formInput.typeId}
            value={formInput.typeId}
            required
          >
            <option value="all">everything</option>
            {
    types.map((type) => (// maps over the types array and creates an option for each type with a key and a value. the name is what shows in the ui
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
// defines the proptypes for the component so the dropdown knows what to expect when in gets obj
TypePickerDropdown.propTypes = {
  obj: PropTypes.shape({
    typeId: PropTypes.string,
    name: PropTypes.string,
  }),
};
// gives the dropdown the initial state if for some reason it doesn't get the real obj
TypePickerDropdown.defaultProps = {
  obj: initialState,
};

export default TypePickerDropdown;
