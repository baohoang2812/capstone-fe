import "./bootstrap.less";

// import redux from "./Store/initRedux";
// import sagas from "./Store/initSagas";
import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";

export default {
  roleName: ["admin","Branch Manager","Staff","QC Manager", "System Admin"],
  name: "Profile",
  dir: "Profile",
  pathRoot: "profile",
  
  showMenu: false,
  routes: [
    {
      url: "",
      component: "Pages/Profile",
      key: "profile-edit",
      title: "CORE.EMPLOYEE.PROFILE.TITLE"
    },
  ],
  // redux: redux,
  // sagas: sagas,
  lang: {
    vi: intlMessagesVi,
    en: intlMessagesEN,
  },
  isAuthenticate: true,
};
