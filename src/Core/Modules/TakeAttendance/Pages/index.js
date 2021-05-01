import React,{useState} from "react";

/* Components */
import Header from "~/Core/Modules/TakeAttendance/Components/Header/Header";
import Table from "~/Core/Modules/TakeAttendance/Components/Table/Table";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

import moment from "moment";

const TakeAttendance = () => {
  const t = useTranslate();
  const [date, setDate] = useState(moment().format("YYYY-MM-DDTHH:mm:ssZ"));
  return (
    <div className="page-header attendance">
      <Header
        breadcrumb={[{ title: t("CORE.ATTENDANCE.MANAGEMENT.TITLE") }]}
        setDate={setDate}
        text={t("CORE.SHIFT.CREATE.ACCOUNT")}
        className="btn-yellow"
      />
      <Table value={date}t={t} />
    </div>
  );
};

export default TakeAttendance;