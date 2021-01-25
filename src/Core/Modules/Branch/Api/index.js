import BaseApi from "~/Core/Api/BaseAPI";
class BranchApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

  getOne = (filters) => {
    return this.initApi.post(`${this.baseUrl}`, filters);
  }
  create = (body) => {
    return this.initApi.post(`${this.baseUrl}/createBranch`, body);
  };
  update = (body) => {
    return this.initApi.put(`${this.baseUrl}/update`, body);
  };
}
export default new BranchApi().requestUrl("/v1/branches");