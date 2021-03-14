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
  title: (t) => {
    return (
    <span>
       <Icon type="file-text" /> 
      <span>{t("CORE.REGULATION")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
    
    {
      url: ":id",
      component: "Pages/RegulationDetail",
      key: "regulation-create-edit",
      showMenu: false,
      title: "CORE.REGULATION.DETAIL",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.REGULATION.MANAGEMENT.TITLE",
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
