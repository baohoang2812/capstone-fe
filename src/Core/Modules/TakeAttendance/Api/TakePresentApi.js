import BaseApi from "~/Core/Api/BaseAPI";
class TakePresentApi extends BaseApi {
 

  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };
}
export default new TakePresentApi().requestUrl("/v1/scheduleSpacesEmployees/attendance");
