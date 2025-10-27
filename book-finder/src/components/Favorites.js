import React from 'react';
import BookCard from './BookCard';
import './Favorites.css';

const Favorites = ({ favorites, onViewDetails, onToggleFavorite }) => {
  return (
    <div className="favorites">
      <h2 className="favorites-title">My Favorite Books</h2>
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any favorite books yet.</p>
          <p>Search for books and click the heart icon to add them to your favorites!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onViewDetails={onViewDetails}
              onToggleFavorite={onToggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
