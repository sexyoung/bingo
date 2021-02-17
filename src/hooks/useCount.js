import {
  useState,
  useContext,
  createContext,
} from "react";

export const countContext = createContext({});

export const useProvideCount = () => {
  const [count, setCount] = useState(null);
  return {
    count,
    setCount,
  };
};

export const useCount = () => {
  return useContext(countContext);
};