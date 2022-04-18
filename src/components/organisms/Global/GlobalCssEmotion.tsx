import { useEffect } from "react";
import { Global, css } from '@emotion/react'
import { useGlobalCtx } from 'src/components/organisms/Global/GlobalContext'
// import { setCurrentTheme } from 'src/components/organisms/Global/GlobalFn'
// let themevars = {
//   'light': {
//     bodybg: "#f9f9f9",
//   },

//   'dark': {
//     bodybg: "#000",
//   }
// }

/**
 * This component we need to include in _app.tsx inside <GlobalProvider>
 * We will get the current theme and add the root variable values accordingly based on the theme 
 */

function GlobalCssEmotion() {
  const gctx = useGlobalCtx()

  let theme = gctx.state.theme
  theme = ['light', 'dark'].indexOf(theme) !== -1 ? theme : 'light'
  // const themevar = themevars[theme]

  console.log('theme', theme)
  
  // Udpate the current theme in localstorage once we toggle the globaProvider State
  // useEffect(() => {
  //   setCurrentTheme(theme)
  // },[theme])

  // console.log(themevar.bodybg)

  let styles = `
    :root {
      --body-bg: #f9f9f9;
      --text-primary: #000;
      --text-secondary: #333;
      --link: #374e7c;
      --link-hover: #4067b7;
      --link-nav: #333;
      --heading: #333;
      --bg-light: #fff;
      --bg-secondary: #f2f2f2;
      --box-shadown-light: rgba(0,0,0,0.08);
      --border-light: #f5f5f5;
      
    }
  `

  if(theme=='dark') {
    styles = `
    :root {
      --body-bg: #000;
      --text-primary: #fff;
      --text-secondary: #999;
      --link: #374e7c;
      --link-hover: #4067b7;
      --link-nav: #fff;
      --heading: #333;
      --bg-light: #000;
      --bg-secondary: #383838;
      --box-shadown-light: rgba(255,255,255,0.3);
      --border-light: #383838;
    }`
  }

  return (
    <>
    <Global
      styles={styles}
    />
    </>
  )
}
export default GlobalCssEmotion
