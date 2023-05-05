import { Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

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
                <div>
                  <span style={{ marginRight: '5px' }}>Description:</span>
                  <span>{movie.description}</span>
                </div>
                <div>
                  <span style={{ marginRight: '5px' }}>Genre:</span>
                  <span>{movie.genre}</span>
                </div>
                <div>
                  <span style={{ marginRight: '5px' }}>Director:</span>
                  <span>{movie.director}</span>
                </div>
                <Link to={`/`}>
                  <button className="back-button">Back</button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
