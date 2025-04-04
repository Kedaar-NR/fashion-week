
const categories = [
  "STREETWEAR",
  "PUNK",
  "ESSENTIALS",
  "LUXURY",
  "MINIMALIST",
  "GORPCORE", 
  "Y2K"
];

const CategoryBar = () => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2">
      <div className="flex min-w-max px-8 space-x-6">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 whitespace-nowrap hover:bg-gray-100 rounded-full transition-colors text-sm font-medium"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
