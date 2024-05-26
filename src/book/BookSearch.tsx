import React, { useState, useContext } from 'react';
import { InputGroup, Input, Button, Flex, useToast, InputLeftAddon, InputLeftElement, InputRightElement, HStack, Select, Slide } from '@chakra-ui/react';
import axios from "axios";
import { BookContext } from '../contexts/BookContext';
import { SmallAddIcon } from '@chakra-ui/icons';
import { SearchIcon } from '@chakra-ui/icons';

interface BookSearchProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	filterCriteria: string; 
    setFilterCriteria: (criteria: string) => void; 
	authors: string[]; 
  	selectedAuthor: string; 
  	setSelectedAuthor: (author: string) => void; 
	isOpen: boolean;
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

const BookSearch: React.FC<BookSearchProps> = ({ searchTerm, setSearchTerm, filterCriteria, setFilterCriteria, authors, selectedAuthor, setSelectedAuthor, isOpen }) => {
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
    <Flex direction={"column"} gap={6} w="40%" align={"center"}>
	  <InputGroup variant={"search"}>
	  <InputLeftAddon children="ISBN" />
		<Input
		  placeholder="Enter ISBN"
		  value={isbn}
		  onChange={(e) => setIsbn(e.target.value)}
		/>
		<InputRightElement>
			<SearchIcon color="gray.300" />
		</InputRightElement>
	  </InputGroup>
      <Button leftIcon={<SmallAddIcon />} w="fit-content" onClick={handleSearch}>Add Book</Button>
	  <HStack transition={"all 0.5s ease"} w="fit-content" justify={"space-evenly"}>
	  	<InputGroup variant={"search"} w="50%">
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} px={6} />
          <Input placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </InputGroup>
		<Select variant={""} placeholder="Filter by" onChange={(e) => setFilterCriteria(e.target.value)} value={filterCriteria} w="50%">
          <option value="author">Author</option>
          <option value="rating-high-to-low">Rating High to Low</option>
          <option value="rating-low-to-high">Rating Low to High</option>
          <option value="recently-added">Recently Added</option>
        </Select>
		<Slide in={isOpen} direction="bottom" unmountOnExit transition={{ exit: { delay: .5 }, enter: { duration: 0.5 } }} style={{ width: "100%"}}>
          <Select variant={""} placeholder="Select author" onChange={(e) => setSelectedAuthor(e.target.value)} value={selectedAuthor}>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </Select>
        </Slide>
	  </HStack>
    </Flex>
  );
};

export default BookSearch;
