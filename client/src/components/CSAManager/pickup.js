import React from 'react';
import styled from 'styled-components';

const Foo = styled.button`
  height: 45px;
  width: 100%;
  border-radius: 4px;
  background-color: rgba(241, 245, 241, 0.25);
  border: solid 1px #e5f0e7;
  outline: none;
`;

const Pickup = () => (
  <Foo>Create New Pickup Location</Foo>
);

export default Pickup;
