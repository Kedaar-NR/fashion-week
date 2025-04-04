
import { Home, Heart, ShoppingBag, ChevronLeft, ChevronRight, LogIn } from "lucide-react";
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
      className={`${collapsed ? 'w-14' : 'w-48'} h-full bg-black fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 z-10 shadow-md`}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <h1 className={`text-lg font-extrabold tracking-tighter text-white ${collapsed ? 'hidden' : 'block'}`}>FASHION:WEEK</h1>
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
          label="HOME" 
          path="/" 
          isActive={location.pathname === "/"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<Heart size={18} />} 
          label="LIKED" 
          path="/liked" 
          isActive={location.pathname === "/liked"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<ShoppingBag size={18} />} 
          label="BRANDS" 
          path="/brands" 
          isActive={location.pathname === "/brands"} 
          collapsed={collapsed}
        />
      </div>

      <div className="mt-2 px-2">
        <NavItem 
          icon={<LogIn size={18} />} 
          label="SIGN IN" 
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
  return (
    <Link 
      to={path} 
      className={`flex items-center hover:bg-gray-800 transition-colors py-2 px-2 rounded-md ${
        isActive ? 'bg-gray-800 text-white font-semibold' : 'text-gray-300'
      }`}
    >
      <div className="flex items-center">
        <div>{icon}</div>
        {!collapsed && <span className="ml-3 text-xs">{label}</span>}
      </div>
    </Link>
  );
};

export default Sidebar;
