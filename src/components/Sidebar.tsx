
import { Home, Heart, ShoppingBag, ChevronLeft, ChevronRight, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div 
      className={`${collapsed ? 'w-14' : 'w-48'} h-full bg-black fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 z-10 shadow-md`}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <h1 className={`text-lg font-extrabold tracking-tighter ${collapsed ? 'hidden' : 'block'} bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-pulse`}>FASHION:WEEK</h1>
        <button 
          onClick={toggleCollapse}
          className="text-white hover:bg-gray-800 rounded-full p-1"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="flex flex-col space-y-1 mt-3 px-2">
        <NavItem 
          icon={<Home size={18} />} 
          label="Home" 
          path="/" 
          isActive={location.pathname === "/"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<ShoppingBag size={18} />} 
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
      </div>

      <div className="mt-auto mb-4 px-2">
        <NavItem 
          icon={<LogIn size={18} />} 
          label="Sign In" 
          path="/signin" 
          isActive={location.pathname === "/signin"} 
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
        <span className="ml-3 text-sm">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
