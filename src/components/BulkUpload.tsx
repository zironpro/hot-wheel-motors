"use client";

import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export const BulkUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage('Uploading and processing...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/bulk-import', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Success: ${data.message}`);
        // Optionally refresh page to show new cars
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Bulk Import CSV</h3>
      <p style={{ margin: '0 0 10px 0', fontSize: '13px', opacity: 0.7 }}>
        Upload a CSV file with columns: <code>make, model, slug, year, price, engine, kmDriven, color, vin, image_url, description, features</code>
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <label style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', 
          backgroundColor: '#fff', color: '#000', padding: '8px 16px', 
          borderRadius: '4px', cursor: 'pointer', fontSize: '14px',
          fontWeight: 500,
        }}>
          <Upload size={16} />
          {loading ? 'Processing...' : 'Select CSV File'}
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
            disabled={loading}
            style={{ display: 'none' }} 
          />
        </label>
        {message && <span style={{ fontSize: '14px', color: message.startsWith('Error') ? '#ff4d4f' : '#52c41a' }}>{message}</span>}
      </div>
    </div>
  );
};
