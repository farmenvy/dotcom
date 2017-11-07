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
  padding: 8px 8px 12px 8px;
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

    {
      props.buttonComponent ? props.buttonComponent : (
        <FlatButton
          label="Continue"
          disabled={props.inProgress || props.disabled}
          primary
          onClick={() => props.continue()}
        />
      )
    }

  </Wrapper>
);

ContinueContainer.propTypes = ({
  showIndicator: PropTypes.bool,
  inProgress: PropTypes.bool,
  disabled: PropTypes.bool,
  continue: PropTypes.func,
  buttonComponent: PropTypes.node,
});

ContinueContainer.defaultProps = ({
  buttonComponent: null,
  inProgress: false,
  showIndicator: false,
  disabled: false,
  continue: (() => {}),
});

ContinueContainer.defaultProps = ({
  continue: (() => {}),
});

export default ContinueContainer;
