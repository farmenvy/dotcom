import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import Basket from 'material-ui/svg-icons/action/shopping-basket';
import Settings from 'material-ui/svg-icons/action/settings';
import { grey500 } from 'material-ui/styles/colors';
import BagsForm from '../BagsForm';
import { actions } from '../../interactions/CSAbags';
import { nextStep } from '../../interactions/manageCSA';

import InboxLayout from '../InboxLayout';

const primaryText = item => (
  `${item.name}, $${item.cost}`
);

const secondaryText = item => (item.description);

class Bags extends React.Component {
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
    const items = this.props.bags;

    return (
      <InboxLayout
        title="Bag Types"
        items={items}
        leftAvatar={<Avatar icon={<Basket />} backgroundColor="#389872" />}
        buildPrimaryText={primaryText}
        buildSecondaryText={secondaryText}
        disabled={this.props.asynchronous}
        rightIcon={<Settings color={grey500} />}
        edit={this.props.editBag}
        update={this.props.updateBag}
        create={this.props.createBag}
        editing={this.props.editing}
        continue={this.props.continue}
        close={this.props.stopEditing}
        form={BagsForm}
        accentColor="#389872"
        asynchronous={this.props.asynchronous}
        showIndicator={this.props.changesMadeThisSession}
        showButton
      />
    );
  }
}

Bags.propTypes = ({
  bags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  asynchronous: PropTypes.bool.isRequired,
  changesMadeThisSession: PropTypes.bool.isRequired,
  createBag: PropTypes.func.isRequired,
  editBag: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
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
    ...actions,
    continue: nextStep,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bags);
