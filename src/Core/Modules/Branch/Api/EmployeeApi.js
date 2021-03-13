
import BaseApi from "~/Core/Api/BaseAPI";
class EmployeeApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

}
export default new EmployeeApi().requestUrl("/v1/employees/unassigned-managers");