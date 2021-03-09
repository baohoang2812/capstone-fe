import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import {
  Row,
  Col,
  Form,
  Input,
  Modal,
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
import reportApi from "~/Core/Modules/Report/Api";

import Table from "~/Core/Modules/Report/Components/Table/TableViolation";
import moment from "moment";

const { Option } = Select;
const ReportViolation = ({ form, is_create, action, data }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  useEffect(() => {
    console.log(data);
    setFieldsValue({
      name: data?.name,
      description: data?.description,
      createdAt: moment(data?.createdAt).format("DD-MM-YYYY")
    });
  }, [data]);



  return (
    <Row type="flex" justify="center">
      <Col span={24}>
        <div className="div_custom">
          <Form>
            <Row type="flex" justify="center" align="bottom">
              <Col span={10}>
                <Form.Item label={t("CORE.REPORT.NAME")}>
                  {getFieldDecorator("name", {})(<Input disabled={true} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="center" align="bottom">
              <Col span={10}>
                <Form.Item label={t("CORE.REPORT.DESCRIPTION")}>
                  {getFieldDecorator("description", {})(<Input disabled={true} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={10}>
                <Form.Item label={t("CORE.REPORT.CHARGE.CREATE")}>
                  {getFieldDecorator("createdAt", {})(<Input disabled={true} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>

                <Table t={t} />

              
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default Form.create({ name: "Form_Report_Violation" })(
  ReportViolation
);
