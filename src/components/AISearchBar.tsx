
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { brands } from '@/data/brands';

interface AISearchBarProps {
  onSearch: (query: string) => void;
  onSelectBrand?: (brandName: string) => void;
}

const AISearchBar = ({ onSearch, onSelectBrand }: AISearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const commandRef = useRef<HTMLDivElement>(null);
  
  // Get unique brand names for autocomplete suggestions
  const brandNames = brands.map(brand => brand.name);

  useEffect(() => {
    // Handle clicks outside search suggestions to close them
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = brandNames.filter(name => 
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
    if (e.key === 'Enter') {
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
      <div className="relative" ref={commandRef}>
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center px-3">
            <CommandInput
              placeholder="Search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              onKeyDown={handleKeyPress}
              onFocus={() => setShowSuggestions(validSuggestions.length > 0)}
              className="h-10 font-kanit"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
          
          {showSuggestions && validSuggestions.length > 0 && (
            <CommandList className="max-h-60 overflow-auto border-t">
              {validSuggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion}
                  onSelect={() => handleSelectSuggestion(suggestion)}
                  className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion}
                </CommandItem>
              ))}
            </CommandList>
          )}
        </Command>
      </div>
    </div>
  );
};

export default AISearchBar;
