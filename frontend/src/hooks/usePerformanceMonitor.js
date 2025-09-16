import { useState, useEffect, useCallback } from 'react';

const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    // Core Web Vitals
    fcp: null, // First Contentful Paint
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null, // Cumulative Layout Shift
    ttfb: null, // Time to First Byte
    
    // Custom metrics
    domContentLoaded: null,
    windowLoad: null,
    navigationStart: null,
    
    // Runtime metrics
    memoryUsage: null,
    connectionType: null,
    
    // API performance
    apiCallTimes: [],
    slowApiCalls: [],
    
    // Bundle metrics
    initialBundleSize: null,
    loadedChunks: [],
  });

  const [isSupported, setIsSupported] = useState(false);

  // Check if Performance API is supported
  useEffect(() => {
    setIsSupported(
      'performance' in window && 
      'getEntriesByType' in window.performance
    );
  }, []);

  // Measure Core Web Vitals
  const measureCoreWebVitals = useCallback(() => {
    if (!isSupported) return;

    // First Contentful Paint
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
      setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
    }

    // Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP observation not supported:', error);
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID observation not supported:', error);
    }

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS observation not supported:', error);
    }

    // Navigation timing
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const nav = navEntries[0];
      setMetrics(prev => ({
        ...prev,
        ttfb: nav.responseStart - nav.requestStart,
        domContentLoaded: nav.domContentLoadedEventEnd - nav.navigationStart,
        windowLoad: nav.loadEventEnd - nav.navigationStart,
        navigationStart: nav.navigationStart,
      }));
    }

    // Cleanup observers
    return () => {
      observer.disconnect?.();
      fidObserver.disconnect?.();
      clsObserver.disconnect?.();
    };
  }, [isSupported]);

  // Measure memory usage
  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      setMetrics(prev => ({
        ...prev,
        memoryUsage: {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit,
        },
      }));
    }
  }, []);

  // Detect connection type
  const detectConnection = useCallback(() => {
    if ('connection' in navigator) {
      setMetrics(prev => ({
        ...prev,
        connectionType: {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
        },
      }));
    }
  }, []);

  // Measure API call performance
  const measureApiCall = useCallback((url, startTime, endTime, status) => {
    const duration = endTime - startTime;
    const apiCall = {
      url,
      duration,
      status,
      timestamp: Date.now(),
    };

    setMetrics(prev => ({
      ...prev,
      apiCallTimes: [...prev.apiCallTimes, apiCall],
      slowApiCalls: duration > 1000 
        ? [...prev.slowApiCalls, apiCall]
        : prev.slowApiCalls,
    }));
  }, []);

  // Calculate performance score
  const calculatePerformanceScore = useCallback(() => {
    const { fcp, lcp, fid, cls } = metrics;
    
    if (!fcp || !lcp || fid === null || cls === null) return null;

    let score = 100;
    
    // FCP scoring (good: <1.8s, needs improvement: 1.8s-3s, poor: >3s)
    if (fcp > 3000) score -= 25;
    else if (fcp > 1800) score -= 10;
    
    // LCP scoring (good: <2.5s, needs improvement: 2.5s-4s, poor: >4s)
    if (lcp > 4000) score -= 30;
    else if (lcp > 2500) score -= 15;
    
    // FID scoring (good: <100ms, needs improvement: 100ms-300ms, poor: >300ms)
    if (fid > 300) score -= 25;
    else if (fid > 100) score -= 10;
    
    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (cls > 0.25) score -= 20;
    else if (cls > 0.1) score -= 10;
    
    return Math.max(0, score);
  }, [metrics]);

  // Get performance insights
  const getPerformanceInsights = useCallback(() => {
    const insights = [];
    const { fcp, lcp, fid, cls, apiCallTimes } = metrics;
    
    if (fcp > 3000) {
      insights.push({
        type: 'warning',
        metric: 'FCP',
        message: 'First Contentful Paint is slow. Consider optimizing critical resources.',
        value: fcp,
        recommendation: 'Reduce server response time, eliminate render-blocking resources.',
      });
    }
    
    if (lcp > 4000) {
      insights.push({
        type: 'error',
        metric: 'LCP',
        message: 'Largest Contentful Paint needs improvement.',
        value: lcp,
        recommendation: 'Optimize images, preload important resources, improve server response time.',
      });
    }
    
    if (fid > 300) {
      insights.push({
        type: 'warning',
        metric: 'FID',
        message: 'First Input Delay is high.',
        value: fid,
        recommendation: 'Reduce JavaScript execution time, split long tasks.',
      });
    }
    
    if (cls > 0.25) {
      insights.push({
        type: 'error',
        metric: 'CLS',
        message: 'Cumulative Layout Shift is too high.',
        value: cls,
        recommendation: 'Set dimensions for images and ads, avoid inserting content above existing content.',
      });
    }
    
    const slowApiCount = apiCallTimes.filter(call => call.duration > 1000).length;
    if (slowApiCount > 0) {
      insights.push({
        type: 'info',
        metric: 'API',
        message: `${slowApiCount} slow API calls detected.`,
        value: slowApiCount,
        recommendation: 'Optimize API responses, implement caching, use pagination.',
      });
    }
    
    return insights;
  }, [metrics]);

  // Initialize monitoring
  useEffect(() => {
    if (!isSupported) return;

    const cleanup = measureCoreWebVitals();
    measureMemoryUsage();
    detectConnection();

    // Update memory usage periodically
    const memoryInterval = setInterval(measureMemoryUsage, 30000);

    return () => {
      cleanup?.();
      clearInterval(memoryInterval);
    };
  }, [isSupported, measureCoreWebVitals, measureMemoryUsage, detectConnection]);

  return {
    metrics,
    isSupported,
    measureApiCall,
    calculatePerformanceScore,
    getPerformanceInsights,
    performanceScore: calculatePerformanceScore(),
    insights: getPerformanceInsights(),
  };
};

export default usePerformanceMonitor;