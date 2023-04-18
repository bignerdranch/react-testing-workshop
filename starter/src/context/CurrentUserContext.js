import { createContext, useContext } from 'react';

const CurrentUserContext = createContext();

CurrentUserContext.displayName = 'CurrentUserContext';

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);
  return context;
};

export default CurrentUserContext;
