import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './movie-card.scss';

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card
        className="h-100 mb-4"
        style={{ cursor: 'pointer' }}
      >
        <Card.Img
          src={movie.image}
          style={{
            maxWidth: 'auto',
            maxHeight: '500px',
            display: 'block',
            margin: 'auto',
            flex: 1,
            borderRadius: '0',
          }}
        />

        <Card.Body
          style={{
            borderRadius: '10',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <div>
            <Card.Title> {movie.title}</Card.Title>
            <Card.Text>Genre: {movie.genre}</Card.Text>
            <Card.Text>Director: {movie.director}</Card.Text>
          </div>

          <Button
            variant="primary"
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
export default MovieCard;
