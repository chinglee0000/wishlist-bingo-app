import { BingoCard } from "@/components/BingoCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { BingoGoal, BingoCategory } from "@/data/bingoGoals";
import { ArrowLeft, RotateCcw, Share2, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import { shareToInstagramStory } from "@/utils/instagramShare";

interface BingoGridProps {
  goals: BingoGoal[];
  ratings: Map<string, number>;
  onGoalClick: (goalId: string) => void;
  onReset: () => void;
  onBack: () => void;
  onBackToHome: () => void;
  category: BingoCategory;
  subcategoryName?: string;
  gridSize: number;
  isCompleted: boolean;
  onComplete: () => void;
}

export const BingoGrid = ({
  goals,
  ratings,
  onGoalClick,
  onReset,
  onBack,
  onBackToHome,
  category,
  subcategoryName,
  gridSize,
  isCompleted,
  onComplete,
}: BingoGridProps) => {
  const { toast } = useToast();
  
  const completedCount = Array.from(ratings.values()).filter(rating => rating > 0).length;
  const totalCount = gridSize * gridSize;

  const handleShare = async () => {
    const categoryName = subcategoryName || category.name;

    try {
      toast({
        title: "正在準備分享...",
        description: "即將打開分享選項",
      });

      // 創建專門用於分享的容器，使用純 HTML 和內聯樣式（回到工作版本的方法）
      const shareContainer = document.createElement('div');
      shareContainer.style.position = 'fixed';
      shareContainer.style.top = '-9999px';
      shareContainer.style.left = '-9999px';
      shareContainer.style.width = '400px';
      shareContainer.style.padding = '20px';
      shareContainer.style.backgroundColor = '#1a1a2e';
      shareContainer.style.borderRadius = '12px';
      shareContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';

      shareContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: white; font-size: 24px; font-weight: bold; margin-bottom: 8px;">
            ${category.icon} ${categoryName}
          </h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(${gridSize}, 1fr); gap: 8px; margin-bottom: 20px;">
          ${goals.map(goal => {
            const rating = ratings.get(goal.id) || 0;
            const bgColor = rating === 1 ? '#3b82f6' : rating === 2 ? '#22c55e' : rating === 3 ? '#eab308' : 'rgba(255,255,255,0.1)';
            const textColor = rating === 3 ? '#000' : '#fff';

            // 生成星星，對應 BingoCard 的邏輯
            const starsHtml = rating > 0 ? `
              <div style="display: flex; gap: 2px; margin-top: 4px; justify-content: center;">
                ${Array.from({ length: 3 }, (_, index) => {
                  const isFilled = index < rating;
                  const starColor = rating === 3 ? (isFilled ? '#000' : 'rgba(0,0,0,0.3)') : (isFilled ? '#fff' : 'rgba(255,255,255,0.3)');
                  return `<span style="color: ${starColor}; font-size: 12px;">★</span>`;
                }).join('')}
              </div>
            ` : '';

            return `
              <div style="
                background-color: ${bgColor};
                color: ${textColor};
                padding: 8px 8px 12px 8px;
                border-radius: 8px;
                font-size: 12px;
                text-align: center;
                aspect-ratio: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                word-wrap: break-word;
                hyphens: auto;
                position: relative;
              ">
                <div style="flex: 1; display: flex; align-items: center; justify-content: center; line-height: 1.2;">
                  ${goal.text}
                </div>
                ${starsHtml}
              </div>
            `;
          }).join('')}
        </div>
        <div style="text-align: center; color: rgba(255,255,255,0.6); font-size: 10px;">
          Powered by Zoo Financial
        </div>
      `;

      document.body.appendChild(shareContainer);

      const canvas = await html2canvas(shareContainer, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      document.body.removeChild(shareContainer);

      const success = await shareToInstagramStory(canvas);

      if (success) {
        toast({
          title: "分享成功！",
          description: "已成功分享到 Instagram 限時動態",
        });
      }
    } catch (error) {
      console.error('分享失敗:', error);
      toast({
        title: "分享失敗",
        description: "請稍後再試",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bingo-container relative">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          {subcategoryName || category.name}
        </h1>
      </div>

      {/* Bingo Grid */}
      <div
        className={cn(
          "bingo-grid grid gap-2 sm:gap-3 md:gap-4 mb-8 animate-scale-in mx-auto max-w-lg md:max-w-2xl",
          gridSize === 4 && "grid-cols-4",
          gridSize === 5 && "grid-cols-5"
        )}
      >
        {Array.from({ length: totalCount }, (_, index) => {
          const goal = goals[index];
          if (!goal) return (
            <div key={`empty-${index}`} className="aspect-square" />
          );
          
          return (
            <BingoCard
              key={goal.id}
              goal={goal.text}
              category={goal.category}
              rating={ratings.get(goal.id) || 0}
              onClick={() => onGoalClick(goal.id)}
              animationDelay={index * 50}
              isCompleted={isCompleted}
              isLocked={isCompleted}
            />
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 sm:gap-3 justify-center animate-fade-in px-4" style={{ animationDelay: '500ms' }}>
        {/* First row: Complete/Reset and Play Again buttons (side by side on mobile) */}
        <div className="flex gap-2 sm:gap-3">
          <Button
            variant="secondary"
            onClick={isCompleted ? onReset : onComplete}
            className={cn(
              "text-sm sm:text-base min-h-[44px] flex-1 backdrop-blur-sm",
              isCompleted 
                ? "bg-white/20 text-white border-white/30 hover:bg-white/30" 
                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 hover:from-yellow-600 hover:to-orange-600 shadow-lg"
            )}
          >
            {isCompleted ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                重新開始
              </>
            ) : (
              <>
                <Trophy className="w-4 h-4 mr-2" />
                完成賓果
              </>
            )}
          </Button>
          <Button
            onClick={onBackToHome}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm text-sm sm:text-base min-h-[44px] flex-1"
          >
            再玩一張BINGO
          </Button>
        </div>
        
        {/* Second row: Share button (full width) */}
        <Button
          onClick={handleShare}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 shadow-lg text-sm sm:text-base min-h-[44px] w-full"
        >
          <Share2 className="w-4 h-4 mr-2" />
          分享
        </Button>
        
        {/* Powered by text */}
        <div className="text-center mt-2">
          <span className="text-white/60 text-xs">Powered by Zoo Financial</span>
        </div>
      </div>

      {/* Back Button - Bottom Right */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="fixed bottom-4 right-4 z-10 bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 p-0"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
    </div>
  );
};