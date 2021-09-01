/* Author: Vishal Sancheti */

const timelogModel = require('../models/timelogModel');
const projectsModel = require('../models/projectsModel');

//List all documents
const list = (req, res) => {
    timelogModel.find({ 'userId': req.query.userId }).sort({'_id': -1}).populate("project").exec(function (err, timelogs) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Timelogs not found!',
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Timelogs found!',
            data: timelogs
        })
    });
};

//Get document by ID
const get = (req, res) => {
    timelogModel.findById(req.params.id).populate("project").exec(function (err, timelog) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Timelog not found!',
                data: null
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Timelog found!',
            data: timelog
        })
    });
};

//Update document by ID
const update = (req, res) => {
    timelogModel.findById(req.params.id).populate("project").exec( function (err, timelog) {
        if (err){
            return res.status(404).json({
                success: false,
                message: 'Timelog not found!'
            })
        }

        if(req.body && req.body.task){
            timelog.task = req.body.task;
        }

        if(req.body && req.body.endAt){
            timelog.endAt = req.body.endAt;
        }
        timelog.save();

        return res.status(200).json({
            success: true,
            message: 'Timelog updated!',
            data: timelog
        })
    });
};

//Add document
const add = async (req, res) => {
    let project = null;

    if (req.body && req.body.projectId) {
        try {
            project = await projectsModel.findById(req.body.projectId).exec();
        } catch (e) {
            return res.status(404).json({
                success: false,
                message: 'Project not found!',
                data: null
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'projectId is required',
            data: null
        })
    }

    if(project != null){
        const timelog = new timelogModel();

        timelog.project = project;

        if(req.body && req.body.userId){
            timelog.userId = req.body.userId;
        }

        if(req.body && req.body.task){
            timelog.task = req.body.task;
        }
        if(req.body && req.body.startAt){
            timelog.startAt = req.body.startAt;
        }
        if(req.body && req.body.endAt){
            timelog.endAt = req.body.endAt;
        }

        await timelog.save();

        return res.status(200).json({
            success: true,
            message: 'Timelog added!',
            data: timelog
        })
    }
};

//Remove document by ID
const remove = (req, res) => {
    timelogModel.findOneAndRemove({_id: req.params.id},function (err, docs) {
        if (err){
            return res.status(404).json({
                success: false,
                message: err,
                data: null
            });
        }
        else{
            return res.status(200).json({
                success: true,
                message: 'Timelog removed!'
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