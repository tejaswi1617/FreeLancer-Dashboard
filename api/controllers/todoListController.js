/**
 * Author: Bansi Mehta.
 * Created On: 2021-07-20
 * Controller for ToDo list.
 */

const todoListModel = require('../models/todoListModel');

/**
 * Method to fetch all the task of the to-do list based on date.
 * Date is received in the format: "YYYY-MM-DD"
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * If tasks exists for the required date, returns an array of type "TodoListModel"
 * Else returns empty array.
 */
module.exports.getList = (request, response) => {
    let data = request['body']
    let currentDate = new Date(data.currentDate)
    return todoListModel.find({ 'date': currentDate, 'userId': data.userId }, function (error, document) {
        if (error) {
            return response.status(400).json({
                result: [],
                message: error,
                success: false
            })
        } else {
            return response.status(200).json({
                result: document,
                message: "",
                success: true
            })
        }
    })
}

/**
 * Method to mark a task as done based on id.
 * Find the task based on id, change the status to true and save it back.
 * @param {*} request 
 * @param {*} response 
 */
module.exports.markAsDone = (request, response) => {
    let data = request['body']
    if (data && data.id) {

        todoListModel.find({ '_id': data.id }, function (error, document) {
            if (error) {
                return response.status(400).json({
                    result: [],
                    message: error,
                    success: false
                })
            } else {
                if (document && document.length) {
                    let firstDocument = document[0]
                    firstDocument.status = true;
                    firstDocument.save(function (error, document) {
                        if (error) {
                            return response.status(400).json({
                                result: [],
                                message: error,
                                success: false
                            })
                        } else {
                            return response.status(200).json({
                                message: "Success",
                                success: true
                            })
                        }
                    })
                }
            }
        });
    }
}

/**
 * Method to delete task based on id.
 * Find the task based on id and delete it.
 * @param {*} request 
 * @param {*} response 
 */
module.exports.deleteItem = (request, response) => {
    let data = request['params']
    if (data && data.id) {
        todoListModel.findOneAndRemove({ '_id': data.id }, function (error, document) {
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
 * Method to save new task.
 * Receives title and date in request body. Set status to false (task pending) and save it.
 * @param {*} request 
 * @param {*} response 
 */
module.exports.saveItem = (request, response) => {
    let data = request['body']
    var model = new todoListModel()
    model.title = data.title
    model.status = false
    model.date = data.date
    model.userId = data.userId
    model.save(function (error, document) {
        if (error) {
            return response.status(400).json({
                result: [],
                message: error,
                success: false
            })
        } else {
            return response.status(200).json({
                resut: [],
                message: "Success",
                success: true
            })
        }
    })
}