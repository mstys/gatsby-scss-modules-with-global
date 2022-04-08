const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          modules: {
            auto: true,
            localIdentName: "[name]__[local]--[hash:base64:5]",
            namedExport: true,
          },
        },
        sassLoaderOptions: {
          sourceMap: true,
          implementation: require("sass"), // Prefer `dart-sass`
          additionalData: `@import 'src/styles/_variables.scss';
                      @import 'src/styles/_mixins.scss';`,
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push(
      require.resolve("babel-plugin-remove-graphql-queries")
    );

    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      include: path.resolve(__dirname, "../"),
      use: [
        // Add exports of a module as style to DOM
        "style-loader",
        // Loads CSS file with resolved imports and returns CSS code
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
              namedExport: true,
            },
          },
        },
        // Loads and compiles a SASS/SCSS file
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
            implementation: require("sass"), // Prefer `dart-sass`
            additionalData: `@import 'src/styles/_variables.scss';
              @import 'src/styles/_mixins.scss';`,
          },
        },
      ],
    });

    return config;
  },
};
