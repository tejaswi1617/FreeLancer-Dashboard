import React from 'react';

export default function About(){
    return (
        <div className="container">
            <div className="row pt-3">
                <div className="col">
                    <h1>About us</h1>
                </div>
            </div>
            <hr/>
            <div className="row justify-content-center">
                <div className="col">
                    <p>We are team of students enrolled at Dalhousie University and this is a project submitted for subject CSCI 5709.</p>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col">
                    <h3>Team</h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title">Bansi Mehta</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Full-stack Developer</h6>
                            <p className="card-text">B00875640</p>
                            <a href={'mailto:bn955101@dal.ca'} className="card-link">bn955101@dal.ca</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title">Deep Patel</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Full-stack Developer</h6>
                            <p className="card-text">B00865413</p>
                            <a href={'mailto:dp889845@dal.ca'} className="card-link">dp889845@dal.ca</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title">Janvi Patel</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Full-stack Developer</h6>
                            <p className="card-text">B00863421</p>
                            <a href={'mailto:jn410076@dal.ca'} className="card-link">jn410076@dal.ca</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title">Sanket Shah</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Full-stack Developer</h6>
                            <p className="card-text">B00862499</p>
                            <a href={'mailto:sn488207@dal.ca'} className="card-link">sn488207@dal.ca</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title">Tejaswi Chaudhary</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Full-stack Developer</h6>
                            <p className="card-text">B00858613</p>
                            <a href={'mailto:tj754396@dal.ca'} className="card-link">tj754396@dal.ca</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card m-1">
                        <div className="card-body">
                            <h5 className="card-title">Vishal Sancheti</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Full-stack Developer</h6>
                            <p className="card-text">B00877378</p>
                            <a href={'mailto:vs488310@dal.ca'} className="card-link">vs488310@dal.ca</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}