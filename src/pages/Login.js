import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(setEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minPassword = 6;
    const validEmail = emailRegex.test(email);
    const validPassword = password.length >= minPassword;
    const isValid = (validEmail && validPassword);
    return (
      <main>

        <input
          type="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          name="email"
        />

        <input
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          name="password"
        />

        <button
          type="button"
          disabled={ !isValid }
          onClick={ this.handleClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>

      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  globalEmail: state.email,
  globalPassword: state.password,
});

export default connect(mapStateToProps)(Login);
