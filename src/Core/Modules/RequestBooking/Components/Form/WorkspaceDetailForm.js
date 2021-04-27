import React, { useEffect, useState } from "react";
import moment from "moment";

import { useDispatch } from "react-redux";
import "./style.less";
import {
  Row,
  Col,
  Form,
  Button,
  message,
  DatePicker,
  Select,
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { workspaces as identity } from "~/Core/Modules/RequestBooking/Configs/Constants";

/* Api */
import requestBookingApi from "~/Core/Modules/RequestBooking/Api";
import shiftApi from "~/Core/Modules/RequestBooking/Api/ShiftAPI";
import workspaceApi from "~/Core/Modules/RequestBooking/Api/WorkspaceAPI";

const { Option } = Select;
const WorkspaceDetailForm = ({ form, is_create, action, data }) => {
  const t = useTranslate();
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const [listShift, setListShift] = useState([]);
  const [listWorkspace, setListWorkspace] = useState([]);

  useEffect(() => {
    if (!is_create && data && Object.entries(data).length > 0) {
      setFieldsValue({
        workDate: moment(data.workDate),
        shift: data?.shift?.id,
        workspace: data?.workspace?.id,
      });
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const listShiftRes = await shiftApi.getList();
    const listWorkspaceRes = await workspaceApi.getList();
    setListShift(listShiftRes?.data?.result || []);
    setListWorkspace(listWorkspaceRes?.data?.result || []);
    setLoading(false);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };
  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const newValue = {
          ...values,
          workDate: values["workDate"].format("YYYY-MM-DD"),
        };

        if (is_create) {
          requestBookingApi
            .create({
              shiftId: newValue.shift,
              workspaceId: newValue.workspace,
              workDate: newValue.workDate,
            })
            .then((res) => {
              setLoading(false);

              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("REQUEST.BOOKING.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              setLoading(false);
              message.error(t("CORE.error.system"));
            });
        } else {
          requestBookingApi
            .update(data?.id,{
              
              shiftId: newValue.shift,
              workspaceId: newValue.workspace,
              workDate: newValue.workDate,
            })
            .then((res) => {
              setLoading(false);

              if (res.code !== 200) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("REQUEST.BOOKING.UPDATE.SUCCESS"));
              action();
            })
            .catch(() => {
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
                <Form.Item label={t("REQUEST.BOOKING.WORKDATE")}>
                  {getFieldDecorator("workDate", {
                    rules: [
                      {
                        required: true,
                        message: "Please select workspace name!",
                      },
                    ],
                  })(<DatePicker disabledDate={disabledDate} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("REQUEST.BOOKING.SHIFT")}>
                  {getFieldDecorator("shift", {
                    rules: [
                      {
                        required: true,
                        message: "Please input description!",
                      },
                    ],
                  })(
                    <Select>
                      {listShift.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}(
                          {moment(item.startTime, "HH:mm:ss").format("HH:mm")} -{" "}
                          {moment(item.endTime, "HH:mm:ss").format("HH:mm")})
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("REQUEST.BOOKING.WORKSPACE")}>
                  {getFieldDecorator("workspace", {
                   
                  })(
                    <Select>
                      {listWorkspace.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
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
