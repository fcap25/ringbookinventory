export interface Book {
  isbn: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  bookshelf: string;
}

export interface Bookshelf {
  name: string;
  books: string[];
}
