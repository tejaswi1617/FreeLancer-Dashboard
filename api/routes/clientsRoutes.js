/** 
 * Author: Janvi Patel.
 * Created On: 2021-07-20.
 * Contains route information for clients.
 */
 const express = require('express');
 const clientsController = require('../controllers/clientsController');
  
 const clientsRoutes = express.Router();
  
 clientsRoutes.post('/add', clientsController.add);
 clientsRoutes.post('/edit', clientsController.edit);
 clientsRoutes.post('/viewOne', clientsController.viewOne);
 clientsRoutes.post('/getAll', clientsController.getAll);
 clientsRoutes.post('/delete', clientsController.delete);
 clientsRoutes.get('/', clientsController.list);
  
 module.exports = clientsRoutes;