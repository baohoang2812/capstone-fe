import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["Staff", "System Admin"],
  name: "Simulator",
  dir: "Simulator",
  pathRoot: "simulator",
  title: (t) => {
    return (
    <span>
    <Icon type="calendar" />
      <span>{t("CORE.SIMULATOR")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.SIMULATOR.MANAGEMENT.TITLE",
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
