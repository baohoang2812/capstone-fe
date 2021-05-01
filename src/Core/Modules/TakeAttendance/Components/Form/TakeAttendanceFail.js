import React, { useEffect,useState } from "react";
import "./style.less";
import {
    Row,
    Col,
    Form,
    Select,
    Button,
    message
} from "antd";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Actions */

/* Constants */

/* Api */
 import employeeApi from "~/Core/Modules/TakeAttendance/Api/EmployeeApi";
 import takePresentApi from "~/Core/Modules/TakeAttendance/Api/TakePresentApi";

 const { Option } = Select;

const PositionDetailForm = ({ form,data }) => {
    const t = useTranslate();
    /* Redux */
    /* State */
    const [loading, setLoading] = useState(false);
    const [dataEmployee, setDataEmployee] = useState([]);
    // const [loadingDropdown, setLoadingDropdown] = useState(false);
    const { getFieldDecorator,validateFields,setFieldsValue } = form;
    
  useEffect(() => {
   
      employeeApi.getList()
      .then(res => {
          const result = res.data.result;
          const newResult = result.filter((item) => item.id!==data.employee.id);
          setDataEmployee(newResult);
      }
      );
     
      
    
  }, [data.employee.id]);
  useEffect(() => {
    if(data?.executor?.id!==data.employee.id){
      setFieldsValue({
        executor: data?.executor?.id
      });
    }
  }, []);
  
  const onConfirm = (e) => {
    e.preventDefault();

    validateFields((err, values) => {
        setLoading(true);
          const value= {
            workScheduleId: data?.workSchedule?.id,
            workspaceId: data?.workspace?.id,
            employeeId: data?.employee?.id,
            executorId: values.executor,

                }
                takePresentApi
                .create(value)
                .then((res) => {
                  setLoading(false);
                  if(res.code===3002){
                    message.error(t("CORE.CAN.NOT.TAKE"));
                    return;
                  }
                  if (res.code !== 200) {
                    message.error(t("CORE.task_failure"));
                    return;
                  }
                  setLoading(false);
                  message.success(t("CORE.ATTENDANCE.UPDATE.SUCCESS"));
                  window.location.reload();
                })
                .catch(() => {
                  message.error(t("CORE.error.system"));
                });
    });
};
    return (
        <Row type="flex" justify="center">
            <Col span={20}>
                <div className="div_custom">
                   
                        <Form onSubmit={onConfirm}>
                            <Row type="flex" justify="center" align="bottom">
                                <Col span={20}>
                                   
                                <Form.Item label={t("CORE.VIOLATION.SELECT.EXECUTOR")}>
                                    {getFieldDecorator("executor")(
                                        <Select  placeholder={t("CORE.VIOLATION.ALERT.EXECUTOR")}>
                                            {dataEmployee.map((item) => (
                                                <Option key={item.id} value={item.id}>
                                                    {`${item.lastName} ${item.firstName}`}
                                                </Option>
                                            ))}
                                        </Select>,
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
export default Form.create({ name: "Form_Position_Detail" })(
    PositionDetailForm
);