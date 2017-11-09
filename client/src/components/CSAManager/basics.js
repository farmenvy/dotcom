import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { actions as basicsActions } from '../../interactions/CSAbasics';
import { nextStep } from '../../interactions/manageCSA';
// import styled from 'styled-components';
import { Title, CardContainer } from '../common';
import ContinueContainer from '../ContinueContainer';


class Basics extends React.Component {
  componentDidUpdate(prevProps) {
    const { save } = this.props;

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    if (!prevProps.asynchronous && !this.props.asynchronous) {
      this.saveTimeout = setTimeout(save, 500);
    }
  }

  render() {
    return (
      <div>
        <CardContainer>
          <Title>Basic CSA Information</Title>

          <TextField
            floatingLabelText="CSA name"
            onChange={e => this.props.update({ name: e.target.value })}
            value={this.props.name}
          />

          <DatePicker
            floatingLabelText="CSA start"
            autoOk
            value={this.props.startDate}
            onChange={(e, startDate) => this.props.update({ startDate })}
          />

          <DatePicker
            floatingLabelText="CSA end"
            autoOk
            minDate={new Date()}
            value={this.props.endDate}
            onChange={(e, endDate) => this.props.update({ endDate })}
          />

          <SelectField
            floatingLabelText="Pickup Frequency"
            value={this.props.frequency}
            onChange={(e, i, val) => this.props.update({ frequency: val })}
          >
            <MenuItem value="weekly" primaryText="Weekly" />
            <MenuItem value="biweekly" primaryText="Bi-Weekly" />
            <MenuItem value="both" primaryText="Both" />
          </SelectField>
        </CardContainer>

        <div style={{ minHeight: '30px' }}>
          <ContinueContainer
            showIndicator={this.props.changesMadeThisSession}
            inProgress={this.props.asynchronous}
            disabled={!this.props.name}
            continue={this.props.continue}
            buttonComponent={<div />}
          />
        </div>
      </div>
    );
  }
}

Basics.propTypes = ({
  update: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  asynchronous: PropTypes.bool.isRequired,
  changesMadeThisSession: PropTypes.bool.isRequired,
  frequency: PropTypes.string.isRequired,
  startDate: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
  endDate: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
});

const mapStateToProps = state => ({
  ...state.CSAbasics,
  asynchronous: state.asynchronous,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(basicsActions, dispatch),
  continue: nextStep,
});

export default connect(mapStateToProps, mapDispatchToProps)(Basics);
