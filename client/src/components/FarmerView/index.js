import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import SideBar from '../SideBar';
// import Main from '../Main';

const Container = styled.div`
  height: 100%;
  display: flex;

  flex-direction: row;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const SideBar = styled.div`
  background: #339871;
  font-color: #ffffff;
  width: 25%;
  min-width: 250px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Main = styled.div`
  background: #ffffff;
  flex-grow: 1;
`;

const FarmerView = props => (
  <Container>
    <SideBar>
      <p>foo</p>
      <p>foo</p>
      <p>foo</p>
    </SideBar>
    <Main>
      {props.children}
    </Main>
  </Container>
);

FarmerView.propTypes = ({
  children: PropTypes.node.isRequired,
});

export default FarmerView;
