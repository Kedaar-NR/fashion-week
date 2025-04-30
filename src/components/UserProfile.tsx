
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Settings, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/lib/supabaseClient";

interface UserProfileProps {
  className?: string;
}

const UserProfile = ({ className = "" }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ id?: string; email?: string; name?: string; avatar_url?: string; } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data', e);
        setUser(null);
      }
    }

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
          avatar_url: session.user.user_metadata?.avatar_url,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('user');
        setUser(null);
      }
    });

    // Handle clicks outside dropdown to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('user');
      setUser(null);
      setIsOpen(false);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error('Failed to log out: ' + error.message);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
        aria-label="Open user profile"
      >
        <Avatar className="h-9 w-9 border-2 border-gray-100 hover:border-gray-300 transition-colors">
          {user.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt={user.name || "User"} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  {user.avatar_url ? (
                    <AvatarImage src={user.avatar_url} alt={user.name || "User"} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email || "No email"}</p>
                </div>
              </div>
            </div>
            
            <div className="px-2 py-2 space-y-1">
              <button 
                className="flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/profile');
                }}
              >
                <User size={16} className="mr-3 text-gray-500" />
                <span>My Profile</span>
              </button>
              
              <button 
                className="flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/liked');
                }}
              >
                <Heart size={16} className="mr-3 text-gray-500" />
                <span>Liked Brands</span>
              </button>
              
              <button 
                className="flex items-center w-full px-3 py-2 text-sm text-left rounded-md hover:bg-gray-100"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings');
                }}
              >
                <Settings size={16} className="mr-3 text-gray-500" />
                <span>Settings</span>
              </button>
            </div>
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button 
                className="flex items-center w-full px-3 py-2 text-sm text-left text-red-600 rounded-md hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-3" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;
