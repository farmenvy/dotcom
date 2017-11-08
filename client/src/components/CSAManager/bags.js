import React from 'react';
import PropTypes from 'prop-types';
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

const primaryText = item => (
  `${item.name}, $${item.cost}`
);

const secondaryText = item => (item.description);

const Bags = (props) => {
  const items = props.bags;

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
      asynchronous={props.asynchronous}
    />
  );
};

Bags.propTypes = ({
  bags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  asynchronous: PropTypes.bool.isRequired,
  createPickup: PropTypes.func.isRequired,
  editPickup: PropTypes.func.isRequired,
  editing: PropTypes.shape({}),
  continue: PropTypes.func.isRequired,
  updatePickup: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
});

Bags.defaultProps = ({
  editing: null,
});

const mapStateToProps = state => ({
  ...state.CSAbags,
  asynchronous: state.asynchronous,
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

export default connect(mapStateToProps, mapDispatchToProps)(Bags);
