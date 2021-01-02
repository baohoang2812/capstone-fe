import "./index.less";

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const Error = ({ reload }) => {
  const t=useTranslate();
  const history = useHistory();

  const retry = () => {

    if (reload) {
      window.location.reload();
      return
    }

    history.goBack();
  }

  return (
    <div className="error-page">
      <img src="/assets/icons/error.svg" alt="Error" />
      <div className="title">{t("CORE.MENU.incorrect")}</div>
      <div className="sub-title">{t("CORE.MENU.incorrect.sub")}</div>
      <div className="button-group">
        <Button className="btn-outline">
          <Link to="/user">{t("CORE.MENU.user.page")}</Link>
        </Button>
        <Button className="btn-orange" onClick={retry} type="primary">
          {t("CORE.MENU.try")}
        </Button>
      </div>
    </div>
  );
}

export default Error;