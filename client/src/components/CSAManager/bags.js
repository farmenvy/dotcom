import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import Basket from 'material-ui/svg-icons/action/shopping-basket';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey500 } from 'material-ui/styles/colors';
import PickupsForm from '../PickupsForm';
import { createPickup, editPickup, updatePickup, stopEditing } from '../../interactions/CSApickups';
import { nextStep } from '../../interactions/manageCSA';

import InboxLayout from '../InboxLayout';

const friendlyTime = dateObj => (
  moment(dateObj).format('LT')
);

const primaryText = item => (
  `${item.name}, ${friendlyTime(item.startTime)} - ${friendlyTime(item.endTime)}`
);

const secondaryText = item => (item.address);

const Pickup = (props) => {
  const items = props.pickups;

  return (
    <InboxLayout
      title="Bag Types"
      items={items}
      leftAvatar={<Avatar icon={<Basket />} backgroundColor="#AAAEB3" />}
      buildPrimaryText={primaryText}
      buildSecondaryText={secondaryText}
      disabled={props.asynchronous}
      rightIcon={<Settings color={grey500} />}
      edit={props.editPickup}
      update={props.updatePickup}
      create={props.createPickup}
      editing={props.editing}
      continue={props.continue}
      close={props.stopEditing}
      form={PickupsForm}
      accentColor="#AAAEB3"
    />
  );
};

Pickup.propTypes = ({
  pickups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  asynchronous: PropTypes.bool.isRequired,
  createPickup: PropTypes.func.isRequired,
  editPickup: PropTypes.func.isRequired,
  editing: PropTypes.shape({}),
  continue: PropTypes.func.isRequired,
  updatePickup: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
});

Pickup.defaultProps = ({
  editing: null,
});

const mapStateToProps = state => ({
  ...state.CSApickups,
  asynchronous: state.async,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    createPickup,
    editPickup,
    stopEditing,
    updatePickup,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pickup);
