import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  fallbackText?: string;
  containerClassName?: string;
  loading?: "lazy" | "eager";
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackText = "Image not available",
  containerClassName = "",
  className = "",
  onError,
  ...props 
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    console.log("ImageWithFallback trying to load:", src);
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg p-4 ${containerClassName} ${className}`}>
        <ImageOff className="h-8 w-8 mb-2 opacity-50" />
        <span className="text-xs font-medium text-center">{fallbackText}</span>
        {src && <span className="text-[10px] mt-1 opacity-50 break-all">{src.split('/').pop()}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setHasError(true);
        if (onError) onError(e);
      }}
      {...props}
    />
  );
}
