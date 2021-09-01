/**
 * Author: Sanket Shah.
 * Created On: 2021-07-20
 * Services for Projects.
 */

import axios from "axios";

export class projectsServices{

    /**
     * Method to hit the API of getting list of projects
     */
    async list(data){
        let object = {}
        object['userId'] = data.userId
        const result = await axios.post("/api/projects",object);
        return result.data;
    };

    /**
     * Method to hit the API of getting single project
     */
    async get(id){
        const result = await axios.get("/api/projects/"+id);
        return result.data;
    };

    /**
     * Method to hit the API of adding project in a list
     */
    async add(data){
        //data.projectId = data.project;
        const result = await axios.post("/api/projects/add",data);
        return result.data;
    };

    /**
     * Method to hit the API of updating a project
     */
    async update(data){
        //data.projectId = data.project;
        const result = await axios.put("/api/projects/update/"+data._id,data);
        return result.data;
    };

    /**
     * Method to hit the API of removing the project
     */
    async remove(data){
        const result = await axios.delete("/api/projects/remove/"+data._id,data);
        return result.data;
    };
}

export default new projectsServices()