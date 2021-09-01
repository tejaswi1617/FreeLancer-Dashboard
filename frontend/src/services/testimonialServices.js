/**
 * Author: Deep Patel.
 * Created On: 2021-07-20
 *  Services Page for Testimonials.
 */

import axios from "axios";

export class testimonialServices{

    // list of all testimonials
    async list(data){
        let object = {}
        object['userId'] = data.userId
        const result = await axios.post("/api/testimonials",object);
        return result.data;
    };

    // add data
    async add(data){
        const result = await axios.post("/api/testimonials/add",data);
        return result.data;
    };

    // update data by id
    async update(data){
        const result = await axios.put("/api/testimonials/update/"+data.id,data);
        return result.data;
    };

    // remove data by id
    async delete(deleteData) {
        const result = await axios.post("/api/testimonials/remove", deleteData);
        return result.data;
     }
}

export default new testimonialServices()