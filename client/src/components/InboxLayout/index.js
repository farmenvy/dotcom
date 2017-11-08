import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { List, ListItem } from 'material-ui/List';
// import Pencil from 'material-ui/svg-icons/content/create';
import { Title, CardContainer } from '../common';
import ContinueContainer from '../ContinueContainer';
import EditFormNav from '../EditFormNav';

const EditItem = styled.div`
  width: 107%;
  background-color: #fff;
  margin-left: -3.5%;
  padding: 0 20px 0px 20px;
  border-radius: 2px;
  border-left: ${props => props.accentColor} solid 3px;
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
  const { form: FormComponent } = props;

  return (
    <div>

      <CardContainer>
        <Title>{props.title}</Title>

        <List style={{ paddingBottom: '0', textTransform: 'capitalize' }}>
          {
            props.items.map(item => (
              props.editing === item ? (
                <EditItem key={item.id} accentColor={props.accentColor} >
                  <FormComponent {...props} />
                  <div>
                    <EditFormNav
                      actionHandler={props.close}
                      showIndicator
                      inProgress={props.asynchronous}
                    />
                  </div>
                </EditItem>
              ) : (
                <ListItemContainer
                  key={item.id}
                >
                  <ListItem
                    leftAvatar={props.leftAvatar}
                    primaryText={props.buildPrimaryText(item)}
                    secondaryText={props.buildSecondaryText(item)}
                    rightIcon={props.rightIcon}
                    onClick={() => props.edit(item)}
                    disabled={props.disabled}
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
            <FloatingActionButton mini onClick={() => props.create()}>
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
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  leftAvatar: PropTypes.node.isRequired,
  rightIcon: PropTypes.node.isRequired,
  editing: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  disabled: PropTypes.bool.isRequired,
  continue: PropTypes.func.isRequired,
  buildPrimaryText: PropTypes.func.isRequired,
  buildSecondaryText: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired, // eslint-disable-line
  create: PropTypes.func.isRequired,
  form: PropTypes.func.isRequired,
  accentColor: PropTypes.string,
  close: PropTypes.func.isRequired,
  asynchronous: PropTypes.bool,
});

InboxLayout.defaultProps = ({
  editing: null,
  accentColor: 'orange',
  asynchronous: false,
});


export default InboxLayout;
