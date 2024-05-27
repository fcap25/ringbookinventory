import { Grid, GridItem,  } from '@chakra-ui/react';
import { Book } from '../types';
import BookCard from './BookCard';

interface BookListProps {
	books: Book[];
	rateBook: (isbn: string, rating: number) => void;
	deleteBook: (isbn: string) => void;
}
  
const BookList: React.FC<BookListProps> = ({ books, rateBook, deleteBook }) => {
	return (
	  <Grid templateColumns={'repeat(6,.5fr)'} templateRows={'repeat(2, 1fr)'} gap={6} w="90%" h="100%" mt={10}>
	  {books.map((book) => (
		<GridItem key={book.isbn} w='100%' h="fit-content">
        <BookCard key={book.isbn} book={book} rateBook={rateBook} deleteBook={deleteBook} />
		</GridItem>
      ))}
	  </Grid>

	);
  };

export default BookList;