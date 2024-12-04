import { Autocomplete } from '@react-google-maps/api';
import React from 'react';

interface SearchBoxProps {
  onLoad: (autocomplete: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onLoad, onPlaceChanged }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="장소 검색..."
          className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
        />
      </Autocomplete>
    </div>
  );
};

export default SearchBox; 