import { Box, Text, VStack, HStack, Button, Select } from '@chakra-ui/react';
import { Book } from '../types';

interface BookListProps {
	books: Book[];
	rateBook: (isbn: string, rating: number) => void;
	deleteBook: (isbn: string) => void;
  }
  
  const BookList: React.FC<BookListProps> = ({ books, rateBook, deleteBook }) => {
	return (
	  <VStack spacing={4} mt={4}>
		{books.map((book) => (
		  <Box key={book.isbn} p={4} borderWidth={1} borderRadius="md" w="100%" bgColor={"slateblue"}>
			<HStack justifyContent="space-between">
			  <VStack alignItems="flex-start">
				<Text fontSize="lg" fontWeight="bold">{book.title}</Text>
				<Text>{book.author}</Text>
				<Text>ISBN: {book.isbn}</Text>
				<HStack>
				  <Select
					value={book.rating}
					onChange={(e) => rateBook(book.isbn, parseInt(e.target.value))}
					placeholder="Rate this book"
				  >
					{[1, 2, 3, 4, 5].map((star) => (
					  <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
					))}
				  </Select>
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