import React, { useEffect, useState } from "react";
import "./style.less";
import { useDispatch } from "react-redux";
import {
    Row,
    Col,
    Form,
    Button,
    Divider,
    message,
    Select,
    Upload,
    Modal
} from "antd";
import moment from "moment";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { violations as identity } from "~/Core/Modules/Violation/Configs/Constants";

/* Api */
import ViolationEmployeeApi from "~/Core/Modules/Violation/Api/ViolationEmployee";
import employeeApi from "~/Core/Modules/Employee/Api";
import violationApi from "~/Core/Modules/Violation/Api/Violation";
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const UpdateViolatorDetail = ({ form, isShow = true, action, data }) => {
    const t = useTranslate();
    /* Redux */
    const dispatch = useDispatch();
    /* State */
    const [loading, setLoading] = useState(false);
    // const [loadingDropdown, setLoadingDropdown] = useState(false);
    const { getFieldDecorator, validateFields,setFieldsValue} = form;
    const [previewVisible, setPreviewVisible] = useState(false);
    // const [previewTitle, setPreviewTitle] = useState("");
    const [previewImage, setPreviewImage] = useState(false);
    const [dataEmployee, setDataEmployee] = useState([]);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
       
        const vioID = data?.violator.map((item) =>(
            item.id
        ))
       
        setFieldsValue({
           violator:vioID 
          });
        employeeApi.getList()
            .then(res => {
                const result = res.data.result;
                setDataEmployee(result);
            }
            )
            if (data?.evidence?.length > 0) {
                const list = data?.evidence?.map((item, index) => ({
                    uid: index,
                    name: "Evidence",
                    status: "done",
                    url: item.imagePath,
                }))
                setFileList(list);
            }
            else{
                setFileList([]);
            }

    }, [data]);
    const { Option } = Select;
    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }
    const onConfirm = (e) => {
        e.preventDefault();
        validateFields((err, values) => {

            if (!err) {
                setLoading(true);
                ViolationEmployeeApi.create(
                    data.id,

                    {
                        "employeeIds": values.violator
                    }

                )
                    .then((res) => {
                        if (res.code !== 201) {
                            message.error(t("CORE.task_failure"));
                            return;
                        }
                        violationApi.update(
                            data.id,
                            {
                                excuse: "string",
                                name: "string",
                                description: "string",
                                imagePath: "string",
                                reportId: 0,
                                regulationId: 0,
                                status: "Confirmed",
                                branchId: 0
                            }
                        ).then((res) => {
                            if (res.code !== 200) {
                                message.error(t("CORE.task_failure"));
                                return;
                            }
                            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "status", data: res.data.status }));
                            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "employeeIds", data: values.violator }));
                            message.success(t("CORE.VIOLATION.CREATE.SUCCESS"));
                            setLoading(false);
                            action();
                        })
                            .catch(() => {
                                message.error(t("CORE.error.system"));
                                setLoading(false);
                            });

                    })
                    .catch(() => {
                        message.error(t("CORE.error.system"));
                        setLoading(false);
                    });

            }
        });
    };
    console.log(dataEmployee);
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
                
                    <Form onSubmit={onConfirm}>
                    <Row type="flex" justify="center" align="bottom">
                            
                            <Col span={8}>
                            <Form.Item label={t("CORE.VIOLATION.NAME")}>
                                {getFieldDecorator("name", {

                                })(<span style={{fontWeight:800}}>{data?.name}</span>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={t("CORE.VIOLATION.CREATED.BY")}>
                                {getFieldDecorator("createdBy", {

                                })(<span style={{fontWeight:800}}>{data?.createdBy?.lastName} {data?.createdBy?.firstName}</span>)}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={t("CORE.VIOLATION.CHARGE.CREATE")}>
                                {getFieldDecorator("createdAt", {

                                })(<span style={{fontWeight:800}}>{moment(data?.createdAt).format("DD-MM-YYYY | HH:mm")}</span>)}
                            </Form.Item>
                        </Col>
                        </Row>

                        <Row type="flex" justify="center" align="bottom">
                            <Col span={20}>
                                <Form.Item label={t("CORE.VIOLATION.DESCRIPTION")}>
                                    {getFieldDecorator("description", {

                                    })(<span style={{fontWeight:800}}>{renderViolation(data?.description)}</span>)}
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
                                    width="900px"
                                >
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                                </Form.Item>
                            </Col>
                        </Row>
                       
                        <Row type="flex" justify="center" align="bottom">
                            <Col span={14}>
                                <Form.Item label={t("CORE.VIOLATION.SELECT.VIOLATOR")}>
                                    {getFieldDecorator("violator", {
                                        rules: [
                                            { required: true, message: (<>{t("CORE.VIOLATION.ALERT.VIOLATOR")}</>), type: 'array' },
                                        ],
                                       
                                    })(
                                        <Select mode="multiple" placeholder={t("CORE.VIOLATION.ALERT.VIOLATOR")}>
                                            {dataEmployee.map((item) => (
                                                <Option key={item.id} value={item.id}>
                                                    {`${item.lastName} ${item.firstName}`}
                                                </Option>
                                            ))}
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={4}>
                                <Form.Item label={t("CORE.VIOLATION.WORKSPACE")}>
                                    {getFieldDecorator("workspace", {

                                    })(<span style={{fontWeight:800}}>{data?.workspace?.length >0 ? data?.workspace?.[0]?.name : "N/A"}</span>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            {isShow ? (<div className="btn-group">

                                {/* <Button
                                    loading={loading}
                                    type="danger"
                                    className="btn-yellow btn-left"
                                    style={{ float: "right" }}
                                    onClick={action}>
                                    {t("CORE.cancel")}
                                </Button> */}
                                <Divider type="vertical" />

                                <Button
                                    loading={loading}
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-yellow btn-right"
                                    style={{ float: "right" }}
                                    onClick={onConfirm}>
                                    {t("CORE.VIOLATION.CONFIRM.ACCEPT")}
                                </Button>
                            </div>) : null}
                        </Row>
                    </Form>
                
            </Col>
        </Row>
    );
};
export default Form.create({ name: "UpdatePerson_Detail" })(
    UpdateViolatorDetail
);