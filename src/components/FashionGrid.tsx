
const FashionGrid = () => {
  return (
    <div className="p-4 md:p-8 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, index) => (
          <div 
            key={index} 
            className="aspect-square bg-gray-50 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <span className="text-sm text-gray-400">Content {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionGrid;
