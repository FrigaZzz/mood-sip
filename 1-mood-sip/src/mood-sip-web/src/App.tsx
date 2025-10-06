import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MoodSipApp from "./features/moodsip/home.js";
import DevUI from "./features/DevUI";

function isDevOrLocalNetwork(hostname: string): boolean {
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  ) {
    return true;
  }

  // Check for IPv4 private address ranges
  // 10.0.0.0 – 10.255.255.255
  // 172.16.0.0 – 172.31.255.255
  // 192.168.0.0 – 192.168.255.255
  const ipv4Match = hostname.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ipv4Match) {
    const [_, a, b] = ipv4Match.map(Number);
    if (a === 10) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
  }

  return false;
}

function App() {
  const isLocalDev =
    typeof window !== "undefined" &&
    isDevOrLocalNetwork(window.location.hostname);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<MoodSipApp />} />
        {isLocalDev && (
          <Route path="/dev-ui" element={<DevUI />} />
        )}
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
