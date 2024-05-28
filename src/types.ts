export interface Book {
  isbn: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  bookshelves: string[];
}

export interface Bookshelf {
  name: string;
  books: string[];
}
