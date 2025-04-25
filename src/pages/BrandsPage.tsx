import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { brands, genreColors } from "@/data/brands";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Brand from "@/components/Brand";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BrandSearchBar from "@/components/BrandSearchBar";
import TagSelector from "@/components/TagSelector";

const brandBlurbs: Record<string, string> = {
  "jeanpaulknott": "Jean-Paul Knott delivers timeless elegance with minimalist designs that focus on exceptional tailoring and luxurious fabrics.",
  "isseymiyake": "Issey Miyake blends technology with tradition, creating innovative pleating techniques and architectural silhouettes that redefine modern fashion.",
  "acnestudios": "Acne Studios combines Scandinavian minimalism with distinctive design elements, offering contemporary pieces with artistic sensibilities.",
  "maisonmargiela": "Maison Margiela's avant-garde approach deconstructs and reimagines fashion conventions, creating conceptual designs with intellectual depth.",
  "commedesgarcons": "Comme des Garçons challenges fashion norms with bold, architectural designs that blend art and fashion in unexpected ways.",
  "rafsimons": "Raf Simons merges youth culture references with precise tailoring, creating collections that are both culturally relevant and impeccably crafted.",
  "balenciaga": "Balenciaga delivers architectural silhouettes and street-inspired designs that define contemporary fashion through bold innovation.",
  "vetements": "Vetements subverts fashion expectations with oversized proportions and street influences, creating statement pieces with cultural commentary.",
  "rickowens": "Rick Owens crafts dark, architectural designs with a distinctive gothic aesthetic that balances brutalist forms with fluid draping.",
};

const getBlurb = (brandName: string) => {
  const normalizedName = brandName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return brandBlurbs[normalizedName] || 
    "This cutting-edge brand combines innovative design with quality craftsmanship, offering distinctive pieces that reflect contemporary fashion sensibilities.";
};

const categories = [
  "ALL",
  "STREETWEAR",
  "PUNK",
  "ESSENTIALS",
  "LUXURY",
  "MINIMALIST",
  "GORPCORE", 
  "Y2K",
  "VINTAGE",
  "BASIC",
  "GRUNGE",
  "COWBOY"
];

const BrandsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [savedBrands, setSavedBrands] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('savedBrands');
    if (saved) {
      setSavedBrands(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brandParam = searchParams.get("brand");
    const styleParam = searchParams.get("style");
    
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
    
    if (styleParam && categories.includes(styleParam)) {
      setActiveCategory(styleParam);
      toast.success(`Showing ${styleParam.toLowerCase()} brands based on your style`);
    }
  }, [location]);
  
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
  };

  const toggleSaveBrand = (brandName: string) => {
    const updated = savedBrands.includes(brandName)
      ? savedBrands.filter(name => name !== brandName)
      : [...savedBrands, brandName];
    
    setSavedBrands(updated);
    localStorage.setItem('savedBrands', JSON.stringify(updated));
    
    if (savedBrands.includes(brandName)) {
      toast.info(`Removed ${brandName} from saved brands`);
    } else {
      toast.success(`Saved ${brandName} to your collection`);
    }
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === "ALL" || brand.genre === activeCategory)
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 pt-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Brands</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="w-64">
              <Select value={activeCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-grow max-w-md">
              <BrandSearchBar 
                onSearch={handleSearch}
                onSelectBrand={handleSearchBrandSelect}
              />
            </div>
          </div>
          
          <div className="mb-2">
            <TagSelector onSelectBrand={handleBrandSelect} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {filteredBrands.slice(0, 9).map((brand) => (
              <Brand
                key={brand.name}
                name={brand.name}
                followers={brand.followers}
                genre={brand.genre}
                onClick={() => {}}
                isSaved={savedBrands.includes(brand.name)}
                isSelected={selectedBrand === brand.name}
              />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-400px)]">
            {filteredBrands.slice(9).map((brand) => (
              <Brand
                key={brand.name}
                name={brand.name}
                followers={brand.followers}
                genre={brand.genre}
                onClick={() => {}}
                isSaved={savedBrands.includes(brand.name)}
                isSelected={selectedBrand === brand.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
