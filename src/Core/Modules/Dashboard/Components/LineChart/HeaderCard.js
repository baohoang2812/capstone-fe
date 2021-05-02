import React, { useState } from "react";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import { DatePicker } from "antd";
import moment from "moment";
import reportApi from "~/Core/Modules/Dashboard/Api";
const { RangePicker } = DatePicker;
const HeaderCard = ({ setData }) => {
  /* State */
  const t = useTranslate();
  /* State */
  const [value, setValue] = useState([moment(moment().startOf('year').format("YYYY-MM-DD"), "YYYY-MM-DD"), moment(moment().format("YYYY-MM"), "YYYY-MM")]);
  // eslint-disable-next-line no-unused-vars
  const [fromDate, setFromDate] = useState(moment().startOf('year').format("YYYY-MM-DD"));
  // eslint-disable-next-line no-unused-vars
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
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
      const list = await reportApi.getList("Done", moment(moment(value?.[0]).startOf("month")).format("YYYY-MM-DD"), moment(moment(value?.[1]).endOf("month")).format("YYYY-MM-DD"));
      const data2 = list?.data?.result?.map((item) => (
        {
          branch: item?.branch?.name,
          point: item?.totalMinusPoint,
          month: moment(item?.createdAt).format("MM-YYYY")
        }
      )
      );
      setData(data2);
    })();
  }

  return (
    <div className="header-card">
      <h4>{t("CORE.STATISTICS.NAME.YEAR")}</h4>
      <div
        className="header-filter"
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <span className="filter-label">{t("CORE.STATISTICS.SELECT.MONTH")} :</span>
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
    </div>
  );
};

export default HeaderCard;
