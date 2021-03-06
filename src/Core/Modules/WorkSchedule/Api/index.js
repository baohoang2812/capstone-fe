import BaseApi from "~/Core/Api/BaseAPI";
class WorkScheduleApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}?Filter.IsDeleted=${false}`);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.Ids=${id}`);
  };

  create = (id,body) => {
    return this.initApi.post(`${this.baseUrl}/${id}`, body);
  };

  update = (id, body) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, body);
  };
}
export default new WorkScheduleApi().requestUrl("/v1/workSchedules");
