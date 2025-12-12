import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import CreateListingPage from './pages/CreateListingPage';
import SavedListingsPage from './pages/SavedListingsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import ListingDetailsModal from './components/ListingDetailsModal';
import { User, Listing } from './types';
import { MOCK_LISTINGS } from './constants';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [viewingListingId, setViewingListingId] = useState<number | null>(null);

  // Helper to get bookmark IDs for current user (or empty if logged out)
  const [localBookmarks, setLocalBookmarks] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
        setLocalBookmarks(user.bookmarkedListingIds);
    } else {
        setLocalBookmarks([]);
    }
  }, [user]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setViewingListingId(null);
    window.scrollTo(0, 0);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    handleNavigate('landing');
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('landing');
  };

  const handleCreateListing = (data: any) => {
    const newId = Math.max(...listings.map(l => l.listingId)) + 1;
    const newListing: Listing = {
        ...data,
        listingId: newId,
        ownerId: user?.userId || 0,
        photos: ["https://picsum.photos/seed/new/800/600"], // Placeholder
        distanceFromCampus: 2.0, // Mock
        rent: Number(data.rent),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        bookmarkedByIds: []
    };
    setListings([newListing, ...listings]);
    handleNavigate('landing');
  };

  const handleToggleBookmark = (id: number) => {
    if (!user) {
        handleNavigate('auth');
        return;
    }

    if (localBookmarks.includes(id)) {
        setLocalBookmarks(prev => prev.filter(bId => bId !== id));
        // In a real app, update user object and backend
        setUser({ ...user, bookmarkedListingIds: user.bookmarkedListingIds.filter(bId => bId !== id) });
    } else {
        setLocalBookmarks(prev => [...prev, id]);
        setUser({ ...user, bookmarkedListingIds: [...user.bookmarkedListingIds, id] });
    }
  };

  const handleViewDetails = (id: number) => {
      setViewingListingId(id);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
            <LandingPage 
                user={user} 
                listings={listings} 
                onNavigate={handleNavigate}
                onViewDetails={handleViewDetails}
                onToggleBookmark={handleToggleBookmark}
            />
        );
      case 'search':
        return (
            <SearchPage 
                listings={listings} 
                userBookmarks={localBookmarks}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={handleViewDetails}
            />
        );
      case 'create':
        return user ? (
            <CreateListingPage 
                onCancel={() => handleNavigate('landing')} 
                onSubmit={handleCreateListing}
            />
        ) : <AuthPage onLogin={handleLogin} />;
      case 'saved':
        return user ? (
            <SavedListingsPage 
                listings={listings} 
                userBookmarks={localBookmarks}
                onToggleBookmark={handleToggleBookmark}
                onViewDetails={handleViewDetails}
            />
        ) : <AuthPage onLogin={handleLogin} />;
      case 'profile':
        return user ? <ProfilePage user={user} /> : <AuthPage onLogin={handleLogin} />;
      case 'settings':
        return user ? <SettingsPage /> : <AuthPage onLogin={handleLogin} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} />;
      default:
        return <LandingPage user={user} listings={listings} onNavigate={handleNavigate} onViewDetails={handleViewDetails} onToggleBookmark={handleToggleBookmark} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        user={user} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      {/* Modal is rendered at the root level so it overlays everything */}
      <ListingDetailsModal 
        listing={listings.find(l => l.listingId === viewingListingId) || null}
        isOpen={viewingListingId !== null}
        onClose={() => setViewingListingId(null)}
      />

      <footer className="bg-uc-dark text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <p>&copy; 2024 SubletUC. Built for students.</p>
          </div>
      </footer>
    </div>
  );
}

export default App;