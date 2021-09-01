/**
 * Author: Janvi Patel.
 * Created On: 2021-06-07
 * Notification details.
 */

import "../styles/DashboardNavbar.scss";
import {Dropdown, Modal} from "react-bootstrap";
import React,  {Component} from 'react';
import NotificationService from "../services/notificationService"
import { withRouter } from "react-router";
import moment from "moment";

class Notification extends Component
{
    //constructor for props
    constructor(props) {
        super(props);

        this.state = {
            values: [],
            value: {},
            notificationShow: false
        };

        this.userId = localStorage.getItem("user_id");
        this.currentDate = moment().format('YYYY-MM-DD')
    }

    /**
     * On call of fetch notification the API call has beeen made and all notification setup in calendar will be fetched
     * @param {*} event 
    */
    fetchNotifications(){
       
        NotificationService.fetchNotifications({"currentDate": this.currentDate, "userId": this.userId}).then((response) => {
            let notifications = [];
            response.data.forEach(element => {
                let item = {};
                item.eventName = element.eventName;
                item.category = element.category;
                item.viewStatus = element.viewStatus;
                item.className = item.viewStatus ? "" : 'text-primary';
                notifications.push(item)
            });
            this.setState({
                values: notifications
            });
        }).catch((error) => {
            console.log("Error")
        })
    }

    /**
     * On mount, fetch the details of notification.
     * @param {*} event 
    */
    componentDidMount() {
        this.fetchNotifications();
    }

    /**
     * On handlenotification close the modal status will be set false
     * @param {*} event 
    */
    handleNotificationClose(){
        this.setState({notificationShow:false});
    };

    /**
     * On handlenotification show the modal status will be set true
     * @param {*} event 
    */
    handleNotificationShow(){
        this.setState({notificationShow:true});
    };

    /**
     * Open notification will be called once the notification is opened by user
     * @param {*} event 
    */
    openNotification = (value) => {
        this.setState({value:value});
        NotificationService.setStatus({"currentDate": this.currentDate, "value": value}).then((response) => {
            this.fetchNotifications();
            this.handleNotificationShow();
        }).catch((error) => {
            console.log("Error")
        });
    };

    render() {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle title="Notification" id="bellIcon">
                        <i className="fas fa-bell"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="notificationPanel" >
                        {this.state.values.map((value,index) => {
                            return <Dropdown.Item className="border-bottom" onClick = { () => this.openNotification(value)}>
                                <span className={value.className} >{value.eventName}</span>
                            </Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <Modal show={this.state.notificationShow} onHide={() => this.handleNotificationClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.value.category}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.value.eventName}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Notification)
