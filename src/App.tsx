import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './home';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
	<ChakraProvider>
    	<Home />
	</ChakraProvider>
  );
}

export default App;
