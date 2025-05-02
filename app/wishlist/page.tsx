"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="relative container mx-auto px-4 py-8">
      <h1 className="text-6xl font-display font-bold mb-4">WISHLIST</h1>
      <h2 className="text-3xl font-display mb-8">YOUR FAVORITE PIECES</h2>

      <div
        className={`${!session ? "filter blur-sm pointer-events-none" : ""}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your wishlist items here */}
        </div>
      </div>

      {!session && (
        <div className="fixed inset-0 left-48 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 max-w-sm mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Sign In Required
            </h2>
            <p className="text-center text-gray-600">
              Please sign in to view your wishlist
            </p>
            <Button
              onClick={() => router.push("/signin")}
              className="w-full bg-black hover:bg-gray-800 text-white text-lg py-6 mt-2"
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
