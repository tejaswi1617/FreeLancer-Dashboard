/* Author: Vishal Sancheti */

import {Accordion, Container,  CustomToggle, Card, Dropdown, Nav, Navbar} from "react-bootstrap";
import "../styles/DashboardNavbar.scss";
import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import Notification from "../components/Notification";
export default function DashboardNavbar(){
  
    const [lgShow, setLgShow] = useState(false);

    return (
        <Navbar className="nav-bar-container">
            <Container>
                <Navbar.Brand className="nav-bar-text" href="/">
                    <i className="fab fa-angellist"></i> Freelance Dashboard
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link title="Notification" className="nav-bar-link" >
                    <Notification/>
                    </Nav.Link>
                    <Nav.Link title="Profile" className="nav-bar-link" href="profile">
                        <i className="fas fa-user"/>
                    </Nav.Link>
                    <Nav.Link title="Log Out" className="nav-bar-link"  onClick={ () => {localStorage.removeItem('user_id')} } href="/">
                        <i className="fas fa-sign-out-alt"/>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}