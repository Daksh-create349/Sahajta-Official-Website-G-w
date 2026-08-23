import React from 'react';
import { cn } from '@/lib/utils';
import logoImg from '@/assets/sahajta-logo.png';

interface SahajtaLogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  imgClassName?: string;
}

export function SahajtaLogo({ className, imgClassName, ...props }: SahajtaLogoProps) {
  return (
    <a
      href="#top"
      aria-label="Sahajta AI Home"
      className={cn(
        'group/logo inline-flex items-center select-none transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer',
        className
      )}
      {...props}
    >
      <img
        src={logoImg}
        alt="Sahajta AI"
        width={178}
        height={90}
        loading="eager"
        decoding="async"
        className={cn('w-auto object-contain shrink-0', imgClassName || 'h-7 md:h-7.5')}
      />
    </a>
  );
}
