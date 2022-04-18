import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InfoBlock from "../src/hexa/components/InfoBlock";


export default {
  title: "Components/InfoBlock",
  component: InfoBlock,
} as ComponentMeta<typeof InfoBlock>;;

// export const InviteWidgetPage = () => <InviteWidget />


const Template: ComponentStory<typeof InfoBlock> = (args) => <InfoBlock {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: 'INVITE & SHARE IN REWARDS',
  subTitle: 'Invite Others All Share in UXM Rewards',
  image: 'https://info.theuxm.com/wp-content/uploads/beapart-blueBOX2-150x150.png'
};

