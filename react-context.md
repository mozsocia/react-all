### BookContext.js

```js
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

```
### App.js

```js
import BookContextProvider from './BookContext';
function App() {
  return (
    <div className="App">
      <BookContextProvider>
        ...
        ...
      </BookContextProvider>
    </div>
  );
}

export default App;
```

### use in other js

```js
import { useBookContext } from './BookContext';

const BookList = () => {
  const { books, setBooks } = useBookContext();

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }

    const addBook = (title, author) => {
    setBooks([...books, { title, author, id: uuid() }]);
  };

}

```