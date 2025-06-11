import { render, screen } from '@testing-library/react';
import { ChatMessageCard } from '../components/ChatMessageCard';

describe('ChatMessageCard', () => {
  it('shows content', () => {
    render(<ChatMessageCard role="user" content="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
}); 