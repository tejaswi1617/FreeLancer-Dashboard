/* Author: Vishal Sancheti */

import axios from "axios";

export class dashboardService{
    // Get stat counts
    async stats(data){
        const result = await axios.get("/api/dashboard/stats",{ params: data });
        return result.data;
    };

    // Get client project count
    async clientProjects(data){
        const result = await axios.get("/api/dashboard/client-projects",{ params: data });
        return result.data;
    };

    // Get client invoice stats
    async clientInvoiceStats(data){
        const result = await axios.get("/api/dashboard/client-invoice-stats",{ params: data });
        return result.data;
    };

    // Get timelog stats
    async timelogStats(data){
        const result = await axios.get("/api/dashboard/timelog-stats",{ params: data });
        return result.data;
    };
}

export default new dashboardService()