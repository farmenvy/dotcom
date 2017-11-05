import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { Row, Col } from '../common';

const Foo = styled.button`
  height: 45px;
  width: 100%;
  border-radius: 4px;
  background-color: rgba(241, 245, 241, 0.25);
  border: solid 1px #e5f0e7;
  outline: none;

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

  &:hover {
    border: solid 2px ${props => props.theme.grey1};
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
