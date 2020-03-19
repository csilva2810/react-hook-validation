import React, { useState } from 'react';

const SimpleForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = e => e.preventDefault();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SimpleForm;
