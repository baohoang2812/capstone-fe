import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";

import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["Branch Manager","Shift Manager"],
  name: "TakeAttendance",
  dir: "TakeAttendance",
  pathRoot: "attendance",
  title: (t) => {
    return (
    <span>
   <Icon type="solution" />
      <span>{t("CORE.ATTENDANCE")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: "timekeeping",
      component: "Pages/Timekeeping",
      showMenu: true,
      title: "CORE.TIME.KEEPING.MANAGEMENT.TITLE",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.ATTENDANCE.MANAGEMENT.TITLE",
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
