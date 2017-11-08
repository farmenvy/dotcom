import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey500 } from 'material-ui/styles/colors';
import ExtrasForm from '../ExtrasForm';
import { createExtra, editExtra, updateExtra, stopEditing } from '../../interactions/CSAextras';
import { nextStep } from '../../interactions/manageCSA';

import InboxLayout from '../InboxLayout';

const primaryText = item => (
  `${item.name}, $${item.cost}`
);

const secondaryText = item => (item.description);

const Extras = (props) => {
  const items = props.extras;

  return (
    <InboxLayout
      title="Extra Types"
      items={items}
      leftAvatar={<Avatar icon={<Cart />} backgroundColor="#AAAEB3" />}
      buildPrimaryText={primaryText}
      buildSecondaryText={secondaryText}
      disabled={props.asynchronous}
      rightIcon={<Settings color={grey500} />}
      edit={props.editExtra}
      update={props.updateExtra}
      create={props.createExtra}
      editing={props.editing}
      continue={props.continue}
      close={props.stopEditing}
      form={ExtrasForm}
      accentColor="#AAAEB3"
      asynchronous={props.asynchronous}
    />
  );
};

Extras.propTypes = ({
  extras: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  asynchronous: PropTypes.bool.isRequired,
  createExtra: PropTypes.func.isRequired,
  editExtra: PropTypes.func.isRequired,
  editing: PropTypes.shape({}),
  continue: PropTypes.func.isRequired,
  updateExtra: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
});

Extras.defaultProps = ({
  editing: null,
});

const mapStateToProps = state => ({
  ...state.CSAextras,
  asynchronous: state.asynchronous,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    createExtra,
    editExtra,
    stopEditing,
    updateExtra,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Extras);
