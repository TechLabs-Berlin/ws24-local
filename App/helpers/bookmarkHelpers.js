import axios from "axios";

export   const toggleBookmark = async (newId, bookmarkedEvents) => {
    let bookmarksIds = bookmarkedEvents.map(e => e.id);
    const isBookmarked = bookmarksIds.includes(newId);
    if (isBookmarked) {
      bookmarksIds = bookmarksIds.filter(id => id !== newId);
    } else{
      bookmarksIds.push(newId);
    }
    try {
      const response = await axios.put('http://192.168.1.218:5002/update-bookmarks', { bookmarkedEventIds: bookmarksIds });
      console.log('Updating bookmarked events with IDs:', bookmarksIds);
      console.log('Updated event ids from server', response.data.map(e => e.id));
      return(response.data);
    } catch (err) {
      console.error('Error updating bookmarked events:', err);
      throw err;
    }
  };