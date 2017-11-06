import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import { Glyphicon } from 'react-bootstrap';

const SavedMessage = styled.div`
  align-self: center;
  color: green;
  margin-right: 24px;
  text-transform: uppercase;
`;


const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

const ContinueContainer = props => (
  <Wrapper>
    { props.showIndicator && (
      <SavedMessage>
        { props.inProgress ? (
          <CircularProgress size={24} thickness={2} color="orange" />
        ) : (
          <span>All Changes Saved <Glyphicon glyph="ok" /></span>
        )}
      </SavedMessage>
    )}


    <FlatButton
      label="Continue"
      disabled={props.inProgress}
      primary
    />
  </Wrapper>
);

ContinueContainer.propTypes = ({
  showIndicator: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,

});

export default ContinueContainer;
