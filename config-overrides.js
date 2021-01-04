const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugins,
  useBabelRc,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addBabelPlugins([
    "babel-plugin-root-import", {
      "rootPathPrefix": "~",
      "rootPathSuffix": "./src"
    }
  ]),
  useBabelRc(),
  addLessLoader({
    javascriptEnabled: true,
  })
);