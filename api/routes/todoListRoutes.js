/** 
 * Author: Bansi Mehta.
 * Created On: 2021-07-20.
 * Contains route information for todo list.
 */
const express = require('express')
const todoListController = require("../controllers/todoListController")

const router = express.Router();
router.post("/getList", todoListController.getList)
router.post("/saveItem", todoListController.saveItem)
router.put("/markAsDone", todoListController.markAsDone)
router.delete("/deleteItem/:id", todoListController.deleteItem)

module.exports = router;
