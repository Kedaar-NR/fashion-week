
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';
import { toast } from 'sonner';

interface AISearchBarProps {
  onSearch: (query: string) => void;
}

const predefinedPrompts = [
  "Discover grunge fashion brands",
  "Recommend minimalist clothing",
  "Find Y2K style brands",
  "Show me punk fashion brands",
  "Luxury streetwear brands",
  "Techwear clothing recommendations",
  "Sustainable fashion brands",
  "Japanese streetwear brands",
  "Vintage luxury brands"
];

const AISearchBar = ({ onSearch }: AISearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredPrompts, setFilteredPrompts] = useState<string[]>([]);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery) {
      const filtered = predefinedPrompts.filter(prompt => 
        prompt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPrompts(filtered);
    } else {
      setFilteredPrompts(predefinedPrompts);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePromptSelect = (prompt: string) => {
    setSearchQuery(prompt);
    toast.success(`Searching for "${prompt}"`);
    onSearch(prompt);
    setIsSearchFocused(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      toast.success(`Searching for "${searchQuery}"`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" ref={commandRef}>
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center px-3">
          <CommandInput
            placeholder="Search or ask AI about fashion brands..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={handleKeyPress}
            className="h-10 font-kanit"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setIsSearchFocused(false);
              }}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="p-1 rounded-full hover:bg-gray-100 ml-1"
          >
            <Search size={16} className="text-gray-500" />
          </button>
        </div>
        {isSearchFocused && (
          <CommandList>
            <CommandGroup heading="AI Fashion Prompts">
              {filteredPrompts.map((prompt, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handlePromptSelect(prompt)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors py-2"
                >
                  <Search size={14} className="mr-2 text-gray-500" />
                  <span>{prompt}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default AISearchBar;
