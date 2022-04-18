import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import { isLoggedIn, getTokenName, getTokenDecoded } from './auth'

type User = {
  email: string
  id: string
  sub: string
  exp: number
}

type AuthContextProps = {
  isAuthenticated: boolean, 
  loading: boolean, 
  user?: User, 
  logout: any
  login: Function
}
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false, 
  loading: false, 
} as any);

export const AuthProvider = ({ children } : any) => {
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true) // Prevent Expected server HTML to contain a matching

    useEffect(() => {
      // Load user from cookie
      updateUser()
      setLoading(false)
    }, [])

    const updateUser = () => {
      const user = getTokenDecoded()
      if(user) {
        setUser(user)
      }
    }

    const login = (token) => {
      if (!token) return '';
      Cookies.set(getTokenName(), token);
      updateUser()
    }

    const logout = () => {
      Cookies.remove(getTokenName());
      setUser(undefined)
    }

    // isLoggedIn() && !loading - we did to prevent SSR match issue Expected server HTML to contain a matching <div> in <div>.
    // so code should execute only on client not on SSR
    return (
      <AuthContext.Provider value={{ isAuthenticated: isLoggedIn() && !loading, loading, user, login, logout }}>
          {children}
      </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

/* 
  bypass - We had the event single page which can be private and public both so we created a new
  param bypass which equals to `isPublic` so if bypass is true then we do not need to authenticate
*/
export const ProtectRoute = ({ bypass,  children }: {bypass?: boolean, children: (React.ReactElement|null) }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter()
  // If loading or not window that code is executing server side
  if(typeof window == 'undefined' || loading) return null

  if(bypass) return null

  // Run only on client side
  if ((!isAuthenticated &&  window.location.pathname !== '/login')){
    // window.location.pathname = '/login'
    router.push('/login')
    return null
  }

  return children;
};

export const PublicOnlyRoute = ({ children }: any) => {
  const { isAuthenticated, loading } = useAuth();

  // If loading or not window that code is executing server side
  if(typeof window == 'undefined' || loading) return null

  // Run only on client side
  if (isAuthenticated &&  window.location.pathname !== '/'){
    window.location.pathname = '/'
    return null
  }
  return children;
};