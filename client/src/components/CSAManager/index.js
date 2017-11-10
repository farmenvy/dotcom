import React from 'react';
import styled from 'styled-components';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReactTooltip from 'react-tooltip';
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

const CSAManager = () => (
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

    <FAB data-tip="Create CSA" >
      <FloatingActionButton>
        <ContentAdd />
      </FloatingActionButton>
    </FAB>

    <ReactTooltip place="left" effect="solid" />

  </CardContainer>

);

export default CSAManager;
