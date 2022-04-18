import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'
import styles from './index.module.scss'
import { getUserUID } from 'src/components/organisms/Auth/auth'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faUsers, faGift, faSignalStream, faCommentsAlt } from '@symbolia/plsicon'
// import { faYoutube } from '@fortawesome/free-brands-svg-icons'

const ProfileNavBar = (props: {className?: string, userSlug?: string}) => {
  const {className='', userSlug} = props
  const router = useRouter();
  // console.log('In Navbar', router.pathname)
  
  const menus = [
    {
      'name': 'About',
      'link' : "/users/" + userSlug,
      'icon' : faUser
    },

    {
      'name': 'Messages',
      'link' : '/me/messages',
      'icon' : faEnvelope
    },

    {
      'name': 'Friends',
      'link' : '/me/friends',
      'icon' : faUsers
    },

    {
      'name': 'Groups',
      'link' : '/me/groups',
      'icon' : faCommentsAlt
    },

    {
      'name': 'Benefits',
      'link' : '/me/benefits',
      'icon' : faGift
    },

    {
      'name': 'Your Channel',
      'link' : '/me/channel',
      'icon' : faSignalStream
    }
  ]


  return (
    <Navbar bg="dark" expand="lg" variant="dark" className={'px-2 ' + className}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mb-3" />
        <Navbar.Collapse id="profile-navbar-nav">
          <Nav className="me-auto">
          {menus.map((menu, idx) => {
              let isActive = (menu.link === router.pathname) || (router.pathname === '/users/[slug]' && menu.name === 'About');
              return (
                <span className={`nav-item px-2 ${styles.navItem} ${isActive ? styles.active : ''}`} key={idx}>
                  <Link href={menu.link}>
                    <a className={"nav-link "} aria-current="page">
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