/* Author: Vishal Sancheti */

import React from 'react';
import AppNavbar from "../components/AppNavbar";
import {Container} from "react-bootstrap";

// Page Wrapper for Application Pages
const AppLayout =({children}) =>{

    return(
        <>
            <header>
                <AppNavbar/>
            </header>
            <main className="mt-5 pt-2">
                {children}
            </main>
            <hr/>
            <footer className="container">
                <div className="row">
                    <div className="col">
                        <p>All rights reserved.</p>
                    </div>
                    <div className="col text-right">
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/tnc">Term and Conditions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/privacy">Privacy Policy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/sitemap.xml">Sitemap</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default AppLayout;