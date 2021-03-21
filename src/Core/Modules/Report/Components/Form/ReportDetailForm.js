import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import {
  Row,
  Col,
  Form,
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
import QCApi from "~/Core/Modules/Report/Api/GetQC";
import reportApi from "~/Core/Modules/Report/Api";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;
const ReportDetailForm = ({ form, is_create, action, data }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const [listQC, setListQC] = useState([]);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  useEffect(() => {
    (async () => {
      const resListQC = await QCApi.getList();
      setListQC(resListQC?.data?.result);
    })();
  }, []);
  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true)
        reportApi.update(
          data.id,
          {
            adminNote: "string",
            qcNote: "string",
            assignee: values.assignee,
            updatedAt: "2021-03-09T08:12:08.538Z",
            description: values.description,
            status: "string",
            submittedBySystem: true
          }
        )
          .then((res) => {
            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "assigneeNavigation", data: { id: values.assignee } }));
            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "description", data: values.description }));
            message.success(t("CORE.VIOLATION.CONFIRM.SUCCESS"));
            setLoading(false);
            action();
          })
          .catch(() => {
            message.error(t("CORE.error.system"));
            setLoading(false);
          });
      }
    });
  };
  
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
                <Form.Item label={t("CORE.REPORT.BRANCH.NAME")}>
                  {getFieldDecorator("branchName", {})(<span>{data.branch.name}</span>)}
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
                <Form.Item label={t("CORE.REPORT.DESCRIPTION")}>
                  {getFieldDecorator("description", {

                  })(<TextArea/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={20}>
                <Form.Item label={t("CORE.REPORT.ASSIGNEE")}>
                  {getFieldDecorator("assignee", {
                    initialValue: listQC?.[0]?.id,
                  })(
                    <Select>
                      {listQC.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.firstName} {item.lastName}
                        </Option>
                      ))}
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
                  onClick={onConfirm}>
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
