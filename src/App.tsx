
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Calendario from "./pages/Calendario";
import Conversas from "./pages/Conversas";
import Disparo from "./pages/Disparo";
import GestaoFunil from "./pages/GestaoFunil";
import Equipe from "./pages/Equipe";
import Financeiro from "./pages/Financeiro";
import Contratos from "./pages/Contratos";
import PaginasEmbed from "./pages/PaginasEmbed";
import AgentesIA from "./pages/AgentesIA";
import WhatsApp from "./pages/WhatsApp";
import Marcadores from "./pages/Marcadores";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendario" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Calendario />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/conversas" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Conversas />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/disparo" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Disparo />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/gestao-funil" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <GestaoFunil />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/equipe" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Equipe />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/financeiro" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Financeiro />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contratos" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Contratos />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/paginas-embed" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <PaginasEmbed />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/agentes" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <AgentesIA />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/whatsapp" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <WhatsApp />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/marcadores" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Marcadores />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
