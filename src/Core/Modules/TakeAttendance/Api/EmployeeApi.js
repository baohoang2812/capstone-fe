import BaseApi from "~/Core/Api/BaseAPI";

class EmployeeApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}?Filter.IsDeleted=${false}&Filter.ExcludeBranchModerator=${true}`);
  };

}

export default new EmployeeApi().requestUrl("/v1/employees");
