import BaseApi from "~/Core/Api/BaseAPI";
import moment from "moment";

class ViolationApi extends BaseApi {
  // getList = (filters) => {
  //   console.log(filters);
  //   return this.initApi.get(`${this.baseUrl}`, filters);
  // };

  getList = (filters) => {
    const FromDate = moment().startOf('month').format("YYYY-MM-DD");
    const toDate = moment().endOf('month').format("YYYY-MM-DD");
    return this.initApi.get(`${this.baseUrl}`, {...filters, "Filter.FromDate": FromDate, "Filter.ToDate": toDate});
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
export default new ViolationApi().requestUrl("/v1/violations");
