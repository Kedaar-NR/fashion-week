
import { motion } from 'framer-motion';
import { brands } from '@/data/brands';

interface MarqueeGenresProps {
  onSelectCategory: (category: string) => void;
}

const genreColors = {
  "STREET": "bg-orange-500",
  "ESSENTIALS": "bg-slate-400",
  "CRAZY EXPERIMENTAL": "bg-fuchsia-500",
  "PUNK/GOTH/GRUNGE": "bg-purple-900",
  "LUXURY/VINTAGE": "bg-amber-200",
  "Y2K": "bg-pink-300",
  "JEWELERY": "bg-zinc-700",
  "MINIMALISTIC": "bg-neutral-500",
  "TECHWEAR": "bg-emerald-700"
};

const MarqueeGenres = ({ onSelectCategory }: MarqueeGenresProps) => {
  const uniqueGenres = Array.from(new Set(brands.map(brand => brand.genre || "STREET")));
  const duplicatedGenres = [...uniqueGenres, ...uniqueGenres, ...uniqueGenres];

  return (
    <div className="w-full overflow-hidden bg-black text-white py-4">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ 
          x: [0, -100 * uniqueGenres.length], 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {duplicatedGenres.map((genre, idx) => (
          <button
            key={`${genre}-${idx}`}
            onClick={() => onSelectCategory(genre)}
            className={`mx-8 px-6 py-2 text-lg font-bold uppercase ${genreColors[genre] || 'bg-gray-500'} rounded-full hover:opacity-90 transition-opacity shadow-lg`}
          >
            {genre}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeGenres;

