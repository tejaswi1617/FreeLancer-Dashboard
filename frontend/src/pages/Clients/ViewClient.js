/**
 * Author: Janvi Patel.
 * Created On: 2021-06-07
 * view Client details.
 */
import React, { Component } from 'react';
import PageHeader from "../../components/PageHeader";
import { withRouter } from 'react-router-dom';
import "../../styles/AddClient.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Table} from "react-bootstrap";

export class ViewClient extends Component {

    //constructor for props
    constructor(props) {
        super(props)

        this.state = {
            ClientId: props.history.location.state.state.ClientId,
            clientName: props.history.location.state.state.ClientName,
            organizationName: props.history.location.state.state.Organization,
            contactNo: props.history.location.state.state.ContactNo,
            websiteName: props.history.location.state.state.Website,
            linkedInProfile: props.history.location.state.state.LinkedInProfile,
            emailId: props.history.location.state.state.Email,
            street: props.history.location.state.state.Street,
            businessDescription: props.history.location.state.state.BusinessDescription,
            postalCode: props.history.location.state.state.PostalCode,
            meetingPlatform: props.history.location.state.state.MeetingPlatform,
            country: props.history.location.state.state.Country,
            region: props.history.location.state.state.Region
        }
    }

    /**
     * On click back the clients page will be redirected
     * @param {*} event
     */
    onClickBack = (event) => {
        event.preventDefault();
        this.props.history.push({ pathname: '/clients' });
    }

    render() {
        return (
            <div className="page-container add-client-container">
                <div className="page-header-container">
                    <PageHeader title="View Client" subtitle="" />
                </div>
                <div className="page-content-container">
                    <div className="page-content">
                        <Row>
                            <Col className="text-right">
                                <Button className="btn primary-button" onClick={this.onClickBack}>
                                    <i className="fas fa-times"></i> Close
                                </Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row className="justify-content-center">
                            <Col md="8">
                                <Table bordered hover>
                                    <tbody>
                                    <tr>
                                        <td>Client Name:</td>
                                        <td>{this.state.clientName}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact No:</td>
                                        <td>{this.state.contactNo}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{this.state.emailId}</td>
                                    </tr>
                                    <tr>
                                        <td>Street:</td>
                                        <td>{this.state.street}</td>
                                    </tr>
                                    <tr>
                                        <td>Postal Code:</td>
                                        <td>{this.state.postalCode}</td>
                                    </tr>
                                    <tr>
                                        <td>Region:</td>
                                        <td>{this.state.region}</td>
                                    </tr>
                                    <tr>
                                        <td>Country:</td>
                                        <td>{this.state.country}</td>
                                    </tr>
                                    <tr>
                                        <td>Organization:</td>
                                        <td>{this.state.organizationName}</td>
                                    </tr>
                                    <tr>
                                        <td>Website:</td>
                                        <td>{this.state.websiteName}</td>
                                    </tr>
                                    <tr>
                                        <td>LinkedIn Profile:</td>
                                        <td>{this.state.linkedInProfile}</td>
                                    </tr>
                                    <tr>
                                        <td>Business Description:</td>
                                        <td>{this.state.businessDescription}</td>
                                    </tr>
                                    <tr>
                                        <td>Meeting Platform:</td>
                                        <td>{this.state.meetingPlatform}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ViewClient);