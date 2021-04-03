import BaseApi from "~/Core/Api/BaseAPI";

class ProfileApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}?Filter.IsDeleted=${false}&Filter.ExcludeBranchModerator=${true}`);
  };

  update = (id, body) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, body);
  };

  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.Ids=${id}`);
  };
  
  deleteByIds = (ids, options = {}, opts) => {
    return this.initApi.del(`${this.baseUrl}/deleteByIds`, { ids }, opts);
  };
}

export default new ProfileApi().requestUrl("/v1/employees");
