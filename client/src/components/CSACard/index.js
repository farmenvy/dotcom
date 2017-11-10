import React from 'react';
// import styled from 'styled-components';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  Card,
  CardActions,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';

const data = [
  { id: 1, name: 'Some Crazy Super Duper Really Long Name', sold: 20, max: 50 },
  { id: 2, name: 'Mini', sold: 20, max: 50 },
  { id: 3, name: 'Juicer', sold: 20, max: 20 },
];


const CardExampleWithAvatar = () => (
  <div>
    <Card style={{ margin: '20px', maxWidth: '400px' }} expanded >
      <CardTitle
        style={{ textAlign: 'left' }}
        title="Spring CSA"
        subtitle="April 1st - August 31st"
        showExpandableButton
        openIcon={<ContentAdd />}
      />
      <CardText>
        <Table selectable={false} >
          <TableHeader
            enableSelectAll={false}
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={{ width: '65%' }}>Share</TableHeaderColumn>
              <TableHeaderColumn>Sold</TableHeaderColumn>
              <TableHeaderColumn>Max</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            style={{ textAlign: 'center' }}
          >
            {
              data.map(row => (
                <TableRow key={row.id}>
                  <TableRowColumn style={{ width: '65%' }}>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.sold}</TableRowColumn>
                  <TableRowColumn>{row.max}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardText>
      <CardActions style={{ textAlign: 'left' }}>
        <FlatButton label="Manage" />
      </CardActions>
    </Card>
  </div>
);

export default CardExampleWithAvatar;
