import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { Card } from "antd";
import HeaderCard from "./HeaderCard";
import moment from "moment";
import reportApi from "~/Core/Modules/Dashboard/Api";
const DemoLine = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [fromDate,setFromDate]= useState(moment().startOf('year').format("YYYY-MM-DD"));
  // eslint-disable-next-line no-unused-vars
  const [toDate,setToDate] = useState(moment().format("YYYY-MM-DD"));
  useEffect(() => {
    console.log(data,"Data change");
    (async () => {
     
      const list = await reportApi.getList("Done",fromDate,toDate);
      const data = list?.data?.result?.map((item) => (
        {
          branch: item?.branch?.name,
          point: item?.totalMinusPoint,
          month: moment(item?.createdAt).format("MM-YYYY")
        }
      )
      )
     setConfig({
       ...config,
       data:data,})
    })();

  }, [fromDate,toDate]);
  useEffect(() => {
    console.log(data,"Data change");
    
     setConfig({
       ...config,
       data:data,})
  }, [data]);
  
  const [config, setConfig]= useState({
    data: data,
    xField: 'month',
    yField: 'point',
    seriesField: 'branch',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v /1).toFixed(1), ' Point');
        },
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  });
  return (
    <div className ="card-total-revenue card-default">
    <Card title={<HeaderCard setData={setData} />} bordered={false}>
      {/* <Spin spinning={loading}> */}
      <Line {...config} />
      {/* </Spin> */}
    </Card>
  </div>
 );
};

export default DemoLine;