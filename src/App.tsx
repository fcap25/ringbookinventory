import './App.css';
import Home from './home';
import { ChakraProvider } from '@chakra-ui/react';
import { BookProvider } from './contexts/BookContext';
import { BookshelfProvider } from './contexts/BookshelfContext';
import theme from './styles/index';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BookProvider>
		<BookshelfProvider>
        <Home />
		</BookshelfProvider>
      </BookProvider>
    </ChakraProvider>
  );
}

export default App;
