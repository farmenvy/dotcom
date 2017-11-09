import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Row } from '../common';

const ExtrasForm = props => (
  <div>
    <Row>
      <TextField
        floatingLabelText="Extra Name"
        hintText="Standard"
        value={props.editing.name}
        onChange={e => props.update({ name: e.target.value })}
      />
    </Row>

    <Row>
      <TextField
        floatingLabelText="Description"
        value={props.editing.description}
        onChange={e => props.update({ description: e.target.value })}
      />
    </Row>

    <Row>
      <TextField
        floatingLabelText="Cost Per Extra"
        type="number"
        value={props.editing.cost ? props.editing.cost.toString() : ''}
        onChange={e => props.update({ cost: Number(e.target.value) })}

      />
    </Row>
  </div>
);

ExtrasForm.propTypes = ({
  editing: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
  }),
  update: PropTypes.func.isRequired,
});

ExtrasForm.defaultProps = ({
  editing: {},
  startTime: {},
  endTime: {},
  asynchronous: false,
});

export default ExtrasForm;
