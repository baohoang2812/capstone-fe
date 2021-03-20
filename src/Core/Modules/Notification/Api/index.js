import BaseApi from "~/Core/Api/BaseAPI";
class NotificationApi extends BaseApi {
  getList = (pageIndex,pageSize) => {
    return this.initApi.get(`${this.baseUrl}?PageIndex=${pageIndex}&Limit=${pageSize}`,);
  };

 
}
export default new NotificationApi().requestUrl("/v1/account-notifications");