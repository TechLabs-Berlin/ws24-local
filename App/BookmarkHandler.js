import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BookmarkContext = createContext();

export const useBookmarkHandler = () => {
    return useContext(BookmarkContext);
  }
  
  export const BookmarkHandlerProvider = ({ children }) => {
  
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

    useEffect(() => {
        const fetchBookmarkedEvents = async () => {
        try {
            const response = await axios.get('http://192.168.1.218:5002/bookmarked-events');
            setBookmarkedEvents(response.data);
        } catch (error) {
            console.error('Error fetching bookmarked events:', error);
        }
        };

        fetchBookmarkedEvents();
    }, []);

    const toggleBookmark = async (eventId) => {
        try {
        const isBookmarked = bookmarkedEvents.includes(eventId);
        const updatedBookmarks = isBookmarked
            ? bookmarkedEvents.filter((id) => id !== eventId)
            : [...bookmarkedEvents, eventId];

        await axios.put('http://192.168.1.218:5002/update-bookmarks', { bookmarkedEventIds: updatedBookmarks });

        setBookmarkedEvents(updatedBookmarks);
        } catch (error) {
        console.error('Error toggling bookmark:', error);
        }
    };

  return (
    <BookmarkContext.Provider value={{ bookmarkedEvents, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
