import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../common';

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

const ContentWrapper = styled.div`
  padding: 30px;
`;

const Footer = styled.div`
  margin: 30px;
`;

const Action = Button.extend`
  position: absolute;
  bottom: 30px;
  right: 50px;

  @media (max-width: 700px) {
    margin-right: 100px;
  }

`;


const Modal = (props) => {
  const close = (e) => {
    if (e.target.id !== 'overlay') {
      return;
    }
    window.document.body.style.overflow = 'auto';
    props.closeModal();
  };

  if (!props.active) {
    return (null);
  }

  window.document.body.style.overflow = 'hidden';

  return (
    <ModalOverlay id="overlay" onClick={e => close(e)}>
      <ModalContent>
        <TitleContainer><Title>Create New Location</Title></TitleContainer>
        <ContentWrapper>
          Yo this is content

          <Footer><Action>Next</Action></Footer>
        </ContentWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

Modal.propTypes = ({
  active: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
});

export default Modal;
