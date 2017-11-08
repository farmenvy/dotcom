import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Trash from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { grey500 } from 'material-ui/styles/colors';
import { Row } from '../common';
import ContinueContainer from '../ContinueContainer';

const deleteButtonElement = (
  <IconButton>
    <Trash color={grey500} />
  </IconButton>
);


const styles = {
  margin: '12px 0 12px 0',
  alignItems: 'center',
};

const EditFormNav = props => (
  <Row style={styles}>
    <IconMenu
      iconButtonElement={deleteButtonElement}
    >
      <MenuItem>
        Confirm
      </MenuItem>
    </IconMenu>

    <ContinueContainer
      showIndicator={props.showIndicator}
      inProgress={props.inProgress}
      buttonComponent={
        <RaisedButton
          label="Close"
          primary
          onClick={() => props.actionHandler()}
          disabled={props.disabled}
        />
      }
    />
  </Row>
);

EditFormNav.propTypes = ({
  actionHandler: PropTypes.func,
  showIndicator: PropTypes.bool,
  disabled: PropTypes.bool,
  inProgress: PropTypes.bool,
});

EditFormNav.defaultProps = ({
  actionHandler: (() => {}),
  showIndicator: false,
  disabled: false,
  inProgress: false,
});

export default EditFormNav;
