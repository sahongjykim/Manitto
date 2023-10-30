const path = require("path");
const { defineConfig } = require("@vue/cli-service");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  // productionSourceMap: process.env.NODE_ENV != 'production',
  transpileDependencies: true,
  // assets 단축 경로 설정
  assetsDir: "src/assets/",
  configureWebpack: {
    resolve: {
      alias: {
        // scss 단축 경로 ( ./src/assets 를 ~styles로 사용 가능 )
        styles: path.resolve("./src/assets"),
      },
    },
    // plugins: [new BundleAnalyzerPlugin()],
  },
  lintOnSave: false,
  // outputDir: path.resolve(__dirname, '../src/main/resources/static'),
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/style.scss";
        `,
      },
    },
  },
});
