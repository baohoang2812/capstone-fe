import BaseApi from "~/Core/Api/BaseAPI";
class WorkspaceApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}?Filter.IsDeleted=${false}&PageIndex=${0}&Limit=${900}`);
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
}
export default new WorkspaceApi().requestUrl("/v1/workspaces");
