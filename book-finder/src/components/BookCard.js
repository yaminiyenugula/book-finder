import React from 'react';
import './BookCard.css';

const BookCard = ({ book, onViewDetails, onToggleFavorite, isFavorite }) => {
  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image';

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img
          src={thumbnail}
          alt={volumeInfo.title}
          className="book-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/128x192?text=No+Image';
          }}
        />
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(book)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="book-info">
        <h3 className="book-title">{volumeInfo.title}</h3>
        <p className="book-author">
          {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
        </p>
        <p className="book-published">
          {volumeInfo.publishedDate ? new Date(volumeInfo.publishedDate).getFullYear() : 'N/A'}
        </p>
        <button className="view-details-button" onClick={() => onViewDetails(book)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;
