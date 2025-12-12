import React from 'react';
import { Listing, getAnimalsAllowedText } from '../types';
import { MapPin, BedDouble, Bath, Home, Bookmark } from 'lucide-react';
import Button from './Button';

interface ListingCardProps {
  listing: Listing;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, isBookmarked, onToggleBookmark, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative h-48 bg-gray-200">
        {listing.photos && listing.photos.length > 0 ? (
          <img 
            src={listing.photos[0]} 
            alt={listing.address} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            <Home size={48} />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(listing.listingId); }}
            className={`p-2 rounded-full ${isBookmarked ? 'bg-uc-red text-white' : 'bg-white/80 text-uc-dark hover:bg-white'}`}
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute bottom-2 left-2">
           <span className="bg-uc-purple/90 text-white text-xs px-2 py-1 rounded-md font-semibold">
              ${listing.rent}/mo
           </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <h3 className="text-lg font-bold text-uc-dark line-clamp-1">{listing.address}</h3>
           <span className="text-xs text-gray-500 border border-gray-200 px-1 rounded">{listing.listingType}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={14} className="mr-1 text-uc-red" />
          <span className="truncate">{listing.city}, {listing.state} • {listing.distanceFromCampus} mi from campus</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <BedDouble size={16} className="mr-2 text-uc-purple" />
            <span>{listing.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-2 text-uc-purple" />
            <span>{listing.bathrooms} Baths</span>
          </div>
        </div>

        <div className="mt-auto">
            <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                {listing.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
                 <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{getAnimalsAllowedText(listing.animalsAllowed)}</span>
                 {listing.furnished && <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Furnished</span>}
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => onViewDetails(listing.listingId)}>
                View Details
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;