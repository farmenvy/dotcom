import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { Row, Col } from '../common';

const Basics = () => (
  <div>
    <Row>
      <TextField
        floatingLabelText="CSA name"
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
      <TextField
        hintText="Password Field"
        floatingLabelText="Password"
        type="password"
      />

      <SelectField
        floatingLabelText="Frequency"
        value="2"
        multiple
      >
        <MenuItem value={1} primaryText="Never" />
        <MenuItem value={2} primaryText="Every Night" />
        <MenuItem value={3} primaryText="Weeknights" />
        <MenuItem value={4} primaryText="Weekends" />
        <MenuItem value={5} primaryText="Weekly" />
      </SelectField>
    </Row>
  </div>
);

export default Basics;
