import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserIcon, 
  EnvelopeIcon, 
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+225 0123456789',
    country: 'Côte d\'Ivoire',
    timezone: 'Africa/Abidjan',
    language: 'English'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketAlerts: true,
    newsUpdates: true,
    weeklyReports: true,
    darkMode: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'preferences', name: 'Preferences', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'subscription', name: 'Subscription', icon: CreditCardIcon },
  ];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={profileData.country}
                    onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                    className="input-field"
                  >
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Cameroon">Cameroon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                    className="input-field"
                  >
                    <option value="Africa/Abidjan">Africa/Abidjan (GMT+0)</option>
                    <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                    <option value="Africa/Accra">Africa/Accra (GMT+0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={profileData.language}
                    onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                    className="input-field"
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Portuguese">Portuguese</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.smsNotifications}
                    onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Market Alerts</h3>
                  <p className="text-sm text-gray-500">Get notified about significant market movements</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketAlerts}
                    onChange={(e) => handlePreferenceChange('marketAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">News Updates</h3>
                  <p className="text-sm text-gray-500">Receive daily news summaries</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.newsUpdates}
                    onChange={(e) => handlePreferenceChange('newsUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Weekly Reports</h3>
                  <p className="text-sm text-gray-500">Receive weekly portfolio performance reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.weeklyReports}
                    onChange={(e) => handlePreferenceChange('weeklyReports', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="input-field"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="input-field"
                  />
                </div>
                <button className="btn-primary mt-4">Update Password</button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                <button className="btn-secondary">Enable 2FA</button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Active Sessions</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Current Session</p>
                      <p className="text-sm text-gray-500">Windows 10 • Chrome • Abidjan, CI</p>
                    </div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Subscription & Billing</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Free Plan</h3>
                    <p className="text-sm text-gray-500">Basic access to market data and news</p>
                  </div>
                  <span className="text-sm text-gray-500">Current Plan</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Basic market data access</li>
                  <li>• Limited news articles</li>
                  <li>• Basic portfolio tracking</li>
                </ul>
              </div>

              <div className="border border-primary-200 rounded-lg p-6 bg-primary-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Premium Plan</h3>
                    <p className="text-sm text-gray-500">Advanced analytics and unlimited access</p>
                  </div>
                  <span className="text-sm font-medium text-primary-600">$29/month</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Unlimited market data access</li>
                  <li>• Advanced analytics tools</li>
                  <li>• Real-time alerts</li>
                  <li>• Priority customer support</li>
                </ul>
                <button className="btn-primary">Upgrade to Premium</button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500">No payment method on file</p>
                  <button className="btn-secondary mt-2">Add Payment Method</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 