import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';

describe('Thumbnail', () => {
  it('Displays Thumbnail', () => {
    render(
      <Router>
        <Thumbnail itemId="coffee" title="Coffee" image={itemImages.coffee} />
      </Router>,
    );
    screen.getByText(/Coffee/i);
    screen.getByAltText(/Coffee/i);
  });
});
