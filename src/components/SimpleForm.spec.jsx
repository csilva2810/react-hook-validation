import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SimpleForm from './SimpleForm';

describe('<SimpleForm />', () => {
  it('should render a name input', () => {
    const { getByLabelText } = render(<SimpleForm />);

    const nameInput = getByLabelText('name');

    expect(nameInput).toBeInTheDocument();
  });
});
