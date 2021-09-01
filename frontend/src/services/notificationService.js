import axios from "axios";

export class notificationService {
    async fetchNotifications(data) {
        let object = {}
        object['currentDate'] = data.currentDate
        object['userId'] = data.userId
        const result = await axios.post("/api/notification/List", object );
        return result;
    }

    async setStatus(data) {
        let object = {}
        object['currentDate'] = data.currentDate
        object['eventName'] = data.value.eventName
        object['category'] = data.value.category
        const result = await axios.post("/api/notification/setStatus", object);
        return result;
    }
}

export default new notificationService()