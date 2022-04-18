/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  images: {
    domains: ['www.freeiconspng.com', 'localhost', "media.theuxm.com", "media.theuxm.dev", "info.theuxm.com"],
  },

  // https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  },

  async redirects() {
    return [
      {
        source: '/events/6fdd7a3a-690b-4b4d-b1f4-ef0ce1fb84d8',
        destination: '/radio',
        permanent: true,
      },

      {
        source: '/events/6fdd7a3a-690b-4b4d-b1f4-ef0ce1fb84d7',
        destination: '/events/pstv-show-b02f01c6-1be2-41bc-94c4-c2ab7bd3537e',
        permanent: true,
      },
    ]
  },
}
