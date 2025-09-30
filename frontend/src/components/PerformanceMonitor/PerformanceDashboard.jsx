import React, { useState, useEffect } from 'react';
import usePerformanceMonitor from '../../hooks/usePerformanceMonitor';
import './PerformanceDashboard.css';

const PerformanceDashboard = ({ isDevelopment = false }) => {
  const { 
    metrics, 
    isSupported, 
    performanceScore, 
    insights 
  } = usePerformanceMonitor();
  
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('vitals');

  // Only show in development or when explicitly enabled
  useEffect(() => {
    const shouldShow = isDevelopment || 
      localStorage.getItem('show-performance-dashboard') === 'true' ||
      new URLSearchParams(window.location.search).has('perf');
    
    setIsVisible(shouldShow);
  }, [isDevelopment]);

  // Keyboard shortcut to toggle dashboard (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setIsVisible(prev => {
          const newValue = !prev;
          localStorage.setItem('show-performance-dashboard', newValue.toString());
          return newValue;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isVisible || !isSupported) return null;

  const formatTime = (ms) => {
    if (ms === null || ms === undefined) return '--';
    return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(2)}s`;
  };

  const formatBytes = (bytes) => {
    if (!bytes) return '--';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#22c55e'; // green
    if (score >= 70) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getMetricColor = (metric, value) => {
    if (value === null || value === undefined) return '#6b7280';
    
    switch (metric) {
      case 'fcp':
        return value <= 1800 ? '#22c55e' : value <= 3000 ? '#f59e0b' : '#ef4444';
      case 'lcp':
        return value <= 2500 ? '#22c55e' : value <= 4000 ? '#f59e0b' : '#ef4444';
      case 'fid':
        return value <= 100 ? '#22c55e' : value <= 300 ? '#f59e0b' : '#ef4444';
      case 'cls':
        return value <= 0.1 ? '#22c55e' : value <= 0.25 ? '#f59e0b' : '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const renderVitalsTab = () => (
    <div className="perf-tab-content">
      <div className="perf-score-card">
        <h3>Performance Score</h3>
        <div 
          className="perf-score"
          style={{ color: getScoreColor(performanceScore || 0) }}
        >
          {performanceScore ? Math.round(performanceScore) : '--'}
        </div>
      </div>
      
      <div className="perf-metrics-grid">
        <div className="perf-metric">
          <span className="metric-label">FCP</span>
          <span 
            className="metric-value"
            style={{ color: getMetricColor('fcp', metrics.fcp) }}
          >
            {formatTime(metrics.fcp)}
          </span>
        </div>
        
        <div className="perf-metric">
          <span className="metric-label">LCP</span>
          <span 
            className="metric-value"
            style={{ color: getMetricColor('lcp', metrics.lcp) }}
          >
            {formatTime(metrics.lcp)}
          </span>
        </div>
        
        <div className="perf-metric">
          <span className="metric-label">FID</span>
          <span 
            className="metric-value"
            style={{ color: getMetricColor('fid', metrics.fid) }}
          >
            {formatTime(metrics.fid)}
          </span>
        </div>
        
        <div className="perf-metric">
          <span className="metric-label">CLS</span>
          <span 
            className="metric-value"
            style={{ color: getMetricColor('cls', metrics.cls) }}
          >
            {metrics.cls !== null ? metrics.cls.toFixed(3) : '--'}
          </span>
        </div>
        
        <div className="perf-metric">
          <span className="metric-label">TTFB</span>
          <span className="metric-value">
            {formatTime(metrics.ttfb)}
          </span>
        </div>
        
        <div className="perf-metric">
          <span className="metric-label">Load</span>
          <span className="metric-value">
            {formatTime(metrics.windowLoad)}
          </span>
        </div>
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div className="perf-tab-content">
      {metrics.memoryUsage && (
        <div className="perf-memory-card">
          <h4>Memory Usage</h4>
          <div className="memory-info">
            <div className="memory-item">
              <span>Used:</span>
              <span>{formatBytes(metrics.memoryUsage.used)}</span>
            </div>
            <div className="memory-item">
              <span>Total:</span>
              <span>{formatBytes(metrics.memoryUsage.total)}</span>
            </div>
            <div className="memory-item">
              <span>Limit:</span>
              <span>{formatBytes(metrics.memoryUsage.limit)}</span>
            </div>
          </div>
        </div>
      )}
      
      {metrics.connectionType && (
        <div className="perf-connection-card">
          <h4>Connection</h4>
          <div className="connection-info">
            <div className="connection-item">
              <span>Type:</span>
              <span>{metrics.connectionType.effectiveType}</span>
            </div>
            <div className="connection-item">
              <span>Downlink:</span>
              <span>{metrics.connectionType.downlink} Mbps</span>
            </div>
            <div className="connection-item">
              <span>RTT:</span>
              <span>{metrics.connectionType.rtt}ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInsightsTab = () => (
    <div className="perf-tab-content">
      {insights.length > 0 ? (
        <div className="perf-insights">
          {insights.map((insight, index) => (
            <div key={index} className={`insight insight-${insight.type}`}>
              <div className="insight-header">
                <span className="insight-metric">{insight.metric}</span>
                <span className="insight-value">
                  {typeof insight.value === 'number' && insight.metric !== 'API' 
                    ? formatTime(insight.value) 
                    : insight.value}
                </span>
              </div>
              <p className="insight-message">{insight.message}</p>
              <p className="insight-recommendation">{insight.recommendation}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-insights">
          <p>🎉 Great! No performance issues detected.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="performance-dashboard">
      <div className="perf-header">
        <h2>Performance Monitor</h2>
        <button 
          className="perf-close"
          onClick={() => setIsVisible(false)}
          title="Close (Ctrl+Shift+P to toggle)"
        >
          ×
        </button>
      </div>
      
      <div className="perf-tabs">
        <button 
          className={`perf-tab ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          Web Vitals
        </button>
        <button 
          className={`perf-tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
        <button 
          className={`perf-tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights ({insights.length})
        </button>
      </div>
      
      {activeTab === 'vitals' && renderVitalsTab()}
      {activeTab === 'resources' && renderResourcesTab()}
      {activeTab === 'insights' && renderInsightsTab()}
      
      <div className="perf-footer">
        <small>Press Ctrl+Shift+P to toggle this dashboard</small>
      </div>
    </div>
  );
};

export default PerformanceDashboard;