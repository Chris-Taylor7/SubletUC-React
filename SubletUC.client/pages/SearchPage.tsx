import React, { useState, useMemo } from 'react';
import { Listing, ListingType } from '../types';
import ListingCard from '../components/ListingCard';
import MapPlaceholder from '../components/MapPlaceholder';
import Button from '../components/Button';
import Input from '../components/Input';
import { Filter, Map as MapIcon, Grid, Search, X } from 'lucide-react';

interface SearchPageProps {
  listings: Listing[];
  userBookmarks: number[];
  onToggleBookmark: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ 
    listings, 
    userBookmarks, 
    onToggleBookmark, 
    onViewDetails 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ListingType | 'All'>('All');
  const [maxRent, setMaxRent] = useState<number>(2000);
  const [minBedrooms, setMinBedrooms] = useState<number>(0);

  const filteredListings = useMemo(() => {
    return listings.filter(l => {
        const matchesSearch = (l.address?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               l.city?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = typeFilter === 'All' || l.listingType === typeFilter;
        const matchesRent = l.rent <= maxRent;
        const matchesBed = l.bedrooms >= minBedrooms;

        return matchesSearch && matchesType && matchesRent && matchesBed;
    });
  }, [listings, searchTerm, typeFilter, maxRent, minBedrooms]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm z-20">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-7xl mx-auto w-full">
                
                <div className="relative w-full md:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search address, city, or zip..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-uc-red focus:border-uc-red outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <Button 
                        variant="outline" 
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center"
                    >
                        <Filter size={18} className="mr-2" /> Filters
                    </Button>
                    <div className="bg-gray-100 rounded-md p-1 flex">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-sm transition-all ${viewMode === 'grid' ? 'bg-white shadow text-uc-red' : 'text-gray-500 hover:text-uc-dark'}`}
                        >
                            <Grid size={20} />
                        </button>
                        <button 
                            onClick={() => setViewMode('map')}
                            className={`p-2 rounded-sm transition-all ${viewMode === 'map' ? 'bg-white shadow text-uc-red' : 'text-gray-500 hover:text-uc-dark'}`}
                        >
                            <MapIcon size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
            {/* Filters Sidebar */}
            <div className={`absolute md:static inset-y-0 left-0 bg-white z-30 w-72 transform transition-transform duration-300 ease-in-out border-r border-gray-200 shadow-xl md:shadow-none p-6 overflow-y-auto ${showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-64 md:block'}`}>
                <div className="flex justify-between items-center mb-6 md:hidden">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button onClick={() => setShowFilters(false)}><X size={24}/></button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Housing Type</label>
                        <select 
                            value={typeFilter} 
                            onChange={(e) => setTypeFilter(e.target.value as any)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-uc-red focus:ring-uc-red py-2 px-3 border"
                        >
                            <option value="All">Any</option>
                            <option value={ListingType.Apartment}>Apartment</option>
                            <option value={ListingType.House}>House</option>
                            <option value={ListingType.Duplex}>Duplex</option>
                        </select>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">Max Rent: ${maxRent}</label>
                         <input 
                            type="range" 
                            min="500" 
                            max="3000" 
                            step="50" 
                            value={maxRent}
                            onChange={(e) => setMaxRent(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-uc-red"
                         />
                         <div className="flex justify-between text-xs text-gray-500 mt-1">
                             <span>$500</span>
                             <span>$3000+</span>
                         </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
                        <div className="flex rounded-md shadow-sm" role="group">
                             {[1, 2, 3, 4].map(num => (
                                 <button
                                    key={num}
                                    type="button"
                                    onClick={() => setMinBedrooms(num === minBedrooms ? 0 : num)}
                                    className={`flex-1 px-4 py-2 text-sm font-medium border first:rounded-l-lg last:rounded-r-lg ${
                                        minBedrooms === num 
                                        ? 'bg-uc-purple text-white border-uc-purple' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                 >
                                    {num}+
                                 </button>
                             ))}
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center mb-4">{filteredListings.length} listings found</p>
                    <Button className="w-full md:hidden" onClick={() => setShowFilters(false)}>Apply Filters</Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden bg-gray-50 relative">
                 {viewMode === 'grid' ? (
                     <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
                        {filteredListings.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredListings.map(listing => (
                                    <ListingCard 
                                        key={listing.listingId} 
                                        listing={listing}
                                        isBookmarked={userBookmarks.includes(listing.listingId)}
                                        onToggleBookmark={onToggleBookmark}
                                        onViewDetails={onViewDetails}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <Search size={48} className="mb-4 text-gray-300" />
                                <p className="text-lg font-medium">No listings found</p>
                                <p className="text-sm">Try adjusting your filters</p>
                            </div>
                        )}
                     </div>
                 ) : (
                     <div className="h-full w-full">
                         <MapPlaceholder 
                            listings={filteredListings} 
                            onListingSelect={onViewDetails} 
                         />
                     </div>
                 )}
            </div>
        </div>
    </div>
  );
};

export default SearchPage;