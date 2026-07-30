"use client";

import React, { useState } from 'react';
import { Upload, AlertTriangle, CheckCircle, XCircle, RefreshCw, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface DetailItem {
  car: string;
  reason: string;
}

interface ImportResponse {
  message: string;
  added?: number;
  skipped?: number;
  errors?: number;
  skippedDetails?: DetailItem[];
  errorDetails?: DetailItem[];
  error?: string;
}

interface ProgressState {
  current: number;
  total: number;
  percent: number;
  currentCar?: string;
  added: number;
  skipped: number;
  errors: number;
}

export const BulkUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [result, setResult] = useState<ImportResponse | null>(null);
  const [showSkipped, setShowSkipped] = useState(true);
  const [showErrors, setShowErrors] = useState(true);

  React.useEffect(() => {
    if (loading) {
      document.body.classList.add('bulk-upload-loading');
      const actionEls = document.querySelectorAll<HTMLElement>(
        'a[href*="/create"], .collection-list__header a, .collection-list__header button, .collection-list__controls button, .collection-list__controls a, .pill--has-link, .btn-header'
      );
      actionEls.forEach(el => {
        el.setAttribute('data-bulk-disabled', 'true');
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.4';
        el.style.cursor = 'not-allowed';
      });
    } else {
      document.body.classList.remove('bulk-upload-loading');
      const disabledEls = document.querySelectorAll<HTMLElement>('[data-bulk-disabled="true"]');
      disabledEls.forEach(el => {
        el.removeAttribute('data-bulk-disabled');
        el.style.pointerEvents = '';
        el.style.opacity = '';
        el.style.cursor = '';
      });
    }
    return () => {
      document.body.classList.remove('bulk-upload-loading');
      const disabledEls = document.querySelectorAll<HTMLElement>('[data-bulk-disabled="true"]');
      disabledEls.forEach(el => {
        el.removeAttribute('data-bulk-disabled');
        el.style.pointerEvents = '';
        el.style.opacity = '';
        el.style.cursor = '';
      });
    };
  }, [loading]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);
    setProgress({ current: 0, total: 0, percent: 0, currentCar: 'Reading CSV file...', added: 0, skipped: 0, errors: 0 });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/bulk-import', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Upload failed' }));
        setResult({ message: 'Import Failed', error: errorData.error || 'Server error' });
        setLoading(false);
        setProgress(null);
        return;
      }

      if (!res.body) {
        setResult({ message: 'Import Failed', error: 'Response stream unavailable' });
        setLoading(false);
        setProgress(null);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);
            if (event.type === 'init') {
              setProgress(prev => prev ? { ...prev, total: event.total, currentCar: 'Starting import...' } : null);
            } else if (event.type === 'progress') {
              const percent = event.total > 0 ? Math.round((event.current / event.total) * 100) : 0;
              setProgress({
                current: event.current,
                total: event.total,
                percent,
                currentCar: event.car,
                added: event.added ?? 0,
                skipped: event.skipped ?? 0,
                errors: event.errors ?? 0,
              });
            } else if (event.type === 'complete') {
              setResult({
                message: event.message,
                added: event.added,
                skipped: event.skipped,
                errors: event.errors,
                skippedDetails: event.skippedDetails,
                errorDetails: event.errorDetails,
              });
            } else if (event.type === 'error') {
              setResult({ message: 'Import Error', error: event.error });
            }
          } catch (errParse) {
            console.error('Error parsing stream event line:', line, errParse);
          }
        }
      }

      if (buffer.trim()) {
        try {
          const event = JSON.parse(buffer);
          if (event.type === 'complete') {
            setResult({
              message: event.message,
              added: event.added,
              skipped: event.skipped,
              errors: event.errors,
              skippedDetails: event.skippedDetails,
              errorDetails: event.errorDetails,
            });
          }
        } catch (e) {
          // Ignore trailing incomplete JSON
        }
      }
    } catch (err: any) {
      setResult({ message: 'Import Error', error: err.message || 'Network request failed' });
    } finally {
      setLoading(false);
      setProgress(null);
      e.target.value = '';
    }
  };

  return (
    <div style={{
      marginBottom: '20px',
      padding: '18px',
      backgroundColor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: '8px',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        body.bulk-upload-loading a[href*="/create"],
        body.bulk-upload-loading a[href*="/collections/cars/create"],
        body.bulk-upload-loading .collection-list__header button,
        body.bulk-upload-loading .collection-list__header a,
        body.bulk-upload-loading .collection-list__controls button,
        body.bulk-upload-loading .collection-list__controls a,
        body.bulk-upload-loading .list-controls button,
        body.bulk-upload-loading .list-controls a,
        body.bulk-upload-loading .pill--has-link,
        body.bulk-upload-loading .btn-header {
          pointer-events: none !important;
          opacity: 0.4 !important;
          cursor: not-allowed !important;
          user-select: none !important;
          filter: grayscale(0.8) !important;
        }
      `}</style>
      
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#fff' }}>Bulk Import CSV</h3>
      <p style={{ margin: '0 0 14px 0', fontSize: '13px', opacity: 0.7, color: '#ccc' }}>
        Upload a CSV file with car listings and Google Drive folder or image links. Existing records will be identified and skipped automatically.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <label style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: loading ? '#374151' : '#3b82f6',
          color: '#fff',
          padding: '9px 18px',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'background-color 0.2s',
        }}>
          {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
          {loading ? 'Importing Cars...' : 'Select CSV File'}
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={loading}
            style={{ display: 'none' }}
          />
        </label>

        {result && !loading && (
          <button
            onClick={() => window.location.reload()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ccc',
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            <RefreshCw size={14} /> Refresh Table
          </button>
        )}
      </div>

      {/* Progress Bar & Live Status Indicator */}
      {loading && progress && (
        <div style={{
          marginTop: '16px',
          padding: '14px 16px',
          backgroundColor: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#60a5fa' }}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Uploading & Processing Cars...
            </span>
            <span style={{ fontWeight: 700, color: '#38bdf8', fontSize: '14px' }}>
              {progress.percent}% {progress.total > 0 ? `(${progress.current}/${progress.total})` : ''}
            </span>
          </div>

          {/* Progress bar track */}
          <div style={{
            width: '100%',
            height: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '5px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: `${progress.percent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 50%, #22c55e 100%)',
              borderRadius: '5px',
              transition: 'width 0.3s ease-in-out',
              boxShadow: '0 0 12px rgba(59, 130, 246, 0.5)'
            }} />
          </div>

          {/* Current Item & Live Counters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '12px' }}>
            {progress.currentCar && (
              <span style={{ color: '#cbd5e1', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '320px' }}>
                <strong style={{ color: '#93c5fd' }}>Current:</strong> {progress.currentCar}
              </span>
            )}
            <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
              <span style={{ color: '#4ade80', fontWeight: 500 }}>Added: {progress.added}</span>
              <span style={{ color: '#facc15', fontWeight: 500 }}>Skipped: {progress.skipped}</span>
              <span style={{ color: '#f87171', fontWeight: 500 }}>Errors: {progress.errors}</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && !loading && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {result.error ? (
            <div style={{ padding: '10px 14px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '6px', color: '#f87171', fontSize: '14px' }}>
              <strong>Error:</strong> {result.error}
            </div>
          ) : (
            <>
              {/* Summary Badges */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  <CheckCircle size={14} /> Added: {result.added ?? 0}
                </span>

                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#facc15', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(234, 179, 8, 0.3)' }}>
                  <AlertTriangle size={14} /> Skipped: {result.skipped ?? 0}
                </span>

                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <XCircle size={14} /> Errors: {result.errors ?? 0}
                </span>
              </div>

              {/* Detailed Skipped List */}
              {result.skippedDetails && result.skippedDetails.length > 0 && (
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(234, 179, 8, 0.2)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div
                    onClick={() => setShowSkipped(!showSkipped)}
                    style={{ padding: '10px 14px', backgroundColor: 'rgba(234, 179, 8, 0.1)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 600, color: '#facc15' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertTriangle size={15} /> Skipped Items Breakdown ({result.skippedDetails.length})
                    </span>
                    {showSkipped ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {showSkipped && (
                    <ul style={{ margin: 0, padding: '10px 14px 10px 32px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                      {result.skippedDetails.map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#e5e7eb', lineHeight: '1.4' }}>
                          <strong style={{ color: '#fff' }}>{item.car}</strong> — <span style={{ color: '#fbbf24' }}>{item.reason}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Detailed Error List */}
              {result.errorDetails && result.errorDetails.length > 0 && (
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div
                    onClick={() => setShowErrors(!showErrors)}
                    style={{ padding: '10px 14px', backgroundColor: 'rgba(239, 68, 68, 0.1)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 600, color: '#f87171' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <XCircle size={15} /> Failed Items Breakdown ({result.errorDetails.length})
                    </span>
                    {showErrors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {showErrors && (
                    <ul style={{ margin: 0, padding: '10px 14px 10px 32px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                      {result.errorDetails.map((item, i) => (
                        <li key={i} style={{ fontSize: '13px', color: '#e5e7eb', lineHeight: '1.4' }}>
                          <strong style={{ color: '#fff' }}>{item.car}</strong> — <span style={{ color: '#f87171' }}>{item.reason}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
