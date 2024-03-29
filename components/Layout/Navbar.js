import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navigation = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  return (
    <Navbar expand="lg" fixed="top" variant="light" collapseOnSelect="true">
      <Container>
        <Navbar.Brand>The Pond at McKee Glen</Navbar.Brand>
        <Navbar.Toggle aria-controls="primary-navigation" />
        <Navbar.Collapse id="primary-navigation">
          <Nav className="ms-auto">
            <>
              {user ? (
                ''
              ) : (
                <Link href="/">
                  <a className={router.pathname == '/' ? 'nav-link active' : 'nav-link'}>Home</a>
                </Link>
              )}

              <Link href="/faq">
                <a className={router.pathname == '/faq' ? 'nav-link active' : 'nav-link'}>Community FAQs</a>
              </Link>
              {user ? (
                <>
                  <Link href="/contact">
                    <a className={router.pathname == '/contact' ? 'nav-link active' : 'nav-link'}>Contact</a>
                  </Link>
                  <Link href="/dashboard">
                    <a className={router.pathname == '/dashboard' ? 'nav-link active' : 'nav-link'}>Dashboard</a>
                  </Link>
                </>
              ) : (
                ''
              )}
              {user ? (
                <Nav.Link
                  onClick={() => {
                    router.push('/')
                    logout()
                  }}>
                  Logout
                </Nav.Link>
              ) : (
                ''
              )}
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
