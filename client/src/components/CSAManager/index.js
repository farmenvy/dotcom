/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import StepProgressBar from '../StepProgressBar';
import Orchestrator from './orchestrator';
import { Card } from '../common';
import { nextStep, prevStep, STEPS } from '../../interactions/manageCSA';


const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const ProgressContainer = styled.div`
  flex: 0 0 auto;
  padding: 10px 0 2px 0;
`;


const ContentContainer = styled.div`
  flex: auto;
  text-align: left;
`;

const Content = styled.div`
  display: flex;
  margin-bottom: 0;
  flex-direction: column;
  @media (max-width: 700px) {
    margin: 10px;
  }
`;

const Step = styled.h1`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin-left: 24px;
  text-transform: capitalize;
`;

const Footer = styled.div`
  flex: 0 1 auto;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 25%;
  background: ${props => props.theme.grey2};
  bottom: 0;
  width: 75%;
  padding: 8px;
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

    const Test = styled.div`
      min-height: 200px;
    `;

    return (
      <ManagerContainer>
        <Card>
          <ProgressContainer>
            <StepProgressBar steps={STEPS} {...this.props} />
          </ProgressContainer>

          <Step>{`Step ${this.props.activeIndex + 1}: ${currentStep}`}</Step>
          <ContentContainer>
            <Content>
              <OrchestratorContainer>
                <Orchestrator currentStep={currentStep} />
              </OrchestratorContainer>
            </Content>
          </ContentContainer>
        </Card>


        <Footer>
          <RaisedButton
            label="Back"
            onClick={() => this.props.prevStep()}
          />
          <RaisedButton
            label="Continue"
            primary
            onClick={() => this.props.nextStep()}
          />
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
