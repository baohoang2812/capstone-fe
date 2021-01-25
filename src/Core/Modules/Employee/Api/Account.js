import BaseApi from "~/Core/Api/BaseAPI";
class AccountApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.EmployeeId=${id}`);
  };
}
export default new AccountApi().requestUrl("/v1/accounts");