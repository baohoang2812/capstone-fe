import "./style.less";

import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Bar } from '@ant-design/charts';
/* Components */
import HeaderCard from "./HeaderCard";
import reportApi from "~/Core/Modules/Dashboard/Api";
import { values } from "lodash";
import moment from "moment";



const CardTotalRevenue = () => {
  /* State */

  const [listReport, setListReport] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [FromDate,setFromDate]=useState(null);
  const [toDate,setToDate]=useState(null);
  const [config, setConfig] = useState({
    data: [],
    xField: 'Point',
    yField: 'Branch',
    seriesField: 'Branch',
    color:function color(_ref) {
      var type = _ref.type;
      return type === '美容洗护' ? '#FAAD14' : '#5B8FF9';
    },
    legend: false,
    meta: {
      type: { alias: '类别' },
      sales: { alias: '销售额' },
    }
  });
 

  useEffect(() => {
    (async () => {
      const  FromDate = moment().startOf('month').subtract(1,'month').format("YYYY-MM-DD");
     const toDate = moment().endOf('month').subtract(1,'month').format("YYYY-MM-DD");
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

    })();
  }, []);


  useEffect(() => {
    (async () => {
      if(FromDate!==null && toDate!==null){
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
    })();
  }, [FromDate,toDate]);
  
  const onInitData = () => {
    if (filters) {
      setLoading(true);
      // const { date, label } = filters;
      // dashboardApi
      //   .getTotalRevenue(date)
      //   .then((res) => {
      //     setLoading(false);
      //     let sourceData = [];
      //     for (const key in res.count_one) {
      //       const record = {
      //         week: convert_key(key),
      //         [label[0]]: res.count_one[key],
      //         [label[1]]: res.count_two[key],
      //       };
      //       sourceData.push(record);
      //     }
      //     getChartData(sourceData, label);
      //   })
      //   .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    onInitData();
  }, [JSON.stringify(filters)]);

  return (
    <div className="card-total-revenue card-default">
      <Card title={<HeaderCard setFilters={setFilters} />} bordered={false}>
        {/* <Spin spinning={loading}> */}
        <Bar {...config} />
        {/* </Spin> */}
      </Card>
    </div>
  );
};

export default React.memo(CardTotalRevenue);
