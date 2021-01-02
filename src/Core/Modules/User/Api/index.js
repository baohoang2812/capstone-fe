import BaseApi from "~/Core/Api/BaseAPI";

class ProfileApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.post(`${this.baseUrl}`, filters);
  };

  update = (body) => {
    return this.initApi.post(`${this.baseUrl}/update`, body);
  };

  createUser = (body) => {
    return this.initApi.post(`${this.baseUrl}/create`, body);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}/${id}`);
  };
}

export default new ProfileApi().requestUrl("/api/users");
