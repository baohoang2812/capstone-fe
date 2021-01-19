import BaseApi from "~/Core/Api/BaseAPI";
class BranchApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };
}
export default new BranchApi().requestUrl("/api/branch");