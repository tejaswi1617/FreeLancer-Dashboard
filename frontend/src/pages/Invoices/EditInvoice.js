/**
 * Author: Tejaswi Chaudhary.
 * Created On: 2021-06-07
 * Invoice Edit component.
 */
import React, { Component } from 'react';
import PageHeader from "../../components/PageHeader";
import Datatable from "../../components/Datatable";
import { withRouter } from 'react-router-dom';
import "../../styles/EditInvoice.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import invoiceServices from "../../services/invoiceServices";

export class EditInvoice extends Component {

    constructor(props) {
        super(props)
        this.state={
            projectId: props && props.history && props.history.location&&props.history.location.state &&props.history.location.state.state?props.history.location.state.state:0,
            invoiceNumber:"",
            taskendDate:"",
            taskstartDate:"",
            projects:"",
            clientName:"",
            generatedDate:"",
            dueDate:"",
            hourlyRate:"",
            Total:"",
            paymentstatus:"",
            paymentPreStatus:""
            
            
        }}
        //Fetch invoice based on invoice is to update it.
        componentDidMount() {
          
            invoiceServices.findInvoice(this.state).then((response) =>{
              
                if (response.status == 200){
                    this.setState({project: response.data.result.projectName})
                    this.setState({clientName:response.data.result.clientName})
                    this.setState({generatedDate: response.data.result.generatedDate})
                    this.setState({Total:response.data.result.totalCost})
                    this.setState({invoiceNumber:response.data.result._id})
                    this.setState({hourlyRate:response.data.result.hourlyRate})
                    this.setState({paymentPreStatus:response.data.result.paymentStatus})
                    this.setState({taskendDate:response.data.result.taskendDate})
                    this.setState({taskstartDate:response.data.result.startDate})
                } 
            }).catch((error) => {
                console.log(error)
            })
        }

        //On value change of a control, set it in state.
        onValueChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    
        //validate due date
        validateDueDate = (event) => {
            let isValid = true;
            if (this.state.dueDate) {
                const today = new Date()
                const selectedDate = new Date(this.state.dueDate)
                if (selectedDate < today) {
                    this.setState({ dueDateError: "Due Date cannot be past date" })
                    isValid = false;
                }
                else {
                    this.setState({ dueDateError: "" })
                }
            } 
            return isValid;
        }
    
        //validate form
        validateForm = (event) => {
            let isValid = true
            if (!this.validateDueDate()) {
                isValid = false;
            }
           
            return isValid;
        }
        //update invoice
        update = (e) =>{
            if(this.validateForm()){
                if(!this.state.paymentstatus && !this.state.dueDate){
                    alert("Please fill the field")
                }else{
                    
                    invoiceServices.updateInvoice(this.state).then((response) => {
                    if(response){
                        alert("Updated Successfully")
                        this.cancel()
                    }
                }).catch((error) => {
                     console.log(error)
                })
                
            }
        }   
        }
        //redirect to invoice management screen
        cancel = (e) =>{
            this.props.history.push('/invoices')
        }
       
        render() {
            return (
                <div className="page-container edit-invoice-generation-container">
                    <div className="page-header-container">
                        {this.state.readonly ? (<PageHeader title="Invoice Details" subtitle="" />)
                        :(<PageHeader title="Invoice Generation" subtitle="" />)}
                    </div>
                    <div className="page-content-container">
                        <div className="page-content">
                            <Row className="invoice-generation-content">
                                <Col>
                                    <Form>
                                        <div className="generate-forms">
                                            <Row>
                                                <Col>
                                                    <span>
                                                        <div>Invoice Number :{this.state.invoiceNumber}</div>
                                                        <div>Project Name :  {this.state.project}</div>
                                                        <div>Client Name : {this.state.clientName}</div>
                                                        <div>From date :  {this.state.taskstartDate}</div>
                                                        <div>To Name :  {this.state.taskendDate}</div>
                                                        <div>Generated Date: {this.state.generatedDate} </div>
                                                        <div>Hourly Rate :{this.state.hourlyRate} CAD </div>
                                                        <div>Total Amount :{this.state.Total} CAD </div>
                                                        
                                                    </span>
                                                    <Form.Group>
                                                        <Form.Label className="required">Payment Status</Form.Label>
                                                        <Form.Control type="text" name="paymentstatus" value={this.state.paymentstatus} onChange={this.onValueChange}>
                                                        </Form.Control>
                                                        <Form.Control.Feedback type="invalid">
                                                            {this.state.projectError}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group>
                                                        <div className="inline-date-control">
                                                            <div className="due-date-control">
                                                                <div>
                                                                    <Form.Label className="required">Invoice Duedate</Form.Label>
                                                                </div>
                                                                <Form.Control type="date" className="start-date" name="dueDate" placeholder="Due Date" value={this.state.dueDate} onChange={this.onValueChange}
                                                                    onBlur={this.validateDate}
                                                                    isInvalid={this.state.dueDateError} />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {this.state.dueDateError}
                                                                </Form.Control.Feedback>
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
            
                                            </Row>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                            <div className="generate-buttons">         
                                <Row className="generate-button-container">
                                    <Button className="primary-button" onClick={this.update}>
                                        Update Invoice
                                    </Button>
                                    <Button className="secondary-button" onClick={this.cancel}>
                                        Cancel
                                    </Button>
                                </Row> 
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
}
export default withRouter(EditInvoice)