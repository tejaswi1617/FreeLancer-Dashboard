/* Author: Vishal Sancheti */

import axios from "axios";

export class timelogServices{
    // Get all Timelogs
    async list(data){
        const result = await axios.get("/api/timelogs",{ params: data });
        return result.data;
    };

    // Add new Timelog
    async add(data){
        data.projectId = data.project;
        const result = await axios.post("/api/timelogs/add",data);
        return result.data;
    };

    // Update Timelog
    async update(data){
        data.projectId = data.project;
        const result = await axios.put("/api/timelogs/update/"+data._id,data);
        return result.data;
    };

    // Remove Timelog
    async remove(data){
        const result = await axios.delete("/api/timelogs/remove/"+data._id,data);
        return result.data;
    };
}

export default new timelogServices()