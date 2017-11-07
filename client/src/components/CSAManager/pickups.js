import React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
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
import { Row, Col, Card, Title, CardContainer } from '../common';

const PickupForm = () => (
  <Card>

    <Row>
      <Col>
        <TextField floatingLabelText="Pickup Name" hintText="At the farm" />
      </Col>


      <Col>
        <SelectField
          floatingLabelText="Pickup Frequency"
          value=""
          multiple
        >
          <MenuItem value={1} primaryText="Weekly" />
          <MenuItem value={2} primaryText="Bi-Weekly" />
        </SelectField>
      </Col>
    </Row>


    <Row>
      <Col>
        <TimePicker
          floatingLabelText="Start time"
          autoOk
        />
      </Col>
      <Col>
        <TimePicker
          floatingLabelText="End time"
          autoOk
        />
      </Col>
    </Row>

    <Row>
      <TextField floatingLabelText="Address" fullWidth />
    </Row>

    <Row>
      <TextField floatingLabelText="Notes to Customer" fullWidth />
    </Row>

    <RaisedButton label="Save" style={{ margin: '20px 0 10px 0' }} primary fullWidth />
  </Card>
);


const shouldShow = !!window.localStorage.getItem('foo');

const FAB = styled.div`
  display: flex;
  justify-content: center;
`;

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon color={grey500} />
  </IconButton>
);


const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem leftIcon={<Pencil />}>Edit</MenuItem>
    <MenuItem leftIcon={<Trash />}>Delete</MenuItem>
  </IconMenu>
);

const Pickup = () => (
  <CardContainer>
    { shouldShow && <PickupForm /> }

    <Title>Pickup Locations</Title>

    <Divider />
    <List>
      <ListItem
        leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
        primaryText="Atherton Market"
        secondaryText="456 Gingerbread Lane"
        rightIconButton={rightIconMenu}
      />
      <ListItem
        leftAvatar={<Avatar icon={<Location />} backgroundColor="orange" />}
        rightIconButton={rightIconMenu}
        primaryText="The Farm"
        secondaryText="123 Foobar Ave"
      />
    </List>

    <FAB>
      <FloatingActionButton mini >
        <ContentAdd />
      </FloatingActionButton>
    </FAB>
  </CardContainer>
);

export default Pickup;
