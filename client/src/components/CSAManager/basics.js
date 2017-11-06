import React from 'react';
import SelectField from 'material-ui/SelectField';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

const Basics = () => (
  <div>
    <TextField
      floatingLabelText="CSA name"
    />

    <DatePicker floatingLabelText="CSA start" />

    <DatePicker floatingLabelText="CSA end" minDate={new Date()} />

    <SelectField
      floatingLabelText="Pickup Frequency"
      value=""
      multiple
    >
      <MenuItem value={1} primaryText="Weekly" />
      <MenuItem value={2} primaryText="Bi-Weekly" />
    </SelectField>

    <Snackbar
      open
      action="Undo"
      message="Your changes have been saved"
      autoHideDuration={4000}
    />
  </div>
);

export default Basics;
