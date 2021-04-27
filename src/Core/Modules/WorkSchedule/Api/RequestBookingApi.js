import BaseApi from "~/Core/Api/BaseAPI";
class WorkspaceApi extends BaseApi {
  getList = (filter) => {
    return this.initApi.get(`${this.baseUrl}/employee-group`, filter);
  };
}
export default new WorkspaceApi().requestUrl("/v1/booking-requests");
