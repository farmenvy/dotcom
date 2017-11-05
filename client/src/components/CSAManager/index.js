/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import StepProgressBar from '../StepProgressBar';
import Orchestrator from './orchestrator';
import { Card } from '../common';
import { nextStep, prevStep, STEPS } from '../../interactions/manageCSA';


const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProgressContainer = styled.div`
  flex: 0 0 auto;
  margin-top: 5vh;
`;


const ContentContainer = styled.div`
  flex: auto;
  text-align: left;
`;

const Content = styled.div`
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
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: space-between;
`;

const NextStepButton = styled.span`
  margin-left: auto;
`;

const PrevStepButton = styled.span`
  background-color: #ffffff;
  border: 1px solid #C6CACF;
  color: #474B4F;
  margin-right: 25px;
`;

const OrchestratorContainer = styled.div`
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
        <Card>
          <ProgressContainer>
            <StepProgressBar steps={STEPS} {...this.props} />
          </ProgressContainer>
        </Card>

        <Card>
          <ContentContainer>
            <Content>
              <Step>{`Step ${this.props.activeIndex + 1}: ${currentStep}`}</Step>
              <OrchestratorContainer>
                <Orchestrator currentStep={currentStep} />
              </OrchestratorContainer>
            </Content>
          </ContentContainer>

        <Footer>
          <FlatButton
            label="Back"
            primary
            onClick={() => this.props.prevStep()}
          />
          <FlatButton
            label="Continue"
            primary
            onClick={() => this.props.nextStep()}
          />
        </Footer>
      </Card>
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
