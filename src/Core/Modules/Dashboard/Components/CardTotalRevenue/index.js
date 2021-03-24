import "./style.less";
import React, { useState, useEffect } from "react";
import { Bar } from '@ant-design/charts';
import { Card } from "antd";
import jwt_decode from "jwt-decode";
/* Components */
import reportApi from "~/Core/Modules/Dashboard/Api";
import violationApi from "~/Core/Modules/Dashboard/Api/ViolationApi";
import moment from "moment";
import HeaderCard from "./HeaderCard";
const CardTotalRevenue = () => {
  const [FromDate,setFromDate]=useState(null);
  const [toDate,setToDate]=useState(null);
  const token = localStorage.getItem("token" || "");
  const {
    roleName: role,
  } = jwt_decode(token);
  const [config, setConfig]= useState({
    data: [],
    xField: 'Point',
    yField: 'Branch',
    seriesField: 'Branch',
    color:function color(_ref) {
      var type =_ref.type;
      return type=== '美容洗护' ? '#FAAD14' : '#5B8FF9';
    },
    legend:false,
    meta: {
      Branch: { alias: '类别' },
      Point: { alias: '销售额' },
    }
  });

  useEffect(() => {
    (async () => {
      const  FromDate = moment().startOf('month').subtract(1,'month').format("YYYY-MM-DD");
      const toDate = moment().endOf('month').subtract(1,'month').format("YYYY-MM-DD");
      if(role==="Admin"){
        const list = await reportApi.getList("Done",FromDate,toDate);
        const data = list?.data?.result?.map((item) => (
          {
            Branch: item?.branch?.name,
            Point: item?.totalMinusPoint
          }
        )
        )
       setConfig({
         ...config,
         data:data,})
         console.log(data);

      }
      else {
        const listVio = await violationApi.getList(FromDate);
        const data = listVio?.data?.map((item) => (
          {
            Branch: item?.regulationName,
            Point: item?.totalMinusPoint
          }
        ))
        setConfig({
          ...config,
          data:data,})
          console.log(data);
      }
      

    })();
  }, []);


  useEffect(() => {
    (async () => {
      
      if(FromDate!==null && toDate!==null){
        if(role==="Admin"){
          const list = await reportApi.getList("Done",FromDate,toDate);
          console.log(list,"List");
          const data = list?.data?.result?.map((item) => (
            {
              Branch: item?.branch?.name,
              Point: item?.totalMinusPoint
            }
          )
          )
         setConfig({
           ...config,
           data:data,})
           console.log(data);
        }
        else{
          const listVio = await violationApi.getList(FromDate);
        const data = listVio?.data?.map((item) => (
          {
            Branch: item?.regulationName,
            Point: item?.totalMinusPoint
          }
        ))
        setConfig({
          ...config,
          data:data,})
          console.log(data);
        }
    
     }
    })();
  }, [FromDate,toDate]);
  
 
  return (
    <div className ="card-total-revenue card-default">
      <Card title={<HeaderCard setFromDate={setFromDate} setToDate={setToDate} />} bordered={false}>
        {/* <Spin spinning={loading}> */}
        <Bar {...config} />
        {/* </Spin> */}
      </Card>
    </div>
  );
};

export default  React.memo(CardTotalRevenue);
