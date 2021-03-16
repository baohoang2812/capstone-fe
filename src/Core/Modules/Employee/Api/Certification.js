import BaseApi from "~/Core/Api/BaseAPI";
class CertificationApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.EmployeeId=${id}`);
  };
  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };

  update = (id, body) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, body);
  };
}
export default new CertificationApi().requestUrl("/v1/certifications");