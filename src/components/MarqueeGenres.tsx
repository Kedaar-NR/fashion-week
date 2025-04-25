
import { motion } from 'framer-motion';
import { brands, genreColors } from '@/data/brands';

interface MarqueeGenresProps {
  onSelectCategory: (genre: string) => void;
}

const MarqueeGenres = ({ onSelectCategory }: MarqueeGenresProps) => {
  // Get unique genres and split multi-genres into separate ones
  const genres = Array.from(new Set(
    brands.flatMap(brand => 
      brand.genre ? brand.genre.split('/').map(g => g.trim()) : []
    )
  ));

  const duplicatedGenres = [...genres, ...genres, ...genres]; // Triple for smoother infinite scroll

  return (
    <div className="w-full overflow-hidden py-4">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ 
          x: [0, -50 * genres.length], 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {duplicatedGenres.map((genre, idx) => {
          const colorConfig = genreColors[genre] || { bg: "bg-gray-500", text: "text-white" };
          return (
            <button
              key={`${genre}-${idx}`}
              onClick={() => onSelectCategory(genre)}
              className={`mx-8 px-6 py-2 text-lg font-bold uppercase rounded-full transition-transform hover:scale-105 ${colorConfig.bg} ${colorConfig.text}`}
            >
              {genre}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MarqueeGenres;
