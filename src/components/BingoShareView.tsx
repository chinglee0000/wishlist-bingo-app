import { BingoGoal, BingoCategory } from "@/data/bingoGoals";
import { cn } from "@/lib/utils";

interface BingoShareViewProps {
  goals: BingoGoal[];
  ratings: Map<string, number>;
  category: BingoCategory;
  subcategoryName?: string;
  gridSize: number;
  isCompleted?: boolean;
}

const getRatingColor = (rating: number) => {
  switch (rating) {
    case 1: return "bg-blue-500 border-blue-400";
    case 2: return "bg-green-500 border-green-400";
    case 3: return "bg-yellow-500 border-yellow-400";
    default: return "bg-white/10 border-white/20";
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
  return Array.from({ length: 3 }, (_, index) => (
    <span
      key={index}
      className={cn(
        "inline-block w-2 h-2 text-xs leading-none",
        "drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]",
        index < rating ? "text-white" : rating === 3 ? "text-black/40" : "text-white/50"
      )}
      style={{
        filter: index < rating ? 'drop-shadow(0 0 2px rgba(0,0,0,0.25))' : undefined,
        fontSize: '8px'
      }}
    >
      ★
    </span>
  ));
};

export const BingoShareView = ({
  goals,
  ratings,
  category,
  subcategoryName,
  gridSize,
  isCompleted = false,
}: BingoShareViewProps) => {
  const totalCount = gridSize * gridSize;

  return (
    <div className="w-full mx-auto p-4" style={{ backgroundColor: '#0f0f23' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          {subcategoryName || category.name}
        </h1>
      </div>

      {/* Bingo Grid */}
      <div
        className={cn(
          "grid gap-2 mb-6 mx-auto w-full max-w-sm",
          gridSize === 4 && "grid-cols-4",
          gridSize === 5 && "grid-cols-5"
        )}
      >
        {Array.from({ length: totalCount }, (_, index) => {
          const goal = goals[index];
          if (!goal) return <div key={`empty-${index}`} className="aspect-square" />;
          
          const rating = ratings.get(goal.id) || 0;
          
          return (
            <div
              key={goal.id}
              className={cn(
                "bingo-card relative w-full aspect-square min-h-0 group",
                "flex flex-col items-center justify-center text-center",
                "rounded-lg sm:rounded-xl border-2 animate-fade-in transition-all duration-300",
                "p-2",
                getRatingColor(rating),
                rating === 3 ? "text-black" : rating > 0 ? "text-white" : "text-card-foreground"
              )}
              style={{
                backgroundImage: rating > 0 ? 'none' : undefined,
                boxShadow: isCompleted && rating > 0 ? getGlowShadow(rating) : undefined,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <div className="flex-1 flex items-center justify-center mb-1 min-h-0">
                <span
                  style={{ fontSize: '10px', lineHeight: '1.3', transform: 'translateY(-4px)' }}
                  className={cn(
                    "font-medium transition-all duration-300",
                    "break-words hyphens-auto",
                    rating > 0 ? "font-semibold" : undefined
                  )}
                >
                  {goal.text}
                </span>
              </div>

              {rating > 0 && <div className="flex gap-0.5">{getRatingStars(rating)}</div>}
            </div>
          );
        })}
      </div>

      {/* Powered by text */}
      <div className="text-center">
        <span className="text-white/60 text-sm">Powered by Zoo Financial</span>
      </div>
    </div>
  );
};
