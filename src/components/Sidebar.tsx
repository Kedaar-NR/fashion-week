
import { Home, Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div 
      className={`${collapsed ? 'h-16 w-full' : 'h-20 w-full'} bg-purple-400/90 fixed top-0 left-0 flex items-center justify-between transition-all duration-300 z-10 px-6 border-b border-purple-300`}
    >
      <div className="flex items-center">
        <h1 className="text-2xl font-extrabold tracking-tighter text-white mr-8">FASHION:WEEK</h1>
        
        <div className={`flex items-center space-x-6 ${collapsed ? 'hidden' : ''}`}>
          <NavItem 
            icon={<Home size={22} />} 
            label="HOME" 
            path="/" 
            isActive={location.pathname === "/"} 
          />
          <NavItem 
            icon={<Heart size={22} />} 
            label="LIKED" 
            path="/liked" 
            isActive={location.pathname === "/liked"} 
          />
          <NavItem 
            icon={<ShoppingBag size={22} />} 
            label="BRANDS" 
            path="/brands" 
            isActive={location.pathname === "/brands"} 
          />
        </div>

        {collapsed && (
          <div className="flex items-center space-x-6">
            <IconNavItem 
              icon={<Home size={22} />} 
              path="/" 
              isActive={location.pathname === "/"} 
            />
            <IconNavItem 
              icon={<Heart size={22} />} 
              path="/liked" 
              isActive={location.pathname === "/liked"} 
            />
            <IconNavItem 
              icon={<ShoppingBag size={22} />} 
              path="/brands" 
              isActive={location.pathname === "/brands"} 
            />
          </div>
        )}
      </div>
      
      <button 
        onClick={toggleCollapse}
        className="text-white hover:bg-purple-500/50 rounded-full p-2"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  path,
  isActive,
}: { 
  icon: React.ReactNode; 
  label: string; 
  path: string;
  isActive: boolean;
}) => {
  return (
    <Link 
      to={path} 
      className={`flex items-center hover:bg-purple-500/50 transition-colors py-2 px-4 rounded-md ${
        isActive ? 'bg-purple-500/30 text-white' : 'text-white'
      }`}
    >
      <div className="flex items-center">
        <div>{icon}</div>
        <span className="ml-2 text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

const IconNavItem = ({ 
  icon, 
  path,
  isActive,
}: { 
  icon: React.ReactNode; 
  path: string;
  isActive: boolean;
}) => {
  return (
    <Link 
      to={path} 
      className={`flex items-center justify-center hover:bg-purple-500/50 transition-colors p-2 rounded-md ${
        isActive ? 'bg-purple-500/30 text-white' : 'text-white'
      }`}
    >
      {icon}
    </Link>
  );
};

export default Sidebar;
