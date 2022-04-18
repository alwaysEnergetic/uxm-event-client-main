import { createContext, useContext, useState } from 'react'

// const createStore = () => {  
//   return {
//     useLoginState: useState(false)
//   }
// }

// const GlobalContext = createContext<any>({});

// export function GlobalContextProvider({children}) {
//   let value = createStore()
//   return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
// }

// export const useGlobalStore = () => {
//   return useContext(GlobalContext)
// }

// // How to use: const [ state, setState ] = useLoginState()
// export const useLoginState = () => {
//   const { useLoginState } = useGlobalStore()
//   return useLoginState
// }
