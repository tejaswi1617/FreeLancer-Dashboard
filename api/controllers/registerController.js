/**
 * Author: Deep Patel.
 * Created On: 2021-07-28
 * Controller for User Registration Controller.
 */

const registerModel = require('../models/registerModel');
const encryptionHelper =  require('../helpers/encryptionHelper');


const add = (req, res) => {
   const addUser = new registerModel();
   if (req.body && req.body.name) {
      addUser.Name = req.body.name;
   }
   if (req.body && req.body.mobile) {
      addUser.ContactNo = req.body.mobile;
   }
   if (req.body && req.body.email) {
      addUser.Email = req.body.email;
   }
   if (req.body && req.body.linkedin) {
      addUser.LinkedInProfile = req.body.linkedin;
   }
   if (req.body && req.body.website) {
      addUser.Website = req.body.website;
   }
   if (req.body && req.body.password) {
      addUser.Password = encryptionHelper.encryptPassword(req.body.password);
   }
   addUser.save();

   return res.status(200).json({
      success: true,
      message: 'User added!',
      data: registerModel
   })
};

const validateUser = async (req, res) => {
   registerModel.findOne({ 'Email': req.body.email }).exec(async function (err, user) {
      if(err){
         console.log(err);
         return res.status(500).json({
            success: false,
            message: 'Some error occurred!',
            data: null
         })
      }
      if(!user){
         return res.status(200).json({
            success: false,
            message: 'User not found!',
            data: null
         })
      }
      let valid = encryptionHelper.comparePassword(req.body.password, user.Password);
      if(valid){
         return res.status(200).json({
            success: true,
            message: 'Login Successful!',
            data: user
         })
      }else{
         return res.status(200).json({
            success: false,
            message: 'Login details invalid'
         })
      }
   });
};

const resetPassword = (req, res) => {
   registerModel.findOne({ 'Email': req.body.email }).exec(async function (err, user) {
      if(err){
         console.log(err);
         return res.status(500).json({
            success: false,
            message: 'Some error occurred!',
            data: null
         })
      }
      if(!user){
         return res.status(200).json({
            success: false,
            message: 'User not found!',
            data: null
         })
      }

      let password = encryptionHelper.generatePassword();
      user.Password = encryptionHelper.encryptPassword(password);
      user.save();

      let mailParams = {
         //Mail Sender Details
         freelancerName: 'Freelancer',
         freelancerMail: 'deepatel1607@gmail.com',

         //Mail Reciver Details
         clientName: user.Name,
         clientMail: user.Email,

         //Attachment Messages
         message: "Here is your new Password: "+ password,
      };

      return res.status(200).json({
         success: true,
         message: 'Password reset requested!',
         data: mailParams
      });
   });
};

const fetchUser = (req, res) => {
   registerModel.findOne({ 'Email': req.body.email }, function (error, result) {
      res.send(result);
   });
};

const fetchUserById = (req, res) => {
   registerModel.findOne({ '_id': req.body.id }, function (error, result) {
      res.send(result);
   });
};

const edit = (req, res) => {
   registerModel.findById(req.params.id, function(error, document) {

      if (req.body && req.body.name) {
         document.Name = req.body.name;
      }
      if (req.body && req.body.mobile) {
         document.ContactNo = req.body.mobile;
      }
      if (req.body && req.body.email) {
         document.Email = req.body.email;
      }
      if (req.body && req.body.linkedin) {
         document.LinkedInProfile = req.body.linkedin;
      }
      if (req.body && req.body.website) {
         document.Website = req.body.website;
      }
      if (req.body && req.body.password) {
         document.Password = encryptionHelper.encryptPassword(req.body.password);
      }
      document.save();

      return res.status(200).json({
         success: true
      });
   });
};

module.exports = {
   add,
   edit,
   validateUser,
   resetPassword,
   fetchUser,
   fetchUserById,
};