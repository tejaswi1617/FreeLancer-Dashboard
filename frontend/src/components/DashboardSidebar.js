/* Author: Vishal Sancheti */

import '../styles/style.scss';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Drawer } from 'react-bootstrap-drawer';
import '../styles/DashboardSidebar.scss';
import { useLocation } from 'react-router-dom'

export default function Sidebar(props) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const handleToggle = () => setOpen(!open);

    return (
        <Drawer {...props}>
            <Drawer.Toggle onClick={handleToggle} />

            <Collapse in={open}>
                <Drawer.Overflow>
                    <Drawer.ToC>
                        <Drawer.Item href="/dashboard">
                            <span className={location.pathname === "/dashboard" ? 'nav-item-active' : ''}>
                                <i className="fas fa-tachometer-alt"></i> Dashboard
                            </span>
                        </Drawer.Item>

                        <Drawer.Nav>
                            <Drawer.Item href="/clients">
                                <span className={location.pathname === "/clients" ? 'nav-item-active' : ''}>
                                    <i className="fas fa-users"></i> Clients
                                </span>
                            </Drawer.Item>
                            <Drawer.Item href="/projects">
                                <span className={location.pathname === "/projects" ? "nav-item-active" : ''}>
                                    <i className="fas fa-briefcase"></i> Projects
                                </span>
                            </Drawer.Item>
                            <Drawer.Item href="/timelogs">
                                <span className={location.pathname === "/timelogs" ? 'nav-item-active' : ''}>
                                    <i className="fas fa-stopwatch"></i> Time Logs
                                </span>
                            </Drawer.Item>
                            <Drawer.Item href="/invoices">
                                <span className={location.pathname === "/invoices" ? 'nav-item-active' : ''}>
                                    <i className="fas fa-file-invoice"></i> Invoices
                                </span>
                            </Drawer.Item>
                            <Drawer.Item href="/testimonials">
                                <span className={location.pathname === "/testimonials" ? 'nav-item-active' : ''}>
                                    <i className="fas fa-comment"></i> Testimonials
                                </span>
                            </Drawer.Item>

                            <hr/>

                            <Drawer.Item href="/todolist">
                                <span className={location.pathname === "/todolist" ? 'nav-item-active' : ''}>
                                    <i className="fas fa-tasks"></i> ToDo
                                </span>
                            </Drawer.Item>
                            <Drawer.Item href="/calendar">
                                <span className={location.pathname === "/calendar" ? 'nav-item-active' : ''}>
                                    <i className="fas fa-calendar"></i> Calendar
                                </span>
                            </Drawer.Item>
                            <Drawer.Item href="/business-card">
                                <span className={location.pathname === "/business-card" ? 'nav-item-active' : ''}>
                                    <i class="fas fa-address-card"></i> Business Card
                                </span>
                            </Drawer.Item>
                        </Drawer.Nav>
                    </Drawer.ToC>
                </Drawer.Overflow>
            </Collapse>
        </Drawer>
    );
};