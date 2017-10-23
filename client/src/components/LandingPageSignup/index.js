import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { StyledInput } from '../StyledInputs';
import {
  updateField,
  signup,
  PASSWORD_MINIMUM_LENGTH,
} from '../../interactions/signup';
// import { signup } from '../../interactions/signup';


const SignupText = styled.div`
  margin: 1.5em 0.5em 0.25em 0.5em;
  opacity: 0.5;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.42;
  letter-spacing: -0.5px;
  text-align: center;
  color: #353535;
`;

const InputRow = styled.div`
  height: 60px;
  margin: 1.5em 0;
`;

const FlexRow = InputRow.extend`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class LandingPageSignup extends React.Component {
  handleChange(e) {
    const key = e.target.dataset.key;
    const value = e.target.value;
    this.props.updateField(key, value);

    if (key === 'password' && value.length === PASSWORD_MINIMUM_LENGTH) {
      ReactTooltip.hide();
    }
  }

  render() {
    return (
      <div>
        <Row>
          <SignupText>
            CSA management made easy.
            <br />
            Enter your information below to get early access.
          </SignupText>
        </Row>
        <FlexRow>
          <StyledInput
            inline
            placeholder="First Name"
            data-key="firstName"
            type="text"
            value={this.props.firstName}
            errors={this.props.errors.firstName}
            onChange={e => this.handleChange(e)}
          />
          <StyledInput
            inline
            placeholder="Last Name"
            data-key="lastName"
            type="text"
            value={this.props.lastName}
            errors={this.props.errors.lastName}
            onChange={e => this.handleChange(e)}
          />
        </FlexRow>

        <InputRow>
          <StyledInput
            placeholder="Farm Name"
            data-key="farmName"
            type="text"
            value={this.props.farmName}
            errors={this.props.errors.farmName}
            onChange={e => this.handleChange(e)}
          />
        </InputRow>
        <InputRow>
          <StyledInput
            placeholder="Email"
            data-key="email"
            type="text"
            value={this.props.email}
            errors={this.props.errors.email}
            onChange={e => this.handleChange(e)}
          />
        </InputRow>
        <InputRow>
          <StyledInput
            placeholder="Password"
            data-tip="must be at least 12 characters"
            data-key="password"
            ref={(ref) => { this.password = ref; return ref; }}
            type="password"
            value={this.props.password}
            errors={this.props.errors.password}
            onChange={e => this.handleChange(e)}
          />

          <ReactTooltip
            effect="solid"
          />
        </InputRow>

        <Button
          bsStyle="primary"
          bsSize="large"
          block
          onClick={() => this.props.signup()}
        >
        Create Account
        </Button>
      </div>
    );
  }
}

LandingPageSignup.propTypes = {
  updateField: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  // verificationStatus: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
    firstName: PropTypes.arrayOf(PropTypes.string),
    lastName: PropTypes.arrayOf(PropTypes.string),
    farmName: PropTypes.arrayOf(PropTypes.string),
  }),
};

LandingPageSignup.defaultProps = {
  errors: {},
};

const mapStateToProps = state => ({
  ...state.signup,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateField, signup }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageSignup);
