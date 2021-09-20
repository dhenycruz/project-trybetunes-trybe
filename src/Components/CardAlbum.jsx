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
          <h1>{ album.collectionName }</h1>
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
    artWorkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};

export default CardAlbum;
