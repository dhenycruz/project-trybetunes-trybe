import React from 'react';
import PropTypes from 'prop-types';
import FormLogin from '../Components/FormLogin';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.requestLogin = this.requestLogin.bind(this);
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
      if (user.length >= numberCaractere) {
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

  async requestLogin(callbackCreateUser, login) {
    const { user } = this.state;
    this.setState({ request: true });
    await callbackCreateUser({ name: user });
    this.setState({ request: false });
    login();
  }

  render() {
    const { user, disableButton, request } = this.state;
    const { login } = this.props;
    const loadingElement = <span>Carregando...</span>;
    const FormElement = (<FormLogin
      user={ user }
      handleChange={ this.handleChange }
      onClick={ () => { this.requestLogin(createUser, login); } }
      disableButton={ disableButton }
    />);
    return (
      <div data-testid="page-login">
        { request ? loadingElement : FormElement}
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
