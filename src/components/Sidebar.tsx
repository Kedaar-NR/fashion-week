
import { Home, Heart, ShoppingBag, ChevronLeft, ChevronRight, LogIn, LogOut, Private } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { toast } from "sonner";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<{ email?: string, name?: string, photoURL?: string } | null>(null);
  
  // Check for user on initial load and whenever localStorage changes
  useEffect(() => {
    const checkUserAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Failed to parse user data', e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    
    // Check on component mount
    checkUserAuth();
    
    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkUserAuth);
    
    return () => {
      window.removeEventListener('storage', checkUserAuth);
    };
  }, []);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('likedBrands'); // Clear liked brands on logout
    setUser(null);
    toast.success("Successfully logged out");
  };
  
  return (
    <div 
      className={`${collapsed ? 'w-14' : 'w-48'} h-full bg-black fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 z-10 shadow-md`}
    >
      <div className="flex flex-col border-b border-gray-800">
        <div className="flex items-center justify-between p-3">
          <h1 className={`text-lg font-kanit font-extrabold tracking-tighter ${collapsed ? 'hidden' : 'block'}`}>
            {collapsed ? null : (
              <TextShimmerWave
                className="[--base-color:#C0C0C0] [--base-gradient-color:#333333]"
                duration={2}
                spread={1.2}
                zDistance={20}
                scaleDistance={1.1}
              >
                FASHION:WEEK
              </TextShimmerWave>
            )}
          </h1>
          <button 
            onClick={toggleCollapse}
            className="text-white hover:bg-gray-800 rounded-full p-1"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {!user ? (
          <Link 
            to="/signin" 
            className={`flex items-center hover:bg-gray-800 transition-colors py-2 px-2 rounded-md ${
              location.pathname === "/signin" ? 'bg-gray-800 text-white font-semibold' : 'text-gray-300'
            } mx-2 mb-3`}
          >
            <div className="flex items-center">
              <div><LogIn size={18} className="text-blue-400" /></div>
              <span className={`ml-3 font-kanit text-sm ${collapsed ? 'hidden' : 'block'}`}>Sign In</span>
            </div>
          </Link>
        ) : (
          <div className="mx-2 mb-3 space-y-2">
            <Link
              to="/profile"
              className={`flex items-center hover:bg-gray-800 transition-colors py-2 px-2 rounded-md ${
                location.pathname === "/profile" ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center">
                <Avatar className="h-7 w-7">
                  {user.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={user.name || user.email} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-800 text-white text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className={`ml-3 font-kanit text-sm text-white ${collapsed ? 'hidden' : 'block'}`}>
                  {user.name || user.email?.split('@')[0] || 'Profile'}
                </span>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className={`flex w-full items-center hover:bg-gray-800 transition-colors py-2 px-2 rounded-md text-gray-300`}
            >
              <div className="flex items-center">
                <div><LogOut size={18} className="text-red-400" /></div>
                <span className={`ml-3 font-kanit text-sm ${collapsed ? 'hidden' : 'block'}`}>Logout</span>
              </div>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-1 mt-3 px-2">
        <NavItem 
          icon={<Home size={18} className="text-green-400" />} 
          label="Home" 
          path="/" 
          isActive={location.pathname === "/"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<ShoppingBag size={18} className="text-purple-400" />} 
          label="Brands" 
          path="/brands" 
          isActive={location.pathname === "/brands"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<Heart size={18} className="text-red-500" />} 
          label="Liked" 
          path="/liked" 
          isActive={location.pathname === "/liked"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<Private size={18} className="text-blue-400" />} 
          label="Terms" 
          path="/terms" 
          isActive={location.pathname === "/terms"} 
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  path,
  isActive,
  collapsed,
}: { 
  icon: React.ReactNode; 
  label: string; 
  path: string;
  isActive: boolean;
  collapsed: boolean;
}) => {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to={path} 
            className={`flex items-center hover:bg-gray-800 transition-colors py-2 px-2 rounded-md ${
              isActive ? 'bg-gray-800 text-white font-semibold' : 'text-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <div>{icon}</div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return (
    <Link 
      to={path} 
      className={`flex items-center hover:bg-gray-800 transition-colors py-2 px-2 rounded-md ${
        isActive ? 'bg-gray-800 text-white font-semibold' : 'text-gray-300'
      }`}
    >
      <div className="flex items-center">
        <div>{icon}</div>
        <span className="ml-3 text-sm font-kanit">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
