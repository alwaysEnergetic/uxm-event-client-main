import React from 'react'
import { useGlobalCtx } from 'src/components/organisms/Global/GlobalContext'
import { jsx, css } from '@emotion/react'


 function Button(props: any) {
  const {color='red'} = props

  const style = css`
    color: ${color};
    font-size: 20px;
  `

  const style2 = css`
  ${style}
  background: brown;
  `


  return (
    <>
      <div css={style2}>
        Some hotpink text.
      </div>
    </>
  );
}


export default function Demo() {
  let gctx = useGlobalCtx()
  const switchTheme = () => {
    gctx.setState({
      theme: "dark"
    })
  }

  console.log(gctx.state)
  
  return (
    <>
    {gctx.state.theme}
      <button onClick={switchTheme}>Change Theme</button>
    </>
  );
}


// export default function Demo() {

//   const style = css`
//     color: hotpink;
//   `

//   const style2 = css`
//     color: blueviolet;
//   `

//   return (
//     <>
//       <div css={style}>
//         Some hotpink text.

//         <div css={"style"}>Hot red</div>
        
//       </div>
//     </>
//   );
// }
