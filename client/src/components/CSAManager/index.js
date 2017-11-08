import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card } from '../common';
import { STEPS, changeTab, nextStep } from '../../interactions/manageCSA';
import { actions as basicsActions } from '../../interactions/CSAbasics';
import Basics from './basics';
import Pickups from './pickups';
import Bags from './bags';

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
    this.foo = e;
    // switch (e.key) {
    //   case 'ArrowRight':
    //     this.props.nextStep();
    //     break;
    //   case 'ArrowLeft':
    //     this.props.prevStep();
    //     break;
    //   default:
    // }
  }

  render() {
    return (
      <ManagerContainer>
        <Card>
          <Tabs
            value={this.props.currentTab}
            onChange={val => this.props.managerActions.changeTab(val)}
            tabItemContainerStyle={{ borderRadius: '2px' }}
          >
            <Tab label="Basics" value={STEPS[0]}>
              <Basics
                {...this.props.basics}
                {...this.props.basicsActions}
                continue={this.props.managerActions.nextStep}
              />
            </Tab>
            <Tab label="Pickups" value={STEPS[1]}>
              <Pickups />
            </Tab>
            <Tab
              label="Bags"
              value={STEPS[2]}
            >
              <Bags />
            </Tab>

            <Tab
              label="Extras"
              value={STEPS[3]}
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
              value={STEPS[4]}
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

CSAManager.propTypes = ({
  basicsActions: PropTypes.shape({
    updateCSAName: PropTypes.func.isRequired,
  }).isRequired,
  basics: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,


  currentTab: PropTypes.string.isRequired,

  managerActions: PropTypes.shape({
    changeTab: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
  }).isRequired,
});

CSAManager.defaultProps = ({
  title: 'CSA Manager',
});

const mapStateToProps = state => ({
  ...state.manageCSA,
  basics: { ...state.CSAbasics, asynchronous: state.asynchronous },
});

const mapDispatchToProps = dispatch => ({
  basicsActions: bindActionCreators(basicsActions, dispatch),
  managerActions: bindActionCreators({ changeTab, nextStep }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CSAManager);
