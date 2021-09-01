import React from 'react';

export default function Home(){
    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Hello, Freelancer!</h1>
                    <p className="lead">This is the only tool you will be using, a one stop solution for all your freelacing needs.</p>
                    <hr className="my-4"/>
                    <p className="lead">Minimal UI with Powerful features.</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">Get Started</a>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>What we offer?</h2>
                    </div>
                </div>
                <hr/>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h4><i className="fas fa-tachometer-alt"></i> Dashboard</h4>
                        <p>Visualize all your stats and report from single screen.</p>
                    </div>
                    <div className="col-md-4">
                        <h4><i className="fas fa-users"></i> Client Management</h4>
                        <p>No more address book entries, easily maintain clients and their details.</p>
                    </div>
                    <div className="col-md-4">
                        <h4><i className="fas fa-briefcase"></i> Project Management</h4>
                        <p>No more looking searching emails, efficiently maintain client project association and details.</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h4><i className="fas fa-stopwatch"></i> Time Logging</h4>
                        <p>No more maintaining spreadsheet, easily log times with our interactive time logging.</p>
                    </div>
                    <div className="col-md-4">
                        <h4><i className="fas fa-file-invoice"></i> Invoice Management</h4>
                        <p>No more filtering spreadsheet for invoice, easily make invoices.</p>
                    </div>
                    <div className="col-md-4">
                        <h4><i className="fas fa-comment"></i> Testimonial Management</h4>
                        <p>No more missing out testimonials from clients, easily request and maintain testimonials.</p>
                    </div>

                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h4><i className="fas fa-tasks"></i> ToDo List</h4>
                        <p>No more sticky notes, easily maitain your todo task with interactive todo list.</p>
                    </div>
                    <div className="col-md-4">
                        <h4><i className="fas fa-calendar"></i> Calendar</h4>
                        <p>No more mixing of personal and business events, easily manage events with our full fledged calendar.</p>
                    </div>
                    <div className="col-md-4">
                        <h4><i className="fas fa-id-card"></i> Digital Business Card</h4>
                        <p>Easily create and share your digital business card with client testimonials.</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <h4><i className="fas fa-bell"></i> Notifications</h4>
                        <p>Never miss a calendar event, invoice due date, and other events with our notifications.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}