import { useState } from "react";
import { Heart } from "lucide-react";
import { genreColors } from "@/data/brands";

interface BrandProps {
  name: string;
  followers: string;
  genre?: string;
  onClick: () => void;
  isSaved: boolean;
  isSelected?: boolean; // Add isSelected as optional prop
}

const Brand = ({
  name,
  followers,
  genre = "ESSENTIALS",
  onClick,
  isSaved,
  isSelected,
}: BrandProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const genreStyle = genreColors[genre] || genreColors["ESSENTIALS"];

  return (
    <div
      className="relative group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="absolute top-2 left-2">
          <div
            className={`${genreStyle.bg} ${genreStyle.text} px-2 py-1 rounded-full text-xs font-bold uppercase`}
          >
            {genre}
          </div>
        </div>
        <img
          src={`/profile_pics/${name.replace("@", "").toLowerCase()}.jpg`}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://source.unsplash.com/random/300x300?${name}`;
          }}
          className="rounded-md w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-105"
        />
      </div>
      <div className="mt-2 px-2">
        <h3 className="font-semibold text-black">{name}</h3>
        <p className="text-gray-500 text-sm">{followers} Followers</p>
      </div>
      {isHovered && (
        <div className="absolute top-2 right-2">
          <Heart
            className={`h-5 w-5 ${
              isSaved ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Brand;
