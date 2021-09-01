/* Author: Vishal Sancheti */

import {Container, Nav, Navbar} from "react-bootstrap";
import "../styles/AppNavbar.scss"

export default function AppNavbar(){
    return (
        <Navbar className="app-nav-bar-container fixed-top">
            <Container>
                <Navbar.Brand className="app-nav-bar-text" href="/">
                    <i className="fab fa-angellist"></i> Freelance Dashboard
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link className="app-nav-bar-link" href="login">
                        <i className="fas fa-sign-in-alt"></i> Login
                    </Nav.Link>
                    <Nav.Link className="app-nav-bar-link" href="register">
                        <i className="fas fa-user-plus"></i> Register
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}