import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Producers from "./pages/Producers.tsx";
import Access from "./pages/Access.tsx";
import News from "./pages/News.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProducers from "./pages/admin/AdminProducers.tsx";
import AdminNews from "./pages/admin/AdminNews.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/producers" element={<Producers />} />
          <Route path="/access" element={<Access />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="producers" element={<AdminProducers />} />
            <Route path="news" element={<AdminNews />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
