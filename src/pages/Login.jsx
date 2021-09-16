import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.requestLogin = this.requestLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: '',
      disableButton: true,
      request: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => {
      const { user } = this.state;
      const numberCaractere = 3;
      if (user.length > numberCaractere) {
        this.setState({
          disableButton: false,
        });
      } else {
        this.setState({
          disableButton: true,
        });
      }
    });
  }

  async requestLogin(callbackCreateUser) {
    const { user } = this.state;
    this.setState({ request: true });
    await callbackCreateUser({ name: user });
    this.setState({ request: false });
  }

  render() {
    const { user, disableButton, request } = this.state;
    const loadingElement = <span>Carregando...</span>;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <label htmlFor="user">
            Usuário:
            <input
              data-testid="login-name-input"
              name="user"
              type="text"
              id="user"
              value={ user }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            onClick={ () => { this.requestLogin(createUser); } }
            disabled={ disableButton }
          >
            Entrar
          </button>
        </form>
        { request ? loadingElement : ''}
      </div>
    );
  }
}

export default Login;
