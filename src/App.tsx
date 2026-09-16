import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IndexV2 from "./pages/IndexV2.tsx";
import HowItWorksPage from "./pages/HowItWorksPage.tsx";
import EVPotentialPage from "./pages/ev-potential/EVPotentialPage.tsx";
import InvestmentPage from "./pages/investment/InvestmentPage.tsx";
import BatterySwappingPage from "./pages/solutions/battery-swapping/BatterySwappingPage.tsx";
import DriverAppPage from "./pages/solutions/driver-app/DriverAppPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/v2" element={<IndexV2 />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/evpotential" element={<EVPotentialPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/investment/" element={<InvestmentPage />} />
          <Route path="/solutions/battery-swapping" element={<BatterySwappingPage />} />
          <Route path="/solutions/battery-swapping/" element={<BatterySwappingPage />} />
          <Route path="/solutions/driver-app" element={<DriverAppPage />} />
          <Route path="/solutions/driver-app/" element={<DriverAppPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
