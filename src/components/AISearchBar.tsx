
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Command, CommandInput } from '@/components/ui/command';
import { toast } from 'sonner';

interface AISearchBarProps {
  onSearch: (query: string) => void;
}

const AISearchBar = ({ onSearch }: AISearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="w-full max-w-2xl mx-auto">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center px-3">
          <CommandInput
            placeholder="Search fashion brands..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            onKeyDown={handleKeyPress}
            className="h-10 font-kanit"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
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
      </Command>
    </div>
  );
};

export default AISearchBar;
