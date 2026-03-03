import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast.jsx';
import Sidebar from './components/Sidebar.jsx';
import HubPage from './pages/HubPage.jsx';
import FinancesPage from './pages/FinancesPage.jsx';
import FitnessPage from './pages/FitnessPage.jsx';
import HabitsPage from './pages/HabitsPage.jsx';
import VaultPage from './pages/VaultPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <div style={{
          display: 'flex',
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--surface-0)',
        }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <main style={{
            flex: 1,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            height: '100dvh',
            backgroundColor: 'var(--surface-0)',
          }}>
            <Routes>
              <Route path="/" element={<HubPage />} />
              <Route path="/finances" element={<FinancesPage />} />
              <Route path="/fitness" element={<FitnessPage />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/vault" element={<VaultPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </HashRouter>
  );
}
