import React, {  } from "react";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
const HeaderCard = ({setFromDate,setToDate})=> {
  /* State */
  const t=useTranslate();
  return (
    <div className ="header-card">
      <h4>{t("CORE.STATISTICS.NAME.YEAR")}</h4>
    </div>
  );
};

export default HeaderCard;
