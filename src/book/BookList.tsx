import { Box, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { Book } from '../types';
import StarRating from '../components/StarRating';

interface BookListProps {
	books: Book[];
	rateBook: (isbn: string, rating: number) => void;
	deleteBook: (isbn: string) => void;
}
  
  const BookList: React.FC<BookListProps> = ({ books, rateBook, deleteBook }) => {
	return (
	  <VStack spacing={4} mt={4} w="45%">
		{books.map((book) => (
		  <Box key={book.isbn} p={4} borderWidth={1} borderRadius="md" w="100%" bgColor={"primary.300"}>
			<HStack justifyContent="space-between">
			  <VStack alignItems="flex-start">
				<Text fontSize="lg" fontWeight="bold">{book.title}</Text>
				<Text>{book.author}</Text>
				<Text>ISBN: {book.isbn}</Text>
				<HStack>
					<StarRating rating={book.rating} onRate={(rating) => rateBook(book.isbn, rating)} />
				  <Button colorScheme="red" onClick={() => deleteBook(book.isbn)}>Delete</Button>
				</HStack>
			  </VStack>
			  {book.coverImage && <img src={book.coverImage} alt={book.title} style={{ width: '100px', height: '150px' }} />}
			</HStack>
		  </Box>
		))}
	  </VStack>
	);
};

export default BookList;