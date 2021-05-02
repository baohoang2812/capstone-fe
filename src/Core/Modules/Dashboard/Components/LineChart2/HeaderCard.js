import React, { useState } from "react";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import { DatePicker } from "antd";
import moment from "moment";
import violationTrendingApi from "~/Core/Modules/Dashboard/Api/ViolationTrending";
const { RangePicker } = DatePicker;

const HeaderCard = ({setData})=> {
  const t = useTranslate();
  /* State */
  const [value, setValue] = useState([moment(moment().startOf('year').format("YYYY-MM-DD"), "YYYY-MM-DD"), moment(moment().format("YYYY-MM"), "YYYY-MM")]);
  // eslint-disable-next-line no-unused-vars
  const [fromDate, setFromDate] = useState(moment().startOf('year').format("YYYY-MM-DD"));
  // eslint-disable-next-line no-unused-vars
  const [toDate, setToDate] = useState(moment().endOf('month').format("YYYY-MM-DD"));
  const [mode, setMode] = useState(['month', 'month'])
  const handleChange = (value) => {
    setValue(value);
  };
  const handlePanelChange = (value, mode) => {
    setValue(value);
    setMode([mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]])
  };
  const onOk = (value) => {
    setFromDate(moment(value?.[0]).format("MM-YYYY"));
    setToDate(moment(value?.[1]).format("MM-YYYY"));
    (async () => {
      const list = await violationTrendingApi.getList(moment(moment(value?.[0]).startOf("month")).format("YYYY-MM-DD"), moment(moment(value?.[1]).endOf("month")).format("YYYY-MM-DD"));
      const data2 = list?.data?.map((item) => (
        {
          name: item?.regulationName,
          point: item?.totalMinusPoint,
          month: moment(item?.month).format("MM-YYYY")
        }
      )
      )
        setData(data2);
    })();
  }
  /* State */
 
  return (
    <div className ="header-card">
      <h4>{t("CORE.STATISTICS.NAME")}</h4>
      <RangePicker
          placeholder={['Start month', 'End month']}
          format="YYYY-MM"
          value={value}
          mode={mode}
          onChange={handleChange}
          onPanelChange={handlePanelChange}
          onOk={onOk}
          // defaultValue={[]}
          defaultValue={[moment(moment().startOf('year').format("YYYY-MM-DD"), "YYYY-MM-DD"), moment(moment().endOf('year').format("YYYY-MM"), "YYYY-MM")]}
          showTime
        />
    </div>
  );
};

export default HeaderCard;
