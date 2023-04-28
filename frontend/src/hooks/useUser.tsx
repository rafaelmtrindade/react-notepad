import {
  createContext,
  useMemo,
  useContext,
  FC,
  PropsWithChildren,
} from 'react';
import useCookie from './useCookie';
import useApi from './useApi';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type PostUser = Pick<User, 'name' | 'email'> & {
  password: string;
  confirmPassword: string;
};

interface IUserContext {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  postUser: (userData: PostUser) => void;
  updateUser: (userData: Partial<PostUser>) => void;
  deleteUser: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useCookie('user', null) as [
    User | null,
    (user: User | null) => void
  ];
  const fetchApi = useApi();

  const login = async (email: string, password: string) => {
    const body = { email, password };
    const response = await fetchApi('/users/login', 'POST', {
      body,
    });
    const data = await response.json();

    if (!response.ok) throw data;
    return setUser(data);
  };

  const logout = async () => {
    try {
      const response = await fetchApi('/users/logout', 'POST');

      if (response.ok) return setUser(null);

      const err = await response.json();
      throw err;
    } catch (error) {
      console.error(error);
    }
  };

  const postUser = async (userData: PostUser) => {
    try {
      const response = await fetchApi('/users', 'POST', { body: userData });
      const data = await response.json();

      if (!response.ok) throw data;
      return setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userData: Partial<PostUser>) => {
    try {
      if (!user) throw new Error('Login necessário');
      if (!userData) throw new Error('Nenhum dado para atualizar');
      if (userData.password !== userData.confirmPassword)
        throw new Error('Senhas não conferem');

      const response = await fetchApi(`/users/${user.id}`, 'PATCH', {
        body: userData,
      });
      const data = await response.json();

      if (!response.ok) throw data;
      return setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      if (!user) throw new Error('Login necessário');
      const response = await fetchApi(`/users/${user.id}`, 'DELETE');

      if (response.ok) return setUser(null);
      const err = await response.json();
      throw err;
    } catch (error) {
      console.error(error);
    }
  };

  const value = useMemo(
    () => ({ user, login, logout, postUser, updateUser, deleteUser }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
