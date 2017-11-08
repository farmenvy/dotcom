import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import { Row, Col } from '../common';

const PickupsForm = props => (
  <div>
    <Row>
      <Col>
        <TextField
          id="pickupname"
          floatingLabelText="Pickup Name"
          hintText="At the farm"
          onChange={e => props.update({ name: e.target.value })}
          value={props.editing.name}
        />
        <SelectField
          floatingLabelText="Pickup Frequency"
          style={{ display: 'block' }}
          onChange={(e, i, val) => props.update({ frequency: val })}
          value={props.editing.frequency}
        >
          <MenuItem value="weekly" primaryText="Weekly" />
          <MenuItem value="biweekly" primaryText="Bi-Weekly" />
        </SelectField>

        <TimePicker
          floatingLabelText="Start time"
          autoOk
          onChange={(e, time) => props.update({ startTime: time })}
          value={props.editing.startTime}
        />
        <TimePicker
          floatingLabelText="End time"
          autoOk
          onChange={(e, time) => props.update({ endTime: time })}
          value={props.editing.endTime}
        />
      </Col>

      <Col>
        <TextField
          floatingLabelText="Address"
          fullWidth
          value={props.editing.address}
          onChange={e => props.update({ address: e.target.value })}
        />

        <TextField
          floatingLabelText="Notes to Customer"
          fullWidth
          multiLine
          rows={2}
          onChange={e => props.update({ notes: e.target.value })}
          value={props.editing.notes}
        />
      </Col>
    </Row>
  </div>
);

PickupsForm.propTypes = ({
  editing: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
    address: PropTypes.string,
    frequency: PropTypes.string,
    notes: PropTypes.string,
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
  }),
  update: PropTypes.func.isRequired,
});

PickupsForm.defaultProps = ({
  editing: {},
  startTime: {},
  endTime: {},
  asynchronous: false,
});

export default PickupsForm;
