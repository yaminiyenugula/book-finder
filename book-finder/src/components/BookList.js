import React from 'react';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ books, onViewDetails, onToggleFavorite, favorites, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="book-list">
        <div className="loading">Searching for books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-list">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="book-list">
        <div className="no-results">No books found. Try a different search term.</div>
      </div>
    );
  }

  return (
    <div className="book-list">
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.some(fav => fav.id === book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
