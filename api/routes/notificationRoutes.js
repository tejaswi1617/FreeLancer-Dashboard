/** 
 * Author: Janvi Patel.
 * Created On: 2021-07-20.
 * Contains route information for notification.
 */
 const express = require('express');
 const notificationController = require('../controllers/notificationController');
  
 const notificationRoutes = express.Router();

 notificationRoutes.post('/List', notificationController.List);
 notificationRoutes.post('/setStatus', notificationController.setStatus);

 module.exports = notificationRoutes;