import { Home, Heart, ChevronLeft, ChevronRight, LogIn, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState<{ email?: string, name?: string, photoURL?: string } | null>(null);
  
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
    
    checkUserAuth();
    
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
    localStorage.removeItem('likedBrands');
    setUser(null);
    toast.success("Successfully logged out");
  };
  
  return (
    <TooltipProvider>
      <div 
        className={`${collapsed ? 'w-14' : 'w-48'} h-full bg-white fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 z-10 shadow-md`}
      >
        <div className="flex flex-col border-b border-gray-200">
          <div className="flex items-center justify-center p-3">
            <h1 className={`text-lg font-kanit font-extrabold tracking-tighter ${collapsed ? 'hidden' : 'block'}`}>
              {collapsed ? null : "FASHION:WEEK"}
            </h1>
            <button 
              onClick={toggleCollapse}
              className="text-black hover:bg-gray-100 rounded-full p-1"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
          
          {!user ? (
            <Link 
              to="/signin" 
              className={`flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md ${
                location.pathname === "/signin" ? 'bg-gray-100 text-black font-semibold' : 'text-gray-700'
              } mx-2 mb-3`}
            >
              <div className="flex items-center justify-center">
                <div><LogIn size={18} className="text-blue-500" /></div>
                <span className={`ml-3 font-kanit text-sm ${collapsed ? 'hidden' : 'block'}`}>Sign In</span>
              </div>
            </Link>
          ) : (
            <div className="mx-2 mb-3 space-y-2">
              <Link
                to="/profile"
                className={`flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md ${
                  location.pathname === "/profile" ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex items-center justify-center">
                  <Avatar className="h-7 w-7">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.name || user.email} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-800 text-white text-xs">
                        {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className={`ml-3 font-kanit text-sm text-black ${collapsed ? 'hidden' : 'block'}`}>
                    {user.name || user.email?.split('@')[0] || 'Profile'}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className={`flex w-full items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md text-gray-700`}
              >
                <div className="flex items-center justify-center">
                  <div><LogOut size={18} className="text-red-500" /></div>
                  <span className={`ml-3 font-kanit text-sm ${collapsed ? 'hidden' : 'block'}`}>Logout</span>
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="flex flex-col space-y-6 items-center">
            <NavItem 
              icon={<Home size={18} className="text-green-600" />} 
              label="Home" 
              path="/home" 
              isActive={location.pathname === "/home"} 
              collapsed={collapsed}
            />
            <NavItem 
              icon={<Heart size={18} className="text-red-500" />} 
              label="Liked" 
              path="/liked" 
              isActive={location.pathname === "/liked"} 
              collapsed={collapsed}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
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
            className={`flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md ${
              isActive ? 'bg-gray-100 text-black font-semibold' : 'text-gray-700'
            } w-full`}
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
      className={`flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md ${
        isActive ? 'bg-gray-100 text-black font-semibold' : 'text-gray-700'
      } w-full`}
    >
      <div className="flex items-center justify-center">
        <div>{icon}</div>
        <span className="ml-3 text-sm font-kanit">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
