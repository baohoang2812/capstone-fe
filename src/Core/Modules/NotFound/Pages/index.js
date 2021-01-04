import "./index.less";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const NotFound = () => {
  const t=useTranslate()
  return (
    <div className="not-found">
      <img src="/assets/icons/notfound.svg" alt="Not Found" />
      <div className="title">{t("CORE.MENU.NOT.FOUND")}</div>
      <div className="sub-title">{t("CORE.MENU.NOT.FOUND.sub")}</div>
      <Button className="btn-orange" type="primary">
        <Link to="/user">{t("CORE.MENU.user.page")}</Link>
      </Button>
    </div>
  );
}

export default NotFound;