// import 'bootstrap/dist/css/bootstrap.css'
// import '@fortawesome/fontawesome-svg-core/styles.css' 
// import 'react-toastify/dist/ReactToastify.css';
// import "../styles/globals.scss";

import "../src/hexa/styles/reboot.scss";
import "./global.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}