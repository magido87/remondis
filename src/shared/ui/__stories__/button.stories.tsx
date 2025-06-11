import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';

const meta: Meta<typeof Button> = {
  component: Button,
  args: { children: 'Click me' },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } }; 