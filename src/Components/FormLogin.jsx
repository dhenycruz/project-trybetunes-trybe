import React from 'react';
import PropTypes from 'prop-types';

class FormLogin extends React.Component {
  render() {
    const { user, handleChange, onClick, disableButton } = this.props;
    return (
      <form>
        <label htmlFor="user">
          Usuário:
          <input
            data-testid="login-name-input"
            name="user"
            type="text"
            id="user"
            value={ user }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ onClick }
          disabled={ disableButton }
        >
          Entrar
        </button>
      </form>
    );
  }
}

FormLogin.propTypes = {
  user: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  disableButton: PropTypes.bool.isRequired,
};

export default FormLogin;
