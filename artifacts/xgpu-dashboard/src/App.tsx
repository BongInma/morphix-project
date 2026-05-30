import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

const MorphixLanding = lazy(() => import("@/pages/MorphixLanding"));
const OmniDiff = lazy(() => import("@/pages/OmniDiff"));
const GovernancePage = lazy(() => import("@/pages/GovernancePage"));
const Home = lazy(() => import("@/pages/Home"));
const Join = lazy(() => import("@/pages/Join"));
const GridHealth = lazy(() => import("@/pages/GridHealth"));
const AptaFet = lazy(() => import("@/pages/AptaFet"));
const Settings = lazy(() => import("@/pages/Settings"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-obsidian">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric border-t-transparent" />
        </div>
      }
    >
      <Switch>
        <Route path="/" component={MorphixLanding} />
        <Route path="/omnidiff" component={OmniDiff} />
        <Route path="/governance" component={GovernancePage} />
        <Route path="/dashboard" component={Home} />
        <Route path="/join" component={Join} />
        <Route path="/grid-health" component={GridHealth} />
        <Route path="/aptafet" component={AptaFet} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
