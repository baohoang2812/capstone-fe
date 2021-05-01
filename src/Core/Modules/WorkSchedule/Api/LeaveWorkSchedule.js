import BaseApi from "~/Core/Api/BaseAPI";
class WorkScheduleApi extends BaseApi {
  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };
}
export default new WorkScheduleApi().requestUrl("/v1/scheduleSpacesEmployees/leave");
