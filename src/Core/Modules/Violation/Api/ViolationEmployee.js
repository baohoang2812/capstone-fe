import BaseApi from "~/Core/Api/BaseAPI";
class ViolationEmployeeApi extends BaseApi {
 

  create = (id, body) => {
    return this.initApi.post(`${this.baseUrl}/${id}`, body);
  };
}
export default new ViolationEmployeeApi().requestUrl("/v1/violationEmployees");
