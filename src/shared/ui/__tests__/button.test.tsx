import { render, screen } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Hej</Button>);
    expect(screen.getByRole('button', { name: 'Hej' })).toBeInTheDocument();
  });
}); 