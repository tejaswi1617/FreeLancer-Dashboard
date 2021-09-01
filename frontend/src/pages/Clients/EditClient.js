/**
 * Author: Janvi Patel.
 * Created On: 2021-06-07
 * Edit Client details.
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
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import clientService from "../../services/clientService";

export class EditClient extends Component
{
    //constructor for props
    constructor(props) {
        super(props)

        this.state = {
            clientId: props.history.location.state.state.ClientId,
            clientName: props.history.location.state.state.ClientName,
            clientNameError: "",
            organizationName: props.history.location.state.state.Organization,
            organizationNameError: "",
            contactNo: props.history.location.state.state.ContactNo,
            contactNoError: "",
            websiteName: props.history.location.state.state.Website,
            websiteNameError: "",
            emailId: props.history.location.state.state.Email,
            emailIdError: "",
            linkedInProfile: props.history.location.state.state.LinkedInProfile,
            linkedInProfileError: "",
            street: props.history.location.state.state.Street,
            streetError: "",
            businessDescription: props.history.location.state.state.BusinessDescription,
            postalCode: props.history.location.state.state.PostalCode,
            PostalCodeError: "",
            meetingPlatform: props.history.location.state.state.MeetingPlatform,
            meetingPlatformError: "",
            country: props.history.location.state.state.Country,
            region: props.history.location.state.state.Region
        }
    }

    /**
     * On mount, set the values of table.
     * @param {*} event
     */
    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * On mount, set the values of table.
     * @param {*} event
     */
    selectCountry (name, val) {
        this.setState({  name: val });
    }

    /**
     * On mount, set the values of table.
     * @param {*} event
     */
    selectRegion (val) {
        this.setState({ name: val });
    }

    /**
     * validate client name is null or not
     * @param {*} event
     */
    validateClient = (event) => {
        let isValid = true;
        if (!this.state.clientName) {
            this.setState({ clientNameError: "Client Name is required" })
            isValid = false;
        }
        else {
            this.setState({ clientNameError: "" })
        }
        return isValid;
    }

    /**
     * Validate organization is null or not
     * @param {*} event
     */
    validateOrganization = (event) => {
        let isValid = true;
        if (!this.state.organizationName) {
            this.setState({ organizationNameError: "Organization Name is required" })
            isValid = false;
        }
        else {
            this.setState({ organizationNameError: "" })
        }
        return isValid;
    }

    /**
     * Validate contactNo with numbers and contact no is null or not
     * @param {*} event
     */
    validateContactNo = (event) => {
        let isValid = true;
        if (!this.state.contactNo) {
            this.setState({ contactNoError: "Contact No is required" })
            isValid = false;
        }
        var pattern = new RegExp(/^[0-9\b]+$/);
        const result = pattern.test(this.state.contactNo);
        if (result === false) {
            this.setState({
                isValid: false,
                contactNoError: "Contact No is invalid: can contain Number and contry code only"
            })
        }
        else {
            this.setState({ contactNoError: "" })
        }
        return isValid;
    }

    /**
     * Validate website name with pattern and website is null or not
     * @param {*} event
     */
    validateWebsiteName = (event) => {
        let isValid = true;

        if(this.state.websiteName){
            const pattern = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/g;
            const result = pattern.test(this.state.websiteName);
            if (result === false) {
                this.setState({
                    isValid: false,
                    websiteNameError: "Provided website is invalid: should contain domain name"
                })
            }
            else {
                this.setState({ websiteNameError: "" })
            }
        }
        return isValid;
    }

    /**
     * Validate email id with pattern
     * @param {*} event
     */
    validateEmailId = (event) => {
        let isValid = true;
        if (!this.state.emailId) {
            this.setState({ emailIdError: "Email Id is required" })
            isValid = false;
        }
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(this.state.emailId);
        if (result === false) {
            this.setState({
                isValid: false,
                emailIdError: "Provided email Id is invalid: should contain '@' and domain name"
            })
        } else {
            this.setState({ emailIdError: "" })
        }
        return isValid;
    }

    /**
     * Validate linkedin profile with pattern
     * @param {*} event
     */
    validateLinkedInProfile = (event) => {

        let isValid = true;
        if(this.state.linkedInProfile){

            const pattern = /(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
            const result = pattern.test(this.state.linkedInProfile);
            if (result === false) {
                this.setState({
                    isValid: false,
                    linkedInProfileError: "LinkedIn Profile is not valid"
                })
            } else {
                this.setState({ linkedInProfileError: "" })
            }
        }
        return isValid;
    }

    /**
     * Validate street with pattern
     * @param {*} event
     */
    validateStreet = (event) => {
        let isValid = true;
        if(this.state.street){

            const pattern = /[a-zA-Z0-9]/g;
            const result = pattern.test(this.state.street);
            if (result === false) {
                this.setState({
                    isValid: false,
                    streetError: "Street should not contain special characters"
                })
            }
            else {
                this.setState({ streetError: "" })
            }
        }
        return isValid;
    }

    /**
     * Validate postal code with pattern
     * @param {*} event
     */
    validatePostalcode = (event) => {
        let isValid = true;
        if(this.state.postalCode){
            const pattern = /[a-zA-Z0-9]/g;
            const result = pattern.test(this.state.postalCode);
            if (result === false) {
                this.setState({
                    isValid: false,
                    PostalCodeError: "Postal code should not contain special characters"
                })
            }
            else {
                this.setState({ PostalCodeError: "" })
            }
        }
        return isValid;
    }

    /**
     * Validate meeting platform with pattern
     * @param {*} event
     */
    validateMeetingPlatform = (event) => {
        let isValid = true;
        if (!this.state.meetingPlatform) {
            this.setState({ meetingPlatformError: "Meeting Platform is required" })
            isValid = false;
        }
        else {
            this.setState({ meetingPlatformError: "" })
        }
        return isValid;
    }

    /**
     * Validate form
     * @param {*} event
     */
    validateForm = (event) => {
        let isValid = true
        if (!this.validateClient()) {
            isValid = false;
        }
        if (!this.validateOrganization()) {
            isValid = false;
        }
        if (!this.validateContactNo()) {
            isValid = false;
        }
        if (!this.validateWebsiteName()) {
            isValid = false;
        }
        if (!this.validateEmailId()) {
            isValid = false;
        }
        if (!this.validateLinkedInProfile()) {
            isValid = false;
        }
        if (!this.validateStreet()) {
            isValid = false;
        }
        if (!this.validatePostalcode()) {
            isValid = false;
        }
        if (!this.validateMeetingPlatform()) {
            isValid = false;
        }
        return isValid;
    }

    /**
     * On Update client will be updated and the api call will be made
     * @param {*} event
     */
    onUpdate = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            clientService.editClient(this.state).then((response) => {
            }).catch((error) => {
                console.log(error)
            })
            alert('Successfully updated details!!');
            this.props.history.push({ pathname: '/clients' });
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
                    <PageHeader title="Edit Client" subtitle="" />
                </div>
                <div className="page-content-container">
                    <div className="page-content">
                        <Row className="add-client-content">
                            <Col>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label className="required">Client Name</Form.Label>
                                                <Form.Control type="name" name="clientName" placeholder="Enter Client Name" value={this.state.clientName} onChange={this.onValueChange}
                                                              onBlur={this.validateClientName}
                                                              isInvalid = {this.state.clientNameError}/>
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.clientNameError}
                                                </Form.Control.Feedback>

                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label className="required">Organization</Form.Label>
                                                <Form.Control type="name" name="organizationName" placeholder="Enter Organization Name" value={this.state.organizationName} onChange={this.onValueChange}
                                                              onBlur={this.validateOrganization}
                                                              isInvalid = {this.state.organizationNameError} />
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.organizationNameError}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label className="required">Contact No</Form.Label>
                                                <Form.Control type="name" name="contactNo" placeholder="Enter Contact No" value={this.state.contactNo} onChange={this.onValueChange}
                                                              onBlur={this.validateContactNo}
                                                              isInvalid={this.state.contactNoError} />
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.contactNoError}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Website</Form.Label>
                                                <Form.Control type="name" name="websiteName" placeholder="Enter Website Name" value={this.state.websiteName} onChange={this.onValueChange}
                                                              onBlur={this.validateWebsiteName}
                                                              isInvalid={this.state.websiteNameError} />
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.websiteNameError}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label className="required">Email</Form.Label>
                                                <Form.Control type="name" name="emailId" placeholder="Enter Email Id" value={this.state.emailId} onChange={this.onValueChange}
                                                              onBlur={this.validateEmailId}
                                                              isInvalid={this.state.emailIdError} />
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.emailIdError}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group>
                                                <Form.Label>LinkedIn Profile</Form.Label>
                                                <Form.Control type="name" name="linkedInProfile" placeholder="Enter LinkedIn Profile" value={this.state.linkedInProfile} onChange={this.onValueChange}
                                                              onBlur={this.validateLinkedInProfile}
                                                              isInvalid={this.state.linkedInProfileError} />
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.linkedInProfileError}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Street</Form.Label>
                                                <Form.Control type="name" name="street" placeholder="Enter Street Name" value={this.state.street} onChange={this.onValueChange}
                                                              onBlur={this.validateStreet}
                                                              isInvalid={this.state.streetError} />
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.streetError}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Business Description</Form.Label>
                                                <Form.Control type="name" name="businessDescription" placeholder="Enter Business Description" value={this.state.businessDescription} onChange={this.onValueChange}
                                                              onBlur={this.validatebusinessDescription}
                                                />

                                            </Form.Group>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Postal Code</Form.Label>
                                                <Form.Control type="name" name="postalCode" placeholder="Enter Postal code" value={this.state.postalCode} onChange={this.onValueChange}
                                                              onBlur={this.validatePostalcode}
                                                              isInvalid={this.state.PostalCodeError} />
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.PostalCodeError}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label className="required">Meeting Platform</Form.Label>
                                                <Form.Control as="select" name="meetingPlatform" placeholder="Enter meeting platform" value={this.state.meetingPlatform} onChange={this.onValueChange}
                                                              onBlur={this.validateMeetingPlatform}
                                                              isInvalid={this.state.meetingPlatformError}>
                                                    <option>Select Project</option>
                                                    <option value="Google Meet">Google Meet</option>
                                                    <option value="Skype">Skype</option>
                                                    <option value="Zoom">Zoom</option>
                                                    <option value="In person">In person</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {this.state.meetingPlatformError}
                                                </Form.Control.Feedback>


                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <Row>
                                                    <Col>
                                                        <div className="country">
                                                            <Form.Label className="required">Country </Form.Label>
                                                            <CountryDropdown className="form-control" as="select" name="country" defaultOptionLabel="Select country" value={this.state.country}
                                                                             onChange={(value) => this.selectCountry(value)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="region">
                                                            <Form.Label>Region </Form.Label>
                                                            <RegionDropdown className="form-control"
                                                                country={this.state.country} blankOptionLabel="No Country Selected" defaultOptionLabel="Select region"
                                                                as="select" name="region" value={this.state.region} onChange={(value) => this.selectRegion(value)}>
                                                            </RegionDropdown>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>
                                        <Col/>
                                    </Row>

                                    <Row className="generate-button-container">
                                        <Button className="primary-button" onClick={this.onClickBack}>
                                              Back
                                        </Button>
                                        <Button className="secondary-button" onClick={this.onUpdate}>
                                            Update
                                        </Button>
                                        
                                    </Row>
                                </Form>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(EditClient);