import { useState, useEffect } from 'react';
import { User, Mail, FileText, Save } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getProfile, updateProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        email: data.email,
        bio: data.bio || '',
        avatar: data.avatar || '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const { data } = await updateProfile(formData);
      setProfile(data);
      setEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Update local storage with new name
      localStorage.setItem('userName', data.name);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded ${
              message.type === 'success'
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="card">
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
              <p className="text-gray-600">{profile?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(profile?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <User size={18} />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!editing}
                className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Mail size={18} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!editing}
                className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <FileText size={18} />
                <span>Bio</span>
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!editing}
                className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
                rows="4"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              {editing ? (
                <>
                  <button type="submit" className="btn-primary flex items-center space-x-2">
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        name: profile.name,
                        email: profile.email,
                        bio: profile.bio || '',
                        avatar: profile.avatar || '',
                      });
                      setMessage({ type: '', text: '' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Stats Card */}
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600 mt-1">Total Tasks</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600 mt-1">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;