/**
 * Author: Sanket Shah.
 * Created On: 2021-07-20
 * Router for Projects.
 */

const express = require('express');
const projectsController = require('../controllers/projectsController');

/**
 * APIs for CRUD operations
 */
const projectsRouter = express.Router();
projectsRouter.post('/', projectsController.list);
projectsRouter.get('/:id', projectsController.get);
projectsRouter.put('/update/:id', projectsController.update);
projectsRouter.post('/add', projectsController.add);
projectsRouter.delete('/remove/:id', projectsController.remove);


module.exports = projectsRouter;