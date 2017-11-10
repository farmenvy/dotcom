import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { actions } from '../../interactions/manageCSA';
import CSAWizard from '../CSAWizard';
import CSACard from '../CSACard';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 8px;
`;

const FAB = styled.div`
  position: fixed;
  bottom: 20px;
  right: 24px;
`;

const NoCSAMessage = styled.h3`
  display: block;
  position: absolute;
  line-height: 42px;
  bottom: 50%;

  @media (max-width: 700px) {
    position: relative;
    margin-top: 25%;
  }
`;

const CSAList = [

];

const CSAManager = (props) => {
  if (props.isEditing) {
    return (<CSAWizard csa={props.csa} />);
  }

  return (
    <CardContainer>
      {
        CSAList.map(() => (
          <CSACard />
        ))
      }

      <NoCSAMessage>
        Looks like there isn&apos;t a CSA in the system yet.
        <br />
        Create one below!
      </NoCSAMessage>

      <FAB>
        <FloatingActionButton onClick={() => props.newCSA()}>
          <ContentAdd />
        </FloatingActionButton>
      </FAB>
    </CardContainer>

  );
};

CSAManager.propTypes = ({
  csa: PropTypes.shape({}).isRequired,
  isEditing: PropTypes.bool.isRequired,
  newCSA: PropTypes.func.isRequired,
});

const mapStateToProps = state => ({
  ...state.manageCSA,
});


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CSAManager);
