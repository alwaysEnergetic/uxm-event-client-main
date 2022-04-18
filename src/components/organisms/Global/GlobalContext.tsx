import React, { createContext, useState, useContext, useEffect, useReducer } from 'react'

import { getCurrentTheme } from './GlobalFn'

type GlobalState = {
  theme: string, 
}

type GlobalContextProps = {
  state: GlobalState
  setState: Function
}

const GlobalContext = createContext<GlobalContextProps>({} as any);


const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

export const GlobalProvider = ({defaultState, children } : {defaultState?: GlobalState, children: React.ReactNode}) => {
    const [state, setState] = useReducer(reducer, defaultState||{});

    useEffect(() => {
      // console.log('getCurrentTheme()', getCurrentTheme())
      setState({
        theme: getCurrentTheme()
      })
    }, [])

    // const setState_ = (data: any) => {
    //   setState(data)
    //   // setThemeName(data?.theme)
    // }
  
    return (
      <GlobalContext.Provider value={{  state, setState }}>
          {children}
      </GlobalContext.Provider>
    )
}

export const useGlobalCtx = () => useContext(GlobalContext)