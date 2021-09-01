/**
 * Author: Tejaswi Chaudhary.
 * Created On: 2021-06-07
 * Route information for invoice management, invoice generation and edit invoice.
 */
const express = require('express')
const router= express.Router();

const projectController = require("../controllers/invoiceController")

//Invoice Routes
router.post("/getproject",projectController.getAllProject)
router.post("/tags",projectController.getTags)
router.post("/save",projectController.addInvoice)
router.post("/fetchinvoices",projectController.getAllInvoices)
router.post("/deleteinvoice",projectController.deleteinvoice)
router.post("/findinvoice",projectController.findInvoice)
router.post("/updateinvoice",projectController.updateInvoice)
router.post("/getEmail", projectController.getEmail)
router.post("/getClientEmail", projectController.getClientEmail)
module.exports = router;