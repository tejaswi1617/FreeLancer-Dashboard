/**
 * Author: Tejaswi Chaudhary.
 * Created On: 2021-06-07
 * Invoice Management component.
 */
import React, { Component } from 'react';
import PageHeader from "../components/PageHeader";
import { Button, Col, Container, Row } from "react-bootstrap";
import Datatable from "../components/Datatable";
import { withRouter } from 'react-router-dom';
import "../styles/InvoiceManagement.scss";
import invoiceServices from "../services/invoiceServices";
import "../styles/Invoices.scss";
import Moment from 'moment';

export class Invoices extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: localStorage.getItem("user_id"),
            checkbox: 'true',
            delete: 'false',
            columns: [
                { Header: 'Invoice Number', accessor: 'invoicenumber' },
                { Header: 'Generated Date', accessor: 'generateddate' },
                { Header: 'From Date', accessor: 'fromdate' },
                { Header: 'To Date', accessor: 'todate' },
                { Header: 'Due Date', accessor: 'duedate' },
                { Header: 'Client Name', accessor: 'clientname' },
                { Header: 'Project Name', accessor: 'projectname' },
                { Header: 'Payment Status', accessor: 'paymentstatus' },
                {
                    Header: 'Action', accessor: 'button1',
                    Cell: ({ row }) => (
                        <div>
                            <Button className="secondary-button" onClick={() => this.editInvoice(row)}>Edit</Button>
                            <Button className="secondary-button" onClick={() => this.viewInvoice(row)}>View</Button>
                            <Button className="delete-button" onClick={() => this.deleteInvoice(row)}>Delete</Button>
                        </div>)
                },
            ],
            data: []
        }
    }

    //fetch list of all the generated invoices
    getAllInvoices() {

        invoiceServices.getAllInvoices(this.state).then((response) => {
            if (response.status == 200) {
                let invoiceDetails = [];
                response.data.result.forEach(element => {

                    let row = {}
                    row.invoicenumber = element._id;
                    row.generateddate = Moment(element.generatedDate).format('YYYY-MM-DD');
                    row.fromdate = Moment(element.startDate).format('YYYY-MM-DD');
                    row.todate = Moment(element.taskendDate).format('YYYY-MM-DD');
                    row.duedate = Moment(element.dueDate).format('YYYY-MM-DD');
                    row.clientname = element.clientName;
                    row.projectname = element.projectName;
                    row.paymentstatus = element.paymentStatus;
                    row.startDate = Moment(element.startDate).format('YYYY-MM-DD');

                    invoiceDetails.push(row)

                });
                if (invoiceDetails.length != 0)
                    this.setState({
                        data: invoiceDetails
                    })

            }
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getAllInvoices()
    }

    //Edit invoice
    editInvoice = (row) => {
        this.props.history.push({ pathname: '/editinvoice' }, {
            state: row.original.invoicenumber
        })
    }
    //open InvoiceGeneration.js in read-only mode to view generated invoice details.
    viewInvoice = (row) => {

        this.props.history.push({ pathname: '/invoices/generate' }, {
            state: row.original.invoicenumber
        })
    }

    //delete invoice
    deleteInvoice = (row) => {
        invoiceServices.deleteinvoice(row.original).then((response) => {
            if (response) {
                this.setState({ delete: 'true' })
                alert("Invoice Deleted")
                this.getAllInvoices()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (

            <div className="page-container">
                <div className="page-header-container">
                    <PageHeader title="Invoice Management" subtitle="" />
                </div>
                <div className="page-content-container">
                    <div className="page-content">
                        <Row>
                        <Col className="text-right mb-3">
                            <a href="/invoices/generate" title="Add Project" className="btn primary-button">
                                Generate Invoice
                            </a>
                        </Col>
                        </Row>
                        <Datatable columns={this.state.columns} data={this.state.data} allowCSV="false" />
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Invoices)