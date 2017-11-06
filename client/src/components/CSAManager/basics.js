import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';

// window.saved = true;

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
  margin-right: 24px;
  text-transform: uppercase;
`;

const CardContainer = styled.div`
  margin: 20px;
`;


const Basics = props => (
  <div>
    <CardContainer>
      <Title>Basic CSA Information</Title>

      <TextField
        floatingLabelText="CSA name"
        onChange={e => props.updateCSAName(e.target.value)}
        value={props.name}
      />

      <DatePicker
        floatingLabelText="CSA start"
        autoOk
        value={props.startDate}
        onChange={(e, date) => props.updateCSAStartDate(date)}
      />

      <DatePicker
        floatingLabelText="CSA end"
        autoOk
        minDate={new Date()}
        value={props.endDate}
        onChange={(e, date) => props.updateCSAEndDate(date)}
      />

      <SelectField
        floatingLabelText="Pickup Frequency"
        value={props.frequency}
        onChange={(e, i, val) => props.updateCSAFreq(val)}
      >
        <MenuItem value="weekly" primaryText="Weekly" />
        <MenuItem value="biweekly" primaryText="Bi-Weekly" />
        <MenuItem value="both" primaryText="Both" />
      </SelectField>
    </CardContainer>

    <ButtonContainer>
      <SavedMessage>
        { window.saved ? (
          <span>All Changes Saved <Glyphicon glyph="ok" /></span>
        ) : (
          <CircularProgress size={24} thickness={2} color="orange" />
        )}
      </SavedMessage>


      <FlatButton
        label="Continue"
        primary
      />
    </ButtonContainer>

  </div>
);

Basics.propTypes = ({
  updateCSAName: PropTypes.func.isRequired,
  updateCSAStartDate: PropTypes.func.isRequired,
  updateCSAEndDate: PropTypes.func.isRequired,
  updateCSAFreq: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  frequency: PropTypes.string.isRequired,
  startDate: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
  endDate: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
});

export default Basics;
