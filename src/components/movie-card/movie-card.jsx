import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card
        className="h-100 mb-4"
        style={{ cursor: 'pointer' }}
      >
        <Card.Img
          src={movie.image}
          style={{ maxWidth: '500px', maxHeight: '300px', display: 'block', margin: 'auto' }}
        />

        <Card.Body
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <Card.Title>Title: {movie.title}</Card.Title>
            <Card.Text>Genre: {movie.genre}</Card.Text>
            <Card.Text>Director: {movie.director}</Card.Text>
          </div>

          <Button
            variant="link"
            className="mx-auto my-3"
            style={{ width: '100px', cursor: 'pointer' }}
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string,
    genre: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
