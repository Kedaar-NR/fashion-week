
import { Home, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[80px] md:w-[240px] border-r border-gray-100 bg-white py-6 flex flex-col items-center md:items-start fixed h-full">
      <div className="space-y-8 mt-6 w-full px-4">
        <SidebarItem icon={<Home size={24} />} label="HOME" path="/" />
        <SidebarItem icon={<Heart size={24} />} label="LIKED" path="/liked" />
        <SidebarItem icon={<ShoppingBag size={24} />} label="BRANDS" path="/brands" />
      </div>
    </div>
  );
};

const SidebarItem = ({ 
  icon, 
  label, 
  path 
}: { 
  icon: React.ReactNode; 
  label: string; 
  path: string 
}) => {
  return (
    <Link 
      to={path} 
      className="flex items-center hover:text-purple-600 text-gray-700 transition-colors w-full"
    >
      <div className="flex items-center justify-center md:justify-start w-full">
        <div className="text-purple-600">{icon}</div>
        <span className="ml-4 text-base hidden md:block">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
