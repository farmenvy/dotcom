import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import { nextStep } from '../../interactions/manageCSA';
import { update } from '../../interactions/CSAmembers';
import { Title, CardContainer } from '../common';
import ContinueContainer from '../ContinueContainer';

const Members = props => (
  <div>
    <CardContainer>
      <Title>Memberships</Title>
      <div style={{ display: 'flex' }}>
        <TextField
          floatingLabelText="Joining Fee"
          type="number"
          step=".50"
          style={{ marginRight: '20px' }}
          onChange={e => props.update({ fee: Number(e.target.value) })}
          value={props.fee ? props.fee.toString() : ''}
        />
        <Slider
          min={0}
          max={200}
          style={{ margin: '30px 0 0 30px', width: '75%' }}
          value={props.fee}
          step={1}
          onChange={(e, val) => props.update({ fee: val })}
        />
      </div>
    </CardContainer>

    <div style={{ minHeight: '30px' }}>
      <ContinueContainer
        inProgress={props.asynchronous}
        continue={props.continue}
        buttonComponent={<div />}
      />
    </div>
  </div>
);

Members.propTypes = ({
  continue: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  fee: PropTypes.number.isRequired,
  asynchronous: PropTypes.bool.isRequired,
});

const mapStateToProps = state => ({
  ...state.CSAmembers,
  asynchronous: state.asynchronous,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    update,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
