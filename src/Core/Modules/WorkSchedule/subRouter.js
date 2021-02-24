import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  name: "WorkSchedule",
  dir: "WorkSchedule",
  pathRoot: "workSchedule",
  title: (
    <span>
     <Icon type="schedule" />
      <span>Work Schedule</span>
    </span>
  ),
  showMenu: true,
  routes: [
    {
      url: "profile",
      component: "Pages/Profile",
      key: "profile-edit",
      showMenu: false,
      title: "Profile",
    },
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
      title: "Work Schedule Management",
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
