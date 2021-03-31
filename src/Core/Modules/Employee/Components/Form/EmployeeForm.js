import "./style.less";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Select,
  DatePicker,
  Upload,
  Icon,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  Spin,
  message,
} from "antd";
import randomstring from "randomstring";
import moment from "moment";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { employees as identity } from "~/Core/Modules/Employee/Configs/constants";

/* Api */
import employeeApi from "~/Core/Modules/Employee/Api";
import branchApi from "~/Core/Modules/Employee/Api/Branch";
import positionApi from "~/Core/Modules/Employee/Api/Position";
import uploadApi from "~/Core/Modules/Employee/Api/Upload";
const { Option } = Select;

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const EmployeeForm = ({ form, action, data, is_create }) => {
  const t = useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  /* Redux */
  const dispatch = useDispatch();

  /* State */
  const [listBranch, setListBranch] = useState([]);
  const [listBranchUnManaged, setListBranchUnManaged] = useState([]);
  const [listPosition, setPosition] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [tmpListBranch, setTmpListBranch] = useState([]);

  useEffect(() => {
    (async () => {
      setLoadingDropdown(true);
      try {
        const resBranch = await branchApi.getList();
        setListBranch(resBranch?.data?.result);
        setTmpListBranch(resBranch?.data?.result);
      } catch { };
      try {
        const resPosition = await positionApi.getList();
        setPosition(resPosition?.data?.result);
      } catch { };
      try {
        const resBranchUnManaged = await branchApi.getListBranchUnManaged();
        setListBranchUnManaged(resBranchUnManaged?.data?.result)
      } catch { };
      setLoadingDropdown(false);
    })();
  }, []);
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().subtract(18, "years");
  }

  function handleChangePosition(value) {
    const tmp = listPosition.filter(item => item.id === value);
    if (tmp[0].name.toLowerCase() === "admin" || tmp[0].name.toLowerCase() === "qc manager") {
      setIsDisable(true);
    }
    else if (tmp[0].name.toLowerCase() === "branch manager") {
      setTmpListBranch(listBranchUnManaged);
      setIsDisable(false);
    }
    else {
      setTmpListBranch(listBranch);
      setIsDisable(false);
    }
  }


  useEffect(() => {
    setFieldsValue({
      code: data?.code,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      address: data?.address,
      username: data?.username,
      roleId: data?.roleId,
      gender: data?.gender,
      birthDate: data?.birthDate ? new moment(data?.birthDate) : moment().subtract(18, "year"),
      isPartTime: data?.isPartTime,
      branchId: data?.branch?.id,
      positionId: data?.position?.id,
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
          birthDate: values["birthDate"].format("YYYY-MM-DD"),
          imagePath: values?.["imagePath"]?.file?.response?.url,
        };
        setLoading(false);
        if (is_create) {
          uploadApi.uploadImage(fileList).then(
            res => {

              const newValues2 = {
                ...newValues,
                imagePath: res.data[0].uri
              };
              employeeApi
                .create(newValues2)
                .then((res) => {
                  setLoading(false);
                  if (res.code !== 201) {
                    message.error(t("CORE.task_failure"));
                    return;
                  }
                  dispatch(update_identity_table_data_success(identity, res.data));
                  message.success(t("CORE.EMPLOYEE.CREATE.SUCCESS"));
                  action();
                })
                .catch(() => {
                  message.error(t("CORE.error.system"));
                });
            }
          ).catch(() => {
            message.error(t("CORE.error.system"));
          });
        } else {
          if (fileList[0].status.toLowerCase() !== "created") {
            console.log(newValues);
            uploadApi.uploadImage(fileList).then(
              res => {

                const newData = {
                  ...values,
                  imagePath: res.data[0].uri
                };
                employeeApi.update(data.id, newData).then((res) => {
                  setLoading(false);

                  if (res.code !== 200) {
                    message.error(t("CORE.task_failure"));
                    return;
                  }

                  dispatch(
                    update_identity_table_data_success(identity, res.data.employee)
                  );
                  message.success(t("CORE.EMPLOYEE.UPDATE.SUCCESS"));
                  action();
                });

              });
          }
          else {
            const newValues3 = { ...values, imagePath: data.imagePath }
            employeeApi.update(data.id, newValues3)
              .then((res) => {
                setLoading(false);

                if (res.code !== 200) {
                  message.error(t("CORE.task_failure"));
                  return;
                }

                dispatch(
                  update_identity_table_data_success(identity, res.data.employee)
                );
                message.success(t("CORE.EMPLOYEE.UPDATE.SUCCESS"));
                action();
              });

          }
        }
      }
    });
  };

  const randomCode = () => {
    const code = randomstring.generate({
      length: 8,
      charset: "alphanumeric",
    });

    setFieldsValue({
      code: code.toUpperCase(),
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

  const handleChange = ({ fileList }) => {
    console.log(fileList)
    setFileList(fileList)
  };

  return (
    <Spin spinning={loadingDropdown}>
      <Form onSubmit={onConfirm}>
        <Row type="flex" justify="space-between" align="bottom">
          <Col span={3}>
            <Form.Item
              className="upload-image"
              label={t("CORE.EMPLOYEE.IMAGE.PATH")}
            >
              {getFieldDecorator(
                "imagePath",
                {}
              )(
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
          <Col span={7}>
            <Form.Item
              className="customs-label"
              label={
                <>
                  <label
                    for="Form_Employee_Detail_code"
                    title={t("CORE.EMPLOYEE.CODE")}
                  >
                    {t("CORE.EMPLOYEE.CODE")}
                  </label>
                  <Button onClick={randomCode}>{t("CORE.EMPLOYEE.GENERATE.CODE")}</Button>
                </>
              }
            >
              {getFieldDecorator("code", {
                rules: [{ 
                  required: true, 
                  whitespace: true,
                  message: (<>{t("CORE.EMPLOYEE.ALERT.CODE")}</>) 
                }],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: (<>{t("CORE.EMPLOYEE.ALERT.ERROR.EMAIL")}</>)
                  },
                  
                  {
                    required: true,
                    whitespace: true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.EMAIL")}</>)
                  },
                  {
                    max: 255,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.MAX.LENGTH")}</>)
                  },
                ],
              })(<Input/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span={13}>
            <Form.Item label={t("CORE.EMPLOYEE.SETTING.FIRST.NAME")}>
              {getFieldDecorator("firstName", {
                rules: [
                  {
                    required:true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.FIRST.NAME")}</>),
                    whitespace: true,
                  },
                 
                  {
                    max:50,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.NAME.MAX.LENGTH")}</>),
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label={t("CORE.EMPLOYEE.SETTING.LAST.NAME")}>
              {getFieldDecorator("lastName", {
                rules: [
                  {
                    required: true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.LAST.NAME")}</>),
                    whitespace: true,
                  },
                  {
                    max: 50,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.NAME.MAX.LENGTH")}</>),
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span={5}>
            <Form.Item label={t("CORE.EMPLOYEE.DATE.OF.BIRTH")}>
              {getFieldDecorator("birthDate", {
                rules: [
                  {
                    type: "object",
                    required: true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.BIRTHDATE")}</>),
                  },
                ],
                initialValue: moment().subtract(18, "year"),
              })(<DatePicker disabledDate={disabledDate} />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t("CORE.EMPLOYEE.PHONE.NUMBER")}>
              {getFieldDecorator("phoneNumber", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.PHONE.NUMBER")}</>),
                  },
                  {
                    pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                    message: (<>{t("CORE.EMPLOYEE.ALERT.ERROR.PHONE.NUMBER")}</>),
                  },
                  {
                    max: 11,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.PHONE.NUMBER.MAX.LENGTH")}</>),
                  },
                  {
                    min: 10,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.PHONE.NUMBER.MIN.LENGTH")}</>),
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("CORE.EMPLOYEE.ADDRESS")}>
              {getFieldDecorator("address", {
                rules: [
                  {
                    max: 255,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.MAX.LENGTH")}</>),
                  },
                  {
                    required: true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.ADDRESS")}</>),
                    whitespace: true,

                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span={4}>
            <Form.Item label={t("CORE.EMPLOYEE.GENDER")}>
              {getFieldDecorator("gender", {
                rules: [
                  {
                    required: true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.GENDER")}</>),
                  },
                ],
                initialValue: "male",
              })(
                <Select>
                  <Option value ="male">{t("CORE.EMPLOYEE.GENDER.MALE")}</Option>
                  <Option value ="female">
                    {t("CORE.EMPLOYEE.GENDER.FEMALE")}
                  </Option>
                  <Option value ="other">
                    {t("CORE.EMPLOYEE.GENDER.OTHER")}
                  </Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span ={4}>
            <Form.Item label ={t("CORE.EMPLOYEE.POSITION")}>
              {getFieldDecorator("positionId", {
                rules: [
                  {
                    required:true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.POSITION")}</>),
                  },
                ],
                initialValue:listPosition?.[0]?.id,
              })(
                <Select onChange ={handleChangePosition}>
                  {listPosition.map((item) => (

                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>

                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span ={4}>
            <Form.Item label ={t("CORE.EMPLOYEE.JOB.TYPE")}>
              {getFieldDecorator("isPartTime", {
                rules: [
                  {
                    required: true,
                    message: (<>{t("CORE.EMPLOYEE.ALERT.JOB.TYPE")}</>),
                  },
                ],
                initialValue: true,
              })(
                <Select>
                  <Option value ={true}>Part time</Option>
                  <Option value ={false}>Full time</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label ={t("CORE.EMPLOYEE.BRANCH.NAME")}>
              {getFieldDecorator("branchId", {

                initialValue: tmpListBranch?.[0]?.id,
              })(
                <Select disabled={isDisable}>
                  {tmpListBranch.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                  <Option key={-1} value={""}>
                    UnSign
                  </Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
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
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default Form.create({ name: "Form_Employee" })(EmployeeForm);
