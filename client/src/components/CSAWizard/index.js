import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card } from '../common';
import { STEPS, changeTab, nextStep } from '../../interactions/manageCSA';
import Basics from './basics';
import Pickups from './pickups';
import Bags from './bags';
import Extras from './extras';
import Members from './members';

const ManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;


class CSAWizard extends React.Component {
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
              <Basics />
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
              <Extras />
            </Tab>

            <Tab
              label="Members"
              value={STEPS[4]}
            >
              <Members />
            </Tab>
          </Tabs>
        </Card>
      </ManagerContainer>
    );
  }
}

CSAWizard.propTypes = ({
  currentTab: PropTypes.string.isRequired,

  managerActions: PropTypes.shape({
    changeTab: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
  }).isRequired,
});

CSAWizard.defaultProps = ({
  title: 'CSA Manager',
});

const mapStateToProps = state => ({
  ...state.manageCSA,
  basics: { ...state.CSAbasics, asynchronous: state.asynchronous },
});

const mapDispatchToProps = dispatch => ({
  managerActions: bindActionCreators({ changeTab, nextStep }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CSAWizard);
