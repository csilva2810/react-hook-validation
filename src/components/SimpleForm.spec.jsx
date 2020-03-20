import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SimpleForm from './SimpleForm';

describe('<SimpleForm />', () => {
  it('should render a name input', () => {
    const { getByLabelText } = render(<SimpleForm />);

    const nameInput = getByLabelText('name');

    expect(nameInput).toBeInTheDocument();
  });

  it('should render an error message', async () => {
    const { getByLabelText, findByText } = render(<SimpleForm />);

    const nameInput = getByLabelText('name');

    fireEvent.change(nameInput, {
      target: { value: 'ab' }
    });

    expect(nameInput).toHaveValue('ab');

    const error = await findByText('invalid name');

    expect(error).toBeInTheDocument();
  });
});
