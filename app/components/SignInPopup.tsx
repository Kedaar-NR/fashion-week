"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SignInPopupProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "mini" | "full";
}

export function SignInPopup({
  isOpen,
  onClose,
  variant = "mini",
}: SignInPopupProps) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${variant === "mini" ? "max-w-sm" : "max-w-md"} p-6`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold text-center">Sign In Required</h2>
          {variant === "full" && (
            <p className="text-center text-muted-foreground">
              Please sign in to access your wishlist and favorite pieces
            </p>
          )}
          <Button
            onClick={handleSignIn}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
