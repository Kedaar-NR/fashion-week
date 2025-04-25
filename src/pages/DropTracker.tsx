
import Sidebar from '@/components/Sidebar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { brands, genreColors } from '@/data/brands';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const DropTracker = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 pt-8">
        <div className="mx-8 lg:mx-12 xl:mx-16">
          <h1 className="text-3xl font-bold mb-6 text-center 
            bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 
            text-transparent bg-clip-text">
            Drop Tracker
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <TableHead className="text-center font-bold text-purple-700">Brand</TableHead>
                  <TableHead className="text-center font-bold text-pink-700">Genre</TableHead>
                  <TableHead className="text-center font-bold text-purple-700">Next Drop</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow key={brand.name} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="flex items-center gap-3">
                      <Dialog>
                        <DialogTrigger className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <Avatar className="w-10 h-10">
                            <AvatarImage 
                              src={`/src/profile_pics/${brand.name}.jpg`} 
                              alt={brand.name}
                            />
                            <AvatarFallback className="bg-gray-100">
                              {brand.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="hover:underline font-medium">
                            @{brand.name}
                          </span>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl h-[80vh]">
                          <div className="aspect-square w-full h-full">
                            <iframe 
                              src={`https://www.instagram.com/${brand.name}/embed`}
                              className="w-full h-full border-none"
                              title={`${brand.name} Instagram Feed`}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      {brand.genre && (
                        <div className="flex justify-center">
                          <Badge 
                            className={`${genreColors[brand.genre].bg} ${genreColors[brand.genre].text} 
                            font-medium px-3 py-1`}
                          >
                            {brand.genre}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-gray-500 italic">
                      Coming Soon
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropTracker;
