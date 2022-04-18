module.exports = {
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        },
        "styled-jsx": {
          "plugins": ["@styled-jsx/plugin-sass"]
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}