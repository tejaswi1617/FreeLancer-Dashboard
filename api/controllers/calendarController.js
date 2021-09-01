/**
 * Author: Sanket Shah.
 * Created On: 2021-07-26
 * Controller for Calendar Event.
 */

 const calendarModel = require('../models/calendarModel');

 /**
 * Method to fetch all the calendar event list
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * If projects exists, returns an array of type "CalendarModel"
 * Else returns empty array.
 */
const list = (req, res) => {
    let data = req['body']
    calendarModel.find({ 'userId': data.userId }, function (err, docs) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Calendar Events not found!',
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Calendar Events found!',
            data: docs
        })
    });
};

 /**
  * Method to fetch add the calendar event in the list
  * @param {*} request 
  * @param {*} response 
  * @returns 
  * It adds the array of type "CalendarModel"
  * Else returns empty array.
  */
 const add = async (req, res) => {
     
         const calendar = new calendarModel();
 
         if(req.body && req.body.eventName){
             calendar.eventName = req.body.eventName;
         }
         if(req.body && req.body.category){
             calendar.category = req.body.category;
         }
         if(req.body && req.body.date){
             calendar.date = req.body.date;
         }
         if(req.body && req.body.time){
            calendar.time = req.body.time;
        }
        if(req.body && req.body.userId){
            calendar.userId = req.body.userId;
        }
         calendar.save();
 
         return res.status(200).json({
             success: true,
             message: 'Calendar Event added!',
             data: calendarModel
         })
 };
 
 module.exports = {
    list,
    add
 };