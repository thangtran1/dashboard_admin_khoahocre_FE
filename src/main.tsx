import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./locales/i18n";
import "./global.css";
import "./theme/theme.css";
import App from "./App";
import { registerLocalIcons } from "./components/icon";
import { RouteLoadingProgress } from "./components/loading";

const charAt = `
  ╔═══════ TVT 4 ADMIN ═══════╗
  ║                           ║
  ║   Welcome To TVT Admin    ║
  ║  Built with React & Vite  ║
  ║                           ║
  ╚═══════════════════════════╝
`;
console.info(`%c${charAt}`, "color: #5BE49B; font-weight: bold;");

await registerLocalIcons();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HelmetProvider>
    <QueryClientProvider client={new QueryClient()}>
      <Suspense>
        <RouteLoadingProgress />
        {/* <Analytics /> theo dõi và phân tích dữ liệu người dùng trên ứng dụng */}
        <App />
      </Suspense>
    </QueryClientProvider>
  </HelmetProvider>
);

// worker.start({ onUnhandledRequest: "bypass" });
