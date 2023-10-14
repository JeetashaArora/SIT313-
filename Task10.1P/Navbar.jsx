import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {auth} from "./utils/firebase"
import { signOut } from 'firebase/auth'
import {signUserOut} from "./utils/firebase"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout';
// const navigate=useNavigate()
// function handleSignout()
// {
  
//     signUserOut(auth)
// }

function NavigationBar() {
  const navigate=useNavigate()
  const handleLogout = async()=>{
    try{
        await auth.signOut()
        navigate("/signup")
        confirm("Click ok if you want to signout ")
        
    }
    catch(error)
    {
        console.log("Error :- "+error);
    }
};
  return (
    <div >
    <Navbar expand="lg" className="bg-body-tertiary navbg">
      <Container className='nb navbg' fluid>
        <Navbar.Brand href="#" className='mx-5'>DEV@Deakin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-4 nav "
              aria-label="Search"
            />
    <Button className="navlink" variant="secondary mx-1">Post</Button>
      <Button className="navlink" variant="secondary "><Link to="./login">Login</Link></Button>
      <Button className="navlink" variant="secondary " onClick={handleLogout}>Signout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}
export default NavigationBar;