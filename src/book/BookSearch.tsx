import React, { useState } from 'react';
import { Input, Button, Box, Text } from '@chakra-ui/react';
import axios from "axios";
import { Book } from '../types';

interface BookSearchProps {
  addBook: (book: Book) => void;
}

const validateISBN = (isbn: string): boolean => {
  isbn = isbn.replace(/[\s-]/g, '');
  if (isbn.length !== 10 && isbn.length !== 13) return false;
  if (isbn.length === 10) return validateISBN10(isbn);
  if (isbn.length === 13) return validateISBN13(isbn);
  return false;
};

const validateISBN10 = (isbn: string): boolean => {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    if (isNaN(Number(isbn[i]))) return false;
    sum += parseInt(isbn[i]) * (10 - i);
  }
  let check = isbn[9].toUpperCase();
  sum += check === 'X' ? 10 : parseInt(check);
  return sum % 11 === 0;
};

const validateISBN13 = (isbn: string): boolean => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    if (isNaN(Number(isbn[i]))) return false;
    sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
  }
  let check = parseInt(isbn[12]);
  return (sum + check) % 10 === 0;
};

const BookSearch: React.FC<BookSearchProps> = ({ addBook }) => {
	const [isbn, setIsbn] = useState<string>('');
	const [error, setError] = useState<string>('');
  
	const handleSearch = async () => {
	  if (!validateISBN(isbn)) {
		setError('Invalid ISBN. Please enter a valid ISBN-10 or ISBN-13.');
		return;
	  }
  
	  try {
		const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
		console.log(response.data);
		const bookData = response.data[`ISBN:${isbn}`];
		if (bookData) {
		  addBook({
			isbn,
			title: bookData.title,
			author: bookData.authors[0].name,
			coverImage: bookData.cover.medium,
			rating: 0,
			bookshelf: 'All Books'
		  });
		  setError('');
		  setIsbn(''); // Clear the ISBN input state on successful addition
		} else {
		  setError('No book found with this ISBN. Please try another.');
		}
	  } catch (error) {
		setError('An error occurred while fetching book data. Please try again later.');
	  }
	};
  
	return (
	  <Box>
		<Input
		  placeholder="Enter ISBN"
		  value={isbn}
		  onChange={(e) => setIsbn(e.target.value)}
		/>
		<Button onClick={handleSearch}>Add Book</Button>
		{error && <Text color="red.500">{error}</Text>}
	  </Box>
	);
  };

export default BookSearch;
