import BaseApi from "~/Core/Api/BaseAPI";
class NotificationApi extends BaseApi {
  getList = (pageIndex,pageSize) => {
    return this.initApi.get(`${this.baseUrl}?PageIndex=${pageIndex}&Limit=${pageSize}&Sort.Orders=asc%20createdAt`,);
  };
  update = (id, body) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, body);
  };
 
}
export default new NotificationApi().requestUrl("/v1/account-notifications");