/** 
 * Author: Deep Patel.
 * Created On: 2021-07-28.
 * Contains route information for Registration.
 */

const express = require('express');
const registerController = require('../controllers/registerController');

const registerRoute = express.Router();

registerRoute.post('/add', registerController.add);
registerRoute.post('/validateUser', registerController.validateUser);
registerRoute.post('/resetPassword', registerController.resetPassword);
registerRoute.post('/fetchUser', registerController.fetchUser);
registerRoute.post('/fetchUserById', registerController.fetchUserById);
registerRoute.put('/edit/:id', registerController.edit);
module.exports = registerRoute;