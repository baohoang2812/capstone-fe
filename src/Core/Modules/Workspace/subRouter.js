import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  name: "Workspace",
  dir: "Workspace",
  pathRoot: "workspace",
  title: (
    <span>
     <Icon type="table" />
      <span>Workspace</span>
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
      component: "Pages/WorkspaceDetail",
      key: "workspace-create-edit",
      showMenu: false,
      title: "Workspace detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Workspace Management",
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
