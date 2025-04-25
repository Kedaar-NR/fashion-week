import { brands } from "@/data/brands";

interface BrandContentCollageProps {
  onSelectBrand: (brandName: string) => void;
}

const BrandContentCollage = ({ onSelectBrand }: BrandContentCollageProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {brands.slice(0, 9).map((brand) => (
        <div
          key={brand.name}
          className="relative overflow-hidden rounded-lg aspect-square cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src={`/src/profile_pics /${brand.name}.jpg`}
            alt={brand.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            @{brand.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandContentCollage;
