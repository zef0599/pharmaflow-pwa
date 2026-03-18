import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import POS from "@/pages/POS";
import Inventory from "@/pages/Inventory";
import Shortages from "@/pages/Shortages";
import Returns from "@/pages/Returns";
import Suppliers from "@/pages/Suppliers";
import Customers from "@/pages/Customers";
import Reports from "@/pages/Reports";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public landing */}
          <Route path="/" element={<Landing />} />

          {/* App routes */}
          <Route path="/app" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/app/pos" element={<AppLayout><POS /></AppLayout>} />
          <Route path="/app/inventory" element={<AppLayout><Inventory /></AppLayout>} />
          <Route path="/app/shortages" element={<AppLayout><Shortages /></AppLayout>} />
          <Route path="/app/returns" element={<AppLayout><Returns /></AppLayout>} />
          <Route path="/app/suppliers" element={<AppLayout><Suppliers /></AppLayout>} />
          <Route path="/app/customers" element={<AppLayout><Customers /></AppLayout>} />
          <Route path="/app/reports" element={<AppLayout><Reports /></AppLayout>} />
          <Route path="/app/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
