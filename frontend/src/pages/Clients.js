/**
 * Author: Janvi Patel.
 * Created On: 2021-06-07
 * Clients details.
 */

import React from 'react';
import PageHeader from "../components/PageHeader";
import Datatable from "../components/Datatable";
import {
  withRouter
} from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import "../styles/Clients.scss";
import './Clients/AddClient'
import { Component } from "react";
import clientService from "../services/clientService"


export class Clients extends Component {
  
  //constructor for props
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      ClientName: "",
      Organization: "",
      ContactNo: "",
      Emailid: ""
    }
    this.handleNewClient = this.handleNewClient.bind(this);

    this.columns = [
      { Header: 'Client Name', accessor: 'ClientName' },
      { Header: 'Contact No', accessor: 'ContactNo' },
      { Header: 'Email', accessor: 'Emailid' },
      { Header: 'Website', accessor: 'Website' },
      {
        Header: 'Action', accessor: 'row',
        Cell: ({ row }) => (
          
          <div className="generate-button-container">
            <Button className="secondary-button" align="right" onClick={() => this.viewDetails(row)} >View</Button>
            <Button className="secondary-button" align="right"  onClick={() => this.editDetails(row)} >Edit</Button>
            <Button className="delete-button" align="right"  onClick={() => this.deleteDetails(row)} >Delete</Button>
          </div>
        )
      }]; 

      this.userId = localStorage.getItem("user_id")
  }

  /**
     * On mount, set the values of table.
     * @param {*} event 
  */
  componentDidMount() {
    
    clientService.getAllClients(this.userId).then((response) => {
        if (response.status == 200) {
            this.setData(response.data);
            let newDetails = [];
            response.data.forEach(element => {
              let row = {}
              row.ClientName = element.ClientName;
              row.ContactNo = element.ContactNo;
              row.Emailid = element.Email;
              row.Website = element.Website;
              newDetails.push(row)
            });
            this.setState({
              data: newDetails
            })
        }
    }).catch((error) => {
        console.log(error)
    })

  }

  /**
     * On click of view details select view client API call
     * @param {*} event 
  */
  viewDetails = (row) => {

    clientService.viewOneClient(row.original).then((response) => {  
        this.props.history.push({ pathname: '/ViewClient' }, {
          state: response.data
        })
    }).catch((error) => {
        console.log(error)
    })
  }

   /**
     * On click of edit details edit client API call
     * @param {*} event 
  */
  editDetails = (row) => {
    clientService.viewOneClient(row.original).then((response) => {  
        this.props.history.push({ pathname: '/EditClient' }, {
          state: response.data
        })
    }).catch((error) => {
        console.log(error)
    })
  };

  /**
     * On click of delete details delete client API call and set table
     * @param {*} event 
  */
  deleteDetails = (row) => {
    clientService.deleteClient(row.original).then((response) => {
          alert("Successfully deleted entry!!");
          clientService.getAllClients(this.userId).then((response) => {
              if (response.status == 200) {
                  this.setData(response.data);
                  let newdetails = [];
                  response.data.forEach(element => {
                    let row = {}
                    row.ClientName = element.ClientName;
                    row.ContactNo = element.ContactNo;
                    row.Emailid = element.Email;
                    row.Website = element.Website;
                    newdetails.push(row)
                  });
                  this.setState({data: newdetails})
                }
          }).catch((error) => {
              console.log(error)
          })
      }).catch((error) => {
          console.log(error)
      })
  }

  setData = (response) => {
    this.data = []
  }

  /**
     * On click of handle new client add new client detail redirected
     * @param {*} event 
  */
  handleNewClient = (e) => {
    e.preventDefault();
    this.props.history.push({ pathname: '/clients/add', 
                              userId: this.userId});
  };

  render() {
    return (
      <div>
        <div className="page-container clients-container">
          <div className="page-header-container">
            <PageHeader title="Clients" subtitle="" />
          </div>
          <div className="page-content-container">
            <div className="page-content">
              <Row className="button-container">
                <Col>
                  <Button className="primary-button" type="button" align="right" onClick={this.handleNewClient} >Add New</Button>
                </Col>
              </Row>
              <Row className="data-table-container">
                <Col>
                  <Datatable columns={this.columns} data={this.state.data} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Clients);
