import { BingoCard } from "@/components/BingoCard";
import { BingoShareView } from "@/components/BingoShareView";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { BingoGoal, BingoCategory } from "@/data/bingoGoals";
import { ArrowLeft, RotateCcw, Share2, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import { shareToInstagramStory } from "@/utils/instagramShare";
import { createRoot } from "react-dom/client";

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
    try {
      toast({
        title: "正在準備分享...",
        description: "即將打開分享選項",
      });

      // 創建一個臨時的 div 來渲染分享視圖
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '375px'; // 模擬移動端寬度
      tempDiv.style.height = 'auto'; // 讓內容決定高度
      document.body.appendChild(tempDiv);

      // 渲染 BingoShareView 到臨時 div
      const root = createRoot(tempDiv);

      // 等待渲染完成
      await new Promise<void>((resolve) => {
        root.render(
          <BingoShareView
            goals={goals}
            ratings={ratings}
            category={category}
            subcategoryName={subcategoryName}
            gridSize={gridSize}
            isCompleted={isCompleted}
          />
        );

        // 給 React 一些時間來渲染
        setTimeout(resolve, 100);
      });

      // 生成 canvas
      const canvas = await html2canvas(tempDiv, {
        backgroundColor: '#0f0f23',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        removeContainer: true,
      });

      // 清理臨時元素
      root.unmount();
      document.body.removeChild(tempDiv);

      // 測試：直接下載圖片來檢查 canvas 是否正常
      const link = document.createElement('a');
      link.download = 'bingo-share.png';
      link.href = canvas.toDataURL();
      link.click();

      // 然後再嘗試分享
      const success = await shareToInstagramStory(canvas);

      if (success) {
        toast({
          title: "分享成功！",
          description: "已打開分享選項",
        });
      } else {
        toast({
          title: "已準備圖片",
          description: "請選擇分享方式",
        });
      }

    } catch (error) {
      console.error('Share failed:', error);
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