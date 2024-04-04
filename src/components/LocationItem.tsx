import React from 'react';
import { LocationItemProps } from '../utils/type';

const LocationItem: React.FC<LocationItemProps> = ({ location, onRemoveLocation }) => {
  return (
    // Container for each location item
    <div className='flex flex-row justify-between align-center bg-white p-1 rounded cursor-pointer hover:bg-gray-100 border border-slate-200 hover:border-indigo-300'>
      {/* Display latitude and longitude */}
      <span className='text-left'>Latitude: {location.latlng.lat} <br /> Longitude: {location.latlng.lng}</span>
      {/* Button to remove the location */}
      <button className='p-2 font-semibold text-sm bg-gray-500 text-white rounded-none shadow-sm' onClick={() => onRemoveLocation(location.id)}>Remove</button>
    </div>
  );
};

export default LocationItem;
