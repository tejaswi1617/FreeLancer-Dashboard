import React, {useEffect, useState} from 'react';
import PageHeader from "../components/PageHeader";
import {Line, Bar, Doughnut} from "react-chartjs-2";
import {Card} from "react-bootstrap";
import dashboardService from "../services/dashboardService";

export default function Dashboard(){
    const [stats,setStats] = useState({
        clients: 0,
        projects:0,
        invoices:0,
        testimonials:0,
    });
    const [doughnutData,setDoughnutData] = useState({});
    const [lineData,setLineData] = useState({});
    const [barData,setBarData] = useState({});
    useEffect(()=>{
        dashboardService.stats({"userId": localStorage.getItem("user_id")}).then(res => setStats(res.data));
        dashboardService.clientProjects({"userId": localStorage.getItem("user_id")}).then(res =>  setDoughnutData({
            labels: res.data.clients,
            datasets: [
                {
                    label: '# of Projects',
                    data: res.data.projects,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderWidth: 1,
                },
            ],
        }));
        dashboardService.clientInvoiceStats({"userId": localStorage.getItem("user_id")}).then(res => setBarData({
            labels: res.data.clients,
            datasets: [
                {
                    label: '# of Paid Invoices',
                    data: res.data.invoices_paid,
                    backgroundColor: 'rgb(255, 99, 132)',
                },
                {
                    label: '# of Due Invoices',
                    data:  res.data.invoices_due,
                    backgroundColor: 'rgb(54, 162, 235)',
                },
            ],
        }));
        dashboardService.timelogStats({"userId": localStorage.getItem("user_id")}).then(res => setLineData({
            labels: res.data.dates,
            datasets: [
                {
                    label: '# of Hours Logged',
                    data: res.data.durations,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],
        }));

    },[]);

    return (
        <div className="page-container">
            <div className="page-header-container">
                <PageHeader title="Dashboard" subtitle=""/>
            </div>
            <div className="page-content-container">
                <div className="page-content">
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="border justify-content-center d-flex align-items-center ">
                                <div style={{fontSize:"4rem"}} className="mr-2">{stats.clients}</div>
                                <div className="text-center">
                                    <div className="border-bottom">Clients</div>
                                    <div><a href="/clients">View all</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="border justify-content-center d-flex align-items-center ">
                                <div style={{fontSize:"4rem"}} className="mr-2">{stats.projects}</div>
                                <div className="text-center">
                                    <div className="border-bottom">Projects</div>
                                    <div><a href="/projects">View all</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="border justify-content-center d-flex align-items-center ">
                                <div style={{fontSize:"4rem"}} className="mr-2">{stats.invoices}</div>
                                <div className="text-center">
                                    <div className="border-bottom">Invoices</div>
                                    <div><a href="/invoices">View all</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="border justify-content-center d-flex align-items-center ">
                                <div style={{fontSize:"4rem"}} className="mr-2">{stats.testimonials}</div>
                                <div className="text-center">
                                    <div className="border-bottom">Testimonials</div>
                                    <div><a href="/testimonials">View all</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Client and # of Projects</Card.Title>
                                    <Doughnut data={doughnutData} options={{ responsive: true }} />
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Card>
                                <Card.Body>
                                    <Line data={lineData} options={{ responsive: true }} />
                                </Card.Body>
                            </Card>
                            <br/>
                            <Card>
                                <Card.Body>
                                    <Bar data={barData} options={{ responsive: true }} />
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}