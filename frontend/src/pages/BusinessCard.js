import React, { Component } from 'react'
import { withRouter } from "react-router";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageHeader from "../components/PageHeader";
import { exportComponentAsJPEG } from 'react-component-export-image';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';
import testimonialServices from ".././services/testimonialServices"
import registerServices from ".././services/registerServices"
import ".././styles/BusinessCard.scss";

/**
 * Author: Bansi Mehta.
 * Created On: 2021-07-06
 * BusinessCard Front component.
 */
class BusinessCardFront extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="business-card-container">
                <div className="business-card-top">
                    <div className="business-card-front">
                        <div className="name">
                            {this.props.apiData.Name ? (
                                <span>{this.props.apiData.Name}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div className="email other-information">
                            {this.props.apiData.Email ? (
                                <span><i class="fas fa-envelope-square"></i>&nbsp;{this.props.apiData.Email}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div className="phone-number other-information">
                            {this.props.apiData.ContactNo ? (
                                <span><i class="fas fa-phone-alt"></i>&nbsp;{this.props.apiData.ContactNo}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div className="linked-in-profile other-information">
                            {this.props.apiData.LinkedInProfile ? (
                                <span><i class="fab fa-linkedin"></i>&nbsp;{this.props.apiData.LinkedInProfile}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div className="web-site other-information">
                            {this.props.apiData.Website ? (
                                <span><i class="fas fa-at"></i>&nbsp;{this.props.apiData.Website}</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="business-class-bottom">
                    <div className="bottom-bar bar-first"></div>
                    <div className="bottom-bar bar-second"></div>
                    <div className="bottom-bar bar-third"></div>
                    <div className="bottom-bar bar-fourth"></div>
                    <div className="bottom-bar bar-fifth"></div>
                    <div className="bottom-bar bar-sixth"></div>
                </div>
            </div>
        )
    }
}

/**
 * Author: Bansi Mehta.
 * Created On: 2021-07-06
 * BusinessCard Back component.
 */
class BusinessCardBack extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="business-card-container">
                <div className="business-card-top">
                    <div className="business-card-back">
                        <div className="feedback-row">
                        Client Feedback...
                        </div>
                        
                        {
                            this.props.apiData && this.props.apiData.length ? this.props.apiData.map(row => (
                                <div className="feedback-row">
                                    <span className="feedback">{row.feedback}</span><span className="client">{row.client}</span>
                                </div>
                            )) : (
                                <div className="empty-review">Eager To Help Out.....</div>
                            )
                        }
                    </div>
                </div>
                <div className="business-class-bottom">
                    <div className="bottom-bar bar-first"></div>
                    <div className="bottom-bar bar-second"></div>
                    <div className="bottom-bar bar-third"></div>
                    <div className="bottom-bar bar-fourth"></div>
                    <div className="bottom-bar bar-fifth"></div>
                    <div className="bottom-bar bar-sixth"></div>
                </div>
            </div>
        )
    }
}

/**
 * Author: Bansi Mehta.
 * Created On: 2021-07-06
 * BusinessCard Combined display of front and back.
 */
class BusinessClassDisplay extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <Row className="business-card-content">
                <Col className="business-card-data">
                    <Flippy flipOnHover={true} style={{ display: "flex", justifyContent: "center", width: '24rem', height: '12rem' }}>
                        <FrontSide>
                            <BusinessCardFront apiData={this.props && this.props.data && this.props.data.profileData} />
                        </FrontSide>
                        <BackSide>
                            <BusinessCardBack apiData={this.props && this.props.data &&  this.props.data.testimonialData} />
                        </BackSide>
                    </Flippy>
                </Col>
            </Row>
        )

    }
}

/**
 * Author: Bansi Mehta.
 * Created On: 2021-07-06
 * BusinessCard Screen for displaying and printing.
 */
export class BusinessCard extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef();
        this.state = {
            profileData: {},
            testimonialData: [],
            exportSide: 'Front'
        }
    }

    exportAsSide = (side) => {
        this.setState({ exportSide: side })
    }

    componentDidMount() {
        let id = localStorage.getItem('user_id')
        registerServices.fetchUserById(id).then(response => {
            if (response) {
                this.setState({profileData: response})
            }
        })

        testimonialServices.list({"userId": id}).then(response => {
            if (response.data && response.data.length) {
                this.setState({testimonialData: response.data.splice(0,2)})
            }
        })
    }

    render() {
        return (
            <div>
                <div className="page-container business-card-page">
                    <div className="page-header-container">
                        <PageHeader title="Business Card" subtitle="" />
                    </div>
                    <div className="page-content-container">
                        <div className="page-content">
                            <Row>
                                <Col xs={12}>
                                    <BusinessClassDisplay data={this.state}></BusinessClassDisplay>
                                </Col>
                                <Col xs={4} className="button-to-export">
                                    <div className="button-container">
                                        <ButtonGroup>
                                            <Button className="secondary-button" onClick={() => this.exportAsSide('Front')}>Front</Button>
                                            <Button className="secondary-button" onClick={() => this.exportAsSide('Back')}>Back</Button>
                                        </ButtonGroup>
                                    </div>
                                </Col>
                                <Col xs={8}>
                                    <React.Fragment>
                                        <div>
                                            {
                                                this.state.exportSide === 'Front' ? (
                                                    <BusinessCardFront ref={this.componentRef} apiData={this.state.profileData} />

                                                ) : (
                                                    <BusinessCardBack ref={this.componentRef} apiData={this.state.testimonialData} />
                                                )
                                            }
                                        </div>
                                        <div className="export-button">
                                            <Button className="primary-button" onClick={() => exportComponentAsJPEG(this.componentRef)}>Export As JPEG</Button>
                                        </div>
                                    </React.Fragment>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BusinessCard)
