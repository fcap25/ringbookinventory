import React, { useState, useContext } from 'react';
import { Input, Button, Flex, useToast } from '@chakra-ui/react';
import axios from "axios";
import { BookContext } from '../contexts/BookContext';

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

const BookSearch: React.FC = () => {
  const [isbn, setIsbn] = useState<string>('');
  const { addBook } = useContext(BookContext)!;
  const toast = useToast();

  const handleSearch = async () => {
    if (!validateISBN(isbn)) {
      toast({
        title: "Invalid ISBN",
        description: "Please enter a valid ISBN-10 or ISBN-13.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      console.log(response.data);
      const bookData = response.data[`ISBN:${isbn}`];
      if (bookData) {
        const isDuplicate = addBook({
          isbn,
          title: bookData.title,
          author: bookData.authors[0].name,
          coverImage: bookData.cover.medium,
          rating: 0,
          bookshelf: 'All Books'
        });

        if (isDuplicate ===  undefined) {
          toast({
            title: "Book added",
            description: "The book has been successfully added to your collection.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }

        setIsbn(''); // Clear the ISBN input state on successful addition
      } else {
        toast({
          title: "No book found",
          description: "No book found with this ISBN. Please try another.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error fetching book data",
        description: "An error occurred while fetching book data. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction={"column"} gap={2} w="20%">
      <Input
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        bgColor={"black"}
        color={"white"}
      />
      <Button bgColor="green.400" onClick={handleSearch} _hover={{bgColor: "green.300"}}>Add Book</Button>
    </Flex>
  );
};

export default BookSearch;
