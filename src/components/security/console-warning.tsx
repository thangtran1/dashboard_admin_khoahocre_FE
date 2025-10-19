"use client";

import { useEffect } from "react";

export function TerminalSecurityUI() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    /* eslint-disable no-console */

    const createASCIIArt = () => {
      const art = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ████████╗██╗   ██╗████████╗     █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗   ║
║   ╚══██╔══╝██║   ██║╚══██╔══╝    ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║   ║
║      ██║   ██║   ██║   ██║       ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║   ║
║      ██║   ╚██╗ ██╔╝   ██║       ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║   ║
║      ██║    ╚████╔╝    ██║       ██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║   ║
║      ╚═╝     ╚═══╝     ╚═╝       ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝   ║
║                                                                              ║
║                        🛡️  SECURITY PROTECTION SYSTEM  🛡️                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`;
      return art;
    };

    const infoTable = `
┌─────────────────────────────────────────────────────────────────────────────┐
│                           🚨 CẢNH BÁO BẢO MẬT QUAN TRỌNG 🚨                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ⚠️  Nếu ai đó yêu cầu bạn sao chép/dán mã vào Console — DỪNG NGAY!         │
│  🎯 Kẻ tấn công có thể: chiếm tài khoản, lấy dữ liệu, hoặc giao dịch trái phép │
│  🛡️  Bảo vệ: Không dán mã lạ, chỉ tin nguồn chính thức                       │
│  📚 Thêm: https://en.wikipedia.org/wiki/Self-XSS                             │
└─────────────────────────────────────────────────────────────────────────────┘
`;

    const footer = `
╔══════════════════════════════════════════════════════════════════════════════╗
║  🚀 Bạn có kỹ năng lập trình? Hãy gia nhập TVT Admin Team!                  ║
║  💪 Cùng tạo ra những sản phẩm tuyệt vời!                                   ║
║              Made with ❤️ by TVT Admin Security Team                        ║
╚══════════════════════════════════════════════════════════════════════════════╝
`;

    const displaySecurityUI = () => {
      console.clear();
      console.log(
        "%c" + createASCIIArt(),
        "color: #3b82f6; font-family: monospace; font-weight: bold;"
      );
      console.log(
        "%c" + infoTable,
        "color: #dc2626; font-family: monospace; font-size: 12px; background: #fef2f2; padding: 8px;"
      );

      let blinkCount = 0;
      const blink = setInterval(() => {
        if (blinkCount++ < 4)
          console.log(
            blinkCount % 2
              ? "%c🚨 NGUY HIỂM - ĐÓNG CONSOLE NGAY! 🚨"
              : "%c                                               ",
            "color: #fff; background: #dc2626; font-size: 16px; font-weight: bold; padding: 10px;"
          );
        else clearInterval(blink);
      }, 500);

      setTimeout(() => {
        console.log(
          "%c" + footer,
          "color: #7c3aed; font-family: monospace; font-weight: bold;"
        );
        console.log(
          "%c📊 Đang bảo vệ: 100% an toàn | 🕐 " +
            new Date().toLocaleString("vi-VN"),
          "color: #059669; font-size: 12px; font-style: italic;"
        );
      }, 2500);
    };

    displaySecurityUI();
    /* eslint-enable no-console */
  }, []);

  return null;
}

export function ConsoleWarning() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    /* eslint-disable no-console */

    const triggerUI = () => window.dispatchEvent(new Event("security-ui"));

    const onPaste = (e: ClipboardEvent) => {
      const txt = e.clipboardData?.getData("text") || "";
      if (txt.length > 50) {
        console.clear();
        console.log(
          "%c⛔ PHÁT HIỆN PASTE NGHI NGỜ! ⛔",
          "color:#fff; background:#dc2626; font-size:24px; font-weight:bold; padding:16px;"
        );
        console.log(
          "%c🚨 Đừng dán mã lạ vào Console — bạn có thể bị hack!",
          "color:#dc2626; font-size:16px; font-weight:bold;"
        );
        setTimeout(triggerUI, 1500);
      }
    };

    const detectDevTools = () => {
      let isOpen = false;
      setInterval(() => {
        const diffH = window.outerHeight - window.innerHeight;
        const diffW = window.outerWidth - window.innerWidth;
        const opened = diffH > 160 || diffW > 160;
        if (opened && !isOpen) {
          isOpen = true;
          console.log(
            "%c🔍 DevTools mở — kích hoạt bảo mật!",
            "color:#ff6b6b; font-weight:bold;"
          );
          triggerUI();
        } else if (!opened && isOpen) isOpen = false;
      }, 1000);
    };

    document.addEventListener("paste", onPaste);
    detectDevTools();

    return () => {
      document.removeEventListener("paste", onPaste);
    };
  }, []);

  return <TerminalSecurityUI />;
}
