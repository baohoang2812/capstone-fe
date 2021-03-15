import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["Branch Manager","Staff"],
  name: "WorkSchedule",
  dir: "WorkSchedule",
  pathRoot: "workSchedule",
  title: (t) => {
    return (
    <span>
       <Icon type="schedule" />
      <span>{t("CORE.WORKSCHEDULE")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    {
      url: ":id",
      component: "Pages/WorkScheduleDetail",
      key: "workSchedule-create-edit",
      showMenu: false,
      title: "Work Schedule detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.WORKSCHEDULE.MANAGEMENT",
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
