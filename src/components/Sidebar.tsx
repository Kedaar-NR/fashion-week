
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
      className={`${collapsed ? 'w-16' : 'w-56'} h-full bg-purple-300/80 fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 z-10 border-r border-purple-200 shadow-sm`}
    >
      <div className="flex items-center justify-between p-4 border-b border-purple-200">
        <h1 className={`text-xl font-extrabold tracking-tighter text-purple-900 ${collapsed ? 'hidden' : 'block'}`}>FASHION:WEEK</h1>
        <button 
          onClick={toggleCollapse}
          className="text-purple-700 hover:bg-purple-400/30 rounded-full p-2"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex flex-col space-y-1 mt-4 px-2">
        <NavItem 
          icon={<Home size={20} />} 
          label="HOME" 
          path="/" 
          isActive={location.pathname === "/"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<Heart size={20} />} 
          label="LIKED" 
          path="/liked" 
          isActive={location.pathname === "/liked"} 
          collapsed={collapsed}
        />
        <NavItem 
          icon={<ShoppingBag size={20} />} 
          label="BRANDS" 
          path="/brands" 
          isActive={location.pathname === "/brands"} 
          collapsed={collapsed}
        />
      </div>

      <div className="mt-auto mb-4 px-2">
        <NavItem 
          icon={<LogIn size={20} />} 
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
      className={`flex items-center hover:bg-purple-400/30 transition-colors py-3 px-3 rounded-md ${
        isActive ? 'bg-purple-400/20 text-purple-900 font-semibold' : 'text-purple-800'
      }`}
    >
      <div className="flex items-center">
        <div>{icon}</div>
        {!collapsed && <span className="ml-3 text-sm">{label}</span>}
      </div>
    </Link>
  );
};

export default Sidebar;
