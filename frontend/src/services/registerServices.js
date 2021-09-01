/**
 * Author: Deep Patel
 * Created On: 2021-07-28
 */

import axios from "axios"

export class registerService {

   async addNewUser(data) {
      const result = await axios.post('/api/register/add', data);
      return result.data;
   }

   async validateUser(user){
      const result = await axios.post("/api/register/validateUser", user);
      return result.data;
   }

   async resetPassword(user){
      const result = await axios.post("/api/register/resetPassword", user);
      return result.data;
   }

   async fetchUser(user) {
      const result = await axios.post("/api/register/fetchUser", user);
      return result.data;
   }

   async fetchUserById(id) {
      const result = await axios.post("/api/register/fetchUserById", { id: id });
      return result.data;
   }

   async editUser(user){
    const result = await axios.put("/api/register/edit/"+user.id, user);
    return result.data;
    }
}

export default new registerService()