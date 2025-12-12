import React from 'react';
import { Listing } from '../types';
import ListingCard from '../components/ListingCard';
import { Bookmark } from 'lucide-react';

interface SavedListingsPageProps {
  listings: Listing[];
  userBookmarks: number[];
  onToggleBookmark: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const SavedListingsPage: React.FC<SavedListingsPageProps> = ({ listings, userBookmarks, onToggleBookmark, onViewDetails }) => {
  const savedListings = listings.filter(l => userBookmarks.includes(l.listingId));

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8 border-b pb-4">
          <div className="bg-uc-red/10 p-3 rounded-full mr-4">
             <Bookmark className="text-uc-red" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Listings</h1>
            <p className="text-gray-500 mt-1">Manage the properties you're interested in.</p>
          </div>
      </div>

      {savedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedListings.map(listing => (
            <ListingCard 
              key={listing.listingId} 
              listing={listing}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
           <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
           <h3 className="text-lg font-medium text-gray-900">No saved listings yet</h3>
           <p className="text-gray-500 mt-2">Start browsing and save places you like!</p>
        </div>
      )}
    </div>
  );
};

export default SavedListingsPage;