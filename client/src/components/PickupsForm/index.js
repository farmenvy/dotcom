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

const deleteButtonElement = (
  <IconButton>
    <Trash color={grey500} />
  </IconButton>
);

const PickupsForm = props => (
  <div>
    <Row>
      <Col>
        <TextField
          floatingLabelText="Pickup Name"
          hintText="At the farm"
          onChange={e => props.updatePickup({ name: e.target.value })}
          value={props.editing.name}
        />
        <SelectField
          floatingLabelText="Pickup Frequency"
          style={{ display: 'block' }}
          multiple
        >
          <MenuItem value={1} primaryText="Weekly" />
          <MenuItem value={2} primaryText="Bi-Weekly" />
        </SelectField>

        <TimePicker
          floatingLabelText="Start time"
          autoOk
        />
        <TimePicker
          floatingLabelText="End time"
          autoOk
        />
      </Col>

      <Col>
        <TextField floatingLabelText="Address" fullWidth />

        <TextField floatingLabelText="Notes to Customer" fullWidth />
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

      <RaisedButton label="Save and Close" style={{ alignSelf: 'flex-end' }} primary />
    </Row>
  </div>
);

PickupsForm.propTypes = ({
  editing: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  updatePickup: PropTypes.func.isRequired,
});

PickupsForm.defaultProps = ({
  editing: {},
});

export default PickupsForm;
