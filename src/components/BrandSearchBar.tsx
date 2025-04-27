import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { brands } from "@/data/brands";

interface AISearchBarProps {
  onSearch: (query: string) => void;
  onSelectBrand?: (brandName: string) => void;
}

const AISearchBar = ({ onSearch, onSelectBrand }: AISearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get unique brand names for autocomplete suggestions
  const brandNames = brands.map((brand) => brand.name);

  useEffect(() => {
    // Handle clicks outside search suggestions to close them
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = brandNames.filter((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0); // Only show if we have suggestions
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);

    // If onSelectBrand is provided, call it to display the popup
    if (onSelectBrand) {
      onSelectBrand(suggestion);
    }
  };

  // Ensure suggestions is always an array before rendering
  const validSuggestions = Array.isArray(suggestions) ? suggestions : [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative" ref={searchRef}>
        <div className="flex items-center w-full rounded-lg border shadow-md">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search brands"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setShowSuggestions(validSuggestions.length > 0)}
              className="w-full h-10 px-4 pl-10 rounded-lg font-kanit focus:outline-none"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="p-2 mr-1 rounded-full hover:bg-gray-100"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>

        {showSuggestions && validSuggestions.length > 0 && (
          <div className="absolute w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {validSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISearchBar;
