import BaseApi from "~/Core/Api/BaseAPI";
class AttendanceApi extends BaseApi {
  getList = (filters) => {
      
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

 
}
export default new AttendanceApi().requestUrl("/v1/timekeepings");
