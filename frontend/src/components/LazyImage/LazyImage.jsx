import React, { useState, useRef, useEffect } from 'react';
import './LazyImage.css';

const LazyImage = ({ 
  src, 
  alt, 
  placeholder, 
  className = '', 
  width, 
  height, 
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
  onError,
  enableWebP = true,
  quality = 80,
  sizes
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef(null);
  const observerRef = useRef(null);

  // Generate WebP source if supported
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc || !enableWebP) return originalSrc;
    
    // Check if browser supports WebP
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    // If original is already WebP or doesn't support WebP, return original
    if (originalSrc.includes('.webp') || !supportsWebP()) {
      return originalSrc;
    }

    // Try to convert to WebP (this would typically be done on the server)
    // For now, we'll just return the original source
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || loading !== 'lazy') {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.unobserve(imageRef.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imageRef.current) {
      observerRef.current.observe(imageRef.current);
    }

    return () => {
      if (observerRef.current && imageRef.current) {
        observerRef.current.unobserve(imageRef.current);
      }
    };
  }, [loading]);

  // Load image when in view
  useEffect(() => {
    if (isInView && src && !imageSrc) {
      const optimizedSrc = getOptimizedSrc(src);
      setImageSrc(optimizedSrc);
    }
  }, [isInView, src, imageSrc, enableWebP]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(false);
    if (onError) onError(e);
    
    // Fallback to original src if WebP fails
    if (enableWebP && imageSrc !== src) {
      setImageSrc(src);
      setHasError(false);
    }
  };

  const getPlaceholderSrc = () => {
    if (placeholder) return placeholder;
    
    // Generate a simple placeholder SVG
    const placeholderWidth = width || 300;
    const placeholderHeight = height || 200;
    
    const svgPlaceholder = `data:image/svg+xml;base64,${btoa(`
      <svg width="${placeholderWidth}" height="${placeholderHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="14" fill="#999">
          Loading...
        </text>
      </svg>
    `)}`;
    
    return svgPlaceholder;
  };

  const containerStyles = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    position: 'relative',
    overflow: 'hidden',
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <div 
      ref={imageRef}
      className={`lazy-image-container ${className}`}
      style={containerStyles}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={getPlaceholderSrc()}
          alt=""
          className="lazy-image-placeholder"
          style={{
            ...imageStyles,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      
      {/* Main image */}
      {isInView && imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          style={{
            ...imageStyles,
            opacity: isLoaded ? 1 : 0,
            zIndex: 2,
          }}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          loading={loading === 'lazy' ? 'lazy' : 'eager'}
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="lazy-image-error">
          <svg width="40" height="40" fill="#ccc">
            <rect width="40" height="30" stroke="#ccc" strokeWidth="2" fill="none"/>
            <circle cx="32" cy="8" r="3" fill="#ccc"/>
            <polyline points="20,25 28,17 35,25" stroke="#ccc" strokeWidth="2" fill="none"/>
          </svg>
          <p>Failed to load image</p>
        </div>
      )}
      
      {/* Loading indicator */}
      {isInView && imageSrc && !isLoaded && !hasError && (
        <div className="lazy-image-loading">
          <div className="loading-spinner-small"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;