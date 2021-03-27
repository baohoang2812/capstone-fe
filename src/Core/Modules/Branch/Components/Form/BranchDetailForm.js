import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import { Select, Row, Col, Form, Input, Button, message } from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { branches as identity } from "~/Core/Modules/Branch/Configs/constants";

/* Api */
import branchApi from "~/Core/Modules/Branch/Api/";
import EmployeeApi from "~/Core/Modules/Branch/Api/EmployeeApi";

const { Option } = Select;

const BranchDetailForm = ({ form, data, action, is_create }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const [listBM, setListBM] = useState([]);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const[visible,setVisible]= useState(false);
  useEffect(() => {
    (async () => {
      const resListBM = await EmployeeApi.getList();
      setListBM(resListBM?.data?.result);
      if(!is_create){
        setVisible(true);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(data)
    if (!(data && Object.keys(data).length === 0 && data.constructor === Object)) {
      console.log("this")
      setFieldsValue({
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        address: data?.address,
        managerId: data?.manager?.id
      });
    }
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
              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.BRANCH.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              message.error(t("CORE.error.system"));
            });
        } else {
          branchApi.update(data.id, values).then((res) => {
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
          <Form onSubmit={onConfirm}>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.BRANCH.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: (<>{t("CORE.BRANCH.ALERT.NAME")}</>)
                      },
                      {
                        max: 255,
                        message: (<>{t("CORE.BRANCH.ALERT.MAX.LENGTH")}</>)
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.BRANCH.ADDRESS")}>
                  {getFieldDecorator("address", {
                    rules: [
                      {
                        required: true,
                        message: (<>{t("CORE.BRANCH.ALERT.DESCRIPTION")}</>)
                      },
                      {
                        max: 255,
                        message: (<>{t("CORE.BRANCH.ALERT.MAX.LENGTH")}</>)
                      },
                    ],
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
                        message:(<>{t("CORE.BRANCH.ALERT.PHONE.NUMBER")}</>)
                      },
                      {
                        pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                        message: (<>{t("CORE.BRANCH.ALERT.VALID.NUMBER")}</>)
                      },
                      {
                        max: 11,
                        message: (<>{t("CORE.BRANCH.ALERT.MAX.LENGTH.11")}</>)
                      },
                      {
                        min: 10,
                        message: (<>{t("CORE.BRANCH.ALERT.MIN.LENGTH.10")}</>)
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.BRANCH.MANAGER.NAME")}>
                  {getFieldDecorator(
                    "managerId",
                    {initialValue: listBM?.[0]?.id,}
                  )(
                    <Select>
                      {listBM.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.firstName} {item.lastName}
                        </Option>
                      ))}
                      <Option key={data?.manager?.id} value={data?.manager?.id} disable={visible}>
                      {data?.manager?.lastName} {data?.manager?.firstName}
                      </Option>
                    </Select>
                  )}
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
export default Form.create({ name: "Form_Branch_Detail" })(BranchDetailForm);
