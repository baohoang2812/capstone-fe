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
  DatePicker
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import moment from "moment";
/* Actions */
import { update_identity_table_data_success } from "~/Core/Store/actions/adminTable";

/* Constants */
import { shifts as identity } from "~/Core/Modules/Shift/Configs/Constants";

/* Api */
import shiftApi from "~/Core/Modules/Shift/Api/";
const { Option } = Select;
const ShiftDetailForm = ({ form, is_create, action, data }) => {
  const t = useTranslate();
  /* Redux */
  const dispatch = useDispatch();
  /* State */
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  useEffect(() => {
    setFieldsValue({
      name: data?.name,
      startTime: data?.startTime,
      endTime: data?.endTime,
      isBreakShift: data?.isBreakShift
      
    });
  }, [data]);
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment;
  }

  const onConfirm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        if (is_create) {
          shiftApi
            .create(values)
            .then((res) => {
              setLoading(false);

              if (res.code !== 201) {
                message.error(t("CORE.task_failure"));
                return;
              }
              setLoading(false);

              dispatch(update_identity_table_data_success(identity, res.data));
              message.success(t("CORE.SHIFT.CREATE.SUCCESS"));
              action();
            })
            .catch(() => {
              setLoading(false);
              message.error(t("CORE.error.system"));
            });
        } else {
          // objReq.employee.id = data.employee.id;
          shiftApi.update(data.id, values).then((res) => {
            setLoading(false);

            if (res.code !== 200) {
              message.error(t("CORE.task_failure"));
              return;
            }
            setLoading(false);

            dispatch(update_identity_table_data_success(identity, res.data));
            message.success(t("CORE.SHIFT.UPDATE.SUCCESS"));
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
                <Form.Item label={t("CORE.SHIFT.NAME")}>
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input shift name!",
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
            <Form.Item label={t("CORE.SHIFT.START.TIME")}>
              {getFieldDecorator("startTime", {
                rules: [
                  {
                    type: "object",
                    required: true,
                    message: "Please select time!",
                  },
                ],
              })(<DatePicker disabledDate={disabledDate} />)}
            </Form.Item>
          </Col>
           </Row>
           <Row type="flex" justify="center" align="bottom">
          <Col span={15}>
            <Form.Item label={t("CORE.SHIFT.END.TIME")}>
              {getFieldDecorator("endTime", {
                rules: [
                  {
                    type: "object",
                    required: true,
                    message: "Please select time!",
                  },
                ],
              })(<DatePicker disabledDate={disabledDate} />)}
            </Form.Item>
          </Col>
           </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={15}>
                <Form.Item label={t("CORE.SHIFT.TYPE")}>
                  {getFieldDecorator(
                    "isBreakShift",
                    { rules: [
                      {
                        
                        required: true,
                        message: "Please select type!",
                      },
                    ],}
                  )(
                    <Select>
                      <Option value={true}>Break Shift</Option>
                      <Option value={false}>Full Shift</Option>
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
export default Form.create({ name: "Form_Shift_Detail" })(
  ShiftDetailForm
);
