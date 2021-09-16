import React from 'react';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      disableButton: true,
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

  render() {
    const { search, disableButton } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
