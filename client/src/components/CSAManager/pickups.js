import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import Location from 'material-ui/svg-icons/communication/location-on';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey500 } from 'material-ui/styles/colors';
import PickupsForm from '../PickupsForm';
import { actions } from '../../interactions/CSApickups';
import { nextStep } from '../../interactions/manageCSA';

import InboxLayout from '../InboxLayout';

const friendlyTime = dateObj => (
  moment(dateObj).format('LT')
);

const primaryText = item => (
  `${item.name}, ${friendlyTime(item.startTime)} - ${friendlyTime(item.endTime)}`
);

const secondaryText = item => (item.address);

class Pickups extends React.Component {
  componentDidUpdate(prevProps) {
    const { save } = this.props;
    const clickedEdit = !!(!prevProps.editing && this.props.editing);
    const clickedClose = !!(prevProps.editing && !this.props.editing);
    const isAsync = (!prevProps.asynchronous && !this.props.asynchronous);

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    if (!clickedEdit && !clickedClose && isAsync) {
      this.saveTimeout = setTimeout(save, 250);
    }
  }

  render() {
    const items = this.props.pickups;

    return (
      <InboxLayout
        title="Pickup Locations"
        items={items}
        leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
        buildPrimaryText={primaryText}
        buildSecondaryText={secondaryText}
        rightIcon={<Settings color={grey500} />}
        edit={this.props.editPickup}
        update={this.props.updatePickup}
        create={this.props.createPickup}
        editing={this.props.editing}
        continue={this.props.continue}
        close={this.props.stopEditing}
        form={PickupsForm}
        accentColor="orange"
        asynchronous={this.props.asynchronous}
        showIndicator={this.props.dirty || this.props.saved}
        inProgress={this.props.dirty}
        showButton
      />
    );
  }
}

Pickups.propTypes = ({
  pickups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  asynchronous: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  createPickup: PropTypes.func.isRequired,
  editPickup: PropTypes.func.isRequired,
  editing: PropTypes.shape({}),
  continue: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  updatePickup: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
});

Pickups.defaultProps = ({
  editing: null,
});

const mapStateToProps = state => ({
  ...state.CSApickups,
  asynchronous: state.asynchronous,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...actions,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pickups);
