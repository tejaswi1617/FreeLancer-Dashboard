/**
 * Author: Tejaswi Chaudhary.
 * Created On: 2021-06-07
 * Service Containing API calls for Invoice management, Invoice generation and Edit invoice.
 */
 import axios from "axios"
 export class invoiceServices {
     async getTags(date) {
         const result = await axios.post("/api/invoices/tags",  date );
         return result;
     }
 
     async addInvoice(data) {
         const result = await axios.post("/api/invoices/save", data);
         return result;
     }
 
     async findInvoice(data) {
         const result = await axios.post("/api/invoices/findinvoice", data);
         return result;
     }
 
     async getAllProject(data) {
         const result = await axios.post("/api/invoices/getproject",data);
         return result;
     }
     
     async getAllInvoices(data) {
        const result = await axios.post("/api/invoices/fetchinvoices",data);
        return result;
    }

    async deleteinvoice(data) {
        const result = await axios.post("/api/invoices/deleteinvoice",data);
        return result;
    }
     
    async updateInvoice(data) {
        const result = await axios.post("/api/invoices/updateinvoice",data);
        return result;
    }
    async getUserEmail(data) {
        const result = await axios.post("/api/invoices/getEmail",data);
        return result;
    }
    async getClentEmail(data) {
        const result = await axios.post("/api/invoices/getClientEmail",data);
        return result;
    }
    getClentEmail
 }
 
 export default new invoiceServices()