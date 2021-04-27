import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { Card } from "antd";
import jwt_decode from "jwt-decode";
import HeaderCard from "./HeaderCard";
import moment from "moment";

import violationTrendingApi from "~/Core/Modules/Dashboard/Api/ViolationTrending";
const DemoLine = () => {
  const token = localStorage.getItem("token" || "");
  const {
    roleName: role,
  } = jwt_decode(token);
  // const [data, setData] = useState([]);
  useEffect(() => {
 

    (async () => {
      const  FromDate = moment().startOf('year').format("YYYY-MM-DD");
      const toDate = moment().endOf('year').format("YYYY-MM-DD");
      if(role==="Admin"){
     
      const list = await violationTrendingApi.getList(FromDate,toDate);
      const data = list?.data?.map((item) => (
        {
          name: item?.regulationName,
          point: item?.totalMinusPoint,
          month: moment(item?.month).format("MM-YYYY")
        }
      )
      )
     setConfig({
       ...config,
       data:data,})
       console.log(data);
     }
     else if(role==="Branch Manager"){
      const listVio = await violationTrendingApi.getList(FromDate,toDate);
      const data = listVio?.data?.map((item) => (
        {
          name: item?.regulationName,
          point: item?.totalMinusPoint,
          month: moment(item?.month).format("MM-YYYY")
        }
      ))
      setConfig({
        ...config,
        data:data,})
        console.log(data);
     }

    })();

  }, []);
  
  const [config, setConfig]= useState({
    data: [],
    xField: 'month',
    yField: 'point',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  });
  return (
    <div className ="card-total-revenue card-default">
    <Card title={<HeaderCard  />} bordered={false}>
      {/* <Spin spinning={loading}> */}
      <Line {...config} />
      {/* </Spin> */}
    </Card>
  </div>
 );
};

export default DemoLine;