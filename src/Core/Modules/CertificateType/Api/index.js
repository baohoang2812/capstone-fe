import BaseApi from "~/Core/Api/BaseAPI";
class CertificateTypeApi extends BaseApi {
  getList = (filters) => {
    return this.initApi.post(`${this.baseUrl}`, filters);
  };

 
}
export default new CertificateTypeApi().requestUrl("/v1/certificatetypes");