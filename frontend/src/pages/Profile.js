/**
 * Author: Deep Patel.
 * Created On: 2021-07-20
 * Frontend Page for Testimonials.
 */

import React from 'react';
import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { Modal, Form, Button } from 'react-bootstrap';
import Datatable from '../components/Datatable';
import emailjs from 'emailjs-com';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/Testimonials.scss";
import projectServices from '../services/projectsServices.js';
import clientServices from '../services/clientService.js';
import registerServices from '../services/registerServices';
import {Table} from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const Profile = () => {

    let history = useHistory();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        mobile:'',
        linkedin:'',
        website:'',
        password: '',
    });

    useEffect(() => {
        registerServices.fetchUserById(localStorage.getItem('user_id')).then((response) => {
            if(response){
                setUserInfo({
                    name : response.Name,
                    email : response.Email,
                    mobile : response.ContactNo,
                    linkedin : response.LinkedInProfile,
                    website : response.Website,
                    password : ""
                })
            }
        }).catch((error) => {
            alert("Login Failed!!");
            console.log("Error:",error)
        })
    },[]);

    const onClickBack = (e) => {
        e.preventDefault();
        history.push({ pathname: '/editProfile' });
    };

    return (
        <div>
            <div className="page-header-container">
                <PageHeader title="Profile" />
            </div>
            <div className="page-content-container">
                <div className="page-content">
                    <Row>
                        <Col className="text-right">
                            <Button className="btn primary-button" onClick={onClickBack}>
                                Edit
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <Table bordered hover>
                                <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{userInfo.name}</td>
                                </tr>
                                <tr>
                                    <td>Contact No:</td>
                                    <td>{userInfo.mobile}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{userInfo.email}</td>
                                </tr>
                                <tr>
                                    <td>LinkedIn:</td>
                                    <td>{userInfo.linkedin}</td>
                                </tr>
                                <tr>
                                    <td>Website:</td>
                                    <td>{userInfo.website}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
};

export default Profile
