const path = require('path');

// https://gist.github.com/justincy/b8805ae2b333ac98d5a3bd9f431e8f70

module.exports = {
  typescript: { reactDocgen: false },
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },

  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.modules = [
      path.resolve(__dirname, ".."),
      "node_modules",
    ]

    // this will work only for the file with *.module.(scss|sass)
    config.module.rules.push({
      test: /\.module\.s(a|c)ss$/,
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        },
        'sass-loader'
      ]
    });

    // if not added then it was not compiling the globals.scss file
    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      exclude: /\.module.(s(a|c)ss)$/,
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    });

    // Return the altered config
    return config;
  },

}