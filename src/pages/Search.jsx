import React from 'react';
import SectionResult from '../Components/SectionResult';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      search: '',
      disableButton: true,
      loading: false,
      result: '',
      albuns: [],
      notFoundAlbum: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => {
      const numberCaracteres = 2;
      const { search } = this.state;
      if (search.length >= numberCaracteres) {
        this.setState({ disableButton: false });
      } else {
        this.setState({ disableButton: true });
      }
    });
  };

  async handleClick(search) {
    this.setState({ loading: true });
    const albunsResult = await searchAlbumsAPI(search);
    if (albunsResult.length === 0) {
      this.setState({
        notFoundAlbum: 'Nenhum álbum foi encontrado',
      });
    }
    this.setState({
      loading: false,
      result: `Resultado de álbuns de: ${search}`,
      albuns: albunsResult,
    });
  }

  render() {
    const { search, disableButton, loading, result, albuns, notFoundAlbum } = this.state;
    const loadingElement = <span>Carregando...</span>;
    const formElement = (
      <form>
        <label htmlFor="search">
          Pesquisar Artista:
          <input
            type="text"
            name="search"
            id="search"
            valeu={ search }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disableButton }
          onClick={ () => { this.handleClick(search); } }
        >
          Pesquisar
        </button>
      </form>
    );
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        { loading ? loadingElement : formElement }
        <p>{ result }</p>
        { albuns.length === 0 ? notFoundAlbum : <SectionResult albuns={ albuns } /> }
      </div>
    );
  }
}

export default Search;
