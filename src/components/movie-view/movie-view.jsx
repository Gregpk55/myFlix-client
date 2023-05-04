import { Card, Container, Row, Col } from 'react-bootstrap';

import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Img
              variant="top"
              src={movie.image}
              className="w-100"
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                <p>
                  <span style={{ marginRight: '5px' }}>Description:</span>
                  <span>{movie.description}</span>
                </p>
                <p>
                  <span style={{ marginRight: '5px' }}>Genre:</span>
                  <span>{movie.genre}</span>
                </p>
                <p>
                  <span style={{ marginRight: '5px' }}>Director:</span>
                  <span>{movie.director}</span>
                </p>
                <button
                  onClick={onBackClick}
                  className="back-button"
                  style={{ cursor: 'pointer' }}
                >
                  Back
                </button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
