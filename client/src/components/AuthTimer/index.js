import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { refresh } from '../../interactions/auth';

class AuthTimer extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) return;
    this.timer = setInterval(this.tick, 15000);
  }

  componentWillUnmount() {
    if (!this.props.isLoggedIn) return;
    this.clearInterval(this.timer);
  }

  tick() {
    console.log('tick tock'); // eslint-disable-line
    if (this.props.refreshTime.isSameOrBefore(moment())) {
      console.log('I should refresh!'); // eslint-disable-line
      this.props.refresh();
    }
  }


  render() {
    return (
      <div>
        <h3>{`refresh: ${this.props.refreshTime.calendar()}`}</h3>
        {this.props.children}
      </div>
    );
  }
}

AuthTimer.propTypes = ({
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  refreshTime: PropTypes.instanceOf(moment),
});

AuthTimer.defaultProps = ({
  refreshTime: null,
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  refreshTime: state.auth.refreshTime,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ refresh }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthTimer);
