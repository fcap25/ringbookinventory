import { Box, Text, VStack, HStack, Button, SimpleGrid, Flex } from '@chakra-ui/react';
import { Book } from '../types';
import StarRating from '../components/StarRating';
import BookCard from './BookCard';

interface BookListProps {
	books: Book[];
	rateBook: (isbn: string, rating: number) => void;
	deleteBook: (isbn: string) => void;
}
  
const BookList: React.FC<BookListProps> = ({ books, rateBook, deleteBook }) => {
	return (
	<Flex justifyContent="center" alignItems="center" direction={"row"} py={10} w="100%" h="100%">
	  <SimpleGrid columns={6} minChildWidth={"100px"} spacing={24} alignItems="center" justifyContent={"center"} w="80%">
	  {books.map((book) => (
        <BookCard key={book.isbn} book={book} rateBook={rateBook} deleteBook={deleteBook} />
      ))}
	  </SimpleGrid>
	</Flex>
	);
  };

export default BookList;