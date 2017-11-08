import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
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
  margin: 16px;
`;

const ContinueContainer = (props) => {
  if (!props.showIndicator) {
    return (
      <Wrapper><SavedMessage /></Wrapper>
    );
  }

  return (
    <Wrapper>
      <SavedMessage>
        { props.inProgress ? (
          <CircularProgress
            style={{ padding: '0' }}
            size={24}
            thickness={2}
            color="orange"
          />
        ) : (
          <span>All Changes Saved <Glyphicon glyph="ok" /></span>
        )}
      </SavedMessage>


      { props.buttonComponent }

    </Wrapper>
  );
};

ContinueContainer.propTypes = ({
  showIndicator: PropTypes.bool,
  inProgress: PropTypes.bool,
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
