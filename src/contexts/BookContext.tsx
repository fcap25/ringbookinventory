import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../types';

interface BookContextProps {
  books: Book[];
  addBook: (newBook: Book) => boolean;
  confirmAddBook: () => void;
  rateBook: (isbn: string, rating: number) => void;
  deleteBook: (isbn: string) => void;
  isDuplicate: boolean;
  duplicateBook: Book | null;
  catchDupe: () => void;
  searchInventory: (searchTerm: string, book: Book) => boolean;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const savedBooks = localStorage.getItem('books');
  const [books, setBooks] = useState<Book[]>(savedBooks ? JSON.parse(savedBooks) : []);
  const [duplicateBook, setDuplicateBook] = useState<Book | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (newBook: Book): boolean => {
    const existingBook = books.find(
      book => book.title === newBook.title && book.author === newBook.author
    );

    if (existingBook) {
      setDuplicateBook(newBook);
      setIsDuplicate(true);
      return true;
    } else {
      setBooks((prevBooks) => [...prevBooks, newBook]);
      return false;
    }
  };

  const confirmAddBook = () => {
    if (duplicateBook) {
      setBooks((prevBooks) => [...prevBooks, duplicateBook]);
      setDuplicateBook(null);
      setIsDuplicate(false);
    }
  };

  const rateBook = (isbn: string, rating: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === isbn ? { ...book, rating } : book
      )
    );
  };

  const deleteBook = (isbn: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn));
  };

  const catchDupe = () => {
    setIsDuplicate(false);
    setDuplicateBook(null);
  };

  const searchInventory = (searchTerm: string, book: Book): boolean => {
    return (
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <BookContext.Provider value={{ books, addBook, confirmAddBook, rateBook, deleteBook, isDuplicate, duplicateBook, catchDupe, searchInventory }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
