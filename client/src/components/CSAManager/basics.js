import React from 'react';
import { Input, Row, Col } from '../common';

const Basics = () => (
  <div>
    <Row>
      <Input
        type="text"
        title="Name of this CSA"
        value="Spring 2018"
        error="this field is required"
        readOnly
      />
    </Row>

    <Row>
      <Col>
        <Input
          type="text"
          title="When does this CSA begin?"
          value="Spring 2018"
          readOnly
        />
      </Col>

      <Col>
        <Input
          type="text"
          title="When does this CSA begin?"
          value="Spring 2018"
          readOnly
        />
      </Col>
    </Row>

    <Row>
      <Input
        type="text"
        title="Does this CSA offer weekly, biweekly, or both?"
        value="Spring 2018"
        readOnly
      />
    </Row>
  </div>
);

export default Basics;
