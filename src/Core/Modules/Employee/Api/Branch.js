import BaseApi from "~/Core/Api/BaseAPI";
class BranchApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };

  getListBranchUnManaged = () =>{
    return this.initApi.get(`${this.baseUrl}/Unmanaged-branch-lists`)
  }
}
export default new BranchApi().requestUrl("/v1/branches");