import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="h-100 mb-4"
      onClick={() => onMovieClick(movie)}
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
          onClick={() => onMovieClick(movie)}
          variant="primary"
          className="mx-auto my-3"
          style={{ width: '100px' }}
        >
          Open
        </Button>
      </Card.Body>
    </Card>
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
  onMovieClick: PropTypes.func.isRequired,
};
