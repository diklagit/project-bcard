import { createContext, useContext, useState } from 'react';

const fn_error_context_must_be_used = () => {
  throw new Error('must use searchContext provider for consumer to work');
};

const searchContext = createContext({
  searchTerm: '',
  setSearchTerm: fn_error_context_must_be_used,
  clearTerm: fn_error_context_must_be_used,
});
searchContext.displayName = 'search';

export function SearchProvider({ children }) {
  //to inform react about changes, and for showing the user on every page

  const [searchTerm, setSearchTerm] = useState('');

  const clearTerm = () => setSearchTerm('')

  return (
    <searchContext.Provider value={{ searchTerm, setSearchTerm , clearTerm }}>
      {children}
    </searchContext.Provider>
  );
}

//custom hook for the consumers comp
export const useSearch = () => useContext(searchContext);
