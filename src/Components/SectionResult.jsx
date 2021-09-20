import React from 'react';
import PropTypes from 'prop-types';
import CardAlbum from './CardAlbum';

class SectionResult extends React.Component {
  render() {
    const { albuns } = this.props;
    return (
      <section>
        <h3>Lista de Albuns </h3>
        { albuns.map((album) => <CardAlbum key={ album.collectionId } album={ album } />)}
      </section>
    );
  }
}

SectionResult.propTypes = {
  albuns: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default SectionResult;
