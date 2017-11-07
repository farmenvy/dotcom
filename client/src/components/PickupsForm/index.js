import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Trash from 'material-ui/svg-icons/action/delete';
import { grey500 } from 'material-ui/styles/colors';
import { Row, Col } from '../common';
import ContinueContainer from '../ContinueContainer';

const deleteButtonElement = (
  <IconButton>
    <Trash color={grey500} />
  </IconButton>
);

const SaveAndClose = props => (
  <RaisedButton
    label="Close"
    style={{ alignSelf: 'flex-end' }}
    primary
    onClick={() => props.stopEditing()}
    disabled={props.disabled}
  />
);

SaveAndClose.propTypes = ({
  stopEditing: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
});

SaveAndClose.defaultProps = ({
  disabled: false,
});

const PickupsForm = props => (
  <div>
    <Row>
      <Col>
        <TextField
          id="pickupname"
          floatingLabelText="Pickup Name"
          hintText="At the farm"
          onChange={e => props.updatePickup({ name: e.target.value })}
          value={props.editing.name}
        />
        <SelectField
          floatingLabelText="Pickup Frequency"
          style={{ display: 'block' }}
          onChange={(e, i, val) => props.updatePickup({ frequency: val })}
          value={props.editing.frequency}
        >
          <MenuItem value="weekly" primaryText="Weekly" />
          <MenuItem value="biweekly" primaryText="Bi-Weekly" />
        </SelectField>

        <TimePicker
          floatingLabelText="Start time"
          autoOk
          onChange={(e, time) => props.updatePickup({ startTime: time })}
          value={props.editing.startTime}
        />
        <TimePicker
          floatingLabelText="End time"
          autoOk
          onChange={(e, time) => props.updatePickup({ endTime: time })}
          value={props.editing.endTime}
        />
      </Col>

      <Col>
        <TextField
          floatingLabelText="Address"
          fullWidth
          value={props.editing.address}
          onChange={e => props.updatePickup({ address: e.target.value })}
        />

        <TextField
          floatingLabelText="Notes to Customer"
          fullWidth
          multiLine
          rows={2}
          onChange={e => props.updatePickup({ notes: e.target.value })}
          value={props.editing.notes}
        />
      </Col>


    </Row>
    <Row style={{ marginTop: '12px' }}>
      <IconMenu
        iconButtonElement={deleteButtonElement}
      >
        <MenuItem>
          Confirm
        </MenuItem>
      </IconMenu>

      <ContinueContainer
        showIndicator={!!props.editing.id}
        inProgress={props.asynchronous}
        buttonComponent={
          <SaveAndClose
            stopEditing={props.stopEditing}
            disabled={!props.editing.name || props.asynchronous}
          />
        }
      />

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
  updatePickup: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
  asynchronous: PropTypes.bool,
});

PickupsForm.defaultProps = ({
  editing: {},
  startTime: {},
  endTime: {},
  asynchronous: false,
});

export default PickupsForm;
