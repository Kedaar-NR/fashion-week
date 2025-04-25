
import { motion } from 'framer-motion';

interface TagSelectorProps {
  onSelectBrand: (brandName: string) => void;
}

const TagSelector = ({ onSelectBrand }: TagSelectorProps) => {
  const selectedBrands = [
    'badson.us',
    'brotherlylove',
    'eraworldwideclub',
    'outlw.usa',
    'derschutze_clo',
    'thegvgallery',
    'haveyoudiedbefore',
    'poolhousenewyork',
    'nomaintenance',
    'california.arts',
    'drolandmiller'
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {selectedBrands.map((brand) => (
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
