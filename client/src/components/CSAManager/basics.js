import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { MuiThemeProvider } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Row, Col } from '../common';

const muiTheme = getMuiTheme({
  fontFamily: "'Open Sans', sans-serif",
  palette: {
    primary1Color: '#3EB989',
    primary2Color: '#3EB989',
    accent1Color: '#3EB989',
    pickerHeaderColor: '#33658A',
  },
  appBar: {
    height: 50,
  },
});

const Basics = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
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
  </MuiThemeProvider>
);

export default Basics;
