/**
 * Author: Bansi Mehta.
 * Created On: 2021-06-07
 * Todo list component.
 */
import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Container, Col, Row, Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import moment from "moment";
import axios from 'axios'
import "../styles/TodoList.scss";
import PageHeader from "../components/PageHeader";
import todoListService from "../services/todoListService";
export class TodoList extends Component {

    constructor(props) {
        super(props)

        const currentDate = moment().format('YYYY-MM-DD')
        this.state = {
            completeTasks: [],
            incompleteTasks: [],
            date: currentDate,
            newTask: ''
        }

        this.item = {
            title: '',
            status: false,
            date: currentDate
        }
        this.userId = localStorage.getItem("user_id")
    }

    componentDidMount() {
        this.getAllData(this.state.date)
    }

    /**
     * On value change of a control, set it in state.
     * @param {*} event 
     */
    onValueChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * Get all the tasks based on date.
     * Date format: "YYYY-MM-DD".
     * Divide the tasks received into groups: complete and incomplete to display.
     * @param {*} date 
     */
    getAllData(date) {
        todoListService.getAllTasks({"currentDate": date, "userId": this.userId}).then(response => {
            if (response.status === 200) {
                if (response.data && response.data.result && response.data.result.length) {
                    let completeTask = []
                    let incompleteTask = []
                    response.data.result.forEach(row => {
                        if (row && row.status == true) {
                            completeTask.push(row)
                        } else {
                            incompleteTask.push(row)
                        }
                    })
                    this.setState({ completeTasks: completeTask })
                    this.setState({ incompleteTasks: incompleteTask })
                } else {
                    this.setState({ completeTasks: [] })
                    this.setState({ incompleteTasks: [] })
                }
            }
        })
    }

    /**
     * Mark the task item as complete based on id.
     * Refresh the list if successful.
     * @param {*} rowData 
     */
    taskItemComplete(rowData) {
        todoListService.markTaskAsDone(rowData._id).then(response => {
            if (response.status == 200) {
                this.getAllData(this.state.date)
                alert("Task completed successfully");
            }
        })
    }

    /**
     * Delete the task based on id.
     * Refresh the list if successful.
     * @param {*} rowData 
     */
    taskItemDelete(rowData) {
        todoListService.deleteTask(rowData._id).then(response => {
            if (response.status == 200) {
                this.getAllData(this.state.date);
                alert("Task deleted successfully");
            }
        })
    }

    /**
     * Add new task.
     * Refresh the list if successful.
     * @param {*} event 
     */
    saveItem = (event) => {
        event.preventDefault()
        if (this.state.newTask) {
            let saveData = {
                title: this.state.newTask,
                date: this.state.date,
                userId: this.userId
            }
            todoListService.saveTask(saveData).then(response => {
                if (response.status == 200) {
                    this.setState({ newTask: '' })
                    this.getAllData(this.state.date)
                    alert("Task added successfully");
                }
            })
        } else {
            alert("Cannot enter empty task")
        }
        
    }

    /**
     * Date navigation: Get previous date from the date for which tasks are currently displayed.
     * @param {*} event 
     */
    getPreviousDate = (event) => {
        let previousDate = moment(this.state.date, 'YYYY-MM-DD').subtract(1, 'day').format("YYYY-MM-DD")
        this.setState({ date: previousDate })
        this.getAllData(previousDate)
    }

    /**
     * Date navigaiton: Get next date from the date for which tasks are currently displayed.
     * @param {*} event 
     */
    getNextDate = (event) => {
        let nextDate = moment(this.state.date, 'YYYY-MM-DD').add(1, 'day').format("YYYY-MM-DD")
        this.setState({ date: nextDate })
        this.getAllData(nextDate)
    }

    render() {
        return (
            <div className="page-container to-do-list-container">
                <div className="page-header-container">
                    <PageHeader title="Todo List" subtitle="" />
                </div>
                <div className="page-content-container">
                    <div className="page-content">
                        <Container className="to-do-list-content">
                            <Row className="date-row">
                                <Col className="date-control">
                                    <span className="navigate-date" onClick={this.getPreviousDate}>
                                        <i className="fas fa-chevron-left"></i>
                                    </span>
                                    <span>
                                        {this.state.date}
                                    </span>
                                    <span className="navigate-date" onClick={this.getNextDate}>
                                        <i className="fas fa-chevron-right"></i>
                                    </span>
                                </Col>
                            </Row>
                            <Row className="add-row">
                                <div className="add-text">
                                    <input type="text" palceholder="Add task" name="newTask" value={this.state.newTask} onChange={this.onValueChange} className="input-control" />
                                </div>
                                <div className="add-button">
                                    <Button className="primary-button add-button" onClick={this.saveItem}>Add</Button>
                                </div>
                            </Row>
                            <Row className="to-do-list-items">
                                <Col md={12} lg={6}>
                                    <div>
                                        {this.state.incompleteTasks.map(row => (
                                            <Card className="card-content-incomplete">
                                                <Row className="card-item">
                                                    <Col xs={3} md={2} className="card-item-content">
                                                        <input type="checkbox" checked={row.status} onClick={() => this.taskItemComplete(row)}></input>
                                                    </Col>
                                                    <Col xs={3} md={7} className="card-item-content">
                                                        <Card.Body>
                                                            <Card.Title>{row.title}</Card.Title>
                                                        </Card.Body>
                                                    </Col>
                                                    <Col xs={3} md={3} className="card-item-content">
                                                        <Button className="primary-button" onClick={() => this.taskItemDelete(row)}>Delete</Button>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        ))}
                                    </div>
                                </Col>
                                <Col md={12} lg={6}>
                                    <div>
                                        {this.state.completeTasks.map(row => (
                                            <Card className="card-content-complete">
                                                <Card.Body>
                                                    <Card.Title className="card-item-completed">{row.title}</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(TodoList);