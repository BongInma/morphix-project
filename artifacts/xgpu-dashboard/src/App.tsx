import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import NotFound from "@/pages/not-found";
import OmniDiff from "@/pages/OmniDiff";
import Home from "@/pages/Home";
import Join from "@/pages/Join";
import GridHealth from "@/pages/GridHealth";
import AptaFet from "@/pages/AptaFet";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={OmniDiff} />
      <Route path="/dashboard" component={Home} />
      <Route path="/join" component={Join} />
      <Route path="/grid-health" component={GridHealth} />
      <Route path="/aptafet" component={AptaFet} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-screen bg-obsidian">
            <Navbar />
            <main>
              <Router />
            </main>
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
