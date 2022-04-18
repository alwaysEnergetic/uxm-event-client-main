import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHandshake, faMoneyCheck, faEnvelope, faUsers } from '@symbolia/plsicon'

import { Navbar, Nav } from 'react-bootstrap'

const ProfileNavBar = (props: {className?: string}) => {
  const router = useRouter()
  // console.log(router.pathname);

  const { slug } = router.query
  const {className=''} = props
  const menus = [
    {
      'name': 'About',
      'link' : `/users/${slug}`,
      'icon' : faUser
    },

    {
      'name': 'Groups',
      'link' : `/users/${slug}/groups`,
      'icon' : faUsers
    }
  ]

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className={'px-2 ' + className}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="mb-3" />
      <Navbar.Collapse id="profile-navbar-nav">
        <Nav className="me-auto">
        {menus.map((menu, idx) => {
            let isActive = (menu.name === 'Groups' && router.pathname === '/users/[slug]/groups') || (router.pathname === '/users/[slug]' && menu.name === 'About');
            return (
              <span className={`nav-item px-2 ${styles.navItem}  ${isActive ? styles.active : ''}`} key={idx}>
                <Link href={menu.link}>
                  <a className={"nav-link " + styles.btnSm} aria-current="page">
                    <FontAwesomeIcon icon={menu.icon}/>{' '}{menu.name}
                  </a>
                </Link>
              </span>
            )
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default ProfileNavBar;