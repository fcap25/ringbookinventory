import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home';
import { ChakraProvider } from '@chakra-ui/react';
import { BookProvider } from './contexts/BookContext';
import theme from './styles/index';

function App() {
	return (
	  <ChakraProvider theme={theme}>
		<BookProvider>
		  <Home />
		</BookProvider>
	  </ChakraProvider>
	);
  }

export default App;
