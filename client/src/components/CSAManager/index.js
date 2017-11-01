import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StepProgressBar from '../StepProgressBar';
import { nextStep, prevStep, STEPS } from '../../interactions/manageCSA';


const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ProgressContainer = styled.div`
  flex: 0 0 auto;
  margin-top: 5vh;
`;

const Content = styled.div`
  flex: 1 1 auto;
  position: relative;/* need this to position inner content */
  padding: 20px 80px;
`;

const Step = styled.h1`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  text-transform: capitalize;
`;

const Footer = styled.div`
  flex: 0 0 auto;
  padding: 15px 30px;
  background-color: #f2f3f4;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 170px;
  height: 45px;
  border-radius: 5px;
  background-color: #33658a;
  color: #fff;
  font-weight: bold;
  border: none;
  outline: none;
`;

const NextStepButton = Button.extend`
  margin-left: auto;
`;

const PrevStepButton = Button.extend`
  background-color: #ffffff;
  border: 1px solid #C6CACF;
  color: #474B4F;
  margin-right: 25px;
`;


const CSAManager = props => (
  <ManagerContainer>
    <ProgressContainer>
      <StepProgressBar steps={STEPS} {...props} />
    </ProgressContainer>
    <Content>
      <Step>{`Step ${props.activeIndex + 1}: ${STEPS[props.activeIndex]}`}</Step>
    </Content>

    <Footer>
      {props.activeIndex > 0 && (

        <PrevStepButton onClick={() => props.prevStep()}>Previous Step</PrevStepButton>
      )}

      {props.activeIndex < STEPS.length - 1 ? (
        <NextStepButton onClick={() => props.nextStep()}>Next Step</NextStepButton>
      ) : (
        <NextStepButton onClick={() => console.log('click')}>Create CSA</NextStepButton>
      )}
    </Footer>
  </ManagerContainer>
);


CSAManager.propTypes = ({
  title: PropTypes.string.isRequired,
  activeIndex: PropTypes.number.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
});

CSAManager.defaultProps = ({
  title: 'CSA Manager',
});

const mapStateToProps = state => ({
  ...state.manageCSA,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ nextStep, prevStep }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CSAManager);
