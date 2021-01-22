import BaseApi from "~/Core/Api/BaseAPI";
class BranchApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.post(`${this.baseUrl}`, filters);
  };

  getOne = (filters) => {
    return this.initApi.post(`${this.baseUrl}`, filters);
  }
 
}
export default new BranchApi().requestUrl("/api/regulation");