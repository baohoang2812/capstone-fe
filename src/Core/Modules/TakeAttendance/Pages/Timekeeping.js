import React,{useState} from "react";

/* Components */
import Header from "~/Core/Modules/TakeAttendance/Components/Header/HeaderTimeKeep";
import Table from "~/Core/Modules/TakeAttendance/Components/Table/TableTimekeep";
/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import moment from "moment";

const TakeAttendance = () => {
  const t = useTranslate();
  const [date, setDate] = useState(moment().format("YYYY-MM-DDTHH:mm:ssZ"));
  return (
    <div className="page-header attendance">
      <Header
        breadcrumb={[{ title: t("CORE.TIME.KEEPING.MANAGEMENT.TITLE") }]}
        setDate={setDate}
        className="btn-yellow"
      />
      <Table value={date}t={t} />
    </div>
  );
};

export default TakeAttendance;