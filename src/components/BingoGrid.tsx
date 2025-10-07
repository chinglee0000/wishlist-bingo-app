import { BingoCard } from "@/components/BingoCard";
import { ProgressBar } from "@/components/ProgressBar";
import { OnboardingTooltip } from "@/components/OnboardingTooltip";
import { Button } from "@/components/ui/button";
import { BingoGoal, BingoCategory } from "@/data/bingoGoals";
import { ArrowLeft, RotateCcw, Share2, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import { shareToInstagramStory } from "@/utils/instagramShare";
import { getBackgroundImage } from "@/utils/backgroundConfig";
import { useState, useEffect } from "react";

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

  // Onboarding tooltip state
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if this is the first time visiting a bingo page
    const hasSeenOnboarding = localStorage.getItem('bingoOnboardingSeen');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('bingoOnboardingSeen', 'true');
  };

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
      shareContainer.style.backgroundColor = 'transparent';
      shareContainer.style.borderRadius = '12px';
      shareContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';

      // 設置容器為相對定位以便背景圖片正確定位
      shareContainer.style.position = 'relative';

      // 創建背景圖片元素，而不是使用 CSS background-image
      const backgroundImg = document.createElement('img');
      backgroundImg.src = `${window.location.origin}/wishlist-bingo-app/backgrounds/bg-dark-blue.png`;
      backgroundImg.style.position = 'absolute';
      backgroundImg.style.top = '0';
      backgroundImg.style.left = '0';
      backgroundImg.style.width = '100%';
      backgroundImg.style.height = '100%';
      backgroundImg.style.objectFit = 'cover';
      backgroundImg.style.borderRadius = '12px';
      backgroundImg.style.zIndex = '0';

      // 等待背景圖片加載
      await new Promise((resolve, reject) => {
        backgroundImg.onload = resolve;
        backgroundImg.onerror = reject;
      });

      shareContainer.appendChild(backgroundImg);

      // 創建內容容器，避免 innerHTML 覆蓋背景圖片
      const contentDiv = document.createElement('div');
      contentDiv.style.position = 'relative';
      contentDiv.style.zIndex = '1';
      contentDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: white; font-size: 24px; font-weight: bold; margin-bottom: 8px;">
            <span class="material-icons" style="font-size: 24px; vertical-align: middle; margin-right: 8px;">${category.icon}</span>${categoryName}
          </h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(${gridSize}, 1fr); gap: 8px; margin-bottom: 20px;">
          ${goals.map(goal => {
            const rating = ratings.get(goal.id) || 0;
            const bgColor = rating === 1 ? '#3b82f6' : rating === 2 ? '#22c55e' : rating === 3 ? '#eab308' : 'rgba(255,255,255,0.1)';
            const textColor = rating === 2 || rating === 3 ? '#000' : '#fff';

            // 生成星星，對應 BingoCard 的邏輯
            const starsHtml = rating > 0 ? `
              <div style="display: flex; gap: 1px; justify-content: center;">
                ${Array.from({ length: 3 }, (_, index) => {
                  const isFilled = index < rating;
                  const starColor = rating === 2 || rating === 3 ? '#000' : '#fff';
                  if (isFilled) {
                    return `<span style="color: ${starColor}; font-size: 10px;">★</span>`;
                  } else {
                    return `<span style="font-size: 10px; -webkit-text-stroke: 1px ${starColor}; -webkit-text-fill-color: transparent; color: transparent;">★</span>`;
                  }
                }).join('')}
              </div>
            ` : '';

            return `
              <div style="
                background-color: ${bgColor};
                color: ${textColor};
                padding: 8px 8px 12px 8px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                aspect-ratio: 1;
                display: grid;
                grid-template-rows: 1fr auto;
                align-items: center;
                justify-items: center;
                word-wrap: break-word;
                hyphens: auto;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
              ">
                <div style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  line-height: 1.2;
                  width: 100%;
                  height: 100%;
                  overflow: visible;
                  position: relative;
                  z-index: 1;
                  ${rating > 0 ? 'transform: translateY(-8px);' : ''}
                ">
                  ${(() => {
                    const text = goal.text;
                    // 將文字分割成「字」的陣列，英文單詞(含數字)算一個字，中文字各自算一個字
                    const words = [];
                    let i = 0;
                    while (i < text.length) {
                      if (/[a-zA-Z0-9]/.test(text[i])) {
                        // 如果是英文字母或數字，找到整個英文單詞
                        let englishWord = '';
                        while (i < text.length && /[a-zA-Z0-9]/.test(text[i])) {
                          englishWord += text[i];
                          i++;
                        }
                        words.push(englishWord);
                      } else {
                        // 如果不是英文字母或數字，單個字符算一個字
                        words.push(text[i]);
                        i++;
                      }
                    }

                    const wordCount = words.length;

                    if (wordCount === 4) {
                      // 4個字：前2個字 + <br> + 後2個字
                      return words.slice(0, 2).join('') + '<br>' + words.slice(2, 4).join('');
                    } else if (wordCount === 5) {
                      // 5個字：前2個字 + <br> + 後3個字
                      return words.slice(0, 2).join('') + '<br>' + words.slice(2, 5).join('');
                    } else if (wordCount === 6) {
                      // 6個字：前3個字 + <br> + 後3個字
                      return words.slice(0, 3).join('') + '<br>' + words.slice(3, 6).join('');
                    } else {
                      return text;
                    }
                  })()}
                </div>
                <div style="height: ${rating > 0 ? 'auto' : '16px'}; display: flex; align-items: center; justify-content: center; ${rating > 0 ? 'margin-top: -8px;' : ''}">
                  ${starsHtml}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="text-align: center; color: rgba(255,255,255,0.6); font-size: 10px;">
          Powered by Zoo Financial
        </div>
      `;

      shareContainer.appendChild(contentDiv);
      document.body.appendChild(shareContainer);

      // 等待背景圖片和內容完全渲染
      await new Promise(resolve => setTimeout(resolve, 1000));

      const originalCanvas = await html2canvas(shareContainer, {
        backgroundColor: '#1a1a2e',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: 400,
        height: shareContainer.offsetHeight,
      });

      document.body.removeChild(shareContainer);

      // 如果背景圖片沒有正確渲染，我們手動添加背景
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = originalCanvas.width;
      finalCanvas.height = originalCanvas.height;
      const ctx = finalCanvas.getContext('2d');

      // 先繪製背景圖片
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        bgImg.onload = () => {
          // 繪製背景圖片
          ctx.drawImage(bgImg, 0, 0, finalCanvas.width, finalCanvas.height);
          // 然後繪製原始內容
          ctx.drawImage(originalCanvas, 0, 0);
          resolve();
        };
        bgImg.onerror = () => {
          // 如果背景圖片加載失敗，只繪製原始內容
          ctx.drawImage(originalCanvas, 0, 0);
          resolve();
        };
        bgImg.src = `${window.location.origin}/wishlist-bingo-app/backgrounds/bg-dark-blue.png`;
      });

      // 使用合成後的 canvas
      const canvas = finalCanvas;

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
          <span className="material-icons text-3xl">{category.icon}</span>
          {subcategoryName || category.name}
        </h1>
      </div>

      {/* Bingo Grid */}
      <div
        className={cn(
          "bingo-grid grid mb-8 animate-scale-in mx-auto",
          gridSize === 4 && "grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-lg md:max-w-2xl",
          gridSize === 5 && "grid-cols-5 gap-1.5 sm:gap-2 md:gap-3 max-w-sm sm:max-w-lg md:max-w-xl"
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

      {/* Footer with Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-20">
        <div className="container mx-auto p-4">
          <div className="flex flex-col space-y-3 max-w-md mx-auto">
            <Button
              onClick={isCompleted ? onReset : onComplete}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg h-12 px-4 text-base font-bold max-w-md",
                isCompleted
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              )}
            >
              {isCompleted ? (
                <>
                  <RotateCcw className="w-5 h-5" />
                  <span>重新開始</span>
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  <span>完成賓果</span>
                </>
              )}
            </Button>

            <Button
              onClick={handleShare}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 h-12 px-4 text-white text-base font-bold hover:bg-blue-600 max-w-md"
            >
              <Share2 className="w-5 h-5" />
              <span>分享成果</span>
            </Button>

            <Button
              onClick={onBackToHome}
              className="flex w-full items-center justify-center rounded-lg bg-gray-600 h-12 px-4 text-white text-base font-bold hover:bg-gray-700 max-w-md"
            >
              <span>再玩一張</span>
            </Button>
          </div>

          {/* Powered by text */}
          <div className="text-center mt-3">
            <span className="text-white/60 text-xs">Powered by Zoo Financial</span>
          </div>
        </div>
      </div>

      {/* Add bottom padding to prevent content being hidden behind footer */}
      <div className="h-48"></div>

      {/* Back Button - Bottom Right */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="fixed bottom-4 right-4 z-10 bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 p-0"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      {/* Onboarding Tooltip */}
      <OnboardingTooltip
        isVisible={showOnboarding}
        onClose={handleOnboardingClose}
      />
    </div>
  );
};