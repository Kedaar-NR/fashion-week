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

// Update genreColors to match MarqueeCategories
const genreColors = {
  PUNK: { bg: "bg-purple-500", text: "text-white" },
  GOTH: { bg: "bg-purple-500", text: "text-white" },
  GRUNGE: { bg: "bg-purple-500", text: "text-white" },
  ESSENTIALS: { bg: "bg-blue-500", text: "text-white" },
  LUXURY: { bg: "bg-amber-400", text: "text-black" },
  VINTAGE: { bg: "bg-amber-400", text: "text-black" },
  MINIMALISTIC: { bg: "bg-gray-500", text: "text-white" },
  "CRAZY EXPERIMENTAL": { bg: "bg-pink-500", text: "text-white" },
  Y2K: { bg: "bg-violet-400", text: "text-white" },
  JEWELERY: { bg: "bg-emerald-500", text: "text-white" },
  TECHWEAR: { bg: "bg-cyan-500", text: "text-white" },
  STREET: { bg: "bg-red-500", text: "text-white" },
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
      <div className="flex-1 p-8 ml-48">
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
                            src={`/profile_pics/${brand.name
                              .toLowerCase()
                              .replace("@", "")}.jpg`}
                            alt={brand.name}
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback =
                                e.currentTarget.parentElement?.querySelector(
                                  ".avatar-fallback"
                                );
                              if (fallback && fallback instanceof HTMLElement) {
                                fallback.style.display = "flex";
                              }
                            }}
                          />
                          <AvatarFallback
                            className="bg-gray-100 avatar-fallback"
                            style={{ display: "none" }}
                          >
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
                        (() => {
                          // Group PUNK/GOTH/GRUNGE and LUXURY/VINTAGE
                          const genres = brand.genre
                            .split("/")
                            .map((g) => g.trim().toUpperCase());
                          const grouped: string[][] = [];
                          let i = 0;
                          while (i < genres.length) {
                            if (
                              ["PUNK", "GOTH", "GRUNGE"].includes(genres[i])
                            ) {
                              const group = genres
                                .slice(i, i + 3)
                                .filter((g) =>
                                  ["PUNK", "GOTH", "GRUNGE"].includes(g)
                                );
                              grouped.push(group);
                              i += group.length;
                            } else if (
                              ["LUXURY", "VINTAGE"].includes(genres[i])
                            ) {
                              const group = genres
                                .slice(i, i + 2)
                                .filter((g) =>
                                  ["LUXURY", "VINTAGE"].includes(g)
                                );
                              grouped.push(group);
                              i += group.length;
                            } else {
                              grouped.push([genres[i]]);
                              i++;
                            }
                          }
                          return grouped.map((group, idx) => (
                            <span
                              key={idx}
                              className="inline-flex gap-2 justify-center mb-1"
                            >
                              {group.map((genre, j) => (
                                <span
                                  key={j}
                                  className={`px-3 py-1 rounded-full text-xs font-bold mx-1 ${
                                    genreColors[genre]?.bg || "bg-gray-500"
                                  } ${
                                    genreColors[genre]?.text || "text-white"
                                  }`}
                                >
                                  {genre}
                                </span>
                              ))}
                            </span>
                          ));
                        })()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-medium text-gray-500">
                        Adding soon
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
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setSelectedBrand(null)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
