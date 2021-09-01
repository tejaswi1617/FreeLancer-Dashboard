import React, { useEffect, useState } from 'react';
import PageHeader from "../components/PageHeader";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import calendarServices from "../services/calendarServices";
import moment from 'moment';
import "../styles/Calendar.scss";

export default function Calendar(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
        calendarServices.list({"userId": localStorage.getItem("user_id")}).then(res => {
            let newEvents = [...events]
            for (let i = 0; i < res.data.length; i++) {
                const dateTime = moment(`${res.data[i].date} ${res.data[i].time}`, 'YYYY-MM-DD HH:mm:ss').format();
                var data = {title : res.data[i].eventName , date : dateTime};
                newEvents.push(data);
            }
            setEvents(newEvents);
        });
    },[]);

    const [calendarEvent, setCalendarEvent] = useState({
        eventName: "",
        category: "",
        date: "",
        time: "",
        userId: localStorage.getItem("user_id")
    });

    const [calendarEventError, setCalendarEventError] = useState({
        eventName: "",
        category: "",
        date: "",
        time: ""
    });

    //New Task Validation
    const handleChange = (e) => {
        let newCalendarEvent = {...calendarEvent, [e.target.name]: e.target.value };
        setCalendarEvent(newCalendarEvent);
    };
    
    const [showModal, setShowModal] = useState(false);

    const isEventValid = (e) => {
        e.preventDefault();
        let valid = true;
        setCalendarEventError({
            eventName: "",
            category: "",
            date: "",
            time: ""
        });
        let newCalendarEventError = {...calendarEventError};

        if (!calendarEvent.eventName.length > 0) {
            newCalendarEventError.eventName = "Event Name is required";
            setCalendarEventError(newCalendarEventError);
            valid = false;
        }
        else{
            newCalendarEventError.eventName = "";
            setCalendarEventError(newCalendarEventError);
        }

        if (!calendarEvent.category.length > 0) {
            newCalendarEventError.category = "Category is required";
            setCalendarEventError(newCalendarEventError);
            valid = false;
        }
        else{
            newCalendarEventError.category = "";
            setCalendarEventError(newCalendarEventError);
        }

        if (!calendarEvent.time.length > 0) {
            newCalendarEventError.time = "Event Time is required";
            setCalendarEventError(newCalendarEventError);
            valid = false;
        }
        else{
            newCalendarEventError.time = "";
            setCalendarEventError(newCalendarEventError);
        }

        if(valid === true){
            calendarServices.add(calendarEvent).then(res => res);
            let newEvents = [...events]
            const dateTime = moment(`${calendarEvent.date} ${calendarEvent.time}`, 'YYYY-MM-DD HH:mm:ss').format();
            var data = {title : calendarEvent.eventName , date : dateTime};
            newEvents.push(data);
            setEvents(newEvents);
            handleModalClose();
        }
        return valid;
    };

    // New Task Modal Event Handle
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = (arg) => {
        calendarEvent.date = arg.dateStr;
        setShowModal(true);
    }

    return (
        <div className="page-container calendar-container">
            <div className="page-header-container">
                <PageHeader title="Calendar"/>
            </div>
            <div className="page-content-container">
                <div className="page-content">
                    <Container className="to-do-list-content"></Container>
                    <FullCalendar
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={events}
                        dateClick={handleModalShow}
                    />
                    <Modal show={showModal} onHide={handleModalClose}>
                            <Form onSubmit={(e) => isEventValid(e)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>New Calendar Event</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="show-grid">
                                    <Container>
                                        <Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Event Name</Form.Label>
                                                <Form.Control type="text" name="eventName" placeholder="Event Name..."
                                                                onChange={(e) => handleChange(e)}
                                                                className={calendarEventError.eventName.length > 0 ? "is-invalid" : ""} />
                                                <Form.Text className="text-danger">{calendarEventError.eventName}</Form.Text>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Event Category</Form.Label>
                                                <Form.Control type="text" name="category" placeholder="Event Category..."
                                                                onChange={(e) => handleChange(e)}
                                                                className={calendarEventError.category.length > 0 ? "is-invalid" : ""} />
                                                <Form.Text className="text-danger">{calendarEventError.category}</Form.Text>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Event Time</Form.Label>
                                                <Form.Control type="time" name="time" placeholder="Event Time..."
                                                                onChange={(e) => handleChange(e)}
                                                                className={calendarEventError.time.length > 0 ? "is-invalid" : ""} />
                                                <Form.Text className="text-danger">{calendarEventError.time}</Form.Text>
                                            </Form.Group>
                                        </Row>
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="secondary-button" type="reset" onClick={handleModalClose}>
                                        Close
                                    </Button>
                                    <Button className="primary-button" type="submit">
                                        Add
                                    </Button>
                                </Modal.Footer>
                            </Form>

                        </Modal>
                    </div>
                </div>
        </div>
    )
}