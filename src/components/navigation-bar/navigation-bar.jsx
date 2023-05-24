import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  const location = useLocation();

  let title = 'My Flix';

  if (location.pathname === '/') {
    title = 'Movies';
  } else if (location.pathname === '/profile') {
    title = 'Profile';
  }

  let timeout;

  const onMouseLeaveHandler = () => {
    timeout = setTimeout(() => {
      const nav = document.querySelector('.navbar-collapse');
      if (nav && nav.classList.contains('show')) {
        nav.classList.remove('show');
      }
    }, 250);
  };

  const onMouseEnterHandler = () => {
    clearTimeout(timeout);
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      onMouseLeave={onMouseLeaveHandler}
      onMouseEnter={onMouseEnterHandler}
      style={{ color: 'white' }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="ms-lg-auto me-3"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  className="navbar-link"
                >
                  Movies
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={onLoggedOut}
                  className="ms-lg-auto"
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
