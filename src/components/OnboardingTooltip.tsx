import { useState, useEffect } from "react";

interface OnboardingTooltipProps {
  isVisible: boolean;
  onClose: () => void;
}

export const OnboardingTooltip = ({ isVisible, onClose }: OnboardingTooltipProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-black/80 backdrop-blur rounded-lg w-11/12 max-w-sm p-8 text-center flex flex-col items-center gap-6 border border-white/15">
        <h2 className="text-xl font-bold text-white">
          玩法提示
        </h2>
        <p className="text-white/80 text-base">
          點擊格子來標記進度，每個格子最多可以點擊三次喔！
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg w-full max-w-xs transition-opacity hover:opacity-90 hover:bg-blue-600"
        >
          我知道了
        </button>
      </div>
    </div>
  );
};
