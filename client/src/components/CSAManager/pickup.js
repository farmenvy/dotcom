import React from 'react';
import styled from 'styled-components';

const Foo = styled.button`
  height: 45px;
  width: 100%;
  border-radius: 4px;
  background-color: rgba(241, 245, 241, 0.25);
  border: solid 1px #e5f0e7;
  outline: none;

  &:before {
    content: '+';
    margin-right: 8px;
    display: inline-block;
    width: 18px;
    height: 18px;
    font-size: 12px;
    font-weight: bold;
    background-color: rgba(51, 152, 113, 0.15);
    color: #379f77;
    border: solid 1px #379f77;
    border-radius: 100%;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4)
`;

const ModalContent = styled.div`
  position: relative;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  height: 75%;
  margin-top: 10vh;
  margin-bottom: 10vh;
  width: 50%;
  min-height: 650px
  min-width: 650px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const TitleContainer = styled.div`
  border-bottom: solid 1px #c6c9cf;
  display: flex;
  justify-content: center;
`;

const Title = styled.h3`
  text-transform: uppercase;
  font-size: 14px;
  padding: 25px;
  margin: 0;
  color: #aaaeb3;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Pickup = () => {
  // window.document.body.style.overflow = 'hidden';
  window.document.body.style.overflow = '';

  return (
    <div>
      <Foo>
        Create New Pickup Location
      </Foo>

      <ModalOverlay>
        <ModalContent>
          <TitleContainer><Title>Create New Location</Title></TitleContainer>
          Yo this is content
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default Pickup;
