const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
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
      test: /\.(js)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              // use @babel/preset-react for JSX and env (instead of staged presets)
              require.resolve("@babel/preset-react"),
              require.resolve("@babel/preset-env"),
            ],
            plugins: [
              // use @babel/plugin-proposal-class-properties for class arrow functions
              require.resolve("@babel/plugin-proposal-class-properties"),
              // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
              require.resolve("babel-plugin-remove-graphql-queries"),
              // use babel-plugin-react-docgen to ensure PropTables still appear
              require.resolve("babel-plugin-react-docgen"),
            ],
          },
        },
      ],
      exclude: [/node_modules\/(?!(gatsby)\/)/],
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      oneOf: [
        // module.scss files (e.g component styles.module.scss)
        // https://webpack.js.org/loaders/style-loader/#modules
        {
          test: /\.module\.s?css$/,
          use: [
            // Add exports of a module as style to DOM
            {
              loader: "style-loader",
              options: {
                esModule: true,
              },
            },
            // Loads CSS file with resolved imports and returns CSS code
            {
              loader: "css-loader",
              options: {
                esModule: true,
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                  namedExport: true,
                },
              },
            },
            // Loads and compiles a SASS/SCSS file
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"), // Prefer `dart-sass`
                // vvv - only if you are using additional global variable
                additionalData: "@import 'src/styles/main.scss';",
              },
            },
          ],
        },
        // scss files that are not modules (e.g. custom.scss)
        {
          use: [
            // Add exports of a module as style to DOM
            "style-loader",
            // Loads CSS file with resolved imports and returns CSS code
            "css-loader",
            // Loads and compiles a SASS/SCSS file
            {
              loader: "sass-loader",
              // only if you are using additional global variable
              options: {
                additionalData: "@import 'src/styles/main.scss';",
              },
            },
          ],
        },
      ],
    });

    return config;
  },
};
