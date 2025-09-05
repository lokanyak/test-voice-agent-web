import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/pages/Dashboard';
import { AgentSetup } from '@/pages/AgentSetup';
import { CallHistory } from '@/pages/CallHistory';
import { MyNumbers } from '@/pages/MyNumbers';
import { KnowledgeBase } from '@/pages/KnowledgeBase';
import { VoiceLab } from '@/pages/VoiceLab';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agents" element={<AgentSetup />} />
          <Route path="calls" element={<CallHistory />} />
          <Route path="numbers" element={<MyNumbers />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="voice-lab" element={<VoiceLab />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
