import BaseApi from "~/Core/Api/BaseAPI";

class ProfileApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

  update = (body) => {
    return this.initApi.put(`${this.baseUrl}/update`, body);
  };

  create = (body) => {
    return this.initApi.post(`${this.baseUrl}/create`, body);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}/${id}`);
  };
  
  deleteByIds = (ids, options = {}, opts) => {
    return this.initApi.del(`${this.baseUrl}/deleteByIds`, { ids }, opts);
  };
}

export default new ProfileApi().requestUrl("/v1/employees");
