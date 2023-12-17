import { createContext, useContext, useEffect, useState } from 'react';
import usersService, { getUserById } from '../services/usersServices';

const fn_error_context_must_be_used = () => {
  throw new Error('must use authContext provider for consumer to work');
};

export const authContext = createContext({
  user: null,
  fullUser: null,
  login: fn_error_context_must_be_used,
  logout: fn_error_context_must_be_used,
  signUp: fn_error_context_must_be_used,
});
authContext.displayName = 'Auth';

export function AuthProvider({ children }) {
  //to inform react about changes, and for showing the user on every page

  const [user, setUser] = useState(usersService.getUser());
  const [fullUser, setFullUser] = useState(null);

  const refreshUser = () => {
    setUser(usersService.getUser());
  };

  const getFullUser = async () => {
    if (user) {
      const { data: fullUser } = await getUserById(user._id);
      setFullUser(fullUser);
    }
  };

  const login = async (credentials) => {
    const response = await usersService.login(credentials);
    refreshUser();
    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  useEffect(() => {
    if (user) {
      getFullUser();
    }
  }, [user]);

  return (
    <authContext.Provider
      value={{
        user,
        fullUser,
        login,
        getFullUser,
        logout,
        signUp: usersService.createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

//custom hook for the consumers comp
export const useAuth = () => useContext(authContext);
