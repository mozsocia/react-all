import React, { createContext, useReducer } from 'react';

const BookContext = createContext();



const BookContextProvider = (props) => {

  const bookReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_BOOK':
        return [
          ...state, { ...action.payload }
        ]
      case 'REMOVE_BOOK':
        return state.filter((book) => book.id != action.payload.id)
      default:
        return state
    }
  }

  const [books, dispatch] = useReducer(bookReducer, [], () => (
    // return of this function data will replace the initial data
    [
      { title: 'name of the wind', author: 'patrick rothfuss', id: 1 },
      { title: 'the final empire', author: 'brandon sanderson', id: 2 },
    ]))


  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
}

export const useBookContext = () => {
  return React.useContext(BookContext);
}

export default BookContextProvider;