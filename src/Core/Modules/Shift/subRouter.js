import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["Branch Manager"],
  name: "Shift",
  dir: "Shift",
  pathRoot: "shift",
  title: (t) => {
    return (
    <span>
    <Icon type="calendar" />
      <span>{t("CORE.SHIFT")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: ":id",
      component: "Pages/ShiftDetail",
      key: "shift-create-edit",
      showMenu: false,
      title: "CORE.SHIFT.DETAIL",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.SHIFT.MANAGEMENT.TITLE",
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
