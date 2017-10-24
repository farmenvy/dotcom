import React from 'react';
import styled from 'styled-components';
// import SideBar from '../SideBar';
// import Main from '../Main';

const Container = styled.div`
  text-align: center;
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

const App = () => (
  <Container>
    <SideBar>
      <p>foo</p>
      <p>foo</p>
      <p>foo</p>
    </SideBar>
    <Main>
      <p>bar</p>
      <p>bar</p>
      <p>bar</p>
      <p>bar</p>
    </Main>
  </Container>
);

export default App;
