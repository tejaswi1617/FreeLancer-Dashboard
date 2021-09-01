/**
 * Author: Tejaswi Chaudhary.
 * Created On: 2021-06-07
 * model for invoice management, invoice generation and edit invoice.
 */
const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const invoiceSchema = {
    userId : {type: Schema.Types.ObjectID,ref: "users"},
    generatedDate:{type:Date, required:true},
    dueDate:{type:Date, required:true},
    startDate:{type:Date,required:true},
    taskendDate:{type:Date, required:true},
    hourlyRate:{type:Number, required:true},
    totalCost:{type:Number},
    projectId:{type: Schema.Types.ObjectID,ref: "projects"},
    projectName:{type:String, required:true},
    clientName:{type:String, required:true},
    paymentStatus:{type:String, required:true},
    tags:[{
        tagId:{type: Schema.Types.ObjectID,ref: "timelogs"},
        description:{type:String, required:true},
        hours:{type:Number, required:true},
        total:{type:Number, required:true},
    }]
};

//create model accoridng to collection : "invoices"
const invoices = mongoose.model('invoices', invoiceSchema);

module.exports = invoices;