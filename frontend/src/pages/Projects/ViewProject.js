/**
 * Author: Sanket Shah.
 * Created On: 2021-07-20
 * View File for Project.
 */

 import {useState, useEffect, React} from 'react';
 import PageHeader from "../../components/PageHeader";
 import { useHistory } from 'react-router-dom';
 import projectsServices from '../../services/projectsServices';
 import {Col, Row, Button, Table} from "react-bootstrap";
 
 /**
  *  Functionality for editing the project
  */
 const ViewProject = (prop) => {
 
     const history = useHistory();
 
     async function cancel() {
         let url = "/projects";
         history.push(url);
     }
 
     const params = history.location.pathname.split('/');
 
     const [project, setProject] = useState({
         title: "",
         client: "",
         description: "",
         invoice: "",
         rate: "",
         status: ""
     });

     useEffect(() => {
         projectsServices.get(params[params.length-1]).then(res => setProject(res.data));
     },[]);
 
     return (
         <div className="page-container">
             <div className="page-header-container">
                 <PageHeader title="View Project" />
             </div>
             <div className="page-content-container">
                 <div className="page-content">
                 <Row>
                    <Col className="text-right">
                        <Button className="btn primary-button" onClick={cancel}>
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
                                    <td>Project Title:</td>
                                    <td>{project.title}</td>
                                </tr>
                                <tr>
                                    <td>Client Name:</td>
                                    <td>{project.client}</td>
                                </tr>
                                <tr>
                                    <td>Description:</td>
                                    <td>{project.description}</td>
                                </tr>
                                <tr>
                                    <td>Hourly Rates:</td>
                                    <td>{project.rate}</td>
                                </tr>
                                <tr>
                                    <td>Invoice Duration:</td>
                                    <td>{project.invoice}</td>
                                </tr>
                                <tr>
                                    <td>Project Status:</td>
                                    <td>{project.status}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                 </div>
             </div>
         </div>
     );
 }
 
 export default ViewProject;