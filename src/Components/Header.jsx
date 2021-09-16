import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loadState: false,
    };
  }

  componentDidMount() {
    this.loadProfile();
  }

  async loadProfile() {
    this.setState({ loadState: true });
    const userProfile = await getUser();
    this.setState({
      loadState: false,
      user: userProfile,
    });
  }

  render() {
    const { user, loadState } = this.state;
    const loading = <span>Carregando...</span>;
    const userInfo = <span data-testid="header-user-name">{ user.name }</span>;

    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        { loadState ? loading : userInfo }
      </header>
    );
  }
}

export default Header;
