import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
// import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Location from 'material-ui/svg-icons/communication/location-on';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Trash from 'material-ui/svg-icons/action/delete';
import Pencil from 'material-ui/svg-icons/content/create';
import { grey500 } from 'material-ui/styles/colors';
import { Title, CardContainer } from '../common';
import PickupsForm from '../PickupsForm';
import { createPickup, editPickup, updatePickup, stopEditing } from '../../interactions/CSApickups';

const EditPickup = styled.div`
  width: 106%;
  background-color: #fff;
  margin-left: -3%;
  padding: 0 20px 20px 20px;
  border-radius: 2px;
  box-shadow: 0 0 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32)
`;


const FAB = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon color={grey500} />
  </IconButton>
);

const ListItemContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Pickup = (props) => {
  const rightIconMenu = (
    <IconMenu
      iconButtonElement={iconButtonElement}
      onClick={() => (props.editing && props.stopEditing())}
    >
      <MenuItem leftIcon={<Pencil />}>Edit</MenuItem>
      <MenuItem leftIcon={<Trash />}>Delete</MenuItem>
    </IconMenu>
  );


  const isEditing = !!props.editing;

  return (
    <div>

      <CardContainer>
        <Title>Pickup Locations</Title>

        <List style={{ paddingBottom: '0' }}>
          {
            props.pickups.map((p, i) => (
              props.editing === p ? (
                <EditPickup key={p.id} >
                  <PickupsForm {...props} />
                </EditPickup>
              ) : (
                <ListItemContainer
                  key={p.id}
                  onClick={() => (isEditing && props.stopEditing())}
                >
                  <ListItem
                    leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
                    primaryText={p.name}
                    secondaryText={p.address}
                    rightIconButton={rightIconMenu}
                    disabled={isEditing}
                    onClick={() => (isEditing ? props.stopEditing() : props.editPickup(p))}
                  />

                  { props.pickups.length - 1 !== i && (<Divider inset />) }
                </ListItemContainer>
              )
            ))
          }

        </List>
      </CardContainer>

      {
        !props.editing && (
          <FAB>
            <FloatingActionButton mini onClick={() => props.createPickup()}>
              <ContentAdd />
            </FloatingActionButton>
          </FAB>
        )
      }
    </div>
  );
};

Pickup.propTypes = ({
  pickups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  })).isRequired,
  editing: PropTypes.shape({
    name: PropTypes.string,
  }),
  stopEditing: PropTypes.func.isRequired,
  createPickup: PropTypes.func.isRequired,
  editPickup: PropTypes.func.isRequired, // eslint-disable-line
});

Pickup.defaultProps = ({
  editing: null,
});


const mapStateToProps = state => ({
  ...state.CSApickups,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    createPickup,
    editPickup,
    stopEditing,
    updatePickup,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pickup);
