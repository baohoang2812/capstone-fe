import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin","Branch Manager"],
  name: "Regulation",
  dir: "Regulation",
  pathRoot: "regulation",
  title: (
    <span>
      <Icon type="file-text" /> 
      <span>Regulation</span>
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
      component: "Pages/RegulationDetail",
      key: "regulation-create-edit",
      showMenu: false,
      title: "Regulation detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Regulation Management",
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
