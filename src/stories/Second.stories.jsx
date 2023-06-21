import { Meta } from "@storybook/react";
import React from "react";

export const Second = () => {
    return <div>Hello world</div>
}

export default {
  component: Second,
  title: 'Components/Second',
} as Meta;

export const SomeNameYouLike2 = () => <Second/>;
export const AnotherNameYouLike2 = () => <Second/>;
export const SomeOtherNameYouLike2 = () => <Second/>;
