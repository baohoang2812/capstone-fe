import BaseApi from "~/Core/Api/BaseAPI";
class BranchApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

  disable = (id) => {
    return this.initApi.put(`${this.baseUrl}/disable?id=${id}`);
  };
  enable = (id) => {
    return this.initApi.put(`${this.baseUrl}/enable?id=${id}`);
  };
  
}
export default new BranchApi().requestUrl("/v1/camera-configs");
