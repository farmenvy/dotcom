import React from 'react';
import styled from 'styled-components';

const Foo = styled.button`
  height: 45px;
  width: 100%;
  background-color: #fafafa;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.24);
  border: none;


  &:before {
    content: '+';
    margin-right: 8px;
    display: inline-block;
    width: 18px;
    height: 18px;
    font-size: 12px;
    font-weight: bold;
    background-color: rgba(51, 152, 113, 0.15);
    color: #379f77;
    border: solid 1px #379f77;
    border-radius: 100%;
  }
`;

const Pickup = () => (
  <div>
    <Foo>
      Create New Pickup Location
    </Foo>
  </div>
);

export default Pickup;
