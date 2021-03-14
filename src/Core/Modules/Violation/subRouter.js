import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["Branch Manager"],
  name: "Violation",
  dir: "Violation",
  pathRoot: "violation",
  title: (t) => {
    return (
    <span>
    <Icon type="read" />
      <span>{t("CORE.VIOLATION")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: ":id",
      component: "Pages/ViolationDetail",
      key: "violation-create-edit",
      showMenu: false,
      title: "Violation detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.VIOLATION.MANAGEMENT.TITLE",
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
