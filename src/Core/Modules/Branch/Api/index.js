import BaseApi from "~/Core/Api/BaseAPI";
class BranchApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.Ids=${id}`);
  };
  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };

  update = (id, body) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, body);
  };
  deleteByIds = (ids) => {
    return this.initApi.del(`${this.baseUrl}`, {ids});
  };
}
export default new BranchApi().requestUrl("/v1/branches");