import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

function AppNavbar() {

    return (
        <Navbar expand="lg" bg="light" style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)' }}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <h2 className='fw-bold'>Taxi Hailing App</h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav>
                        <Nav.Link as={Link} to="/" className='fw-bold navLink'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/login" className='fw-bold navLink'>Login</Nav.Link>
                        <Nav.Link as={Link} to="/passengerRegister" className='fw-bold navLink'>SignUp</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 

    );
}

export default AppNavbar;