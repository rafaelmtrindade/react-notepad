import { Fragment, useEffect } from 'react';
import { useOutlet, useNavigate, useLocation } from 'react-router-dom';

import { useUser } from '../../hooks/useUser';

export default function ProtectedLayout() {
  const { user: loggedUser } = useUser() ?? {};
  // const { pathname } = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  useEffect(() => {
    if (loggedUser) return;
    // setOrigin(pathname);
    navigate('/login', { replace: true });
  }, [loggedUser]); //, pathname]);

  if (!loggedUser) return null;

  return <Fragment>{outlet}</Fragment>;
}
