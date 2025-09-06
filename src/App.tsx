import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Dashboard } from '@/pages/Dashboard';
import { AgentSetup } from '@/pages/AgentSetup';
import { EditAgentPage } from '@/pages/EditAgentPage';
import { CallHistory } from '@/pages/CallHistory';
import { MyNumbers } from '@/pages/MyNumbers';
import { KnowledgeBase } from '@/pages/KnowledgeBase';
import { VoiceLab } from '@/pages/VoiceLab';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';
import { Providers } from '@/pages/Providers';
import { Billing } from '@/pages/Billing';
import { CommandPalette } from '@/components/CommandPalette';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="agents" element={<AgentSetup />} />
            <Route path="agents/:id/edit" element={<EditAgentPage />} />
            <Route path="providers" element={<Providers />} />
            <Route path="calls" element={<CallHistory />} />
            <Route path="numbers" element={<MyNumbers />} />
            <Route path="knowledge" element={<KnowledgeBase />} />
            <Route path="voice-lab" element={<VoiceLab />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster />
        <CommandPalette />
      </Router>
    </TooltipProvider>
  );
}

export default App;
