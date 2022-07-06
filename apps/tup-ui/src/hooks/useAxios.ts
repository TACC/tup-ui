import { createContext, useContext } from 'react';
import axios, { AxiosStatic } from 'axios';

// Inject the Axios client via context so that it can be swapped out in tests.
export const AxiosClientContext = createContext(axios);

const useAxios = (): AxiosStatic => {
  return useContext(AxiosClientContext);
};

export default useAxios;