import React from 'react';
import LocationItem from './LocationItem';
import { LocationListProps } from '../utils/type';

const LocationList: React.FC<LocationListProps> = ({ locations, onRemoveLocation, setSidebar }) => {
  return (
    <div className="relative z-[1000]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      {/* Main Container */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Panel */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* Panel Content */}
            <div className="pointer-events-auto relative w-screen max-w-md">
              {/* Close Button */}
              <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                <button
                  onClick={() => setSidebar(false)}
                  type="button"
                  className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="absolute -inset-2.5"></span>
                  <span className="sr-only">Close panel</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Panel Body */}
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                {/* Panel Title */}
                <div className="px-4 sm:px-6">
                  <h2 className="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">Manage Saved Locations</h2>
                </div>
                {/* List of Locations */}
                <div className="relative mt-4 pt-2 flex-1 overflow-auto px-4 sm:px-2 flex flex-col gap-1 border-t border-gray-200">
                  {locations.map((location: any) => (
                    <LocationItem key={location.id} location={location} onRemoveLocation={onRemoveLocation} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;
