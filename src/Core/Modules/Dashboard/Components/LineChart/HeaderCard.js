import React, { useState} from "react";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const HeaderCard = ({setFromDate,setToDate, setFilters})=> {
  /* State */
  const t=useTranslate();
  /* State */
  const [value, setValue] = useState();
  const [mode,setMode]= useState(['month','month'])
 
 
  const handleChange = (value) => {
    setValue(value);
  };
 const handlePanelChange = (value, mode) => {
  setValue(value);
      setMode( [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]])
  };
  const onOk = (value)=> {
    setFromDate(moment(value?.[0]).format("MM-YYYY"));
    setToDate(moment(value?.[1]).format("MM-YYYY"));
    console.log(moment(value?.[0]).format("MM-YYYY"),"From");
    console.log(moment(value?.[1]).format("MM-YYYY"),"To");
  }
 
  return (
    <div className ="header-card">
      <h4>{t("CORE.STATISTICS.NAME.YEAR")}</h4>

      <div
        className="header-filter"
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <span className="filter-label">Chọn tháng: </span>
        <RangePicker
        placeholder={['Start month', 'End month']}
        format="YYYY-MM"
        value={value}
        mode={mode}
        onChange={handleChange}
        onPanelChange={handlePanelChange}
        onOk={onOk}
        showTime
      />
      </div>
    </div>
  );
};

export default HeaderCard;
