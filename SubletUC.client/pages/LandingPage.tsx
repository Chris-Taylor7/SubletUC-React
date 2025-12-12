import React from 'react';
import { User, Listing } from '../types';
import ListingCard from '../components/ListingCard';
import Button from '../components/Button';
import { ArrowRight, Home, TrendingUp, Users } from 'lucide-react';

interface LandingPageProps {
  user: User | null;
  listings: Listing[];
  onNavigate: (page: string) => void;
  onViewDetails: (id: number) => void;
  onToggleBookmark: (id: number) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
    user, 
    listings, 
    onNavigate, 
    onViewDetails,
    onToggleBookmark 
}) => {
  const recentListings = listings.slice(0, 3);
  const userCreatedListings = user ? listings.filter(l => l.ownerId === user.userId) : [];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-uc-dark text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <img src="https://picsum.photos/seed/cincy/1920/1080" className="w-full h-full object-cover" alt="Background"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-uc-dark to-uc-purple/50"></div>
        
        <div className="relative max-w-7xl mx-auto z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Find Your Home Away From Home <br />
            <span className="text-uc-red">at UC</span>
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mb-10">
            The easiest way for students to find and sublet housing for the semester. 
            Secure, reliable, and built just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => onNavigate('search')}>
              Browse Listings
            </Button>
            <Button size="lg" variant="black" onClick={() => onNavigate(user ? 'create' : 'auth')}>
              Post a Sublet
              
            </Button>
          </div>
        </div>
      </div>

      {/* Stats / Metadata Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center border-l-4 border-uc-red">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                    <Home className="text-uc-red" size={24}/>
                </div>
                <div>
                    <p className="text-2xl font-bold text-uc-dark">500+</p>
                    <p className="text-sm text-gray-500">Active Listings</p>
                </div>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-lg flex items-center border-l-4 border-uc-purple">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                    <Users className="text-uc-purple" size={24}/>
                </div>
                <div>
                    <p className="text-2xl font-bold text-uc-dark">1,200+</p>
                    <p className="text-sm text-gray-500">Student Users</p>
                </div>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-lg flex items-center border-l-4 border-yellow-500">
                <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <TrendingUp className="text-yellow-600" size={24}/>
                </div>
                <div>
                    <p className="text-2xl font-bold text-uc-dark">98%</p>
                    <p className="text-sm text-gray-500">Match Rate</p>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* User Specific Section */}
        {user && (
            <div className="mb-16">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-bold text-uc-dark">Your Activity</h2>
                    <button onClick={() => onNavigate('profile')} className="text-uc-purple font-medium hover:underline text-sm flex items-center">
                        Go to Profile <ArrowRight size={16} className="ml-1"/>
                    </button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-8">
                         <div className="flex-1">
                             <h3 className="font-semibold text-lg mb-4">Your Posted Listings</h3>
                             {userCreatedListings.length > 0 ? (
                                <div className="space-y-3">
                                    {userCreatedListings.map(l => (
                                        <div key={l.listingId} className="flex items-center bg-white p-3 rounded shadow-sm border border-gray-100">
                                            <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden mr-3">
                                                 <img src={l.photos?.[0]} className="w-full h-full object-cover"/>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{l.address}</p>
                                                <p className="text-xs text-gray-500">${l.rent}/mo • {l.listingType}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                                <span className="text-xs text-gray-400">Active</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             ) : (
                                 <div className="text-center py-8 bg-white rounded border border-dashed border-gray-300">
                                     <p className="text-gray-500 mb-3">You haven't posted any listings yet.</p>
                                     <Button size="sm" onClick={() => onNavigate('create')}>Create Listing</Button>
                                 </div>
                             )}
                         </div>
                         <div className="w-px bg-gray-200 hidden md:block"></div>
                         <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white p-4 rounded shadow-sm">
                                      <p className="text-gray-500 text-xs uppercase font-bold">Total Views</p>
                                      <p className="text-xl font-bold text-uc-purple mt-1">124</p>
                                  </div>
                                  <div className="bg-white p-4 rounded shadow-sm">
                                      <p className="text-gray-500 text-xs uppercase font-bold">Messages</p>
                                      <p className="text-xl font-bold text-uc-purple mt-1">3</p>
                                  </div>
                                  <div className="bg-white p-4 rounded shadow-sm">
                                      <p className="text-gray-500 text-xs uppercase font-bold">Saved By</p>
                                      <p className="text-xl font-bold text-uc-purple mt-1">15 Users</p>
                                  </div>
                              </div>
                         </div>
                    </div>
                </div>
            </div>
        )}

        {/* Recently Viewed / Trending */}
        <div>
           <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-uc-dark">Recently Added</h2>
              <button onClick={() => onNavigate('search')} className="text-uc-red font-medium hover:underline flex items-center">
                  View all listings <ArrowRight size={16} className="ml-1"/>
              </button>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.map(listing => (
                  <ListingCard 
                    key={listing.listingId} 
                    listing={listing} 
                    isBookmarked={user?.bookmarkedListingIds.includes(listing.listingId) || false}
                    onToggleBookmark={onToggleBookmark}
                    onViewDetails={onViewDetails}
                  />
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;