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
const ReportDetailForm = ({ form, is_create, action, data }) => {
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
      createdAt: moment(data?.createdAt).format("DD-MM-YYYY"),
      status: data?.status,
      adminNote: data?.adminNote,
      qcNote: data?.qcNote,
      branchName: data?.branch?.name,
      assignee: data?.assigneeNavigation?.id
    });
  }, [data]);



  return (
    <Row type="flex" justify="center">
      <Col span={24}>
        <div className="div_custom">
          <Form>
            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.NAME")}>
                  {getFieldDecorator("name", {})(<span>{data.name}</span>)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.DESCRIPTION")}>
                  {getFieldDecorator("description", {})(<span>{data.description}</span>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.CHARGE.CREATE")}>
                  {getFieldDecorator("createdAt", {})(<span>{data.createdAt}</span>)}
                </Form.Item>
              </Col>
            </Row>
            
            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.STATUS")}>
                  {getFieldDecorator("status", {})(<span>{data.status}</span>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.BRANCH.NAME")}>
                  {getFieldDecorator("branchName", {})(<span>{data?.branch?.name}</span>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.ADMIN.NOTE")}>
                  {getFieldDecorator("adminNote", {})(<Input/>)}
                </Form.Item>
              </Col>
            </Row>

            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.QC.NOTE")}>
                  {getFieldDecorator("qcNote", {})(<span>{data.qcNote}</span>)}
                </Form.Item>
              </Col>
            </Row>
            
            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.ASSIGNEE")}>
                  {getFieldDecorator("assignee", {
                    initialValue: 12
                  })(
                    <Select>
                  <Option value={11}>Tran Duc Hiep</Option>
                  <Option value={12}>
                    Nguyen Quang Vi
                  </Option>
                  <Option value={13}>
                   Nguyen Quang Khai
                  </Option>
                </Select>
                  )}
                </Form.Item>
              </Col>
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
