import React, { useEffect, useState } from "react";
import "./style.less";
// import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Form,
    Modal,
    Upload
} from "antd";
import moment from "moment";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */

/* Constants */

/* Api */
import vioApi from "~/Core/Api/VioAPI";
import employeeApi from "~/Core/Modules/Employee/Api";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const ExcuseDetail = ({ form, action, ID }) => {
    const t = useTranslate();
    /* Redux */
    /* State */
    const { getFieldDecorator } = form;
    const [dataEmployee, setDataEmployee] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    // const [previewTitle, setPreviewTitle] = useState("");
    const [previewImage, setPreviewImage] = useState(false);
    const[data,setData]= useState([]);

    useEffect(() => {
        (async ()=> { 
            const Vio = await vioApi.getOne(ID);
            setData(Vio);
        }
        )()
    },[ID]);
    console.log(data,"DATA")
    useEffect(() => {

        (async () => {
            if (data?.data?.result?.[0]?.employeeIds?.length > 0) {
                const res = await employeeApi.getListFilter(data?.data?.result?.[0]?.employeeIds)
                const result = res.data.result;
                setDataEmployee(result);
            } else {
                setDataEmployee([])
            }
            if (data?.data?.result?.[0]?.evidence?.length > 0) {
                const list = data?.data?.result?.[0]?.evidence?.map((item, index) => ({
                    uid: index,
                    name: "Evidence",
                    status: "done",
                    url: item.imagePath,
                }))
                setFileList(list);
            }
        })()

    }, [data]);
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }
    const renderViolation = (description) => {
        const newDescription = description?.split("__")
        return (
            <>
                {
                    newDescription?.map(item => (
                    <p style={{lineHeight: "28px", marginBottom: 0}}>
                        {
                            item
                        }
                    </p>
                ))
                }
            </>
        )
    }
   
    return (
        <Row type="flex" justify="center">
            <Col span={24}>
                <Form>
                    <Row type="flex" justify="center" align="bottom">
                        <Col span={8}>
                            <Form.Item label={t("CORE.VIOLATION.NAME")}>
                                {getFieldDecorator("name", {

                                })(<span style={{fontWeight:800}}>{data?.data?.result?.[0]?.name}</span>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={t("CORE.VIOLATION.CREATED.BY")}>
                                {getFieldDecorator("createdBy", {

                                })(<span style={{fontWeight:800}}>{data?.data?.result?.[0]?.createdBy?.lastName} {data?.data?.result?.[0]?.createdBy?.firstName}</span>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={t("CORE.VIOLATION.CHARGE.CREATE")}>
                                {getFieldDecorator("createdAt", {

                                })(<span style={{fontWeight:800}}>{moment(data?.data?.result?.[0]?.createdAt).format("DD-MM-YYYY | HH:mm")}</span>)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.DESCRIPTION")}>
                                    {getFieldDecorator("description", {

                                    })(<span style={{fontWeight:800}}>{renderViolation(data?.data?.result?.[0]?.description)}</span>)}
                                </Form.Item>
                            </Col>
                           
                        </Row>

                    <Row type="flex" justify="center" align="bottom">
                        <Col span={20}>
                            <Form.Item label={t("CORE.VIOLATION.IMAGE.PATH")}>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    width="700px"
                                    showUploadList={{
                                        showRemoveIcon: false
                                    }}
                                >
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    title={t("CORE.VIOLATION.IMAGE.PATH")}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>

                            </Form.Item>
                        </Col>
                    </Row>

                    <Row type="flex" justify="center" align="bottom">
                        <Col span={16}>
                            <Form.Item label={t("CORE.VIOLATION.VIOLATOR")}>
                                {getFieldDecorator('select-multiple', {

                                })(
                                    
                                    <>
                                            {
                                               dataEmployee?.length>0 ? dataEmployee.map(item => {
                                                    return (
                                                        <div>
                                                            <span style={{fontWeight:800}}>{`${item.lastName} ${item.firstName}`}</span>
                                                        </div>
                                                    )
                                                })
                                                : <span style={{fontWeight:800}}>N/A</span>
                                            }
                                        </>
                                    
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                                <Form.Item label={t("CORE.VIOLATION.WORKSPACE")}>
                                    {getFieldDecorator("workspace", {

                                    })(<span style={{fontWeight:800}}>{data?.data?.result?.[0]?.workspace?.[0]?.name}</span>)}
                                </Form.Item>
                            </Col>
                    </Row>

                    <Row type="flex" justify="center" align="bottom">
                        {
                            data?.status === "Excused" || data?.status === "Rejected" ? (<Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.EXCUSE")}>
                                    {getFieldDecorator("excuse", {

                                    })(<span style={{fontWeight:800}}>{data?.data?.result?.[0].excuse}</span>)}
                                </Form.Item>
                            </Col>) : null
                        }
                    </Row>
                   
                </Form>
            </Col>
        </Row>
    );
};
export default Form.create({ name: "Excuse_Detail" })(
    ExcuseDetail
);