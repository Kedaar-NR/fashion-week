import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { genreColors } from "@/data/brands";

const LikedPage = () => {
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    if (user) {
      const savedLikedBrands = JSON.parse(
        localStorage.getItem("likedBrands") || "[]"
      );
      setLikedBrands(savedLikedBrands);
    } else {
      setLikedBrands([]);
    }
  }, []);

  const filteredBrands = brands.filter((brand) =>
    likedBrands.includes(brand.name)
  );

  const handleUnlike = (brandName: string) => {
    const updatedLikedBrands = likedBrands.filter((name) => name !== brandName);
    localStorage.setItem("likedBrands", JSON.stringify(updatedLikedBrands));
    setLikedBrands(updatedLikedBrands);
    toast.success(`Removed ${brandName} from liked brands`);
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Liked Brands</h1>

          {!isLoggedIn && (
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-2">
                Sign in to view your liked brands
              </h2>
              <p className="text-gray-500 mb-4">
                Create an account to save and organize your favorite brands
              </p>
              <a
                href="/signin"
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Sign In
              </a>
            </div>
          )}

          {isLoggedIn && filteredBrands.length === 0 && (
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 text-center max-w-2xl mx-auto">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                No liked brands yet
              </h2>
              <p className="text-gray-500 mb-4">
                Start browsing and save your favorite brands
              </p>
              <a
                href="/home"
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Browse Brands
              </a>
            </div>
          )}

          {isLoggedIn && filteredBrands.length > 0 && !selectedBrand && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={`/profile_pics/${brand.name
                            .replace("@", "")
                            .toLowerCase()}.jpg`}
                          alt={brand.name}
                        />
                        <AvatarFallback className="bg-gray-100">
                          {brand.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium text-gray-900">
                        {brand.name}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlike(brand.name);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-full"
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>

                  <div className="h-[400px] overflow-hidden">
                    <iframe
                      src={`https://www.instagram.com/${brand.name.replace(
                        "@",
                        ""
                      )}/embed`}
                      className="w-full h-full border-none scale-[1.02]"
                      title={`${brand.name} Instagram Feed`}
                      loading="eager"
                      scrolling="no"
                    />
                  </div>

                  <div className="px-3 py-2.5">
                    <div className="flex gap-2 justify-center">
                      {brand.genre?.split("/").map((genre, idx) => {
                        const genreKey = genre.trim().toUpperCase();
                        return (
                          <Badge
                            key={idx}
                            className={`px-2.5 py-1 text-xs font-medium ${
                              genreColors[genreKey]?.bg || "bg-gray-500"
                            } ${genreColors[genreKey]?.text || "text-white"}`}
                          >
                            {genre.trim()}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedBrand && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{selectedBrand}</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUnlike(selectedBrand)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                    <button
                      onClick={closeInstagramView}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden aspect-square w-full">
                  <iframe
                    src={`https://www.instagram.com/${selectedBrand.replace(
                      "@",
                      ""
                    )}/embed`}
                    className="w-full h-full border-none scale-[1.02]"
                    title={`${selectedBrand} Instagram Feed`}
                    loading="eager"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedPage;
