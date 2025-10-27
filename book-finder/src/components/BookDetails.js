import React from 'react';
import './BookDetails.css';

const BookDetails = ({ book, onClose, onToggleFavorite, isFavorite }) => {
  if (!book) return null;

  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        <div className="book-details">
          <div className="book-details-image">
            <img
              src={thumbnail}
              alt={volumeInfo.title}
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

          <div className="book-details-info">
            <h2 className="book-title">{volumeInfo.title}</h2>

            <div className="book-meta">
              <p><strong>Author(s):</strong> {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</p>
              <p><strong>Published:</strong> {volumeInfo.publishedDate ? new Date(volumeInfo.publishedDate).getFullYear() : 'N/A'}</p>
              <p><strong>Pages:</strong> {volumeInfo.pageCount || 'N/A'}</p>
              <p><strong>Language:</strong> {volumeInfo.language ? volumeInfo.language.toUpperCase() : 'N/A'}</p>
              {volumeInfo.categories && (
                <p><strong>Categories:</strong> {volumeInfo.categories.join(', ')}</p>
              )}
              {volumeInfo.averageRating && (
                <p><strong>Rating:</strong> {volumeInfo.averageRating}/5 ({volumeInfo.ratingsCount} ratings)</p>
              )}
            </div>

            {volumeInfo.description && (
              <div className="book-description">
                <h3>Description</h3>
                <p>{volumeInfo.description}</p>
              </div>
            )}

            <div className="book-links">
              {volumeInfo.previewLink && (
                <a href={volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" className="preview-link">
                  Preview on Google Books
                </a>
              )}
              {volumeInfo.infoLink && (
                <a href={volumeInfo.infoLink} target="_blank" rel="noopener noreferrer" className="info-link">
                  More Info
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
