import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin","Branch Manager", "QC Manager"],
  name: "Dashboard",
  dir: "Dashboard",
  pathRoot: "dashboard",
  title: (t) => {
    return (
    <span>
    <Icon type="bar-chart" />
      <span>{t("CORE.STATISTICS")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.STATISTICS.MANAGEMENT.TITLE",
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
