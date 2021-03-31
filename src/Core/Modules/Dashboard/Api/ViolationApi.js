import BaseApi from "~/Core/Api/BaseAPI";

class ViolationApi extends BaseApi {


  getList = (reportMonth) => {
   
    return this.initApi.get(`${this.baseUrl}?reportMonth=${reportMonth}`);
  };

  
}
export default new ViolationApi().requestUrl("/v1/violations/statistics");
