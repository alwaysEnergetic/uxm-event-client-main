import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InviteWidget from "../src/components/organisms/InviteWidget/InviteWidget";


export default {
  title: "Pages/Invite",
  component: InviteWidget,
} as ComponentMeta<typeof InviteWidget>;;

// export const InviteWidgetPage = () => <InviteWidget />


const Template: ComponentStory<typeof InviteWidget> = (args) => <InviteWidget {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: 'Button',
};

