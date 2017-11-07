import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
// import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Location from 'material-ui/svg-icons/communication/location-on';
import Settings from 'material-ui/svg-icons/action/settings';
// import Pencil from 'material-ui/svg-icons/content/create';
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

const ListItemContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Pickup = (props) => {
  const friendlyTime = dateObj => (
    moment(dateObj).format('LT')
  );

  return (
    <div>

      <CardContainer>
        <Title>Pickup Locations</Title>

        <List style={{ paddingBottom: '0', textTransform: 'capitalize' }}>
          {
            props.pickups.map(p => (
              props.editing === p ? (
                <EditPickup key={p.id} >
                  <PickupsForm {...props} />
                </EditPickup>
              ) : (
                <ListItemContainer
                  key={p.id}
                >
                  <ListItem
                    leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
                    primaryText={`${p.name}, ${friendlyTime(p.startTime)} - ${friendlyTime(p.endTime)}`}
                    secondaryText={p.address}
                    rightIcon={<Settings color={grey500} />}
                    onClick={() => props.editPickup(p)}
                  />

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
    name: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  editing: PropTypes.shape({
    name: PropTypes.string,
  }),
  stopEditing: PropTypes.func.isRequired, // eslint-disable-line
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
