/**
 * Author: Janvi Patel.
 * Created On: 2021-07-20
 * Controller for Clients Controller.
 */

 const clientsModel = require('../models/clientsModel');

 /**
  * Method to add all the details of the client lists.
  * @param {*} request 
  * @param {*} response 
  * @returns 
  * Client Id will be generated automatically by total document number.
  * If client already exist for the same Client Name and Contact No then the client will not be added to list
  * If having error returns false.
  */
 module.exports.add = (req, res) => {
     
     const addclient = new clientsModel();
     if(req.body && req.body.clientName)
     {
         addclient.ClientName = req.body.clientName;
     }
     if(req.body && req.body.contactNo)
     {
         addclient.ContactNo =  req.body.contactNo;
     }
     if(req.body && req.body.emailId)
     {
         addclient.Email =  req.body.emailId;
     }
     if(req.body && req.body.street)
     {
         addclient.Street = req.body.street;
     }
     if(req.body && req.body.postalCode)
     {
         addclient.PostalCode = req.body.postalCode;
     }
     if(req.body && req.body.organizationName)
     {
         addclient.Organization= req.body.organizationName;
     }
     if(req.body && req.body.websiteName)
     {
         addclient.Website =  req.body.websiteName;
     }
     if(req.body && req.body.linkedInProfile)
     {
         addclient.LinkedInProfile = req.body.linkedInProfile;
     }
     if(req.body && req.body.businessDescription)
     {
         addclient.BusinessDescription = req.body.businessDescription;
     }
     if(req.body && req.body.meetingPlatform)
     {
         addclient.MeetingPlatform = req.body.meetingPlatform;
     }
     if(req.body && req.body.country)
     {
         addclient.Country = req.body.country;
     }
     if(req.body && req.body.region)
     {
         addclient.Region = req.body.region;
     }
     if(req.body && req.body.userId)
     {
         addclient.userId = req.body.userId;
     }
     
     clientsModel.count({}, function(error, numOfDocs){
         if(error) return callback(error);
         const ClientId = numOfDocs + 1;
         addclient.ClientId = Number(ClientId);
         clientsModel.findOne({'ClientName': addclient.ClientName, 'ContactNo': addclient.ContactNo, 'userId': addclient.userId}, function(error, result)
         {
             if(!result){
                 addclient.save(function(error, document) {
                     if (error) {
                         return res.status(400).json({
                             result: [],
                             message: error,
                             success: false
                         })
                     } else {
                         return res.status(200).json({
                             result: addclient,
                             success: true
                         })
                     }
                 });
             }
         });
     });
 }
 
 /**
  * Method to update the details of the client.
  * @param {*} request 
  * @param {*} response 
  * @returns 
  * find the client details by ID and update the details by new details
  * returns empty list if any error
  */
 module.exports.edit = (req, res) => {
    
     clientsModel.find({'ClientId': req.body.clientId}, function(error, document) {
 
     let doc = document[0]
     if(req.body && req.body.clientName)
     {
         doc.ClientName = req.body.clientName;
     }
     if(req.body && req.body.contactNo)
     {
         doc.ContactNo =  req.body.contactNo;
     }
     if(req.body && req.body.emailId)
     {
         doc.Email =  req.body.emailId;
     }
     if(req.body && req.body.street)
     {
         doc.Street = req.body.street;
     }
     if(req.body && req.body.postalCode)
     {
         doc.PostalCode = req.body.postalCode;
     }
     if(req.body && req.body.organizationName)
     {
         doc.Organization= req.body.organizationName;
     }
     if(req.body && req.body.websiteName)
     {
         doc.Website =  req.body.websiteName;
     }
     if(req.body && req.body.LinkedInProfile)
     {
         doc.LinkedInProfile = req.body.LinkedInProfile;
     }
     if(req.body && req.body.businessDescription)
     {
         doc.BusinessDescription = req.body.businessDescription;
     }
     if(req.body && req.body.meetingPlatform)
     {
         doc.MeetingPlatform = req.body.meetingPlatform;
     }
     if(req.body && req.body.country)
     {
         doc.Country = req.body.country;
     }
     if(req.body && req.body.region)
     {
         doc.Region = req.body.region;
     }
 
     doc.save(function(error,result){
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
     });
 }
 
 /**
  * Method to view one the details of the client.
  * @param {*} request 
  * @param {*} response 
  * @returns 
  * find the client details by client name and contact no
  * and send the response as a return statement
  */
 module.exports.viewOne = (req, response) => {
 
     if (req.body && req.body.ClientName && req.body.ContactNo) 
     {
         clientsModel.findOne({'ClientName': req.body.ClientName, 'ContactNo': req.body.ContactNo}, function(error, result)
         {
             if (error) {
                 return response.status(400).json({
                     result: [],
                     message: error,
                     success: false
                 })
             } 
             else {
                response.send(result);
             }
         });
     }
 }
 
 /**
  * Method to get all the details of the clients.
  * @param {*} request 
  * @param {*} response 
  * @returns 
  * find the all clients details and returns result as response for a particular sessioned user
  */
 module.exports.getAll = (req, response) => {

    clientsModel.find({'userId': req.body.userId }, function(error, result)
    {
         if (error) {
              return response.status(400).json({
                  result: [],
                  message: error,
                  success: false
              })
         } 
         else {
              response.send(result) 
         }
     });
 }
 
 /**
  * Method to delete one client detail.
  * @param {*} request 
  * @param {*} response 
  * @returns 
  * find the client with same client name and contact No and remove it from database and returns 
  * empty array if any error
  */
 module.exports.delete = (req, response) => {
 
     if(req.body && req.body.ClientName && req.body.ContactNo){
         clientsModel.findOneAndRemove({'ClientName': req.body.ClientName, 'ContactNo': req.body.ContactNo}, function(error, result)
         {
             if (error) {
                 return response.status(400).json({
                     result: [],
                     message: error,
                     success: false
                 })
             } 
             else {
                 return response.status(200).json({
                     message: "Success",
                     success: true
                 })  
         }
         });
     }
 }

  /**
  * Method to list one client detail.
  * @param {*} request 
  * @param {*} response 
  * @returns 
  * find all client list
  */
 module.exports.list = (req, res) => {
    clientsModel.find({}, function (err, docs) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Clients not found!',
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Clients found!',
            data: docs
        })
    });
};