import type { Meta, StoryObj } from '@storybook/react';

import { GameProgress } from '../GameProgress';

const meta: Meta<typeof GameProgress> = {
  component: GameProgress,
};

export default meta;
type Story = StoryObj<typeof GameProgress>;

export const Default: Story = {};
