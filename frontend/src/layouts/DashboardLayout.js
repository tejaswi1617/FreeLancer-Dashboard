/* Author: Vishal Sancheti */

import React, { useEffect } from 'react';
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import {Col, Container, Row} from "react-bootstrap";
import { useHistory } from 'react-router-dom';

// Page Wrapper for Dashboard Pages
const DashboardLayout =({children}) =>{
    const history = useHistory();

    useEffect(() => {
        let user = localStorage.getItem('user_id')
        if(!user){
            history.push('/login')
        }

    },[]);

    return(
        <>
            <header>
                <DashboardNavbar/>
            </header>
            <main>
                <Container fluid>
                    <Row>
                        <Col md={2} as={DashboardSidebar} />
                        <Col md={10}>
                            {children}
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default DashboardLayout;