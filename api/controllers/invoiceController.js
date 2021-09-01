/**
 * Author: Tejaswi Chaudhary.
 * Created On: 2021-06-07
 * Controller for invoice management, invoice generation and edit invoice..
 */
const mongoose = require('mongoose');
const express = require("express");
const project = require("../models/projectsModel");
const timelogs = require("../models/timelogModel");
const invoices = require("../models/invoiceModel");
const users = require("../models/registerModel");
const clients = require("../models/clientsModel");
/**
 * Fetch data to generate based on task end date, delete or update invoices.
 * Date is received in the format: "YYYY-MM-DD"
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */

//Get list of all the projects
module.exports.getAllProject = async(req, res) => {
 
    await project.find({"userId":req.body.user},function(error, projectslist){
      if (error){
        return res.status(400).json({
            result: [],
            message: error,
            success: false
        })
      }
      else{
        return res.status(200).json({
            result: projectslist,
            message: "",
            success: true
        })
      }
    })

};

//get list of all the tags based on task end end date
module.exports.getTags = async (req, res) => {
   
    _id = req.body.project
    edate = new Date(req.body.endDate)
    sdate = new Date(req.body.startAt)
    taglist =[]

    const tags = await timelogs.find({"endAt":{$gte:sdate,$lte:edate},"project":_id}).exec()
    
    if (tags){
      return res.status(200).json({
          result: tags,
          message: "",
          success: true
      })
    }
    else{
      return res.status(400).json({
          result: [],
          message: error,
          success: false
      })
    }
    
  };

//Add generated invoice
module.exports.addInvoice = async (req, res) => {
  id = 0
  const addInvoice = new invoices()
  if(req.body && req.body.projects){
    req.body.projects.forEach(result =>{
      if(result._id == req.body.project){
        addInvoice.projectName = result.title,
        addInvoice.clientName =  result.client,
        addInvoice.projectId = result._id,
        id = result._id
      }
    })
    
  }
  startdate = new Date(req.body.startAt)
  enddate= new Date(req.body.endDate)
  
  const result = await invoices.find({$and:[{"startDate":startdate},{"taskendDate":enddate},{"projectId":id}]}).exec()
 
 
    
    if(result.length ==0){
      
      generateDate = new Date(req.body.generateDate)
        if(req.body && req.body.generateDate)
        {
          addInvoice.generatedDate =  generateDate;
        }
        if(req.body && req.body.startAt)
        {
          addInvoice.startDate =  req.body.startAt;
        }
        if(req.body && req.body.dueDate)
        {
          addInvoice.dueDate =  req.body.dueDate;
        }
        if(req.body && req.body.endDate)
        {
          addInvoice.taskendDate = req.body.endDate;
        }
        if(req.body && req.body.hourlyRate)
        {
          addInvoice.hourlyRate = req.body.hourlyRate;
        }
        if(req.body && req.body.totalcost)
        {
          addInvoice.totalCost= req.body.totalcost;
        }
        if(req.body && req.body.paymentStatus)
        {
          addInvoice.paymentStatus =  req.body.paymentStatus;
        }
        if(req.body && req.body.user)
        {
          addInvoice.userId =  req.body.user;
        }
        
        
        
        req.body.invoiceDetails.forEach(result =>{
          datades = {}
          datades.tagId=result.id,
          datades.description=result.description,
          datades.hours =result.hours,
          datades.total =result.total
          addInvoice.tags.push(datades)
        
        })
        
        invoices.count({}, function(error, numOfInvoices){
          const invoiceId = numOfInvoices + 1;
          
          addInvoice.invId = Number(invoiceId);
          addInvoice.save(function(error, document){
            if (error) {
             
              return res.status(400).json({
                  result: [],
                  message: error,
                  success: false
              })
            } else {
              
              return res.status(200).json({
                  result: addInvoice,
                  success: true
              })
            } 
    
          })
        })
     }else{
      
      return res.status(400).json({
        result: [],
        message: "Invoice is alredy generated",
        success: false
      })
     } 
};

//fetch list of all the generated invoices
module.exports.getAllInvoices = async(req, res) => {

  invoices.find({"userId":req.body.user}, function(error, result){
    
    if (error) {
      return res.status(400).json({
          result: [],
          message: error,
          success: false
      })
    } else {
      res.status(200).json({
        result: result,
        message: "",
        success: true
    })
    }
    })

};

//find invoice based on given invoice id
module.exports.findInvoice = async(req, res) => {
  
  if(req.body && req.body.projectId){
    invoices.findOne({"_id":req.body.projectId}, function(err, result) {
      if (err) {
       
        return res.status(400).json({
            result: [],
            message: "Eroor",
            success: false
        })
      } else {
        res.status(200).json({
          result: result,
          message: "",
          success: true
      })
      }
      })
  
}
};

//Delete invoice based on invoice id
module.exports.deleteinvoice = (req, res) => {
 
  if(req.body && req.body.invoicenumber){
    invoices.findOneAndRemove({"_id":req.body.invoicenumber},function(error, result){
      if (error) {
        return res.status(400).json({
            result: [],
            message: error,
            success: false
        })
    } 
    else {
        return res.status(200).json({
            message: "Success",
            success: true
        })  
    }

    })
  }
  
};
//fetch current application user email id
module.exports.getEmail = (req, res) => {
  
  users.find({"_id":req.body.user}, function(err, result) {
    if (err) {
       
      return res.status(400).json({
          result: [],
          message: "Eroor",
          success: false
      })
    } else {
      res.status(200).json({
        result: result,
        message: "",
        success: true
    })
    }
  })

}

//fetch client email id
module.exports.getClientEmail = (req, res) => {
  var clientData = req.body.projects[0]

  clients.find({"ClientName":clientData.client}, function(err, result) {
    if (err) {
      return res.status(400).json({
          result: [],
          message: "Eroor",
          success: false
      })
    } else {
      
      res.status(200).json({
        result: result,
        message: "",
        success: true
    })
    }
  })

}

//update invoice based on invoice id
module.exports.updateInvoice = (req, res) => {

  invoices.find({"_id":req.body.invoiceNumber}, function(err, result) {
      if (err) {
        return res.status(400).json({
          result: [],
          message: "Eroor",
          success: false
      })
      }else{
        let data = result[0]
        if(req.body && req.body.paymentstatus){
          data.paymentStatus = req.body.paymentstatus
        }
        
        if(req.body && req.body.dueDate){
          var dueDate = new Date(req.body.dueDate)
          data.dueDate = dueDate
        }
      
        data.save(function(error,result){
          if (error) {
              
              return res.status(400).json({
                  result: [],
                  message: error,
                  success: false
              })
          } else {
                  return res.status(200).json({
                      success: true
                  })

          }
       })
        
      }
  })
};
