import React, { useState } from 'react';

import { useForm } from '../useForm';

const SimpleForm = () => {
  const handleSubmit = e => {
    e.preventDefault();

    console.log('values', values);
  };

  const { values, errors, bindField } = useForm({
    validations: {
      name: {
        pattern: {
          value: /^\w{3,50}$/,
          message: 'invalid name'
        }
      }
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" {...bindField('name')} />
        {errors.name && <p>{errors.name}</p>}
      </div>
    </form>
  );
};

export default SimpleForm;
