import BaseApi from "~/Core/Api/BaseAPI";

class RoleApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };
}
export default new RoleApi().requestUrl("/v1/roles");