
import {
  Home,
  Heart,
  Shuffle,
  Calendar,
  ChevronRight,
  ChevronLeft,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.success("Successfully logged out");
    navigate("/");
  };

  return (
    <TooltipProvider>
      <div
        className={`${
          collapsed ? "w-14" : "w-48"
        } h-full bg-white fixed left-0 top-0 bottom-0 flex flex-col transition-all duration-300 z-10 shadow-md`}
      >
        <div className="flex flex-col border-b border-gray-200">
          <div className="flex items-center justify-center p-3">
            <h1
              className={`text-lg font-kanit font-extrabold tracking-tighter ${
                collapsed ? "hidden" : "block"
              }`}
            >
              {collapsed ? null : "FASHION:WEEK"}
            </h1>
            <button
              onClick={toggleCollapse}
              className="text-black hover:bg-gray-100 rounded-full p-1"
            >
              {collapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>
          </div>

          {!user ? (
            <Link
              to="/signin"
              className={`flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md ${
                location.pathname === "/signin"
                  ? "bg-gray-100 text-black font-semibold"
                  : "text-gray-700"
              } mx-2 mb-3`}
            >
              <div className="flex items-center justify-center">
                <div>
                  <LogIn size={18} className="text-blue-500" />
                </div>
                <span
                  className={`ml-3 font-kanit text-sm ${
                    collapsed ? "hidden" : "block"
                  }`}
                >
                  Sign In
                </span>
              </div>
            </Link>
          ) : (
            <div className="mx-2 mb-3 space-y-2">
              <div
                className={`flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md`}
              >
                <div className="flex items-center justify-center">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-800 text-white text-xs">
                      {user.user_metadata?.name
                        ? user.user_metadata.name.charAt(0).toUpperCase()
                        : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`ml-3 font-kanit text-sm text-black ${
                      collapsed ? "hidden" : "block"
                    }`}
                  >
                    {user.user_metadata?.name ||
                      user.email?.split("@")[0] ||
                      "Profile"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className={`flex w-full items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md text-gray-700`}
              >
                <div className="flex items-center justify-center">
                  <div>
                    <LogOut size={18} className="text-red-500" />
                  </div>
                  <span
                    className={`ml-3 font-kanit text-sm ${
                      collapsed ? "hidden" : "block"
                    }`}
                  >
                    Logout
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center pt-6">
          <div className="flex flex-col space-y-6 items-center">
            <NavItem
              icon={<Home size={18} className="text-green-600" />}
              label="Home"
              path="/home"
              isActive={location.pathname === "/home"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<Calendar size={18} className="text-purple-500" />}
              label="Drop Tracker"
              path="/drop-tracker"
              isActive={location.pathname === "/drop-tracker"}
              collapsed={collapsed}
            />
            <NavItem
              icon={<Shuffle size={18} className="text-blue-500" />}
              label="Swiper"
              path="/swiper"
              isActive={location.pathname === "/swiper"}
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
              isActive
                ? "bg-gray-100 text-black font-semibold"
                : "text-gray-700"
            } w-full`}
          >
            <div className="flex items-center justify-center">
              <div>{icon}</div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      to={path}
      className={`flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md ${
        isActive ? "bg-gray-100 text-black font-semibold" : "text-gray-700"
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
