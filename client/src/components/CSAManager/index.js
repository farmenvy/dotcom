import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StepProgressBar from '../StepProgressBar';
import { Button } from '../common';
import Orchestrator from './orchestrator';
import { nextStep, prevStep, STEPS } from '../../interactions/manageCSA';


const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  height: 100vh;
`;

const ProgressContainer = styled.div`
  flex: 0 0 auto;
  margin-top: 5vh;
`;


const ContentContainer = styled.div`
  flex: auto;
  text-align: left;
  position: relative;/* need this to position inner content */
`;

const Content = styled.div`
  margin: 0 80px;

  @media (max-width: 700px) {
    margin: 10px;
  }
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

const NextStepButton = Button.extend`
  margin-left: auto;
`;

const PrevStepButton = Button.extend`
  background-color: #ffffff;
  border: 1px solid #C6CACF;
  color: #474B4F;
  margin-right: 25px;
`;

const OrchestratorContainer = styled.div`
  margin-top: 30px;
`;


class CSAManager extends React.Component {
  constructor(props) {
    super(props);
    this.handleArrowPress = this.handleArrowPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleArrowPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleArrowPress);
  }

  handleArrowPress(e) {
    switch (e.key) {
      case 'ArrowRight':
        this.props.nextStep();
        break;
      case 'ArrowLeft':
        this.props.prevStep();
        break;
      default:
    }
  }

  render() {
    const currentStep = STEPS[this.props.activeIndex];

    return (
      <ManagerContainer>
        <ProgressContainer>
          <StepProgressBar steps={STEPS} {...this.props} />
        </ProgressContainer>
        <ContentContainer>
          <Content>
            <Step>{`Step ${this.props.activeIndex + 1}: ${currentStep}`}</Step>
            <OrchestratorContainer>
              <Orchestrator currentStep={currentStep} />
            </OrchestratorContainer>
          </Content>
        </ContentContainer>

        <Footer>
          {this.props.activeIndex > 0 && (

            <PrevStepButton onClick={() => this.props.prevStep()}>Previous Step</PrevStepButton>
          )}

          {this.props.activeIndex < STEPS.length - 1 ? (
            <NextStepButton onClick={() => this.props.nextStep()}>Next Step</NextStepButton>
          ) : (
            <NextStepButton onClick={() => console.log('click')}>Create CSA</NextStepButton>
          )}
        </Footer>
      </ManagerContainer>
    );
  }
}

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
