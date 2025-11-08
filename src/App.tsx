import Logo from "@/assets/images/logo.png";
import Router from "@/router/index";
import { Helmet } from "react-helmet-async";
import { MotionLazy } from "./components/admin/animate/motion-lazy";
import Toast from "./components/common/toast";
import { AntdAdapter } from "./theme/adapter/antd.adapter";
import { ThemeProvider } from "./theme/theme-provider";
import SimpleChatWrapper from "./components/common/chat/SimpleChatWrapper";
import { SystemSettingsProvider } from "./contexts/SystemSettingsContext";
import { ConsoleWarning } from "./components/user/security/console-warning";
function App() {
  return (
    <SystemSettingsProvider>
      <ThemeProvider adapters={[AntdAdapter]}>
        <Helmet>
          <title>TVT Admin | Học lập trình</title>
          <link rel="icon" href={Logo} />
        </Helmet>
        <ConsoleWarning />
        <Toast />
        <MotionLazy>
          <Router />
        </MotionLazy>
        <SimpleChatWrapper />
      </ThemeProvider>
    </SystemSettingsProvider>
  );
}

export default App;
