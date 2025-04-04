
import { Home, Heart, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-[240px] border-r border-gray-100 bg-white py-6 flex flex-col items-start fixed h-full">
      <div className="mb-8 px-6">
        <h1 className="text-2xl font-extrabold tracking-tighter">FASHION:WEEK</h1>
      </div>
      <div className="space-y-6 mt-6 w-full px-4">
        <SidebarItem 
          icon={<Home size={24} />} 
          label="HOME" 
          path="/" 
          isActive={location.pathname === "/"} 
        />
        <SidebarItem 
          icon={<Heart size={24} />} 
          label="LIKED" 
          path="/liked" 
          isActive={location.pathname === "/liked"} 
        />
        <SidebarItem 
          icon={<ShoppingBag size={24} />} 
          label="BRANDS" 
          path="/brands" 
          isActive={location.pathname === "/brands"} 
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ 
  icon, 
  label, 
  path,
  isActive
}: { 
  icon: React.ReactNode; 
  label: string; 
  path: string;
  isActive: boolean;
}) => {
  return (
    <Link 
      to={path} 
      className={`flex items-center hover:text-purple-600 transition-colors w-full py-2 px-4 rounded-md ${isActive ? 'bg-gray-100 text-purple-600' : 'text-gray-700'}`}
    >
      <div className="flex items-center justify-start w-full">
        <div className={isActive ? "text-purple-600" : "text-gray-700"}>{icon}</div>
        <span className="ml-4 text-base">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
