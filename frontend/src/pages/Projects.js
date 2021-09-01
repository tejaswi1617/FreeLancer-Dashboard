/**
 * Author: Sanket Shah.
 * Created On: 2021-07-20
 * Listing File for Projects.
 */

import React from 'react';
import { useState, useEffect } from 'react';
import PageHeader from "../components/PageHeader";
import AddProject from './Projects/AddProject';
import Datatable from "../components/Datatable";
import '../styles/style.scss';
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Redirect, useHistory } from 'react-router-dom';
import projectsServices from '../services/projectsServices.js'
import "../styles/Projects.scss";

/**
 *  Functionality for listing down the list of projects
 */
export default function Projects() {

    const columns = [
        { Header: 'Project Title', accessor: 'title' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'Client Name', accessor: 'client' },
        { Header: 'Status', accessor: 'status' },
        {
            Header: 'Actions', accessor: 'row',
            Cell: ({ row }) => (<div className="data-table-button"><a className="secondary-button" align="right" onClick={() => viewDetails(row.original._id)} >View</a><a title="Edit Project" onClick={() => editProject(row.original._id)} className="secondary-button">Edit</a><a title="Delete Project" onClick={() => { deleteProject(row.original) }} className="delete-button">Delete</a></div>)
        }
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        projectsServices.list({"userId": localStorage.getItem("user_id")}).then(res => setData(res.data));
    },[]);

    const deleteProject = (project) => {
        if (window.confirm("Are you sure?")) {
            let newData = [...data];
            projectsServices.remove(project).then(res => alert(res.message));
            projectsServices.list().then(res => setData(res.data));
        }
    };

    const [checkForm, setCheckForm] = useState(true);

    const validate = () => {
        setCheckForm(false);
    }

    const history = useHistory();

    async function editProject(id) {
        let url = "/projects/edit/" + id;
        history.push(url);
    }

    async function viewDetails(id) {
        let url = "/projects/view/" + id;
        history.push(url);
    }

    return (
        <div className="page-container projects-container">
            <div className="page-header-container">
                <PageHeader title="Projects" />
            </div>
            <div className="page-content-container">
            <div className="page-content">
                <Row className="button-container">
                    <Col className="text-right">
                        <a href="/projects/add" title="Add Project" className="btn primary-button">Add Project</a>
                    </Col>
                </Row>
                <Row className="data-table-container">
                    <Col>
                        <Datatable columns={columns} data={data} />
                    </Col>
                </Row>
                </div>
            </div>
        </div>
    )
}