import BaseApi from "~/Core/Api/BaseAPI";
class ReportApi extends BaseApi {
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
}
export default new ReportApi().requestUrl("/v1/violations");
