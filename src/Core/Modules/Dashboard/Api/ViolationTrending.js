import BaseApi from "~/Core/Api/BaseAPI";

class ViolationApi extends BaseApi {


  getList = (fromTime,toTime) => {
   
    return this.initApi.get(`${this.baseUrl}?fromTime=${fromTime}&toTime=${toTime}`);
  };

  
}
export default new ViolationApi().requestUrl("/v1/violations/trending");
