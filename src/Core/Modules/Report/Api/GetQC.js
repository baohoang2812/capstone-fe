import BaseApi from "~/Core/Api/BaseAPI";
class QCApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.get(`${this.baseUrl}`, filters);
  };

//   getOne = (id) => {
//     return this.initApi.get(`${this.baseUrl}?Filter.Ids=${id}`);
//   };

//   create = (body) => {
//     return this.initApi.post(`${this.baseUrl}`, body);
//   };

//   update = (id, body) => {
//     return this.initApi.put(`${this.baseUrl}/${id}`, body);
//   };
}
export default new QCApi().requestUrl("/v1/employees/qc-list");
