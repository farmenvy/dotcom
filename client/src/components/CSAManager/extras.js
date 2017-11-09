import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey500 } from 'material-ui/styles/colors';
import ExtrasForm from '../ExtrasForm';
import { actions } from '../../interactions/CSAextras';
import { nextStep } from '../../interactions/manageCSA';

import InboxLayout from '../InboxLayout';

const primaryText = item => (
  `${item.name}, $${item.cost}`
);

const secondaryText = item => (item.description);

class Extras extends React.Component {
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
    const items = this.props.extras;

    return (
      <InboxLayout
        title="Extra Types"
        items={items}
        leftAvatar={<Avatar icon={<Cart />} backgroundColor="#AAAEB3" />}
        buildPrimaryText={primaryText}
        buildSecondaryText={secondaryText}
        disabled={this.props.asynchronous}
        rightIcon={<Settings color={grey500} />}
        edit={this.props.editExtra}
        update={this.props.updateExtra}
        create={this.props.createExtra}
        editing={this.props.editing}
        continue={this.props.continue}
        close={this.props.stopEditing}
        form={ExtrasForm}
        accentColor="#AAAEB3"
        asynchronous={this.props.asynchronous}
        showIndicator={this.props.dirty || this.props.saved}
        inProgress={this.props.dirty}
        showButton
      />
    );
  }
}

Extras.propTypes = ({
  extras: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  asynchronous: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  createExtra: PropTypes.func.isRequired,
  editExtra: PropTypes.func.isRequired,
  editing: PropTypes.shape({}),
  continue: PropTypes.func.isRequired,
  updateExtra: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
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
    ...actions,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Extras);
