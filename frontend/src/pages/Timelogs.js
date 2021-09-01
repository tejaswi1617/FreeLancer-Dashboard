/* Author: Vishal Sancheti */

import React, { useEffect, useState } from 'react';
import moment from 'moment'
import PageHeader from "../components/PageHeader";
import Datatable from "../components/Datatable";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";

import timelogServices from '../services/timelogServices.js'
import projectServices from '../services/projectsServices.js'
import clientService from "../services/clientService";

export default function Timelogs() {
    //Init
    const columns = [
        { Header: 'Project', accessor: 'project.title' },
        { Header: 'Client', accessor: 'project.client' },
        { Header: 'Task', accessor: 'task' },
        { Header: 'Start At', accessor: row => moment(row.startAt).format("DD-MM-YYYY hh:mm:ss")},
        { Header: 'End At', accessor: row => row.endAt ? moment(row.endAt).format("DD-MM-YYYY hh:mm:ss"):"-"},
        { Header: 'Action', id: 'action', accessor: 'row',
            Cell: ({ row }) => (<Button className="delete-button" onClick={() => { deleteTask(row) }}>Delete</Button>)
        }
    ];
    const [data, setData] = useState([]);

    useEffect(() => {
        timelogServices.list({"userId": localStorage.getItem("user_id")}).then(res => setData(res.data));
    },[]);

    useEffect(() => {
        if(data.length){
            let lastTask = data[0];
            if(lastTask && !lastTask.endAt){
                setTask(lastTask);
                restartTimer(new Date(lastTask.startAt));
            }
        }
    },[data]);

    // Timer properties and actions
    const [timerState, setTimerState] = useState(0);
    const [timerStart, setTimerStart] = useState(Date.now());
    const [timerEnd, setTimerEnd] = useState(Date.now());
    const [timerString, setTimerString] = useState("00 : 00 : 00 : 00");
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        let centiseconds = ("0" + (Math.floor(timer / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timer / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timer / 3600000)).slice(-2);
        setTimerString(hours + " : " + minutes + " : " + seconds + " : " + centiseconds);
    }, [timer]);
    const startTimer = () => {
        if (timerState === 0) {
            setTimerStart(Date.now() - timer);
            setTimerState(
                setInterval(() => {
                    setTimer(Date.now() - timerStart)
                }, 10)
            );
        }
    };
    const restartTimer = (startAt) => {
        if (timerState === 0) {
            setTimerStart(startAt - timer);
            setTimer(Date.now() - startAt);
            setTimerState(
                setInterval(() => {
                    setTimer( Date.now() - startAt)
                }, 10)
            );
        }
    };
    const stopTimer = () => {
        setTimerEnd(Date.now());
        clearInterval(timerState);
        setTimerState(0);
        setTimer(0);
    };

    // New Task States
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    useEffect(() => {
        clientService.getAllClients(localStorage.getItem("user_id")).then(res => setClients(res.data));
    },[]);
    useEffect(() => {
        projectServices.list({"userId": localStorage.getItem("user_id")}).then(res => setProjects(res.data));
    },[]);
    const [task, setTask] = useState({
        project: "",
        client: "",
        task: "",
        startAt: "",
        endAt: ""
    });
    const [taskError, setTaskError] = useState({
        project: "",
        client: "",
        task: ""
    });
    const [showModal, setShowModal] = useState(false);

    //New Task Validation
    const handleChange = (e) => {
        let newTask = { ...task, [e.target.name]: e.target.value };
        setTask(newTask);
    };
    const isTaskValid = () => {
        let valid = true;
        setTaskError({
            project: "",
            client: "",
            task: ""
        });

        if (!task.project.length > 0) {
            let newTaskError = { ...taskError };
            newTaskError.project = "Project is required";
            setTaskError(newTaskError);
            valid = false;
        }

        if (!task.client.length > 0) {
            let newTaskError = { ...taskError };
            newTaskError.client = "Client is required";
            setTaskError(newTaskError);
            valid = false;
        }

        if (!task.task.length > 0) {
            let newTaskError = { ...taskError };
            newTaskError.task = "Task is required";
            setTaskError(newTaskError);
            valid = false;
        }
        return valid;
    };

    // New Task Modal Event Handle
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    // New Task Actions
    const startTask = (e) => {
        e.preventDefault();
        if (isTaskValid()) {
            startTimer();
            task.startAt = Date.now();
            task.userId = localStorage.getItem("user_id");
            timelogServices.add(task).then(res => {task._id = res.data._id; task.project = res.data.project});
            setData(data => [task, ...data]);
            handleModalClose();
        }
    };
    const stopTask = () => {
        stopTimer();
        let newData = [...data];
        newData[0].endAt = Date.now();
        timelogServices.update(newData[0]).then(res => alert(res.message));
        setData(newData);
        setTask({
            project: "",
            client: "",
            task: "",
            startAt: "",
            endAt: ""
        });
    };
    const deleteTask = (task) => {
        if (window.confirm("Are you sure?")) {
            let newData = [...data];
            timelogServices.remove(newData[0]).then(res => alert(res.message));
            newData.splice(task.index, 1);
            setData(newData);
        }
    };

    return (
        <div className="page-container timelogs-container">
            <div className="page-header-container">
                <PageHeader title="Time logs" subtitle="" />
            </div>
            <div className="page-content-container">
                <div className="page-content">
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Card>
                                <Card.Body className="text-center">
                                    <Card.Title style={{ fontSize: "2.5rem" }}>{timerString}</Card.Title>
                                    {timer <= 0 &&
                                    <Button className="primary-button btn" onClick={handleModalShow}>Start</Button>
                                    }
                                    {timer > 0 &&
                                    <>
                                        <Card.Subtitle className="mb-2 text-muted">Task: {task.task}</Card.Subtitle>
                                        <Button className="delete-button btn" onClick={stopTask}>Stop</Button>
                                    </>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Modal show={showModal} onHide={handleModalClose}>
                        <Form onSubmit={(e) => startTask(e)}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Task</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="show-grid">
                                <Container>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Client</Form.Label>
                                                <Form.Control as="select" name="client"
                                                              onChange={(e) => handleChange(e)}
                                                              className={taskError.client.length > 0 ? "is-invalid" : ""}>
                                                    <option value="">Select Client</option>
                                                    {clients.length && clients.map(function(client,index){
                                                        return <option key={index} value={client.ClientName}>{client.ClientName}</option>
                                                    })}
                                                </Form.Control>
                                                <Form.Text className="text-danger">{taskError.client}</Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Project</Form.Label>
                                                <Form.Control as="select" name="project"
                                                              onChange={(e) => handleChange(e)}
                                                              className={taskError.project.length > 0 ? "is-invalid" : ""}>
                                                    <option value="">Select Project</option>
                                                    {projects.length && projects.filter(project => project.client && project.client.includes(task.client))
                                                        .map(function(project,index){
                                                            return <option key={index} value={project._id}>{project.title}</option>
                                                        })}
                                                </Form.Control>
                                                <Form.Text className="text-danger">{taskError.project}</Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Task</Form.Label>
                                                <Form.Control type="text" name="task" placeholder="Task Description..."
                                                              onChange={(e) => handleChange(e)}
                                                              className={taskError.task.length > 0 ? "is-invalid" : ""} />
                                                <Form.Text className="text-danger">{taskError.task}</Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="secondary-button" type="reset" onClick={handleModalClose}>
                                    Close
                                </Button>
                                <Button className="primary-button" type="submit">
                                    Start
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal>
                    <Datatable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}


