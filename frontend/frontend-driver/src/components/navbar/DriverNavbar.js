import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import userService from "../../services/userService";
import DriverEditProfile from '../../views/driver/DriverEditProfile';
import profileIcon from '../../assets/images/user.jpg';


export default function PassengerNavbar(props) {

    let navigate = useNavigate();

    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect(() => {
        const user = userService.getUser();
        if (user === null) {
            navigate("/login");
        }
    },[]);

    const handleLogOut = () => {
        userService.logout();
        navigate("/login");
        window.location.reload();
    };

  return (
    <Navbar expand="lg" bg="light" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Container>
            <Navbar.Brand>
                <h2 className='fw-bold'>Taxi Hailing App</h2>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                <Nav>
                    <Nav.Link as={Link} to='/hail' className="fw-bold navLink">Hail</Nav.Link>
                    <NavDropdown title={props.user.username} className='fw-bold' id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => setShowEditProfile(true)} className="fw-bold no-hover">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} onClick={handleLogOut} className="fw-bold no-hover">Logout</NavDropdown.Item>
                    </NavDropdown>
                    <DriverEditProfile show={showEditProfile} onHide={() => setShowEditProfile(false)} />
                    <img src={profileIcon} alt="profile" className="profile-icon" style={{width:"40px", height:"40px", borderRadius:"100%"}}/>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
