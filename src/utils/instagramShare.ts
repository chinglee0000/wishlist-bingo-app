import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export const shareToInstagramStory = async (canvas: HTMLCanvasElement): Promise<boolean> => {
  try {
    if (!Capacitor.isNativePlatform()) {
      // Web fallback - 嘗試使用 Web Share API
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });

      if (navigator.share && navigator.canShare?.({ files: [new File([blob], 'bingo.png', { type: 'image/png' })] })) {
        await navigator.share({
          files: [new File([blob], 'bingo.png', { type: 'image/png' })],
          title: '我的賓果成果'
        });
        return true;
      } else {
        // 降級到下載
        const link = document.createElement('a');
        link.download = 'bingo-story.png';
        link.href = canvas.toDataURL();
        link.click();
        return false;
      }
    }

    // 轉換 canvas 為 base64
    const base64Data = canvas.toDataURL('image/png').split(',')[1];

    // 儲存到暫存檔案
    const fileName = `bingo_${Date.now()}.png`;
    const result = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Cache,
    });

    // 使用 Capacitor Share plugin 直接分享
    await Share.share({
      title: '我的賓果成果',
      text: '看看我的許願賓果進度！',
      files: [result.uri],
      dialogTitle: '分享到 Instagram'
    });

    return true;
  } catch (error) {
    console.error('Failed to share to Instagram Story:', error);
    return false;
  }
};

