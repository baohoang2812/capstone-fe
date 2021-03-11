import "./bootstrap.less";

import React from "react";
import { Icon } from "antd";

import redux from "./Store/initRedux";
import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin","Branch Manager"],
  name: "Cameras",
  dir: "Cameras",
  pathRoot: "cameras",
  title: (
    <span>
      <Icon type="video-camera" />
      <span>Cameras</span>
    </span>
  ),
  showMenu: true,
  routes: [
    {
      url: ":id",
      component: "Pages/CameraDetail",
      key: "camera-create-edit",
      showMenu: false,
      title: "Camera detail",
    },
    {
      url: "",
      component: "Pages",
      showMenu: true,
      title: "Cameras Management",
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
