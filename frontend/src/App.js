/* Author: Team */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Tnc from "./pages/Tnc";
import Privacy from "./pages/Privacy";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import InvoiceGeneration from "./pages/Invoices/InvoiceGeneration";
import Timelogs from "./pages/Timelogs";
import Projects from "./pages/Projects";
import AddProject from "./pages/Projects/AddProject";
import EditProject from "./pages/Projects/EditProject";
import ViewProject from "./pages/Projects/ViewProject";
import Clients from "./pages/Clients";
import AddClient from "./pages/Clients/AddClient";
import EditClient from "./pages/Clients/EditClient";
import ViewClient from "./pages/Clients/ViewClient";
import Testimonials from "./pages/Testimonials";
import RequestTestimonials from "./pages/RequestTestimonial";
import InvoiceManagement from "./pages/Invoices"
import TodoList from "./pages/TodoList"
import Calendar from "./pages/Calendar";
import EditInvoice from "./pages/Invoices/EditInvoice"

import { BusinessCard } from "./pages/BusinessCard";
export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <AppLayout>
                        <Home />
                    </AppLayout>
                </Route>
                <Route exact path="/about">
                    <AppLayout>
                        <About />
                    </AppLayout>
                </Route>
                <Route exact path="/tnc">
                    <AppLayout>
                        <Tnc />
                    </AppLayout>
                </Route>
                <Route exact path="/privacy">
                    <AppLayout>
                        <Privacy />
                    </AppLayout>
                </Route>
                <Route path="/login">
                    <AppLayout>
                        <Login />
                    </AppLayout>
                </Route>
                <Route exact path="/register">
                    <AppLayout>
                        <Register />
                    </AppLayout>
                </Route>
                <Route path="/register/add">
                    <DashboardLayout>
                        <Register />
                    </DashboardLayout>
                </Route>

                <Route path="/dashboard">
                    <DashboardLayout>
                        <Dashboard />
                    </DashboardLayout>
                </Route>
                <Route path="/profile">
                    <DashboardLayout>
                        <Profile />
                    </DashboardLayout>
                </Route>
                <Route path="/register/edit/:id">
                    <DashboardLayout>
                        <EditProfile />
                    </DashboardLayout>
                </Route>
                <Route path="/editProfile">
                    <DashboardLayout>
                        <EditProfile />
                    </DashboardLayout>
                </Route>
                <Route exact path="/clients">
                    <DashboardLayout>
                        <Clients />
                    </DashboardLayout>
                </Route>
                <Route path="/clients/add">
                    <DashboardLayout>
                        <AddClient />
                    </DashboardLayout>
                </Route>
                <Route path="/EditClient">
                    <DashboardLayout>
                        <EditClient />
                    </DashboardLayout>
                </Route>
                <Route path="/ViewClient">
                    <DashboardLayout>
                        <ViewClient />
                    </DashboardLayout>
                </Route>
                <Route exact path="/projects">
                    <DashboardLayout>
                        <Projects />
                    </DashboardLayout>
                </Route>
                <Route path="/projects/add">
                    <DashboardLayout>
                        <AddProject />
                    </DashboardLayout>
                </Route>
                <Route path="/projects/edit/:id">
                    <DashboardLayout>
                        <EditProject />
                    </DashboardLayout>
                </Route>
                <Route path="/projects/view/:id">
                    <DashboardLayout>
                        <ViewProject />
                    </DashboardLayout>
                </Route>
                <Route path="/timelogs">
                    <DashboardLayout>
                        <Timelogs />
                    </DashboardLayout>
                </Route>
                <Route exact path="/invoices">
                    <DashboardLayout>
                        <InvoiceManagement />
                    </DashboardLayout>
                </Route>
                <Route path="/invoices/generate">
                    <DashboardLayout>
                        <InvoiceGeneration />
                    </DashboardLayout>
                </Route>
                <Route path="/editinvoice">
                    <DashboardLayout>
                        <EditInvoice />
                    </DashboardLayout>
                </Route>
                <Route exact path="/testimonials">
                    <DashboardLayout>
                        <Testimonials />
                    </DashboardLayout>
                </Route>
                <Route path="/testimonials/requestTestimonials/:id">
                    <AppLayout>
                        <RequestTestimonials />
                    </AppLayout>
                </Route>
                <Route path="/todolist">
                    <DashboardLayout>
                        <TodoList />
                    </DashboardLayout>
                </Route>
                <Route path="/calendar">
                    <DashboardLayout>
                        <Calendar />
                    </DashboardLayout>
                </Route>
                <Route path="/business-card">
                    <DashboardLayout>
                        <BusinessCard />
                    </DashboardLayout>
                </Route>
                <Route path="/">
                    <div>404 Page not found.</div>
                </Route>
            </Switch>
        </Router>
    );
}