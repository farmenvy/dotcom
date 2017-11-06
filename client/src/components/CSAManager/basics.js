import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';

const Title = styled.h2`
  font-size: 24px;
  padding-top: 16px;
  margin-bottom: 12px;
  font-weight: 400px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

const SavedMessage = styled.div`
  align-self: center;
  color: green;
  margin-right: 20px;
`;

const Basics = () => (
  <div>
    <Title>Basic CSA Information</Title>

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

    <ButtonContainer>
      <SavedMessage>
        All Changes Saved <Glyphicon glyph="ok" />
      </SavedMessage>

      <RaisedButton
        label="Continue"
        primary
      />
    </ButtonContainer>

  </div>
);

export default Basics;
