/**
 * Author: Sanket Shah.
 * Created On: 2021-07-20
 * Add Project File.
 */

import {useState, useEffect, React} from 'react';
import PageHeader from "../../components/PageHeader";
import { Redirect, useHistory } from 'react-router-dom';
import projectsServices from '../../services/projectsServices';
import clientService from '../../services/clientService';
import {Col, Row} from "react-bootstrap";

/**
 *  Functionality for adding the project
 */
export default function AddProjects(){

    const history = useHistory();

    async function cancel() {
        let url = "/projects";
        history.push(url);
    }

    const [project, setProject] = useState({
        title: "",
        client: "",
        description: "",
        rate: "",
        invoice: "",
        status: "",
        userId: localStorage.getItem("user_id")
    });

    const [clients, setClient] = useState({
        ClientName : ""
    });

    useEffect(() => {
        clientService.getAllClients(localStorage.getItem("user_id")).then(res => setClient(res.data));
    },[]);

    const [projectError, setProjectError] = useState({
        title: "",
        client: "",
        description: "",
        rate: "",
        invoice: "",
        status: ""
    });

    const handleChange = (e) => {
        let newProject = {...project, [e.target.name]: e.target.value};
        setProject(newProject);
    };

    const isProjectValid = (e) => {
        e.preventDefault();
        let valid = true;
        setProjectError({
            title: "",
            client: "",
            description: "",
            rate: "",
            invoice: "",
            status: ""
        });
        let newProjectError = {...projectError};

        if(!project.title.length > 0){
            newProjectError.title = "Project Title is required";
            setProjectError(newProjectError);
            valid = false;
        }
        else{
            newProjectError.title = "";
            setProjectError(newProjectError);
        }

        if(!project.client.length > 0){
            newProjectError.client = "Client Name is required";
            setProjectError(newProjectError);
            valid = false;
        }
        else{
            newProjectError.client = "";
            setProjectError(newProjectError);
        }

        if(!project.description.length > 0){
            newProjectError.description = "Project Description is required";
            setProjectError(newProjectError);
            valid = false;
        }
        else{
            newProjectError.description = "";
            setProjectError(newProjectError);
        }

        // if(!project.rate.value > 0){
        //     newProjectError.rate = "Rate is required";
        //     setProjectError(newProjectError);
        //     valid = false;
        // }
        // else{
        //     newProjectError.rate = "";
        //     setProjectError(newProjectError);
        // }

        if(!project.invoice.length > 0){
            newProjectError.invoice = "Invoice Duration is required";
            setProjectError(newProjectError);
            valid = false;
        }
        else{
            newProjectError.invoice = "";
            setProjectError(newProjectError);
        }

        if(!project.status.length > 0){
            newProjectError.status = "Project Status is required";
            setProjectError(newProjectError);
            valid = false;
        }
        else{
            newProjectError.status = "";
            setProjectError(newProjectError);
        }

        if(valid === true){
            projectsServices.add(project).then(res => res);
            history.push('/projects');
        }
        return valid;
    };

    return (
        <div className="page-container">
            <div className="page-header-container">
                <PageHeader title="Projects" />
            </div>
            <div className="page-content-container">
                <div className="page-content">
                    <Row>
                        <Col>
                            <form onSubmit={(e) => isProjectValid(e)}><center>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Project Title*: </label>
                                    <div className="col-md-10">
                                        <input title="Project Title" placeholder="Enter Project Title" onChange={(e) => handleChange(e)}
                                               className={projectError.title.length > 0 ? "is-invalid form-control" : "form-control"} type="text" name="title" id="title"/>
                                        <p className="text-danger">{projectError.title}</p>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Client Name:</label>
                                    <div className="col-md-10">
                                        <select title="Client Name" onChange={(e) => handleChange(e)}
                                                className={projectError.client.length > 0 ? "is-invalid form-control" : "form-control"} title="client" name="client" className="form-control">
                                            <option value="">Select Client</option>
                                            {clients.length > 0 && clients.map(function(client,index){
                                                return <option value={client.ClientName}>{client.ClientName}</option>
                                            })}
                                        </select>
                                        <p className="text-danger">{projectError.client}</p>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Description*:</label>
                                    <div className="col-md-10">
                        <textarea title="Project Description" placeholder="Enter Project Description"  onChange={(e) => handleChange(e)}
                                  className={projectError.description.length > 0 ? "is-invalid form-control" : "form-control"} type="textarea" rows="5" title="description" name="description" id="description"/>
                                        <p className="text-danger">{projectError.description}</p>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Hourly Rates*:</label>
                                    <div className="col-md-10">
                                        <input title="Hourly Rates" min="0" placeholder="Enter Decided Hourly Rates" onChange={(e) => handleChange(e)} className={projectError.rate.length > 0 ? "is-invalid form-control" : "form-control"} type="number" name="rate" id="rate"/>
                                        <p className="text-danger">{projectError.rate}</p>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Invoice Duration:</label>
                                    <div className="col-md-10">
                                        <select title="Invoice Duration" onChange={(e) => handleChange(e)} className={projectError.invoice.length > 0 ? "is-invalid form-control" : "form-control"} name="invoice" title="invoice" className="form-control">
                                            <option value="">Select Invoice Duration</option>
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                        </select>
                                        <p className="text-danger">{projectError.invoice}</p>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Project Status:</label>
                                    <div className="col-md-10">
                                        <select title="Project Status" onChange={(e) => handleChange(e)} className={projectError.status.length > 0 ? "is-invalid form-control" : "form-control"} name="status" title="status" className="form-control">
                                            <option value="">Select Project Status</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <p className="text-danger">{projectError.status}</p>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-5"></div>
                                    <div className="col-md-2">
                                        <button type="submit" title="Submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    <div className="col-md-2">
                                        <button type="button" title="Cancel" onClick={cancel} className="btn btn-danger">Cancel</button>
                                    </div>
                                    <div className="col-md-3"></div>
                                </div>
                            </center></form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )}