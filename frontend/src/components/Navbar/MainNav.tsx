import styles from './MainNav.module.css';

import { useUser } from '../../hooks/useUser';

import { FC, Fragment, PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import { BsBoxArrowLeft, BsList } from 'react-icons/bs';

export default function MainNav() {
  const { user, logout } = useUser() ?? {};
  const [showSidebar, setShowSidebar] = useState(false);

  if (!logout) return null;
  return (
    <Fragment>
      <Navbar
        className={
          styles.nav +
          ' d-flex justify-content-around bg-dark py-0 px-5 w-100 align-items-center sticky-top'
        }
      >
        {user && (
          <Button
            className={styles.btn + ' text-decoration-none align-items-center'}
            onClick={() => setShowSidebar(true)}
            variant="link"
          >
            <BsList size="24px" className={styles.icon} />
            <span className="ms-1">Menu</span>
          </Button>
        )}
        <Link className="navbar-brand mx-5" to="/">
          {/* <img
            src="/logo.png"
            alt="Logo"
            className={styles.logo + ' text-center'}
          /> */}
          <h1 className="text-center text-white">Notepad</h1>
        </Link>

        {user && (
          <Button
            variant="danger"
            size="sm"
            onClick={logout}
            className={styles.btn + ' align-items-center'}
          >
            <BsBoxArrowLeft fontSize="24px" className="me-2 ps-0" />
            Sair
          </Button>
        )}
        {!user && (
          <Button
            variant="primary"
            size="sm"
            className={styles.btn + ' align-items-center'}
            as={Link as any}
            to="/login"
          >
            Entrar
          </Button>
        )}
      </Navbar>
      {/* <Sidebar show={showSidebar} onHide={() => setShowSidebar(false)} /> */}
    </Fragment>
  );
}
