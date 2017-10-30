import React from 'react';
import AuthTimer from '../AuthTimer';
import SidebarLayout from '../SidebarLayout';

const PrivateView = props => (<AuthTimer><SidebarLayout {...props} /></AuthTimer>);

export default PrivateView;
