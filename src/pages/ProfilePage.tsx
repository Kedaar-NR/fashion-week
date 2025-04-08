
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Sidebar from '@/components/Sidebar';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut,
  Camera
} from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    photoURL?: string;
    joinDate?: string;
  } | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Add a join date if not present
        if (!parsedUser.joinDate) {
          parsedUser.joinDate = new Date().toISOString();
          localStorage.setItem('user', JSON.stringify(parsedUser));
        }
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse user data', e);
        toast.error('Failed to load profile data');
        navigate('/signin');
      }
    } else {
      // Redirect to signin if no user found
      toast.error('Please sign in to view your profile');
      navigate('/signin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/signin');
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Unknown date';
    }
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-14 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-40 bg-gradient-to-r from-gray-900 to-gray-700">
              <div className="absolute -bottom-16 left-8">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  {user.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user.name || "User"} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-white text-4xl">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-black rounded-full p-1.5 cursor-pointer hover:bg-gray-800 transition-colors">
                  <Camera size={16} className="text-white" />
                </div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="pt-20 px-8 pb-8">
              <h1 className="text-3xl font-bold">{user.name || "User"}</h1>
              <p className="text-gray-500 mt-1">{user.email || "No email provided"}</p>
              
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>Joined {user.joinDate ? formatDate(user.joinDate) : 'Recently'}</span>
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                  
                  <ScrollArea className="h-[280px] rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <User className="mr-3 text-gray-400 mt-0.5" size={18} />
                        <div>
                          <h3 className="font-medium">Display Name</h3>
                          <p className="text-sm text-gray-600">{user.name || "Not set"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="mr-3 text-gray-400 mt-0.5" size={18} />
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-sm text-gray-600">{user.email || "Not set"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Settings className="mr-3 text-gray-400 mt-0.5" size={18} />
                        <div>
                          <h3 className="font-medium">Account Type</h3>
                          <p className="text-sm text-gray-600">Free Account</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => toast.info('This feature is coming soon')}
                    >
                      <Settings size={16} className="mr-2" />
                      Edit Profile Settings
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => navigate('/liked')}
                    >
                      <User size={16} className="mr-2" />
                      View Your Liked Brands
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left text-red-500 hover:text-red-600 hover:border-red-200"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
