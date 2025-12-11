import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  webp?: string;
}

const makeWebP = (src?: string) => {
  if (!src) return undefined;
  try {
    // If Unsplash-style URL, request webp via fm=webp
    if (src.includes('images.unsplash.com')) {
      return src + (src.includes('?') ? '&fm=webp' : '?fm=webp');
    }
    // Picsum supports format param
    if (src.includes('picsum.photos')) {
      return src + (src.includes('?') ? '&format=webp' : '?format=webp');
    }
    // Fallback: try replacing extension
    return src.replace(/\.(jpe?g|png)(\?|$)/i, '.webp$2');
  } catch (e) {
    return undefined;
  }
};

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, webp, ...rest }) => {
  const webpSrc = webp || makeWebP(src as string | undefined);
  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img loading="lazy" src={src} alt={alt} className={className} {...rest} />
    </picture>
  );
};

export default LazyImage;
