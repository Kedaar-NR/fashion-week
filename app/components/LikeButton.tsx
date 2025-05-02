"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { SignInPopup } from "./SignInPopup";

interface LikeButtonProps {
  brandId: string;
  initialLiked?: boolean;
  onLike?: (brandId: string) => void;
}

export function LikeButton({
  brandId,
  initialLiked = false,
  onLike,
}: LikeButtonProps) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const handleLikeClick = async () => {
    if (!session) {
      setShowSignInPopup(true);
      return;
    }

    setIsLiked(!isLiked);
    onLike?.(brandId);
  };

  return (
    <>
      <button
        onClick={handleLikeClick}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Heart
          className={`w-6 h-6 ${
            isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-600"
          }`}
        />
      </button>

      <SignInPopup
        isOpen={showSignInPopup}
        onClose={() => setShowSignInPopup(false)}
        variant="mini"
      />
    </>
  );
}
