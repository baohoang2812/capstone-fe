import React, { useEffect, useState } from "react";
import "./style.less";
import {
    Row,
    Col,
    Form,
    List,
    Card,
    Tag
} from "antd";
/* Hooks */
import contactApi from "~/Core/Modules/TakeAttendance/Api";
import moment from "moment";

const PositionDetailForm = ({value,data}) => {
    const [dataEmployee,setDataEmployee]=useState();
      useEffect(() => {
   
        contactApi.getDetail(moment(value).startOf('month').format("YYYY-MM-DD"),moment(value).endOf('month').format("YYYY-MM-DD"),data)
        .then(res => {
            const result = res.data.result;
            setDataEmployee(result);
        }
        );
    }, [data,value]);

    return (
        <Row type="flex" justify="center">
            <Col span={20}>
                <div className="div_custom">
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={dataEmployee}
                        renderItem={item => (
                            <List.Item>
                                <Card title={moment(item?.workSchedule?.workDate).format("DD-MM-YYYY")}>
                                { item?.employee?.id===item?.executor?.id ?<Tag color="green">  Present</Tag>:<Tag color="red">  Absent</Tag>
                                }<p/>
                                <span>{item?.workSchedule?.shift?.name} ( {moment(item?.workSchedule?.shift?.startTime,"HH:mm:ss").format("HH:mm")} - {moment(item?.workSchedule?.shift?.endTime,"HH:mm:ss").format("HH:mm")} )</span><p/>
                                <span>{item?.workspace?.name}</span>
                                </Card>
                            </List.Item>
                        )}
                    />,
                </div>
            </Col>
        </Row>

    );
};
export default Form.create({ name: "Form_Position_Detail" })(
    PositionDetailForm
);