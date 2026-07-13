import React from 'react';
import { Image, Upload } from 'lucide-react';

interface ImagePlaceholderProps {
  key?: React.Key;
  title: string;
  description?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  className?: string;
}

export default function ImagePlaceholder({
  title,
  description,
  aspectRatio = 'video',
  className = '',
}: ImagePlaceholderProps) {
  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: 'h-full w-full',
  }[aspectRatio];

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-dashed border-stone-200 bg-stone-50/50 p-4 transition-all hover:border-blue-400 hover:bg-stone-50 md:p-6 ${aspectClass} flex flex-col items-center justify-center text-center ${className}`}
    >
      {/* Background soft pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="flex flex-col items-center max-w-xs space-y-3 z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xs border border-stone-100 group-hover:scale-110 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all duration-300">
          <Image className="h-5 w-5 text-stone-400 group-hover:text-blue-500 transition-colors" />
        </div>
        
        <div className="space-y-1">
          <h4 className="font-display text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-stone-400 group-hover:text-stone-500 transition-colors">
              {description}
            </p>
          )}
        </div>
        
        <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 group-hover:bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-stone-500 group-hover:text-blue-600 transition-colors">
          <Upload className="h-2.5 w-2.5" /> Chờ bổ sung ảnh
        </span>
      </div>
    </div>
  );
}
