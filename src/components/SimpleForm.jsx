import React, { useState } from 'react';

import { useForm } from '../useForm';

const SimpleForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = e => e.preventDefault();

  // create a state variable for the name validation errors
  const [nameError, setNameError] = useState('');
  const { validateField } = useForm({
    validations: {
      name: {
        pattern: {
          value: /^\w{3,50}$/,
          message: 'invalid name'
        }
      }
    }
  });

  // handle change events in the name input
  const handleNameChange = e => {
    const { value } = e.target;

    // set the name state with the field value
    setName(value);
    // validates the name field and sets the error state
    setNameError(validateField('name', value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
        {nameError && <p>{nameError}</p>}
      </div>
    </form>
  );
};

export default SimpleForm;
