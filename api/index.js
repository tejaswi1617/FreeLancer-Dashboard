
/* Author: Team */

const express = require('express');
const router = express.Router();
const testimonialRouter = require('./routes/testimonialRoutes');
const registerRouter = require('./routes/registerRoutes');
const clientsRouter = require('./routes/clientsRoutes');
const projectsRouter = require('./routes/projectsRoutes');
const timelogRouter = require('./routes/timelogRoutes');
const todoListRouter = require('./routes/todoListRoutes');
const invoiceRouter = require('./routes/invoiceRoutes');
const notificationRouter = require('./routes/notificationRoutes');
const calendarRouter = require('./routes/calendarRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');

//Main API Endpoint
router.get('/', (req,res) => {
    return res.status(200).json({
        success: true,
        message: "This is an API Endpoint"
    });
});

//Models API Endpointss
router.use('/clients',clientsRouter);
router.use('/timelogs',timelogRouter);
router.use('/testimonials',testimonialRouter);
router.use('/register',registerRouter);
router.use('/projects',projectsRouter);
router.use('/todoLists', todoListRouter);
router.use('/invoices',invoiceRouter);
router.use('/notification',notificationRouter);
router.use('/calendar',calendarRouter);
router.use('/dashboard',dashboardRouter);

//404 Error Handling
router.use(function(req, res, next) {
    res.status(404).json({
        success: false,
        message: "Page not found"
    });
});

module.exports = router;