import "./style.less";

import React, { useState, useEffect } from "react";
import { Card} from "antd";
import { Bar } from '@ant-design/charts';
/* Components */
import HeaderCard from "./HeaderCard";

/* Core helpers */

/* Api */


const data = [
  {
    type: 'Chi nhánh 1',
    sales: 38,
  },
  {
    type: 'Chi nhánh 2',
    sales: 52,
  },
  {
    type: 'Chi nhánh 3',
    sales: 61,
  },
  {
    type:'Chi nhánh 4',
    sales: 145,
  },
  {
    type: 'Chi nhánh 5',
    sales: 48,
  },
  {
    type: 'Chi nhánh 6',
    sales: 38,
  },
  {
    type: 'Chi nhánh 7',
    sales: 38,
  },
  {
    type: 'Chi nhánh 8',
    sales: 38,
  },
];

const CardTotalRevenue = () => {
  /* State */
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(null);
  const [config, setConfig] = useState({
    data: data,
    xField: 'sales',
    yField: 'type',
    seriesField: 'type',
    color: function color(_ref) {
      var type = _ref.type;
      return type === '美容洗护' ? '#FAAD14' : '#5B8FF9';
    },
    legend: false,
    meta: {
      type: { alias: '类别' },
      sales: { alias: '销售额' },
    }
  });

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
