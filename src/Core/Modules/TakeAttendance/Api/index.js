import BaseApi from "~/Core/Api/BaseAPI";
class AttendanceApi extends BaseApi {
  getList = (filters) => {
      
    return this.initApi.get(`${this.baseUrl}`, filters);
  };
  getDetail = (fromDate,toDate,id) => {
      
    return this.initApi.get(`${this.baseUrl}?Filter.FromDate=${fromDate}&Filter.ToDate=${toDate}&Filter.EmployeeId=${id}`);
  };
 
}
export default new AttendanceApi().requestUrl("/v1/scheduleSpacesEmployees");
