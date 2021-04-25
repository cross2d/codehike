module.exports = {
  webpackFinal: async (config, {configType}) => {

    config.devtool = 'source-map';
    console.log(config);
    return config;
  },
  stories: ["*.story.js"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
  ],
}
