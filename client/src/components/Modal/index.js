import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const ContentBody = styled.div`
  padding: 30px;
`;


const Modal = (props) => {
  const close = () => {
    window.document.body.style.overflow = 'auto';
    props.closeModal();
  };

  if (!props.active) {
    return (null);
  }

  window.document.body.style.overflow = 'hidden';

  return (
    <ModalOverlay onClick={() => close()}>
      <ModalContent>
        <TitleContainer><Title>Create New Location</Title></TitleContainer>
        <ContentBody>
          Yo this is content
        </ContentBody>
      </ModalContent>
    </ModalOverlay>
  );
};

Modal.propTypes = ({
  active: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
});

export default Modal;
