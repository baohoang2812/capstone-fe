import BaseApi from "~/Core/Api/BaseAPI";
class UploadApi extends BaseApi {
    uploadImage = (data) => {
        const form = new FormData();
        const name = Math.floor(Math.random() * Math.floor(1000000)) + "";

        data.forEach(item => {
            const file = item.originFileObj;
            const blob = file.slice(0, file.size, 'image/png'); 
            const newFile = new File([blob], `${name}.png`, {type: 'image/png'});
            return form.append("files", newFile)
        })

        return this.initApi.post(`${this.baseUrl}/upload`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };
}
export default new UploadApi().requestUrl("/v1/images");