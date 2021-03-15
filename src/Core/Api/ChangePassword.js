import BaseApi from "~/Core/Api/BaseAPI";
class ChangePasswordApi extends BaseApi {
  

  update = (body) => {
    return this.initApi.put(`${this.baseUrl}`, body);
  };
}
export default new ChangePasswordApi().requestUrl("/v1/auth/password");