/* Author: Vishal Sancheti */

const clientsModel = require('../models/clientsModel');
const timelogModel = require('../models/timelogModel');
const projectsModel = require('../models/projectsModel');
const invoicesModel = require('../models/invoiceModel.js');
const testimonialModel = require('../models/testimonialModel.js');

const getStats = async (req, res) => {
    let clients = await clientsModel.find({ userId: req.query.userId }).count();
    let projects = await projectsModel.find({ userId: req.query.userId }).count();
    let invoices = await invoicesModel.find({ userId: req.query.userId }).count();
    let testimonials = await testimonialModel.find({ userId: req.query.userId }).count();

    let data = {clients: clients, projects:projects, invoices: invoices, testimonials:testimonials};

    return res.status(200).json({
        success: true,
        message: 'Success',
        data: data
    });
};

const getClientProjects = async (req, res) => {
    let clients = [];
    let projects = [];

    let clientList = await clientsModel.find({ userId: req.query.userId }).exec();
    clientList.forEach((client) => {
        clients.push(client.ClientName);
    });

    for (const client of clients) {
        let projectCount = await projectsModel.find({client: client,userId: req.query.userId }).count();
        projects.push(projectCount)
    }

    let data = {clients: clients, projects: projects};
    return res.status(200).json({
        success: true,
        message: 'Success',
        data: data
    });
};

const getClientInvoiceStats = async (req, res) => {
    let clients = [];
    let invoices_paid = [];
    let invoices_due = [];

    let clientList = await clientsModel.find({userId: req.query.userId}).exec();
    clientList.forEach((client) => {
        clients.push(client.ClientName);
    });

    for (const client of clients) {
        let invoice_paid = await invoicesModel.find({userId: req.query.userId, clientName: client, paymentStatus: "Paid"}).count();
        let invoice_due = await invoicesModel.find({userId: req.query.userId, clientName: client, paymentStatus: "Unpaid"}).count();
        invoices_paid.push(invoice_paid);
        invoices_due.push(invoice_due);
    }

    let data = {clients: clients, invoices_paid:invoices_paid,invoices_due:invoices_due };

    return res.status(200).json({
        success: true,
        message: 'Success',
        data: data
    });
};

const getTimelogStats = async (req, res) => {
    let dates = [];
    let durations = [];

    for(i=0;i<30;i++){
        let today = new Date();
        let date = new Date();
        date.setDate(today. getDate() - i);
        date = date.toISOString().slice(0, 10);
        dates.push(date);
    }

    for (const date of dates) {
        let duration = 0;

        let timelogList = await timelogModel.find({userId: req.query.userId, endAt: {
                $gte: date,
                $lte: date
            }
        }).exec();

        timelogList.forEach((timelog) => {
            duration += new Date(timelog.endAt).getTime() - new Date(timelog.startAt).getTime()
        });
        duration = Math.ceil(duration / (1000 * 3600));
        durations.push(duration)
    }

    let data = {dates: dates, durations:durations };

    return res.status(200).json({
        success: true,
        message: 'Success',
        data: data
    });
};

module.exports = {
    getStats,
    getClientProjects,
    getClientInvoiceStats,
    getTimelogStats,
};