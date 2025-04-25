import Sidebar from "@/components/Sidebar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { brands } from "@/data/brands";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Enhanced genre colors with more variety
const genreColors = {
  HYPEBEAST: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  MINIMALIST: {
    bg: "bg-slate-200",
    text: "text-slate-800",
    border: "border-slate-300",
  },
  GOTH: {
    bg: "bg-gray-200",
    text: "text-gray-800",
    border: "border-gray-300",
  },
  VINTAGE: {
    bg: "bg-amber-200",
    text: "text-amber-800",
    border: "border-amber-300",
  },
  LUXURY: {
    bg: "bg-indigo-200",
    text: "text-indigo-800",
    border: "border-indigo-300",
  },
  ATHLETIC: {
    bg: "bg-emerald-200",
    text: "text-emerald-800",
    border: "border-emerald-300",
  },
  STREET: {
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
  },
  STREETWEAR: {
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
  },
  DESIGNER: {
    bg: "bg-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  AVANT: {
    bg: "bg-violet-200",
    text: "text-violet-800",
    border: "border-violet-300",
  },
  ESSENTIALS: {
    bg: "bg-green-200",
    text: "text-green-800",
    border: "border-green-300",
  },
  CORE: {
    bg: "bg-yellow-200",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
  PUNK: {
    bg: "bg-pink-200",
    text: "text-pink-800",
    border: "border-pink-300",
  },
  GRUNGE: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
};

const DropTracker = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (brand.genre &&
        brand.genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-transparent bg-clip-text">
              Drop Tracker
            </h1>
            <p className="mt-2 text-gray-600 mb-6">
              Track upcoming releases from your favorite brands
            </p>
            <div className="max-w-[500px] mx-auto mb-8">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search brands or styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full pl-9 pr-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <svg
                  className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-100">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px] font-bold text-black">
                    Brand
                  </TableHead>
                  <TableHead className="font-bold text-black text-center">
                    Style
                  </TableHead>
                  <TableHead className="text-right font-bold text-black">
                    Drop Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-arial">
                {filteredBrands.map((brand) => (
                  <TableRow
                    key={brand.name}
                    className="hover:bg-gray-50 transition-colors border-b last:border-0"
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded">
                          <AvatarImage
                            src={`/src/profile_pics/${brand.name
                              .toLowerCase()
                              .replace("@", "")}.jpg`}
                            alt={brand.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-100">
                            {brand.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <button
                          onClick={() => setSelectedBrand(brand.name)}
                          className="flex items-center gap-2 group"
                        >
                          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {brand.name}
                          </span>
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {brand.genre &&
                        brand.genre.split("/").map((genre, idx) => {
                          const genreKey = genre.trim().toUpperCase();
                          return (
                            <Badge
                              key={idx}
                              className={`mr-2 ${
                                genreColors[genreKey]?.bg || "bg-gray-100"
                              } ${
                                genreColors[genreKey]?.text || "text-gray-700"
                              } font-medium px-3 py-1 border ${
                                genreColors[genreKey]?.border ||
                                "border-gray-200"
                              }`}
                            >
                              {genre.trim()}
                            </Badge>
                          );
                        })}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium text-green-600">
                        October 17, 2025
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Instagram Embed Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                @{selectedBrand.replace("@", "")}
              </h2>
              <button
                onClick={() => setSelectedBrand(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square w-full relative">
              <iframe
                src={`https://www.instagram.com/${selectedBrand.replace(
                  "@",
                  ""
                )}/embed`}
                className="w-full h-full border-none"
                title={`${selectedBrand} Instagram Feed`}
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropTracker;
