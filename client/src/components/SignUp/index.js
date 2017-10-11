import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
} from 'react-bootstrap';
import { updateField, signup } from '../../interactions/signup';


const SignUp = (props) => {
  const handleChange = (e) => {
    const key = e.target.id;
    props.updateField(key, e.target.value);
  };

  const renderErrors = (key) => {
    const { errors } = props;

    if (!errors[key]) return null;

    return (
      <HelpBlock>{errors[key].join(', ').toLowerCase()}</HelpBlock>
    );
  };

  const getValidationState = key => (props.errors[key] ? 'error' : null);
  const isValid = (
    props.email &&
    props.password &&
    props.passwordConfirmation &&
    Object.values(props.errors).filter(v => (!!v)).length === 0
  );

  if (props.pendingVerification) {
    return (
      <Redirect to="/verify" />
    );
  }

  return (
    <div className="SignUp">
      <h1>
        Sign Up!
      </h1>

      <form>
        <FormGroup
          controlId="email"
          validationState={getValidationState('email')}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={props.email.value}
            placeholder="name@email.com"
            onChange={e => handleChange(e)}
          />
          <FormControl.Feedback />
          {
            renderErrors('email')
          }
        </FormGroup>

        <FormGroup
          controlId="password"
          validationState={getValidationState('password')}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={props.password.value}
            onChange={e => handleChange(e)}
          />
          <FormControl.Feedback />
          {
            renderErrors('password')
          }
        </FormGroup>


        <FormGroup
          controlId="passwordConfirmation"
          validationState={getValidationState('passwordConfirmation')}
        >
          <ControlLabel>Password Confirmation</ControlLabel>
          <FormControl
            type="password"
            value={props.passwordConfirmation.value}
            onChange={e => handleChange(e)}
          />
          <FormControl.Feedback />
          {
            renderErrors('passwordConfirmation')
          }
        </FormGroup>

        <Button onClick={() => props.signup()} disabled={!isValid}>
          Submit
        </Button>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  updateField: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  pendingVerification: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
    passwordConfirmation: PropTypes.arrayOf(PropTypes.string),
  }),
};

SignUp.defaultProps = {
  errors: {},
};


const mapStateToProps = state => ({
  ...state.signup,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateField, signup }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
