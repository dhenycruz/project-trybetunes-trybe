import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisar Artista</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        { loadState ? loading : userInfo }
      </header>
    );
  }
}

export default Header;
