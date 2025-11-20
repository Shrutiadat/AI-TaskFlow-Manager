import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
              TaskApp
            </Link>
          </div>

          {token && (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                  location.pathname === '/dashboard'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                  location.pathname === '/profile'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {userName}!</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
