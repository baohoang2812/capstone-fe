import React, { useState } from "react";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import { DatePicker } from "antd";
import moment from "moment";
import jwt_decode from "jwt-decode";
import reportApi from "~/Core/Modules/Dashboard/Api";
import violationApi from "~/Core/Modules/Dashboard/Api/ViolationApi";
const { RangePicker } = DatePicker;
const HeaderCard = ({ setData }) => {
  /* State */
  const t = useTranslate();
  /* State */
  const [value, setValue] = useState([moment(moment().startOf('year').format("YYYY-MM-DD"), "YYYY-MM-DD"), moment(moment().endOf('year').format("YYYY-MM"), "YYYY-MM")]);
  const [fromDate, setFromDate] = useState(moment().startOf('year').format("YYYY-MM-DD"));
  const [toDate, setToDate] = useState(moment().endOf('year').format("YYYY-MM-DD"));
  const [mode, setMode] = useState(['month', 'month'])
  const token = localStorage.getItem("token" || "");
  const {
    roleName: role,
  } = jwt_decode(token);
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
      console.log(value)
      if (role === "Admin") {
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

      }
      else if (role === "Branch Manager") {
        const listVio = await violationApi.getList(fromDate);
        const data2 = listVio?.data?.map((item) => (
          {
            Branch: item?.regulationName,
            Point: item?.totalMinusPoint,
            month: moment(item?.createdAt).format("MM-YYYY")
          }
        ));
        setData(data2);

      }

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
