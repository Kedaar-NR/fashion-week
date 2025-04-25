
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BrandPopoverProps {
  brandName: string;
  children: React.ReactNode;
}

const BrandPopover = ({ brandName, children }: BrandPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white p-4">
        <div className="space-y-2">
          <h4 className="font-medium">{brandName}</h4>
          <p className="text-sm text-gray-500">Content coming soon...</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BrandPopover;
