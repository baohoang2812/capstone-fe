import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { Card } from "antd";
import HeaderCard from "./HeaderCard";
import moment from "moment";

import violationTrendingApi from "~/Core/Modules/Dashboard/Api/ViolationTrending";
const DemoLine = () => {
  const [data, setData] = useState([]);
  const [fromDate,setFromDate]= useState(moment().startOf('year').format("YYYY-MM-DD"));
  // eslint-disable-next-line no-unused-vars
  const [toDate,setToDate] = useState(moment().endOf('month').format("YYYY-MM-DD"));
  // const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const list = await violationTrendingApi.getList(fromDate,toDate);
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

    })();

  }, []);
  useEffect(() => {
     setConfig({
       ...config,
       data:data,})
  }, [data]);
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
    <Card title={<HeaderCard  setData={setData}/>}  bordered={false}>
      {/* <Spin spinning={loading}> */}
      <Line {...config} />
      {/* </Spin> */}
    </Card>
  </div>
 );
};

export default DemoLine;