import BaseApi from "~/Core/Api/BaseAPI";
class AccountApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.EmployeeId=${id}`);
  };
  
  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };

  update = (id, body) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, body);
  };

}
export default new AccountApi().requestUrl("/v1/accounts");