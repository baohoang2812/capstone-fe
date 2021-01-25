import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import {
  Select,
  Row,
  Col,
  Form,
  Input,
  Button,
  Spin,
  message,
  Upload,
  Icon,
  Modal
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { certificateTypes as identity } from "~/Core/Modules/CertificateType/Configs/constants";

/* Api */

import certificateTypeApi from "~/Core/Modules/CertificateType/Api/";
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const { Option } = Select;

const token = localStorage.getItem("token" || "");
const CertificateTypeDetailForm = ({ form, data, action, is_create }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [listCertificateType, setListCertificateType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  useEffect(() => {
    (async () => {
      setLoadingDropdown(true);
      const resCertificateType = await certificateTypeApi.getList();
      setListCertificateType (resCertificateType?.data?.list);
     
      setLoadingDropdown(false);
    })();
  }, []);
  useEffect(() => {
    setFieldsValue({
      name: data?.certificateType?.name,
      description: data?.certificateType?.description,


    });
    setFileList([
        {
          uid: "-4",
          name: "image.png",
          status: "done",
          url: data?.certificateType?.imagePath,
        },
      ]);
   

  }, [data]);
  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        console.log(values);
        if (is_create) {
          certificateTypeApi
            .create(values)
            .then((res) => {
              setLoading(false);
              if (res.status !== 200) {
                message.error(t("CORE.task_failure"));
                return;
              }
              dispatch(
                update_identity_table_data_success(identity, res.data.cer)
              );
              message.success(t("CORE.CERTIFICATE.TYPE.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
          values.branch.id = data.branch.id;
          certificateTypeApi.update(values).then((res) => {
            setLoading(false);

            if (res.status !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            dispatch(
              update_identity_table_data_success(identity, res.data.branch)
            );
            message.success(t("CORE.CERTIFICATE.TYPE.UPDATE.SUCCESS"));
            action();
          });
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
    <Row type="flex" justify="center">
      <Col span={12}>
        <div className="div_custom">
          <Spin spinning={loadingDropdown}>
            <Form onSubmit={onConfirm}>
            <Row type="flex" justify="center" align="bottom">
                <Col span={15}>
                  <Form.Item label={t("CORE.CERTIFICATE.TYPE.NAME")}>
                    {getFieldDecorator("name", {
                      rules:[{
                        required:true,
                        message:"Please input certificate type name!"

                      },
                    {
                      max:255,
                      message:"Max length is 255 characters!"
                    }]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="center" align="bottom">
                <Col span={15}>
                  <Form.Item label={t("CORE.CERTIFICATE.TYPE.DESCRIPTION")}>
                    {getFieldDecorator("description", {
                      rules:[{
                        required:true,
                        message:"Please input certificate type description!"

                      },
                    {
                      max:255,
                      message:"Max length is 255 characters!"
                    }]
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </Row>
             
            <Row type="flex" justify="center" align="bottom">
            <Col span={3}>
                  <Form.Item
                    className="upload-image"
                    label={t("CORE.CERTIFICATE.TYPE.IMAGE.PATH")}
                  >
                    {getFieldDecorator("image_path", {})(
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 1 ? null : (
                          <div>
                            <Icon type="plus" />
                            <div className="ant-upload-text">Upload</div>
                          </div>
                        )}
                      </Upload>
                    )}
                  </Form.Item>
                </Col>
            </Row>
             
             
          
             
              <Row type="flex" justify="center">
              <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                <div className="btn-group">
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="btn-yellow btn-right"
                    style={{ float: "right" }}
                    onClick={onConfirm}>
                    {t("CORE.confirm")}
                  </Button>
                </div>
              </Row>
            </Form>
          </Spin>
        </div>
      </Col>
    </Row>
  );
};
export default Form.create({ name: "Form_Certificate_Type_Detail" })(
  CertificateTypeDetailForm
);