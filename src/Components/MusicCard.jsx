import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      allFavoriteSongs: [],
      loadingFavorite: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.getFavoriteAllSongs();
  }

  async getFavoriteAllSongs() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ allFavoriteSongs: favoriteSongs, loadingFavorite: true });
  }

  favoriteSong = (song) => {
    const { allFavoriteSongs } = this.state;
    const filterSong = allFavoriteSongs.filter(
      (songFavorite) => songFavorite.trackId === song.trackId,
    );
    if (filterSong.length === 0) {
      this.addFavoriteSong(song);
      this.setState({ checked: true });
    } else {
      this.removeSong(song);
      this.setState({ checked: false });
    }
  }

  async removeSong(song) {
    this.setState({ loading: true });
    await removeSong(song);
    this.setState({ loading: false });
  }

  async addFavoriteSong(song) {
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
  }

  render() {
    const { song } = this.props;
    const { loading, loadingFavorite, checked } = this.state;

    // if (loadingFavorite) {
    //  const filterSong = allFavoriteSongs.filter(
    //    (songFavorite) => songFavorite.trackId === song.trackId,
    //  );
    // }

    const carregando = <span>Carregando...</span>;
    return (
      loadingFavorite
      && (
        <li>
          <span>{ song.trackName }</span>
          <audio data-testid="audio-component" src={ song.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          { loading ? carregando : (
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                id="favorite"
                checked={ checked }
                data-testid={ `checkbox-music-${song.trackId}` }
                onChange={ () => this.favoriteSong(song) }
              />
            </label>) }
        </li>
      )
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
