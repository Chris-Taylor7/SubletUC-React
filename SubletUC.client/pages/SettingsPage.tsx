import React from 'react';
import Button from '../components/Button';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
       <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
       
       <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="text-sm font-medium text-gray-700">Email Alerts</p>
                          <p className="text-xs text-gray-500">Get emails about new listings that match your criteria</p>
                      </div>
                      <input type="checkbox" className="toggle-checkbox h-6 w-10" defaultChecked />
                  </div>
                   <div className="flex items-center justify-between">
                      <div>
                          <p className="text-sm font-medium text-gray-700">Message Notifications</p>
                          <p className="text-xs text-gray-500">Get notified when an owner replies</p>
                      </div>
                      <input type="checkbox" className="toggle-checkbox h-6 w-10" defaultChecked />
                  </div>
              </div>
          </div>

          {/* Privacy */}
          <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy</h2>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <div>
                          <p className="text-sm font-medium text-gray-700">Profile Visibility</p>
                          <p className="text-xs text-gray-500">Make your profile visible to other users</p>
                      </div>
                       <select className="text-sm border-gray-300 rounded p-1">
                           <option>Public</option>
                           <option>Logged-in Users Only</option>
                           <option>Private</option>
                       </select>
                  </div>
              </div>
          </div>

          <div className="flex justify-end">
              <Button>Save Changes</Button>
          </div>
       </div>
    </div>
  );
};

export default SettingsPage;