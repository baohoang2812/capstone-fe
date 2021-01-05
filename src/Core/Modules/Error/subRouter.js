export default {
  name: "Error",
  dir: "Error",
  pathRoot: "500",
  accessibleByAnyOne: true,
  routes: [
    {
      url: "",
      component: "Pages/index",
      key: "error",
      showMenu: false,
      title: "Error"
    }
  ],
  isAuthenticate: true,
};
