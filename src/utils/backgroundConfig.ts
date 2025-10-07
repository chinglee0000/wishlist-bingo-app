export const backgroundImages = {
  main: '/backgrounds/bg-blue-green.png',
  shareview: '/backgrounds/bg-dark-blue.png',
} as const;

export type BackgroundType = keyof typeof backgroundImages;

export const getBackgroundImage = (type: BackgroundType): string => {
  return backgroundImages[type];
};

export const getBackgroundStyle = (type: BackgroundType) => {
  const imageUrl = getBackgroundImage(type);
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: type === 'main' ? 'fixed' : 'scroll',
  };
};
