import React from 'react'
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'


type WrapperPropsType = {
  size?: any
}

type ButtonPropsType = {
  as?: any,
  size?: any,
  children?: any
}

const Wrapper = styled.button<WrapperPropsType>((props: WrapperPropsType) => ({
  // fontSize: FontSize[props.size],
}))

const Button1 = ({ as, size, children }: ButtonPropsType) => {
  return (
    <Wrapper as={as} size={size}>
        { children }
    </Wrapper>
  )
}

export default function Button(props: any) {
  const {color='red'} = props

  const Button = styled.button`
  // color: turquoise;
`


  const style = css`
    color: ${color};
    font-size: 20px;
    &:hover {
      color: pink;
    }
  `

  return (
    <>
      <Button>This my button component.</Button>
    </>
  );
}