import "./style.less";

import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
import { Bar } from '@ant-design/charts';
/* Components */
import HeaderCard from "./HeaderCard";

/* Core helpers */
import { formatToCurrencyVND } from "~/Core/utils/helper/format";

/* Api */
import dashboardApi from "~/Core/Modules/Dashboard/Api";

const data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
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
      const { date, label } = filters;
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
