import BaseApi from "~/Core/Api/BaseAPI";
class WorkScheduleApi extends BaseApi {
  getList = (pageIndex,pageSize,filters) => {
    return this.initApi.get(`${this.baseUrl}?PageIndex=${pageIndex}&Limit=${pageSize}`, filters);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.Ids=${id}`);
  };

  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };

  update = (body) => {
    return this.initApi.put(`${this.baseUrl}`, body);
  };
}
export default new WorkScheduleApi().requestUrl("/v1/scheduleSpacesEmployees");
