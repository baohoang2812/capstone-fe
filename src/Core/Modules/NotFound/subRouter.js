export default {
  name: "NotFound",
  dir: "NotFound",
  pathRoot: "404",
  accessibleByAnyOne: true,
  routes: [
    {
      url: "",
      component: "Pages/index",
      key: "not found",
      showMenu: false,
      title: "Not found"
    }
  ],
  isAuthenticate: true,
};
