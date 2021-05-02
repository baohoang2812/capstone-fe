import "./style.less";

import React, { useEffect, useState } from "react";
import {
  Select,
  DatePicker,
  Upload,
  Icon,
  Row,
  Col,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import moment from "moment";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
/* Api */
import employeeApi from "~/Core/Modules/Profile/Api";
const { Option } = Select;
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const ProfileForm = ({form}) => {
  const t = useTranslate();
  const { getFieldDecorator,setFieldsValue } = form;
  // const [error, setError] = useState(false);
  /* Redux */
  /* State */
  // const [loading, setLoading] = useState(false);
  // const [loadingDropdown, setLoadingDropdown] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // const {
  //   roleName: role
  // } = jwt_decode(token);

  // useEffect(() => {
  //   (async () => {
  //     setLoadingDropdown(true);

  //     const resBranch = await branchApi.getList();
  //     const resRole = await roleApi.getList();
  //     const resPosition = await positionApi.getList();

  //     setListBranch(resBranch?.data?.list);
  //     setRole(resRole?.data?.list);
  //     setPosition(resPosition?.data?.list);

  //     setLoadingDropdown(false);
  //   })();
  // }, []);
  const [data, setData] = useState({});

  useEffect(() => {
  
    setFieldsValue({
      code: data?.code,
      first_name: data?.firstName,
      last_name: data?.lastName,
      email: data?.email,
      phone_number: data?.phoneNumber,
      address: data?.address,
      username: data?.account?.username,
      gender: data?.gender,

      role_id: data?.account?.role?.name,
      birth_date: new moment(data?.birthDate),
      is_part_time: data?.isPartTime,
      branch_id: data?.branch?.name,
      position_id: data?.position?.name,
    });

    setFileList([
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url: data?.imagePath,
      },
    ]);
  }, [data]);

  useEffect(() => {
    
      (async () => {
        try {
          // setLoading(true);
          const res = await employeeApi.getProfile();
          if (res.code !== 200) {
            message.error("CORE.MENU.message_error");
            // setLoading(false);
            // setError(true);
            return;
          }
          const data = res?.data|| {};
          setData(data);
          console.log(data);
        } catch (error) {
          // setError(true);
          // setLoading(false);
        }
      })();
  }, []);
  // const onConfirm = (e) => {
  //   e.preventDefault();
  //   validateFields((err, values) => {
  //     if (!err) {
  //       setLoading(true);
  //       const newValues = {
  //         ...values,
  //         birth_date: values["birth_date"].format("YYYY-MM-DD"),
  //         image_path: values?.["image_path"]?.file?.response?.url,
  //       };

  //       newValues.branch_manager_id = 1;
  //       newValues.status = "test";
  //       const { username, ...employee } = newValues;
  //       setLoading(false);
  //       const objReq = {
  //         employee,
  //         account: {
  //           username
  //         },
  //       };

  //       objReq.employee.id = data.employee.id;
  //       employeeApi.update(objReq).then((res) => {
  //         setLoading(false);

  //         if (res.status !== 200) {
  //           message.error(t("CORE.task_failure"));
  //           return;
  //         }

  //         dispatch(
  //           update_identity_table_data_success(identity, res.data.employee)
  //         );
  //         message.success(t("CORE.EMPLOYEE.UPDATE.SUCCESS"));
  //       });

  //     }
  //   });
  // };

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
      <Col span={20}>
        <div className="div_custom">
          
            <Form>
              <Row type="flex" justify="space-between" align="bottom">
                <Col span={3}>
                  <Form.Item
                    className="upload-image"
                    label={t("CORE.EMPLOYEE.IMAGE.PATH")}
                  >
                    {getFieldDecorator(
                      "image_path",
                      {}
                    )(
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        showUploadList={{
                                        showRemoveIcon: false
                                    }}
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
                    label={t("CORE.EMPLOYEE.CODE")}
                  >
                    {getFieldDecorator("code", {
                      rules: [
                        { required: true, message: "Please input code!" },
                      ],
                    })(<Input disabled/>)}
                  </Form.Item>
                </Col>
                <Col span={13}>
                  <Form.Item label="E-mail">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ],
                    })(<Input disabled/>)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={13}>
                  <Form.Item label={t("CORE.EMPLOYEE.SETTING.FIRST.NAME")}>
                    {getFieldDecorator("first_name", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your first name!",
                          whitespace: true,
                        },
                      ],
                    })(<Input disabled />)}
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label={t("CORE.EMPLOYEE.SETTING.LAST.NAME")}>
                    {getFieldDecorator("last_name", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your last name!",
                          whitespace: true,
                        },
                      ],
                    })(<Input disabled/>)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={8}>
                  <Form.Item label={t("CORE.EMPLOYEE.PHONE.NUMBER")}>
                    {getFieldDecorator("phone_number", {
                      rules: [
                        {
                          required: true,
                          message: "Please input phone number!",
                        },
                        {
                          pattern: new RegExp(
                            /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
                          ),
                          message: "The input is not valid phone number!",
                        },
                        {
                          max: 11,
                          message: "Max length is 11 characters!",
                        },
                        {
                          min: 10,
                          message: "Min length is 10 characters!",
                        },
                      ],
                    })(<Input disabled/>)}
                  </Form.Item>
                </Col>
                <Col span={15}>
                  <Form.Item label={t("CORE.EMPLOYEE.ADDRESS")}>
                    {getFieldDecorator("address", {})(<Input disabled />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={7}>
                  <Form.Item label={t("CORE.EMPLOYEE.USERNAME")}>
                    {getFieldDecorator("username", {
                      
                    })(<Input disabled />)}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={t("CORE.EMPLOYEE.JOB.TYPE")}>
                    {getFieldDecorator("is_part_time", {
                     
                    })(
                      <Select disabled>
                        <Option value={true}>Part time</Option>
                        <Option value={false}>Full time</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={t("CORE.EMPLOYEE.ROLE")}>
                    {getFieldDecorator("role_id", {
                      
                    })(
                      <Input disabled/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={t("CORE.EMPLOYEE.POSITION")}>
                    {getFieldDecorator("position_id", {
                     
                    })(
                      <Input disabled/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row type="flex" justify="space-between">
                <Col span={5}>
                  <Form.Item label={t("CORE.EMPLOYEE.DATE.OF.BIRTH")}>
                    {getFieldDecorator("birth_date", {
                     
                    })(<DatePicker disabled />)}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={t("CORE.EMPLOYEE.GENDER")}>
                    {getFieldDecorator("gender", {
                      
                    })(
                      <Select disabled>
                        <Option value="T">
                          {t("CORE.EMPLOYEE.GENDER.MALE")}
                        </Option>
                        <Option value="F">
                          {t("CORE.EMPLOYEE.GENDER.FEMALE")}
                        </Option>
                        <Option value="other">
                          {t("CORE.EMPLOYEE.GENDER.OTHER")}
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={13}>
                  <Form.Item label={t("CORE.EMPLOYEE.BRANCH.NAME")}>
                    {getFieldDecorator("branch_id", {
                     
                    })(
                      <Select disabled>
                        
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
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage}
                    />
                  </Modal>
                  <div className="btn-group">
                    
                  </div>
                </Col>
              </Row>
            </Form>
         
        </div>
      </Col>
    </Row>
  );
};

export default Form.create({ name: "Form_Employee_Detail" })(ProfileForm);
