
import Sidebar from '@/components/Sidebar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { brands } from '@/data/brands';

const DropTracker = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 pt-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Drop Tracker</h1>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Next Drop</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow key={brand.name}>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger className="text-left hover:underline">
                          {brand.name}
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl h-[80vh]">
                          <div className="aspect-square w-full h-full">
                            <iframe 
                              src={`https://www.instagram.com/${brand.name.replace('@', '')}/embed`}
                              className="w-full h-full border-none"
                              title={`${brand.name} Instagram Feed`}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{brand.genre || 'N/A'}</TableCell>
                    <TableCell>N/A</TableCell>
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
