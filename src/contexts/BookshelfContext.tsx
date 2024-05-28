import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface Bookshelf {
  name: string;
  books: string[];
}

interface BookshelfContextProps {
  bookshelves: Bookshelf[];
  addBookshelf: (name: string) => void;
  deleteBookshelf: (name: string) => void;
  editBookshelf: (oldName: string, newName: string) => void;
  addBookToBookshelf: (isbn: string, shelfName: string) => void;
  removeBookFromBookshelf: (isbn: string, shelfName: string) => void;
}

const BookshelfContext = createContext<BookshelfContextProps | undefined>(undefined);

export const useBookshelf = () => {
  const context = useContext(BookshelfContext);
  if (!context) {
    throw new Error('useBookshelf must be used within a BookshelfProvider');
  }
  return context;
};

const BookshelfProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const savedBookshelves = localStorage.getItem('bookshelves');
  const [bookshelves, setBookshelves] = useState<Bookshelf[]>(savedBookshelves ? JSON.parse(savedBookshelves) : []);

  useEffect(() => {
    localStorage.setItem('bookshelves', JSON.stringify(bookshelves));
  }, [bookshelves]);

  const addBookshelf = (name: string) => {
    setBookshelves([...bookshelves, { name, books: [] }]);
  };

  const deleteBookshelf = (name: string) => {
    setBookshelves(bookshelves.filter(shelf => shelf.name !== name));
  };

  const editBookshelf = (oldName: string, newName: string) => {
    setBookshelves(bookshelves.map(shelf => 
      shelf.name === oldName ? { ...shelf, name: newName } : shelf
    ));
  };

  const addBookToBookshelf = (isbn: string, shelfName: string) => {
    setBookshelves(bookshelves.map(shelf => 
      shelf.name === shelfName ? { ...shelf, books: [...shelf.books, isbn] } : shelf
    ));
  };

  const removeBookFromBookshelf = (isbn: string, shelfName: string) => {
    setBookshelves(bookshelves.map(shelf => 
      shelf.name === shelfName ? { ...shelf, books: shelf.books.filter(bookIsbn => bookIsbn !== isbn) } : shelf
    ));
  };

  return (
    <BookshelfContext.Provider value={{ bookshelves, addBookshelf, deleteBookshelf, editBookshelf, addBookToBookshelf, removeBookFromBookshelf }}>
      {children}
    </BookshelfContext.Provider>
  );
};

export { BookshelfContext, BookshelfProvider };
