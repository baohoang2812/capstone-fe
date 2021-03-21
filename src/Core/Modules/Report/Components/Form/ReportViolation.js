import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.less";
import {
  Row,
  Col,
  Form,
  Button,
  message,
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { violations as identity } from "~/Core/Modules/Report/Configs/Constants";
import { useSelector } from "react-redux";
/* Api */
import reportApi from "~/Core/Modules/Report/Api";

import Table from "~/Core/Modules/Report/Components/Table/TableViolation";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { set_data_for_select_action } from "~/Core/Store/actions/dataForSelect";

const ReportViolation = ({ form, is_create, action, data,setData }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const[listTmp, setListTmp]= useState([undefined]);
  const[statusReport, setStatusReport] = useState(0);
  const listViolation = useSelector(state => state[identity].list);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const onConfirm = (e) => {

    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        reportApi.update(
          data.id,
          {
            adminNote: values.adminNote,
            qcNote: "string",
            assignee: 0,
            updatedAt: "2021-03-09T08:12:08.538Z",
            description: "string",
            status: "Done",
            submittedBySystem: true
          }
        )
          .then((res) => {
            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "adminNote", data: values.adminNote }));
            dispatch(update_identity_table_data_success(identity, { id: res.data.id, column: "status", data: values.status }));
            const newData = {...data,status:values.status,adminNote:values.adminNote};
            setData(newData);
            message.success(t("CORE.VIOLATION.CONFIRM.SUCCESS"));
            setLoading(false);
            
          })
          .catch(() => {
            message.error(t("CORE.error.system"));
            setLoading(false)
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
      assignee: data?.assigneeNavigation?.id,
      totalMinusPoint:data?.totalMinusPoint
    });
  }, [data]);
 
  useEffect(() => {
  const Array =listViolation.filter(item => item.status.toLowerCase()!=="confirmed"&&item.status.toLowerCase()!=="rejected")
  console.log(Array)
   setListTmp(Array);
   
  if(data?.status?.toLowerCase()==="done"){
    setStatusReport(1);
  }
  }, [listViolation]);
  console.log(data?.status);
  console.log(statusReport,"STATUS");
  return (
    <Row type="flex" justify="center">
      <Col span={24}>
        <div className="div_custom">
          <Form>
            <Row type="flex" justify="center" align="bottom">
              <Col span={6}>
                <Form.Item label={t("CORE.REPORT.NAME")}>
                  {getFieldDecorator("name", {})(<span>{data.name}</span>)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("CORE.REPORT.STATUS")}>
                  {getFieldDecorator("status", {})(<span>{data.status}</span>)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item label={t("CORE.REPORT.CHARGE.CREATE")}>
                  {getFieldDecorator("createdAt", {})(<span>{moment(data.createdAt).format("DD-MM-YYYY")}</span>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={8}>
                <Form.Item label={t("CORE.REPORT.BRANCH.NAME")}>
                  {getFieldDecorator("branchName", {})(<span>{data?.branch?.name}</span>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={t("CORE.REPORT.DESCRIPTION")}>
                  {getFieldDecorator("description", {})(<span>{data.description}</span>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={10}>
                <Form.Item label={t("CORE.REPORT.QC.NOTE")}>
                  {getFieldDecorator("qcNote", {})(<span>{data.qcNote}</span>)}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={t("CORE.REPORT.MINUS.POINT")}>
                  {getFieldDecorator("totalMinusPoint", {})(<span>{data.totalMinusPoint}</span>)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={16}>
                <Form.Item label={t("CORE.REPORT.ADMIN.NOTE")}>
                  {getFieldDecorator("adminNote", {})(<TextArea disabled={data?.status?.toLowerCase()==="done"} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <div className="btn-group">
                <Button
                  loading={loading}
                  disabled={listTmp===undefined?true: listTmp.length>0?true:statusReport===1?true:false}
                  type="primary"
                  htmlType="submit"
                  className="btn-yellow btn-right"
                  style={{ float: "right" }}
                  onClick={onConfirm}>
                  {t("CORE.confirm")}
                </Button>
              </div>
            </Row>
            <Row>
              <Col span={24}>
                {data.id ? (<Table t={t}  value={data.id}/>) : null}
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
