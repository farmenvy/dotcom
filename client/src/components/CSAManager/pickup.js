import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { Row, Col } from '../common';

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

const Action = Col.extend`
  flex: none;
  margin-left: auto;
  width: 200px;
  height: 50px;
`;


const Pickup = props => (
  <div>
    <Foo onClick={() => props.openModal()}>
      Create New Pickup Location
    </Foo>

    <Modal {...props} >
      <Row>
        <Col>1</Col>
        <Col>2</Col>
      </Row>
      <Row>
        <Col>3</Col>
      </Row>

      <Row>
        <Action>3</Action>
      </Row>
    </Modal>
  </div>
);

Pickup.propTypes = ({
  openModal: PropTypes.func.isRequired,
});

export default Pickup;
