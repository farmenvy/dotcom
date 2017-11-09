import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import Basket from 'material-ui/svg-icons/action/shopping-basket';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey500 } from 'material-ui/styles/colors';
import BagsForm from '../BagsForm';
import { createBag, editBag, updateBag, stopEditing } from '../../interactions/CSAbags';
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
      leftAvatar={<Avatar icon={<Basket />} backgroundColor="#389872" />}
      buildPrimaryText={primaryText}
      buildSecondaryText={secondaryText}
      disabled={props.asynchronous}
      rightIcon={<Settings color={grey500} />}
      edit={props.editBag}
      update={props.updateBag}
      create={props.createBag}
      editing={props.editing}
      continue={props.continue}
      close={props.stopEditing}
      form={BagsForm}
      accentColor="#389872"
      asynchronous={props.asynchronous}
      showIndicator={props.changesMadeThisSession}
      showButton
    />
  );
};

Bags.propTypes = ({
  bags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  asynchronous: PropTypes.bool.isRequired,
  changesMadeThisSession: PropTypes.bool.isRequired,
  createBag: PropTypes.func.isRequired,
  editBag: PropTypes.func.isRequired,
  editing: PropTypes.shape({}),
  continue: PropTypes.func.isRequired,
  updateBag: PropTypes.func.isRequired,
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
    createBag,
    editBag,
    stopEditing,
    updateBag,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bags);
