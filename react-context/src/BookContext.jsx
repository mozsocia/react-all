import React, { createContext, useState } from 'react';

const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    { title: 'name of the wind', author: 'patrick rothfuss', id: 1 },
    { title: 'the final empire', author: 'brandon sanderson', id: 2 },
  ]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {props.children}
    </BookContext.Provider>
  );
}

export const useBookContext = () => {
  return React.useContext(BookContext);
}

export default BookContextProvider;