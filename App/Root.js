import React from 'react';
import { BookmarkHandlerProvider } from './BookmarkHandler';
import App from './App';
import HomePage from './HomePage';
import SavedPage from './SavedPage'; 

const Root = () => {
  return (
    <BookmarkHandlerProvider>
        <App />
    </BookmarkHandlerProvider>
  );
};

export default Root;


