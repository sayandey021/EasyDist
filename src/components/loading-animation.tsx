'use client';

const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center space-x-1.5">
      <div className="h-2 w-2 animate-pulse-fast rounded-full bg-primary [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-pulse-fast rounded-full bg-primary [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-pulse-fast rounded-full bg-primary" />
    </div>
  );
};

export default LoadingAnimation;
