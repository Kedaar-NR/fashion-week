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
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-center p-3">
            <Link to="/home">
              <h1
                className="text-4xl font-black tracking-wider text-black hover:text-gray-700 transition-colors cursor-pointer"
                style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
              >
                F:W
              </h1>
            </Link>
          </div>
        </div>

        <Link
          to="/waitlist"
          className="mx-4 my-2 py-2 px-4 text-base font-black text-white bg-black hover:bg-gray-800 transition-colors rounded-md uppercase text-center w-[calc(100%-2rem)]"
          style={{ fontFamily: "Arial Black, sans-serif" }}
        >
          Waitlist
        </Link>

        {user && (
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-10 w-10 mb-2">
                <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-800 text-white">
                  {user.user_metadata?.name
                    ? user.user_metadata.name.charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center w-full">
                <span
                  className="text-sm font-bold text-black uppercase break-words text-center w-full"
                  style={{ fontFamily: "Arial Black, sans-serif" }}
                >
                  {user.user_metadata?.name || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700 uppercase mt-1"
                  style={{ fontFamily: "Arial Black, sans-serif" }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-start pt-6 w-full">
          <div className="flex flex-col space-y-3 w-full">
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
              className="whitespace-nowrap"
            />
            <NavItem
              label="STYLE QUIZ"
              path="/quiz"
              isActive={location.pathname === "/quiz"}
            />
            {/* Temporarily hiding Tinder */}
            {/* <NavItem
              label="TINDER"
              path="/swiper"
              isActive={location.pathname === "/swiper"}
            /> */}
            <NavItem
              label="WISHLIST"
              path="/liked"
              isActive={location.pathname === "/liked"}
            />
            <NavItem
              label="EVENTS"
              path="/events"
              isActive={location.pathname === "/events"}
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2 w-full">
            <Link
              to="/terms"
              className="text-[10px] text-gray-500 hover:text-gray-700 px-6 text-left whitespace-nowrap"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              TERMS OF SERVICE
            </Link>
            <Link
              to="/privacy"
              className="text-[10px] text-gray-500 hover:text-gray-700 px-6 text-left whitespace-nowrap"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>

      {/* Fixed top-right sign in button - only show when not logged in */}
      {!user && (
        <div className="fixed top-0 right-0 p-4 z-[100]">
          <Link
            to="/signin"
            className="absolute top-4 right-12 bg-black text-white px-10 py-3 rounded-lg text-lg font-bold hover:bg-gray-800 transition whitespace-nowrap"
          >
            SIGN IN
          </Link>
        </div>
      )}
    </SidebarContext.Provider>
  );
};

const NavItem = ({
  label,
  path,
  isActive,
  className = "",
}: {
  label: string;
  path: string;
  isActive: boolean;
  className?: string;
}) => {
  return (
    <Link
      to={path}
      className={`w-full flex items-center justify-start hover:bg-gray-100 transition-colors py-2 px-6 rounded-md ${
        isActive ? "bg-gray-100 text-black font-black" : "text-black font-black"
      }`}
    >
      <span
        className={`text-base uppercase ${className}`}
        style={{ fontFamily: "Arial Black, sans-serif" }}
      >
        {label}
      </span>
    </Link>
  );
};

export default Sidebar;
