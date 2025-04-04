
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
      className={`${collapsed ? 'w-[70px]' : 'w-[240px]'} bg-purple-600 py-6 flex flex-col items-start fixed h-full transition-all duration-300 z-10`}
    >
      <div className={`mb-8 px-6 flex items-center justify-between w-full ${collapsed ? 'justify-center px-2' : ''}`}>
        {!collapsed && <h1 className="text-2xl font-extrabold tracking-tighter text-white">FASHION:WEEK</h1>}
        <button 
          onClick={toggleCollapse}
          className="text-white hover:bg-purple-700 rounded-full p-1 ml-2"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <div className={`space-y-6 mt-6 w-full ${collapsed ? 'px-2' : 'px-4'}`}>
        <SidebarItem 
          icon={<Home size={24} />} 
          label="HOME" 
          path="/" 
          isActive={location.pathname === "/"} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Heart size={24} />} 
          label="LIKED" 
          path="/liked" 
          isActive={location.pathname === "/liked"} 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<ShoppingBag size={24} />} 
          label="BRANDS" 
          path="/brands" 
          isActive={location.pathname === "/brands"} 
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ 
  icon, 
  label, 
  path,
  isActive,
  collapsed
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
      className={`flex items-center hover:bg-purple-700 transition-colors w-full py-2 px-4 rounded-md ${
        isActive ? 'bg-purple-800 text-white' : 'text-white'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start w-full'}`}>
        <div>{icon}</div>
        {!collapsed && <span className="ml-4 text-base">{label}</span>}
      </div>
    </Link>
  );
};

export default Sidebar;
