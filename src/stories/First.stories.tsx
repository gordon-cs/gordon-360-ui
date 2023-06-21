import { Meta } from "@storybook/react";
import React from "react";

export const First = () => {
    return <div>Hello world</div>
}

export default {
    component: First,
    title: 'Components/First',
} as Meta;

export const SomeNameYouLike: React.FC = () => <First/>;
export const AnotherNameYouLike: React.FC = () => <First/>;
export const SomeOtherNameYouLike: React.FC = () => <First/>;
