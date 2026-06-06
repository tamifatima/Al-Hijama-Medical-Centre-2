import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const icons = { success: '✅', error: '❌', warning: '⚠️' };

  return (
    <div className={`toast ${toast.type}`}>
      <span className="toast-icon">{icons[toast.type] || '✅'}</span>
      <span className="toast-msg">{toast.msg}</span>
    </div>
  );
}
