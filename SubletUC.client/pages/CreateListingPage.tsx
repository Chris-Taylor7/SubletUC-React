import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { ListingType } from '../types';

interface CreateListingPageProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const CreateListingPage: React.FC<CreateListingPageProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
      address: '',
      city: 'Cincinnati',
      state: 'OH',
      zipCode: '',
      rent: '',
      listingType: ListingType.Apartment,
      bedrooms: '',
      bathrooms: '',
      description: '',
      water: false,
      gas: false,
      internet: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Simple handling for checkboxes vs text
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-uc-red text-white">
            <h1 className="text-2xl font-bold">Post a Sublet Listing</h1>
            <p className="opacity-90 text-sm">Fill out the details below to help students find your place.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Section 1: Location */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                         <Input label="Address" name="address" required value={formData.address} onChange={handleChange} placeholder="123 Main St" />
                    </div>
                    <Input label="City" name="city" required value={formData.city} onChange={handleChange} />
                    <Input label="State" name="state" required value={formData.state} onChange={handleChange} />
                    <Input label="Zip Code" name="zipCode" required value={formData.zipCode} onChange={handleChange} placeholder="45219" />
                </div>
            </div>

            {/* Section 2: Details */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select name="listingType" value={formData.listingType} onChange={handleChange} className="w-full border-gray-300 rounded-md border shadow-sm px-3 py-2">
                            {Object.values(ListingType).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <Input label="Rent ($/mo)" name="rent" type="number" required value={formData.rent} onChange={handleChange} placeholder="800" />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Bedrooms" name="bedrooms" type="number" required value={formData.bedrooms} onChange={handleChange} />
                        <Input label="Bathrooms" name="bathrooms" type="number" required value={formData.bathrooms} onChange={handleChange} />
                    </div>
                </div>
            </div>

             {/* Section 3: Amenities */}
             <div>
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">Utilities Included</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="water" checked={formData.water} onChange={handleChange} className="rounded text-uc-red focus:ring-uc-red" />
                        <span className="text-gray-700">Water</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="gas" checked={formData.gas} onChange={handleChange} className="rounded text-uc-red focus:ring-uc-red" />
                        <span className="text-gray-700">Gas</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="internet" checked={formData.internet} onChange={handleChange} className="rounded text-uc-red focus:ring-uc-red" />
                        <span className="text-gray-700">Internet</span>
                    </label>
                </div>
             </div>

             {/* Section 4: Description */}
             <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                 <textarea 
                    name="description" 
                    rows={4} 
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-uc-red focus:border-uc-red"
                    placeholder="Tell us about the property, roommates, and lease terms..."
                    value={formData.description}
                    onChange={handleChange}
                 ></textarea>
             </div>

             {/* Actions */}
             <div className="pt-4 flex justify-end gap-3">
                 <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                 <Button type="submit">Post Listing</Button>
             </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;