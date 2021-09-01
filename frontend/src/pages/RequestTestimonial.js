/**
 * Author: Deep Patel.
 * Created On: 2021-07-20
 * Frontend Page for Request Testimonials.
 */

import React from 'react'
import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import { Modal, Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/Testimonials.scss";
import testimonialServices from '../services/testimonialServices.js';
import { useParams } from 'react-router-dom';

/**
 * Request testimonial page containing the id of specific testimonial send to client via mail
 * @param {*} prop 
 * @returns 
 */
const RequestTestimonial = (prop) => {

    const param = useParams();

    // feedback Details
    const [feedback, setFeedback] = useState({
        
        feedback: "",
        id : param.id
    });

    /**
     * On change stores new feedback details into the feedback variable
     * @param {*} e 
     * Form elements are stored into the feedback on change
     */
    const handleChange = (e) => {
        let newFeedback = {...feedback, [e.target.name]: e.target.value};
        setFeedback(newFeedback);
    };

    /**
     * Storing the values into the database using testimonialService's update functionality
     * @param {*} e 
     * The data on specific id is updated using this functionality
     */    
    const storeData = (e) => {
        e.preventDefault();
        testimonialServices.update(feedback)
    }

    return (
        <div>
            <div className="page-header-container">
                <PageHeader title="Testimonial Request" />
            </div>
            <div className="page-content-container">
            <div>
            <Row>    
                <Col md = {5}></Col>
                <Col md = {10}></Col>
            </Row>
            </div>
            <Row>
                    <Col md = {5}></Col>
                    <Col md = {10}>
                    <Form className="feedback-form">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <Form.Group>
                                        <Form.Label className="required form-label">Feedback: </Form.Label>
                                        <Form.Control as="textarea" name="feedback" rows={5} id="feedback" placeholder="Please provide Feedback..." 
                                            onChange={(e) => handleChange(e)} 
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                <Button variant="primary" type="submit" id="feedbackSubmit" onClick={storeData}>   
                                    Submit
                                </Button>
                                </div>
                                <div className="col-md-3"></div>

                    </Form>
                    </Col>
                    <Col md = {1}></Col>
                </Row>

            </div>
        </div>    
    )
}

export default RequestTestimonial
