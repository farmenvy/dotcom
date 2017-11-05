import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { Row, Col } from '../common';

const currentYear = (new Date()).getFullYear();

const Basics = () => (
  <div>
    <Row>
      <TextField
        floatingLabelText="CSA name"
        hintText={`${currentYear} CSA`}
      />
    </Row>

    <Row>
      <Col>
        <DatePicker floatingLabelText="CSA start" />
      </Col>

      <Col>
        <DatePicker floatingLabelText="CSA end" minDate={new Date()} />
      </Col>
    </Row>

    <Row>
      <SelectField
        floatingLabelText="Pickup Frequency"
        value=""
        multiple
      >
        <MenuItem value={1} primaryText="Weekly" />
        <MenuItem value={2} primaryText="Bi-Weekly" />
      </SelectField>
    </Row>
  </div>
);

export default Basics;
