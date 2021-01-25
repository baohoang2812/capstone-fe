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
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { branches as identity } from "~/Core/Modules/Branch/Configs/constants";

/* Api */
import branchApi from "~/Core/Modules/Branch/Api/";
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
const BranchDetailForm = ({ form, data, action, is_create }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const [loadingDropdown, setLoadingDropdown] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  useEffect(() => {
    setFieldsValue({
      name: data?.name,
      phoneNumber: data?.phoneNumber,
      address: data?.address,
      managerId: data?.managerId
   

    });

  }, [data]);
  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        console.log(values);
        if (is_create) {
          branchApi
            .create(values)
            .then((res) => {
              setLoading(false);
              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              dispatch(
                update_identity_table_data_success(identity, res.data)
              );
              message.success(t("CORE.BRANCH.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
         
          branchApi.update(data.id,values).then((res) => {
            setLoading(false);

            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            dispatch(
              update_identity_table_data_success(identity, res.data.branch)
            );
            message.success(t("CORE.BRANCH.UPDATE.SUCCESS"));
            action();
          });
        }
      }
    });
  };
  return (
    <Row type="flex" justify="center">
      <Col span={12}>
        <div className="div_custom">
          <Spin spinning={loadingDropdown}>
            <Form onSubmit={onConfirm}>
              <Row type="flex" justify="center" align="bottom">
                <Col span={15}>
                  <Form.Item label={t("CORE.BRANCH.NAME")}>
                    {getFieldDecorator("name", {
                      rules:[{
                        required:true,
                        message:"Please input branch name!"

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
                  <Form.Item label={t("CORE.BRANCH.ADDRESS")}>
                    {getFieldDecorator("address", {
                       rules:[{
                        required:true,
                        message:"Please input branch address!"

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
                  <Form.Item label={t("CORE.BRANCH.PHONE.NUMBER")}>
                    {getFieldDecorator("phoneNumber", {
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
                    })(<Input />)}
                  </Form.Item>
                </Col>

              </Row>
              <Row type="flex" justify="center" align="bottom">
                <Col span={15}>
                  <Form.Item label={t("CORE.BRANCH.MANAGER.NAME")}>
                    {getFieldDecorator("managerId", {})(<Select>
                      <Option value={32}>
                        Manager 1
                        </Option>
                      <Option value={2}>
                        Manager 2
                        </Option>
                    </Select>)}
                  </Form.Item>
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
export default Form.create({ name: "Form_Branch_Detail" })(
  BranchDetailForm
);