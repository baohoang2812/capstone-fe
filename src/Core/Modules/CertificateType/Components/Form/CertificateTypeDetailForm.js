import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  Upload,
  Icon,
  Modal,
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { certificateTypes as identity } from "~/Core/Modules/CertificateType/Configs/Constants";

/* Api */
import certificateTypeApi from "~/Core/Modules/CertificateType/Api/";
import uploadApi from "~/Core/Modules/CertificateType/Api/Upload";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CertificateTypeDetailForm = ({ form, data, action, is_create }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  useEffect(() => {
    console.log(data);
    setFieldsValue({
      name: data?.name,
      description: data?.description,
    });
    setFileList([
      {
        uid: "-4",
        name: "image.png",
        status: "created",
        url: data?.imagePath,
      },
    ]);
  }, [data]);
  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        const newValues = {
          ...values,
          imagePath: values?.["imagePath"]?.file?.response?.url,
        };
        console.log(newValues);
        if (is_create) {
          uploadApi.uploadImage(fileList).then(
            res => {
              const newValues2 = {
                ...newValues,
                imagePath: res.data[0].uri
              };
              certificateTypeApi
            .create(newValues2)
            .then((res) => {
              setLoading(false);
              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);
              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.CERTIFICATE.TYPE.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
              setLoading(false);
            });
              
            }
          ).catch(() => {
            message.error(t("CORE.error.system"));
          });
          
        } else {
          if (fileList[0].status.toLowerCase() !== "created") {
            uploadApi.uploadImage(fileList).then(
              res => {
                const newData = {
                  ...values,
                  imagePath: res.data[0].uri
                };
                certificateTypeApi.update(data.id, newData).then((res) => {
                  setLoading(false);

                  if (res.code !== 200) {
                    message.error(t("CORE.task_failure"));
                    return;
                  }
                  dispatch(
                    update_identity_table_data_success(identity, res.data)
                  );
                  message.success(t("CORE.CERTIFICATE.TYPE.UPDATE.SUCCESS"));
                  action();
                });

              });
          }
          else {
            const newValues3 = { ...values, imagePath: data.imagePath }
            certificateTypeApi.update(data.id, newValues3).then((res) => {
              setLoading(false);

              if (res.code !== 200){
                message.error(t("CORE.task_failure"));
                return;
              }

              dispatch(
                update_identity_table_data_success(identity, res.data.employee)
              );
              message.success(t("CORE.CERTIFICATE.TYPE.UPDATE.SUCCESS"));
              action();
            });

          }
          
        }
      }
    });
  };
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleChange = ({ fileList }) => setFileList(fileList);
  return (
    <Row type = "flex" justify = "center">
      <Col span = {12}>
        <div className = "div_custom">
          <Form onSubmit = {onConfirm}>
            <Row type = "flex" justify = "center" align= "bottom">
              <Col span = {15}>
                <Form.Item label = {t("CORE.CERTIFICATE.TYPE.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      { whitespace: true,
                        required: true,
                        message: (<>{t("CORE.CERTIFICATE.ALERT.NAME")}</>)
                      },
                      {
                        max: 255,
                        message: (<>{t("CORE.CERTIFICATE.ALERT.LENGTH")}</>)
                      },
                    ],
                  })(<Input/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type = "flex" justify = "center" align = "bottom">
              <Col span = {15}>
                <Form.Item label = {t("CORE.CERTIFICATE.TYPE.DESCRIPTION")}>
                  {getFieldDecorator("description",{
                    rules: [
                      { whitespace: true,
                        required: true,
                        message: (<>{t("CORE.CERTIFICATE.ALERT.DESCRIPTION")}</>)
                      },
                      {
                        max: 255,
                        message: (<>{t("CORE.CERTIFICATE.ALERT.LENGTH")}</>)
                      },
                    ],
                  })(<Input/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row type = "flex" justify = "center" align = "bottom">
              <Col span = {5}>
                <Form.Item
                  className = "upload-image"
                  label = {t("CORE.CERTIFICATE.TYPE.IMAGE.PATH")}>
                  {getFieldDecorator(
                    "imagePath",
                    {}
                  )(
                    <Upload
                      action = "https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType = "picture-card"
                      fileList = {fileList}
                      onPreview = {handlePreview}
                      onChange = {handleChange}
                    >
                      {fileList.length >= 1 ? null : (
                        <div>
                          <Icon type ="plus" />
                          <div className ="ant-upload-text">Upload</div>
                        </div>
                      )}
                    </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type = "flex" justify = "center">
              <Col span={5}>
                <Modal
                  visible = {previewVisible}
                  footer = {null}
                  onCancel = {handleCancel}
                >
                  <img
                    alt ="example"
                    style ={{ width: "100%" }}
                    src={previewImage}/>
                </Modal>
              </Col>
            </Row>

            <Row type="flex" justify="center">
              <div className="btn-group">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="btn-yellow btn-right"
                  style={{ float: "right" }}
                  onClick={onConfirm}
                >
                  {t("CORE.confirm")}
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default Form.create({ name: "Form_CertificateType_Detail" })(
  CertificateTypeDetailForm
);
