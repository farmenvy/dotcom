/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import StepProgressBar from '../StepProgressBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Card } from '../common';
import { nextStep, prevStep, STEPS } from '../../interactions/manageCSA';
import Basics from './basics';
import Pickups from './pickups';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

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
  text-transform: capitalize;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

const Footer = styled.div`
  flex: 0 1 auto;
  z-index: 9;
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


class WizardLayout extends React.Component {
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
          <Tabs>
            <Tab label="Basics" >
              <div>
                <h2 style={styles.headline}>Basic CSA Information</h2>
                <Basics />
                <ButtonContainer>
                  <FlatButton
                    label="Cancel"
                    primary
                    onClick={() => this.props.nextStep()}
                  />
                  <RaisedButton
                    label="Save"
                    primary
                    onClick={() => this.props.nextStep()}
                  />
                </ButtonContainer>
              </div>
            </Tab>
            <Tab label="Pickups" >
              <div>
                <Pickups />
              </div>
            </Tab>
            <Tab
              label="Bags"
              data-route="/home"
            >
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>

            <Tab
              label="Extras"
            >
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>

            <Tab
              label="Members"
            >
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>
          </Tabs>
        </Card>
      </ManagerContainer>
    );
  }
}

WizardLayout.propTypes = ({
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  activeIndex: PropTypes.number.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
});

WizardLayout.defaultProps = ({
  title: 'CSA Manager',
});

const mapStateToProps = state => ({
  ...state.manageCSA,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ nextStep, prevStep }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardLayout);
