
import { motion } from 'framer-motion';
import { brands } from '@/data/brands';

interface TagSelectorProps {
  onSelectBrand: (brandName: string) => void;
}

const TagSelector = ({ onSelectBrand }: TagSelectorProps) => {
  const brandNames = brands.map(brand => brand.name.replace('@', ''));

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-3 px-2">
        {brandNames.map((brand) => (
          <button
            key={brand}
            onClick={() => onSelectBrand(brand)}
            className="px-4 py-1.5 text-sm whitespace-nowrap rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
