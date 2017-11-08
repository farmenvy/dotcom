import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
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
import ContinueContainer from '../ContinueContainer';

const EditItem = styled.div`
  width: 107%;
  background-color: #fff;
  margin-left: -3.5%;
  padding: 0 20px 0px 20px;
  border-radius: 2px;
  border-left: rgba(254, 166, 37, 0.8) solid 3px;
  box-shadow: 0 -2px 6px rgba(0,0,0,.16), 0 6px 12px rgba(0,0,0,.32);
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

const InboxLayout = (props) => {
  const friendlyTime = dateObj => (
    moment(dateObj).format('LT')
  );

  return (
    <div>

      <CardContainer>
        <Title>Pickup Locations</Title>

        <List style={{ paddingBottom: '0', textTransform: 'capitalize' }}>
          {
            props.items.map(item => (
              props.editing === item ? (
                <EditItem key={item.id} >
                  <PickupsForm {...props} />
                </EditItem>
              ) : (
                <ListItemContainer
                  key={item.id}
                >
                  <ListItem
                    leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
                    primaryText={`${item.name}, ${friendlyTime(item.startTime)} - ${friendlyTime(item.endTime)}`}
                    secondaryText={item.address}
                    rightIcon={<Settings color={grey500} />}
                    onClick={() => props.editPickup(item)}
                    disabled={props.asynchronous}
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

      <ContinueContainer
        continue={props.continue}
      />

    </div>
  );
};

InboxLayout.propTypes = ({
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  editing: PropTypes.shape({
    name: PropTypes.string,
  }),
  asynchronous: PropTypes.bool.isRequired,
  continue: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired, // eslint-disable-line
  createPickup: PropTypes.func.isRequired,
  editPickup: PropTypes.func.isRequired, // eslint-disable-line
});

InboxLayout.defaultProps = ({
  editing: null,
});


export default InboxLayout;
