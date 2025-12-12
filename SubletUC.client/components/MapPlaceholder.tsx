import React from 'react';
import { Listing } from '../types';
import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  listings: Listing[];
  onListingSelect: (id: number) => void;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ listings, onListingSelect }) => {
  // Simple deterministic pseudo-random position based on ID for demo purposes
  const getPosition = (id: number) => {
    const x = (id * 137) % 90 + 5; // 5% to 95%
    const y = (id * 293) % 80 + 10; // 10% to 90%
    return { top: `${y}%`, left: `${x}%` };
  };

  return (
    <div className="w-full h-full bg-blue-50 relative overflow-hidden rounded-lg border border-blue-100 group">
      {/* Background patterns to simulate streets/blocks */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{ 
              backgroundImage: 'linear-gradient(#564A7F 1px, transparent 1px), linear-gradient(90deg, #564A7F 1px, transparent 1px)',
              backgroundSize: '40px 40px'
          }}></div>
          <div className="absolute top-1/2 left-0 right-0 h-4 bg-yellow-200/50 -rotate-3 transform origin-left"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-gray-300/50 rotate-12 transform origin-top"></div>
      </div>

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-md shadow-sm z-10">
        <p className="text-xs font-semibold text-uc-dark">Interactive Map View</p>
        <p className="text-[10px] text-gray-500">Displaying {listings.length} properties</p>
      </div>

      {listings.map((listing) => (
        <button
          key={listing.listingId}
          className="absolute transform -translate-x-1/2 -translate-y-full group/pin focus:outline-none transition-all duration-300 hover:scale-110 z-20"
          style={getPosition(listing.listingId)}
          onClick={() => onListingSelect(listing.listingId)}
        >
          <MapPin size={32} className="text-uc-red drop-shadow-md" fill="currentColor" />
          <div className="hidden group-hover/pin:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-white text-xs p-2 rounded shadow-lg whitespace-nowrap z-30 pointer-events-none">
             <p className="font-bold">${listing.rent}</p>
             <p>{listing.address}</p>
          </div>
        </button>
      ))}
      
      <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow text-[10px] text-gray-400">
         © SubletUC Maps
      </div>
    </div>
  );
};

export default MapPlaceholder;