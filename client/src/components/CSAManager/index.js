import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Card } from '../common';
import { actions as basicsActions } from '../../interactions/CSAbasics';
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
          <Tabs>
            <Tab label="Basics" >
              <Basics {...this.props.basics} {...this.props.basicsActions} />
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

CSAManager.propTypes = ({
  basicsActions: PropTypes.shape({
    updateCSAName: PropTypes.func.isRequired,
  }).isRequired,
  basics: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
});

CSAManager.defaultProps = ({
  title: 'CSA Manager',
});

const mapStateToProps = state => ({
  ...state.manageCSA,
  basics: { ...state.CSAbasics },
});

const mapDispatchToProps = dispatch => ({
  basicsActions: bindActionCreators(basicsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CSAManager);
