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
import testimonialServices from '../services/testimonialServices.js';
// var dateFormat = require("dateformat");

const Testimonials = () => {

    /**
     * creting a column for a datatable to display testimonials
     */
    const columns = [
        { Header: 'Project', accessor: 'project' },
        { Header: 'Client', accessor: 'client' },
        { Header: 'Feedback', accessor: 'feedback' },
        // { Header: 'Requested on', accessor: row => dateFormat(row.requestedOn, "dd-mm-yyyy, HH:MM:ss") },

        {
            // creating an action button containig entire row details
            Header: 'Actions', accessor: 'row',
            Cell: ({ row }) => (
                <div className="action">
                    <Button className="delete-button"  onClick= {() => deleteTestimonial(row)} >Delete</Button>
                </div>
            )
        }
    ];

    /**
     * fetching list of project details through an api call
     * using project services's list functionality
     */
    const [project, setProjects] = useState([]);
    useEffect(() => {
        projectServices.list({"userId": localStorage.getItem("user_id")}).then(res => setProjects(res.data));
    },[]);

    /**
     * fetching list of clients details through api call
     * using clientServices's list functionality
     */
    const [client, setClient] = useState([]);
    useEffect(() => {
        clientServices.getAllClients(localStorage.getItem("user_id")).then(res => setClient(res.data));
    },[]);

    /**
     * fetching list of Testimonials details through api call
     * using testimonialService's list functionality
     */    const [testimonial, setTestimonial] = useState([]);
    useEffect(() => {
        testimonialServices.list({userId: localStorage.getItem('user_id')}).then(res => setTestimonial(res.data));
    },[]);

    /**
     * Constant containing mailing information to send to
     */
    const [mailInfo, setMailInfo] = useState({
        project: "",
        client: "",
        message: "",
        id: "",
        userId: localStorage.getItem('user_id')
    });

    /**
     * Storing the values into the database using testimonialService's add functionality
     * @param {*} e
     * the response containig automated genrated id is fetched and stored into mailInfo's id parameter
     */
    const storeData = (e) => {
        e.preventDefault();
        setLgShow(false);
        testimonialServices.add(mailInfo).then(response => {
            mailInfo.id = response.result._id
        })

        sendEmail();
    }

    /**
     * Method to send email on click event.
     * @param {*} data
     * The emails can be sent on specif id's using this functionalities.
     */
    function sendEmail() {

        const Form_Link = "http://localhost:3001/testimonials/requestTestimonials/" + mailInfo.id;

        // Mailing details
        var mailParams = {

            //Mail Sender Details
            freelancerName: 'Freelancer',
            freelancerMail: 'deepatel1607@gmail.com',

            //Mail Reciver Details
            clientName: 'Client',
            clientMail: 'dee16798ppatel@gmail.com',

            //Attachment Messages
            message: mailInfo.message,
            link: Form_Link
        };

        // calling emailJS functionality with emailJS Credentials
        emailjs.send('testimonial_request', 'template_fmwc5oo', mailParams, 'user_INB1ILGAt4GVje2eeyj2V')
            .then(function (response) {
                alert("Email Sent");
            }, function (error) {
                alert("Error: " + error);
                console.log(error);
            });
    }

    /**
     * Functionality to delete testimonials with a specific id of testimonial
     * @param {*} row
     */
    const deleteTestimonial = (row) => {
        if (window.confirm("Are you sure?")) {
            testimonialServices.delete(row.original).then(res => alert(res.message));
            testimonialServices.list({userId: localStorage.getItem('user_id')}).then(res => setTestimonial(res.data));
        }
    };

    /**
     * onChange of the values store the values into mailInfo Parameters
     * @param {*} e
     * parameter e containig the values is used to fetch form element on change
     */
    const handleChange = (e) => {
        let newRequest = {...mailInfo, [e.target.name]: e.target.value};
        setMailInfo(newRequest);
    };

    // Model display constant to display model when true
    const [lgShow, setLgShow] = useState(false);

    return (
        <div className="page-container add-testimonial-container">
            <div className="page-header-container">
                <PageHeader title="Testimonials" />
            </div>
            <div className="page-content-container">
                <div className="page-content">
                    <Row>
                        <Col xs={12}>
                            <div className="col-md-2 button-container">
                                <div className="row my-add-btn">
                                    <div className="col-md-5"></div>
                                    <div className="col-md-7">
                                        <div className="add-testimonial-container">
                                            <div className="generate-button-container">
                                                <button className="primary-button" type="button" align="right" onClick={() => setLgShow(true)}> Request</button>
                                            </div>
                                        </div>
                                        <Modal
                                            size="lg"
                                            show={lgShow}
                                            onHide={() => setLgShow(false)}
                                            aria-labelledby="example-modal-sizes-title-lg"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-lg">
                                                    Request Testimonial
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form id="contact-form">

                                                    <input type="hidden" name="freelancerName" id="freelancerName" value="Freelancer_Deep" />
                                                    <input type="hidden" name="freelancerMail" id="freelancerMail" value="deepatel1607@gmail.com" />
                                                    <input type="hidden" name="clientName" id="clientName" value="Client_Deep" />
                                                    <input type="hidden" name="clientMail" id="clientMail" value="dee16798ppatel@gmail.com" />
                                                    <input type="hidden" name="message" id="message" value="From hidden" />

                                                    <Form.Group>
                                                        <Form.Label className="required form-label">Client</Form.Label>
                                                        <Form.Control as="select" name="client"
                                                                      onChange={(e) => handleChange(e)}
                                                        >
                                                            <option>Select Client</option>
                                                            {client.length && client.map(function(cli,index){
                                                                return <option key={index} value={cli.ClientName}>{cli.ClientName}</option>
                                                            })}
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label className="required form-label">Project</Form.Label>
                                                        <Form.Control as="select" name="project"
                                                                      onChange={(e) => handleChange(e)}
                                                        >
                                                            <option>Select Project</option>
                                                            {project.length && project.filter(proj => proj.client && proj.client.includes(mailInfo.client))
                                                                .map(function(proj,index){
                                                                    return <option key={index} value={proj.title}>{proj.title}</option>
                                                                })}
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group>
                                                        <Form.Label className="required form-label">Description Message</Form.Label>
                                                        <Form.Control as="textarea" name="message" rows={3} id="message"
                                                                      onChange={(e) => handleChange(e)}
                                                        />
                                                    </Form.Group>
                                                    <Button variant="primary" type="submit" id="button" value="Send" onClick={storeData} >
                                                        Send
                                                    </Button>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Datatable columns={columns} data={testimonial} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    )
}

export default Testimonials
