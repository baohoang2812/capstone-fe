import BaseApi from "~/Core/Api/BaseAPI";
// import moment from "moment";

class ViolationApi extends BaseApi {
  readNoti = (id) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, {
      "isRead": true
    });
  };
}
export default new ViolationApi().requestUrl("/v1/account-notifications");
