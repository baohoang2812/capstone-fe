import BaseApi from "~/Core/Api/BaseAPI";
class ShiftApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}?Filter.IsDeleted=${false}`);
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
export default new ShiftApi().requestUrl("/v1/shifts");
