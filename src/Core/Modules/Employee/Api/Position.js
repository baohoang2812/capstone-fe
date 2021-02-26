import BaseApi from "~/Core/Api/BaseAPI";

class PositionApi extends BaseApi {
  getList = () => {
    return this.initApi.get(`${this.baseUrl}`);
  };
}
export default new PositionApi().requestUrl("/v1/positions");