import BaseApi from "~/Core/Api/BaseAPI";

class CamerasConfigApi extends BaseApi { 
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

  getOne = (id) => {
    return this.initApi.get(`${this.baseUrl}?Filter.CameraIds=${id}`); 
  };
  create = (body) => {
    return this.initApi.post(`${this.baseUrl}`, body);
  };

  update = (id, body) => {
    return this.initApi.put(`${this.baseUrl}/${id}`, body); 
  };
}
export default new CamerasConfigApi().requestUrl("/v1/camera-configs");