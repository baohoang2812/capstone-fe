import BaseApi from "~/Core/Api/BaseAPI";
class NotificationApi extends BaseApi {
  
  readAll = () => {
    return this.initApi.put(`${this.baseUrl}`);
  };
 
}
export default new NotificationApi().requestUrl("/v1/account-notifications/all");