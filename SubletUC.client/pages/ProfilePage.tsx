import React from 'react';
import { User } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import { Camera, User as UserIcon } from 'lucide-react';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white shadow rounded-lg overflow-hidden">
             <div className="h-32 bg-gradient-to-r from-uc-red to-uc-purple"></div>
             
             <div className="relative px-6 pb-6">
                 <div className="flex flex-col sm:flex-row items-center">
                     <div className="-mt-12 relative group">
                         <img 
                            src={user.profilePicture || "https://picsum.photos/200"} 
                            alt={user.firstName}
                            className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white"
                         />
                         <button className="absolute bottom-0 right-0 p-2 bg-uc-dark text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                             <Camera size={16}/>
                         </button>
                     </div>
                     <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                         <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                         <p className="text-gray-500">{user.email}</p>
                     </div>
                     <div className="mt-4 sm:mt-0 sm:ml-auto">
                         <Button variant="outline" size="sm">Edit Profile</Button>
                     </div>
                 </div>

                 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-2 space-y-6">
                         <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                             <h3 className="text-lg font-medium text-uc-dark mb-4 flex items-center">
                                 <UserIcon size={20} className="mr-2"/> Personal Information
                             </h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <Input label="First Name" defaultValue={user.firstName} readOnly className="bg-white"/>
                                 <Input label="Last Name" defaultValue={user.lastName} readOnly className="bg-white"/>
                                 <Input label="Email" defaultValue={user.email} readOnly className="bg-white sm:col-span-2"/>
                                 <div className="sm:col-span-2">
                                     <label className="block text-sm font-medium text-uc-dark mb-1">Bio</label>
                                     <textarea className="w-full border border-gray-300 rounded-md p-2 bg-white h-24 text-sm" placeholder="Tell potential roommates about yourself..."></textarea>
                                 </div>
                             </div>
                         </div>
                     </div>
                     
                     <div className="space-y-6">
                         <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                             <h3 className="font-semibold text-gray-900 mb-4">Verification Status</h3>
                             <div className="space-y-3">
                                 <div className="flex items-center justify-between text-sm">
                                     <span className="text-gray-600">Email Confirmed</span>
                                     <span className="text-green-600 font-medium">Verified</span>
                                 </div>
                                 <div className="flex items-center justify-between text-sm">
                                     <span className="text-gray-600">Student ID</span>
                                     <span className="text-green-600 font-medium">Verified</span>
                                 </div>
                             </div>
                             <Button variant="secondary" className="w-full mt-6" size="sm">Request Verification</Button>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};

export default ProfilePage;