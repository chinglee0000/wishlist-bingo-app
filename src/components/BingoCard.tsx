import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface BingoCardProps {
  goal: string;
  category: string;
  rating: number; // 0, 1, 2, 3
  onClick: () => void;
  animationDelay?: number;
  isCompleted?: boolean;
  isLocked?: boolean;
}

// 邊框顏色和背景類別
const getRatingColor = (rating: number) => {
  switch (rating) {
    case 1:
      return "border-blue-400 rating-1";
    case 2:
      return "border-green-400 rating-2";
    case 3:
      return "border-yellow-400 rating-3";
    default:
      return "bg-white/10 border-white/20";
  }
};



const getGlowShadow = (rating: number) => {
  switch (rating) {
    case 1:
      return "0 0 12px 4px rgba(59, 130, 246, 0.6)"; // blue glow
    case 2:
      return "0 0 12px 4px rgba(34, 197, 94, 0.6)"; // green glow
    case 3:
      return "0 0 12px 4px rgba(234, 179, 8, 0.6)"; // yellow glow
    default:
      return "none";
  }
};

const getRatingStars = (rating: number) => {
  // 與 shareview 一致的星星顏色邏輯
  const filledClass = rating === 2 || rating === 3 ? "fill-black text-black" : "fill-white text-white";
  const unfilledClass = rating === 2 || rating === 3 ? "text-black/40" : "text-white/50";

  return Array.from({ length: 3 }, (_, index) => (
    <Star
      key={index}
      className={cn(
        "w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]",
        index < rating ? filledClass : unfilledClass
      )}
    />
  ));
};

export const BingoCard = ({
  goal,
  category,
  rating,
  onClick,
  animationDelay = 0,
  isCompleted = false,
  isLocked = false,
}: BingoCardProps) => {
  return (
    <div
      className={cn(
        "bingo-card relative w-full aspect-square min-h-0",
        "flex flex-col items-center justify-center text-center",
        "rounded-lg sm:rounded-xl border-2 animate-fade-in transition-all duration-300",
        "p-2 sm:p-3",
        getRatingColor(rating),
        // 與 shareview 一致的文字顏色邏輯
        rating === 2 || rating === 3 ? "text-black" : rating > 0 ? "text-white" : "text-card-foreground",
        isLocked ? "cursor-not-allowed" : "cursor-pointer"
      )}
      style={{
        animationDelay: `${animationDelay}ms`,
        transition: 'all 0.3s ease-in-out'
      }}
      onClick={isLocked ? undefined : onClick}
    >
      <div className="flex-1 flex items-center justify-center mb-1 sm:mb-2 min-h-0">
        <span
          className={cn(
            "text-xs sm:text-sm md:text-base font-medium leading-tight transition-all duration-300",
            "break-words hyphens-auto overflow-hidden text-center",
            rating > 0 ? "font-semibold" : undefined
          )}
        >
          {goal}
        </span>
      </div>

      <div className={cn("flex gap-0.5", rating === 0 ? "invisible" : "visible")}>
        {getRatingStars(rating)}
      </div>


    </div>
  );
};