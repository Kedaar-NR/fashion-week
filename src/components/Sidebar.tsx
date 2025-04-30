import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

interface SidebarContextType {
  collapsed: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
});

export const useSidebar = () => useContext(SidebarContext);

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(() => {
    const cached = localStorage.getItem("cached_user");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        localStorage.setItem("cached_user", JSON.stringify(data.user));
        setUser(data.user);
      } else {
        localStorage.removeItem("cached_user");
        setUser(null);
      }
    };

    if (!user) {
      getUser();
    }

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        localStorage.removeItem("cached_user");
        setUser(null);
      } else {
        getUser();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("cached_user");
    setUser(null);
    toast.success("Successfully logged out");
    navigate("/");
  };

  return (
    <SidebarContext.Provider value={{ collapsed: false }}>
      <div className="w-48 h-full bg-white fixed left-0 top-0 bottom-0 flex flex-col z-10 shadow-md">
        <div className="flex flex-col border-b border-gray-200">
          <div className="flex items-center justify-center p-3">
            <h1 className="text-lg font-kanit font-extrabold tracking-tighter text-black">
              FASHION:WEEK
            </h1>
          </div>

          {!user ? (
            <Link
              to="/signin"
              className={`flex items-center justify-center hover:bg-gray-800 transition-colors py-2 px-2 rounded-md ${
                location.pathname === "/signin"
                  ? "bg-black text-white font-semibold"
                  : "bg-black text-white"
              } mx-2 mb-3`}
            >
              <span className="font-kanit text-sm uppercase">SIGN IN</span>
            </Link>
          ) : (
            <div className="mx-2 mb-3 space-y-2">
              <div className="flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md">
                <div className="flex items-center justify-center">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-800 text-white text-xs">
                      {user.user_metadata?.name
                        ? user.user_metadata.name.charAt(0).toUpperCase()
                        : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-3 font-kanit text-sm text-black uppercase">
                    {user.user_metadata?.name ||
                      user.email?.split("@")[0] ||
                      "PROFILE"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md text-black"
              >
                <span className="font-kanit text-sm uppercase">LOGOUT</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center pt-6">
          <div className="flex flex-col space-y-6 items-center w-full">
            <NavItem
              label="HOME"
              path="/home"
              isActive={location.pathname === "/home"}
            />
            <NavItem
              label="GALLERY"
              path="/gallery"
              isActive={location.pathname === "/gallery"}
            />
            <NavItem
              label="DROP TRACKER"
              path="/drop-tracker"
              isActive={location.pathname === "/drop-tracker"}
            />
            <NavItem
              label="SWIPER"
              path="/swiper"
              isActive={location.pathname === "/swiper"}
            />
            <NavItem
              label="LIKED"
              path="/liked"
              isActive={location.pathname === "/liked"}
            />
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

const NavItem = ({
  label,
  path,
  isActive,
}: {
  label: string;
  path: string;
  isActive: boolean;
}) => {
  return (
    <Link
      to={path}
      className={`w-full flex items-center justify-center hover:bg-gray-100 transition-colors py-2 px-2 rounded-md ${
        isActive ? "bg-gray-100 text-black font-semibold" : "text-black"
      }`}
    >
      <span className="font-kanit text-sm uppercase">{label}</span>
    </Link>
  );
};

export default Sidebar;
