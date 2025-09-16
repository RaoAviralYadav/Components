import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "Helper message here",
    variant: "outlined",
    size: "md",
  },
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    invalid: true,
    errorMessage: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input",
  },
};
