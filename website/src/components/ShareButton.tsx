"use client";
import { IJournal } from "@/lib/strapiApiCall";
import { Share2 } from "lucide-react";

function ShareButton({ post }: { post: IJournal }) {
  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.slug,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-1 hover:text-heirloom-gold transition-colors cursor-pointer"
    >
      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span>Share</span>
    </button>
  );
}

export default ShareButton;
