import React, { useRef, useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faUser } from '@symbolia/plsicon'
import { getLoginUrl, getUserUID, getUserEmail, getUserID } from '../../organisms/Auth/auth'
import Dropdown from 'react-bootstrap/Dropdown'
import { Navbar, Nav } from 'react-bootstrap'
import InviteWidget from "../../organisms/InviteWidget/InviteWidget";
import { menus } from 'src/data/nav'
import { useGlobalCtx } from 'src/components/organisms/Global/GlobalContext'
import { getToggleTheme, setCurrentTheme } from 'src/components/organisms/Global/GlobalFn'

import { useAuth } from 'src/components/organisms/Auth/AuthContext'

const GearComp = () => {
  // const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()

  const gtx = useGlobalCtx()

  function handleLogOut(e) {
    e.preventDefault();
    logout();
    // window.location.href = "/"
    // router.push("/");
  }


  function handleToggleTheme(e) {
    const theme = getToggleTheme()
    setCurrentTheme(theme)
    gtx.setState({
      theme
    })
  }

  

  // console.log("user", user)

  return isAuthenticated ? 
    <Dropdown>
      <Dropdown.Toggle variant="void" className="nav-link">
        <FontAwesomeIcon icon={faCog} />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Link href="/me/edit"><a className="dropdown-item">Edit Profile</a></Link>
        <a className="dropdown-item" href="#" onClick={handleLogOut}>Sign Out</a>
        <a className="dropdown-item" href={`${process.env.NEXT_PUBLIC_INFO_DOMAIN}/contact-us-uxm-music/`}>Customer Service</a>
        <a className="dropdown-item" href="#" onClick={handleToggleTheme}>Toggle Theme</a>
        <hr className="dropdown-divider" />
        <span className="p-2">{user?.email}</span>
      </Dropdown.Menu>
    </Dropdown>
   : null
}


const LoginButton = () => {
  const { isAuthenticated } = useAuth()

  const url = getLoginUrl()
  return !isAuthenticated ? 
    <a href={url} className="btn btn-primary btn-sm1 mb-2 mb-sm-0">
      <FontAwesomeIcon icon={faUser} className="me-2" />LOGIN or REGISTER</a>
   : null
}

const TestLoginButton = () => {
  const { login }  = useAuth()

  const handleLogin = () => {
    login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImVtYWlsIjoia2hhbmFraWFAZ21haWwuY29tIiwidWlkIjoiZDY5YzA2OWMtNzBhZi00YzY3LTg1MTctMjk5YThlNmUxNDVmIiwiZXhwIjoxNjc5MDY2MzM2fQ.gbvFK--N8QG2wFYvSqKTnC1FmZF8YrwFEbGLFvuEO_U")
  }
  return (
    <button className="btn btn-primary" onClick={handleLogin}>Test Login</button>
  )
}

const ProfileLink = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const userID = getUserUID()
  let isActive = (router.pathname === '/users/[slug]');
  return isAuthenticated ?
    <Link href={"/users/" + userID}>
      <a className={`nav-link ${isActive ? "active" : ''}`}>
        <span>Profile</span>
      </a>
    </Link>
    : null
}

const HeaderNav = () => {
  const router = useRouter()
  // console.log(router.pathname)
  return (
    <>
     <Navbar expand="lg" className={'uxm-navbar'}>
       <div className="container-fluid navinner">
         
          <Link href={'/'}>
            <a className="navbar-brand">
              <img src="/images/logo-event.png" alt="UXM Event" className="header-logo" />
            </a>
          </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mb-3" />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto1">
                {menus.map((menu, index) => {
                  let isActive = (router.pathname === menu.link) || (router.pathname === '/info/[slug]' && menu.name === 'How-to') ;
                  return (
                      <Link href={menu.link} key={index}>
                        <a className={`nav-link ${isActive ? "active" : ''}`} key={index}>
                          <span>{menu.name}</span>
                        </a>
                      </Link>
                  )
                })}
                <ProfileLink />
              </Nav>
              <hr className="d-md-none text-black-50 mt-1" />
              <Link href={'/me/rewards'}>
                <a className="btn btn-warning me-2">
                  Rewards
                </a>
              </Link>
              
              <InviteWidget 
                  btnClassName={'btn btn-primary btn-sm1 me-2 mb-2 mb-sm-0'}
                  title="Share This Page" 
                  redirect={router.asPath} 
                />
              <InviteWidget 
                btnClassName={'btn btn-primary btn-sm1 me-2 mb-2 mb-sm-0'}
              />
              <LoginButton />
              <GearComp />
              {/* <TestLoginButton /> */}
            </Navbar.Collapse>
        
        </div>
    </Navbar>
    </>

  )
}

export default HeaderNav;