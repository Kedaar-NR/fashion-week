
const FashionGrid = () => {
  // Create fixed array of fashion items instead of using Array.from with a potentially undefined value
  const fashionItems = [
    { id: 1, title: "Content 1" },
    { id: 2, title: "Content 2" },
    { id: 3, title: "Content 3" },
    { id: 4, title: "Content 4" },
    { id: 5, title: "Content 5" },
    { id: 6, title: "Content 6" },
    { id: 7, title: "Content 7" },
    { id: 8, title: "Content 8" },
    { id: 9, title: "Content 9" },
  ];

  return (
    <div className="p-4 md:p-8 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fashionItems.map((item) => (
          <div 
            key={item.id} 
            className="aspect-square bg-gray-50 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <span className="text-sm text-gray-400">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionGrid;
