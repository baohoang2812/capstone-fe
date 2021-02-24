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
  Select,
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { workspaces as identity } from "~/Core/Modules/Workspace/Configs/Constants";

/* Api */
import workspaceApi from "~/Core/Modules/Workspace/Api/";
const { Option } = Select;
const WorkspaceDetailForm = ({ form, is_create, action, data }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  useEffect(() => {
    setFieldsValue({
      name: data?.name,
      description: data?.description,
      parent: data?.parent?.name
      
    });
  }, [data]);

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        if (is_create) {
          workspaceApi
            .create(values)
            .then((res) => {
              setLoading(false);

              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.WORKSPACE.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              setLoading(false);
              message.error(t("CORE.error.system"));
            });
        } else {
          // objReq.employee.id = data.employee.id;
          workspaceApi.update(data.id, values).then((res) => {
            setLoading(false);

            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            setLoading(false);

            dispatch(update_identity_table_data_success(identity, res.data));
            message.success(t("CORE.WORKSPACE.UPDATE.SUCCESS"));
            action();
          }).catch(() => {
            setLoading(false);
            message.error(t("CORE.error.system"));
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
                <Form.Item label={t("CORE.WORKSPACE.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input workspace name!",
                      },
                      {
                        max: 255,
                        message: "Max length is 255 character!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
           
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.WORKSPACE.DESCRIPTION")}>
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: "Please input description!",
                      },
                      {
                        max: 2000,
                        message: "Max length is 2000 characters!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.WORKSPACE.PARENT")}>
                  {getFieldDecorator(
                    "parentId",
                    {}
                  )(
                    <Select>
                      <Option value={1}>Parent 1</Option>
                     
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
export default Form.create({ name: "Form_Workspace_Detail" })(
  WorkspaceDetailForm
);
