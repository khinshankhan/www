import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./divider";

const meta: Meta<typeof Divider> = {
  title: "Primitives/Divider",
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: undefined,
    lineClassName: "",
  },
};
