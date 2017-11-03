import React from 'react';
import { Input } from '../common';

const Basics = () => (
  <Input
    type="text"
    title="Name of this CSA"
    value="Spring 2018"
    error="this field is required"
    readOnly
  />
);

export default Basics;
