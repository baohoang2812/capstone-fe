import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin","Branch Manager"],
  name: "Report",
  dir: "Report",
  pathRoot: "report",
  title: (t) => {
    return (
    <span>
     <Icon type="read" />
      <span>{t("CORE.REPORT")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: ":id",
      component: "Pages/ReportDetail",
      key: "report-create-edit",
      showMenu: false,
      title: "CORE.REPORT.DETAIL",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.REPORT.MANAGEMENT.TITLE",
    },
  ],
  redux: redux,
  sagas: sagas,
  lang: {
    vi: intlMessagesVi,
    en: intlMessagesEN,
  },
  isAuthenticate: true,
};
