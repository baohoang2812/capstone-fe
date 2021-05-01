import BaseApi from "~/Core/Api/BaseAPI";
class ReportApi extends BaseApi {
  getList = (status,startMonth,endMonth) => {
    return this.initApi.get(`${this.baseUrl}?Filter.IsDeleted=${false}&Filter.Status=${status}&Filter.FromDate=${startMonth}&Filter.ToDate=${endMonth}&Sort.Orders=asc%20createdAt`);
  } ;
}
export default new ReportApi().requestUrl("/v1/reports");
