/* Author: Vishal Sancheti */

const express = require('express');
const timelogController = require('../controllers/timelogController');

const timelogRouter = express.Router();
timelogRouter.get('/', timelogController.list);
timelogRouter.get('/:id', timelogController.get);
timelogRouter.put('/update/:id', timelogController.update);
timelogRouter.post('/add', timelogController.add);
timelogRouter.delete('/remove/:id', timelogController.remove);

module.exports = timelogRouter;