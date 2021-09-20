import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        <Link
          to={ `album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <h3>{ album.artistName }</h3>
          <h5>{ album.collectionName }</h5>
        </Link>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default CardAlbum;
