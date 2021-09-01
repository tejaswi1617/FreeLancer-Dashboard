/**
 * Author: Sanket Shah.
 * Created On: 2021-07-20
 * Controller for Projects.
 */

const projectsModel = require('../models/projectsModel');

/**
 * Method to fetch all the project list
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * If projects exists, returns an array of type "ProjectsModel"
 * Else returns empty array.
 */
const list = (req, res) => {
    let data = req['body']
    projectsModel.find({ 'userId': data.userId }, function (err, docs) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Projects not found!',
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Projects found!',
            data: docs
        })
    });
};

/**
 * Method to fetch one single project
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * If project exists, returns a project "ProjectsModel"
 * Else returns empty array.
 */
const get = (req, res) => {
    projectsModel.findById(req.params.id, function (err, doc) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Project not found!',
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Project found!',
            data: doc
        })
    });
};

/**
 * Method to update the project
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * It updates the project info in type "ProjectsModel"
 * Else returns empty array.
 */
const update = (req, res) => {
    projectsModel.findById(req.params.id, function (err, projects) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Project not found!'
            })
        }

        if(req.body && req.body.title){
            projects.title = req.body.title;
        }
        if(req.body && req.body.client){
            projects.client = req.body.client;
        }
        if(req.body && req.body.description){
            projects.description = req.body.description;
        }
        if(req.body && req.body.rate){
            projects.rate = req.body.rate;
        }
        if(req.body && req.body.invoice){
            projects.invoice = req.body.invoice;
        }
        if(req.body && req.body.status){
            projects.status = req.body.status;
        }
        projects.save();
        return res.status(200).json({
            success: true,
            message: 'Project updated!',
        })
    });
};

/**
 * Method to fetch add the project in the list
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * It adds the array of type "ProjectsModel"
 * Else returns empty array.
 */
const add = async (req, res) => {
    
        const projects = new projectsModel();

        if(req.body && req.body.title){
            projects.title = req.body.title;
        }
        if(req.body && req.body.client){
            projects.client = req.body.client;
        }
        if(req.body && req.body.description){
            projects.description = req.body.description;
        }
        if(req.body && req.body.rate){
            projects.rate = req.body.rate;
        }
        if(req.body && req.body.invoice){
            projects.invoice = req.body.invoice;
        }
        if(req.body && req.body.status){
            projects.status = req.body.status;
        }
        if(req.body && req.body.userId){
            projects.userId = req.body.userId;
        }
        projects.save();

        return res.status(200).json({
            success: true,
            message: 'Project added!',
            data: projectsModel
        })
};

/**
 * Method to remove the project from the project list
 * @param {*} request 
 * @param {*} response 
 * @returns 
 * If projects exists, deletes the Project
 * Else returns empty array.
 */
const remove = (req, res) => {
    projectsModel.findOneAndRemove({_id: req.params.id},function (err, docs) {
        if (err){
            return res.status(404).json({
                success: true,
                message: err,
                data: null
            });
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'Project removed!',
                data: projectsModel
            })
        }
    });
};

module.exports = {
    list,
    get,
    update,
    add,
    remove
};