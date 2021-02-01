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
import { reports as identity } from "~/Core/Modules/Report/Configs/Constants";

/* Api */
import reportApi from "~/Core/Modules/Report/Api/";

import Table from "~/Core/Modules/Report/Components/Table/TableViolation";

const { Option } = Select;
const ReportDetailForm = ({ form, is_create, action, data }) => {
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
          reportApi
            .create(values)
            .then((res) => {
              setLoading(false);

              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.REPORT.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              setLoading(false);
              message.error(t("CORE.error.system"));
            });
        } else {
          // objReq.employee.id = data.employee.id;
          reportApi.update(data.id, values).then((res) => {
            setLoading(false);

            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            setLoading(false);

            dispatch(update_identity_table_data_success(identity, res.data));
            message.success(t("CORE.REPORT.UPDATE.SUCCESS"));
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
                <Form.Item label={t("CORE.REPORT.NAME")}>
                  {getFieldDecorator("name", {})(<Input  disabled={true}/>)}
                </Form.Item>
              </Col>
            </Row>
           
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.REPORT.DESCRIPTION")}>
                  {getFieldDecorator("description", {})(<Input disabled={true} />)}
                </Form.Item>
              </Col>
            </Row>
           <Row>
             <Col>
             <Table t={t} />
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
export default Form.create({ name: "Form_Report_Detail" })(
  ReportDetailForm
);
