import BaseApi from "~/Core/Api/BaseAPI";

class ProfileApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

  getListFilter = (filters) => {
    let stringFilter = filters.reduce( (result, item) => {
      return `${result}Filter.Ids=${item}&`;
    }, "")
    stringFilter = stringFilter.slice(0, -1);
    return this.initApi.get(`${this.baseUrl}?${stringFilter}`);
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
  getProfile = (body) => {
    return this.initApi.get(`${this.baseUrl}/profile`);
  };

  deleteByIds = (ids) => {
    return this.initApi.del(`${this.baseUrl}`, {ids});
  };
}

export default new ProfileApi().requestUrl("/v1/employees");
