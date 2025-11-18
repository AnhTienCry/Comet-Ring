import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Button component
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ onClick, children, disabled = false }: ButtonProps) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

describe('Button Component', () => {
  test('should render button text', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );
    const button = screen.getByText('Click Me');
    
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should handle multiple clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    
    await user.tripleClick(button);
    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});