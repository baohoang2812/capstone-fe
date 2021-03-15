import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["Branch Manager"],
  name: "Workspace",
  dir: "Workspace",
  pathRoot: "workspace",
  title: (t) => {
    return (
    <span>
     <Icon type="table" />
      <span>{t("CORE.WORKSPACE")}</span>
    </span>
  )},
  showMenu: true,
  routes: [
   
    {
      url: ":id",
      component: "Pages/WorkspaceDetail",
      key: "workspace-create-edit",
      showMenu: false,
      title: "CORE.WORKSPACE.DETAIL",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "CORE.WORKSPACE.MANAGEMENT.TITLE",
    },
  ],
  redux: redux,
  sagas: sagas,
  lang: {
    vi: intlMessagesVi,
    en: intlMessagesEN,
  },
  isAuthenticate: true
};
