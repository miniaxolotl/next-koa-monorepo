import { useContext } from 'react';

import { FetchContext } from '../providers';

export const useFetch = () => {
  return useContext(FetchContext);
};
