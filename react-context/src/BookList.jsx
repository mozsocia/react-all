import React from 'react';
import { useBookContext } from './BookContext';

const BookList = () => {
  const { books, setBooks } = useBookContext();

  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  }


  return books.length ? (
    <div className="book-list">
      <ul>
        {books.map(book => {
          return (
            <div key={book.id}>
              <li onClick={() => removeBook(book.id)}>
                <div className="title">{book.title}</div>
                <div className="author">{book.author}</div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No books to read. Hello free time :).</div>
  );
}

export default BookList;