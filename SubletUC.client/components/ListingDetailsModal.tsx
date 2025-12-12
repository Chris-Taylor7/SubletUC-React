import React from 'react';
import { Listing, getAnimalsAllowedText, getParkingText, getWasherDryerText } from '../types';
import { X, MapPin, Calendar, User, Check, X as XIcon, Mail, Phone, Share2, Heart } from 'lucide-react';
import Button from './Button';

interface ListingDetailsModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

const ListingDetailsModal: React.FC<ListingDetailsModalProps> = ({ listing, isOpen, onClose }) => {
  if (!isOpen || !listing) return null;

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const UtilityBadge = ({ included, label }: { included: boolean; label: string }) => (
    <div className={`flex items-center text-sm ${included ? 'text-green-700' : 'text-gray-400'}`}>
      {included ? <Check size={14} className="mr-1" /> : <XIcon size={14} className="mr-1" />}
      <span className={included ? 'font-medium' : 'line-through'}>{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl max-h-[90vh] flex flex-col">
          
          {/* Header / Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="rounded-full bg-white/90 p-2 text-gray-500 hover:bg-white hover:text-uc-red focus:outline-none shadow-sm transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1">
            {/* Image Header */}
            <div className="h-64 sm:h-80 w-full bg-gray-200 relative">
               {listing.photos && listing.photos.length > 0 ? (
                 <img 
                   src={listing.photos[0]} 
                   alt={listing.address} 
                   className="h-full w-full object-cover"
                 />
               ) : (
                 <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                    No Image Available
                 </div>
               )}
               <div className="absolute bottom-4 left-4 flex gap-2">
                 <span className="bg-uc-purple text-white px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                   ${listing.rent}/mo
                 </span>
                 <span className="bg-white/90 text-uc-dark px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                   {listing.listingType}
                 </span>
               </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{listing.address}</h2>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={18} className="mr-1 text-uc-red" />
                      <span>{listing.city}, {listing.state} {listing.zipCode}</span>
                      <span className="mx-2">•</span>
                      <span>{listing.distanceFromCampus} miles from campus</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 py-4 border-y border-gray-100">
                      <div className="text-center px-4 border-r border-gray-200 last:border-0">
                        <span className="block font-bold text-xl text-uc-dark">{listing.bedrooms}</span>
                        <span className="text-xs text-gray-500 uppercase">Bedrooms</span>
                      </div>
                      <div className="text-center px-4 border-r border-gray-200 last:border-0">
                        <span className="block font-bold text-xl text-uc-dark">{listing.bathrooms}</span>
                        <span className="text-xs text-gray-500 uppercase">Bathrooms</span>
                      </div>
                      <div className="text-center px-4 border-r border-gray-200 last:border-0">
                         <span className="block font-bold text-xl text-uc-dark">{listing.furnished ? 'Yes' : 'No'}</span>
                         <span className="text-xs text-gray-500 uppercase">Furnished</span>
                      </div>
                      <div className="text-center px-4">
                         <span className="block font-bold text-xl text-uc-dark">{listing.roommateNumber}</span>
                         <span className="text-xs text-gray-500 uppercase">Roommates</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {listing.description || "No description provided."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities & Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                       <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Details</p>
                          <div className="space-y-2 text-sm text-gray-700">
                             <div className="flex justify-between">
                               <span>Pets:</span>
                               <span className="font-medium">{getAnimalsAllowedText(listing.animalsAllowed)}</span>
                             </div>
                             <div className="flex justify-between">
                               <span>Parking:</span>
                               <span className="font-medium">{getParkingText(listing.parking)}</span>
                             </div>
                             <div className="flex justify-between">
                               <span>Laundry:</span>
                               <span className="font-medium">{getWasherDryerText(listing.washerDryer)}</span>
                             </div>
                          </div>
                       </div>
                       <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Utilities Included</p>
                          <div className="grid grid-cols-2 gap-2">
                             <UtilityBadge included={listing.waterIncludedInRent} label="Water" />
                             <UtilityBadge included={listing.electricIncludedInRent} label="Electric" />
                             <UtilityBadge included={listing.internetIncludedInRent} label="Internet" />
                             <UtilityBadge included={listing.gasIncludedInRent} label="Gas" />
                             <UtilityBadge included={listing.trashIncludedInRent} label="Trash" />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Avg. Utility Cost: ${listing.averageUtilitiesCost}/mo</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Info - Right Column */}
                <div className="space-y-6">
                   <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                      <h3 className="font-semibold text-lg mb-4">Availability</h3>
                      <div className="space-y-4">
                          <div className="flex items-start">
                             <Calendar className="text-uc-red mt-0.5 mr-3" size={18} />
                             <div>
                                <p className="text-sm text-gray-500">Available From</p>
                                <p className="font-medium">{listing.startAvailability ? new Date(listing.startAvailability).toLocaleDateString() : 'ASAP'}</p>
                             </div>
                          </div>
                          <div className="flex items-start">
                             <Calendar className="text-uc-red mt-0.5 mr-3" size={18} />
                             <div>
                                <p className="text-sm text-gray-500">Available Until</p>
                                <p className="font-medium">{listing.endAvailability ? new Date(listing.endAvailability).toLocaleDateString() : 'Negotiable'}</p>
                             </div>
                          </div>
                      </div>
                   </div>

                   <div className="bg-uc-gray rounded-xl p-6 border border-gray-200">
                      <h3 className="font-semibold text-lg mb-4">Contact Owner</h3>
                      <div className="flex items-center mb-6">
                          <div className="h-10 w-10 rounded-full bg-uc-purple flex items-center justify-center text-white font-bold text-lg mr-3">
                              {listing.contactName ? listing.contactName.charAt(0) : 'U'}
                          </div>
                          <div>
                              <p className="font-medium text-gray-900">{listing.contactName || 'University Student'}</p>
                              <p className="text-xs text-gray-500">Property Owner</p>
                          </div>
                      </div>
                      
                      <div className="space-y-3">
                         {listing.contactMethod?.includes('Email') || true ? (
                            <Button className="w-full flex items-center justify-center">
                                <Mail size={16} className="mr-2" /> Email Owner
                            </Button>
                         ) : null}
                         <Button variant="outline" className="w-full flex items-center justify-center bg-white">
                             <Phone size={16} className="mr-2" /> Show Number
                         </Button>
                      </div>
                      
                      <p className="text-xs text-center text-gray-500 mt-4">
                         Mention <strong>SubletUC</strong> when contacting.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse gap-2 border-t border-gray-200">
            <Button onClick={onClose}>Close</Button>
            <Button variant="outline" className="hidden sm:flex items-center bg-white">
                <Share2 size={16} className="mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsModal;