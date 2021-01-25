import BaseApi from "~/Core/Api/BaseAPI";
class CertificationApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.EmployeeId=${id}`);
  };
}
export default new CertificationApi().requestUrl("/v1/certifications");