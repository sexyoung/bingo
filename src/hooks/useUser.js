import {
  useState,
  useContext,
  useCallback,
  createContext,
} from 'react';

export const userContext = createContext({});

export const useProvideUser = () => {
  const [user, setUser] = useState({});
  const rename = useCallback(name => {
    setUser({...user, name});
  }, [user]);

  return {
    user,
    rename,
    setUser,
  };
};

export const useUser = () => {
  return useContext(userContext);
};