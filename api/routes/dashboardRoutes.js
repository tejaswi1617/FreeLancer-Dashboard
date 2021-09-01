/* Author: Vishal Sancheti */

const express = require('express');
const dashboardController = require('../controllers/dashboardController');

const dashboardRouter = express.Router();
dashboardRouter.get('/stats', dashboardController.getStats);
dashboardRouter.get('/client-projects', dashboardController.getClientProjects);
dashboardRouter.get('/client-invoice-stats', dashboardController.getClientInvoiceStats);
dashboardRouter.get('/timelog-stats', dashboardController.getTimelogStats);

module.exports = dashboardRouter;