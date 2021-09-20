import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.fetchMusics = this.fetchMusics.bind(this);
    this.state = {
      songsAlbum: [],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  async fetchMusics() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({
      songsAlbum: songs,
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
    });
  }

  render() {
    const { songsAlbum, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <h1 data-testid="album-name">{ `Collection Name: ${artistName}` }</h1>
        <h3 data-testid="artist-name">{ `Artist Name: ${albumName}` }</h3>
        <ol>
          { songsAlbum.slice(1).map(
            (song) => <MusicCard key={ song.trackId } song={ song } />,
          )}
        </ol>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
