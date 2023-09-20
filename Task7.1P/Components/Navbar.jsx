// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link, Outlet} from 'react-router-dom';
// import "./Navbar.css"

// function ColorSchemesExample() {
//   return (
//     <div className='Navbar'>
//     <Link to="/home" className='navlink' >
//         Home
//     </Link>
//     <Link to="/login" className='navlink' >
//         Login
//     </Link>
//     <Link to="/signup" className='navlink' >
//        Signup
//     </Link>
//     <Outlet/>
//     </div>
//   );
// }

// export default ColorSchemesExample;
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <div >
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='nb ' fluid>
        <Navbar.Brand href="#" className='mx-5'>DEV@Deakin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 nav "
              aria-label="Search"
            />
    <Button variant="secondary mx-2">Post</Button>
      <Button variant="secondary"><Link to="./login">Login</Link></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}
export default NavigationBar;