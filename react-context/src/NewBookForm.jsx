import React, { useState } from 'react';
import { useBookContext } from './BookContext';
import uuid from 'uuid/v1';

const NewBookForm = () => {
  const { books, setBooks } = useBookContext()
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const addBook = (title, author) => {
    setBooks([...books, { title, author, id: uuid() }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(title, author);
    addBook(title, author);
    setTitle('');
    setAuthor('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="book title" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="author name" value={author}
        onChange={(e) => setAuthor(e.target.value)} />
      <input type="submit" value="add book" />
    </form>
  );
}

export default NewBookForm;