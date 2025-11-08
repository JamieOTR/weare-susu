import "./shims/buffer";
// --- Minimal, resilient bootstrap ---
console.log("[main] 🚀 START", new Date().toISOString());

import React from "react";
import ReactDOM from "react-dom/client";

(async () => {
  try {
    if (import.meta.env.DEV) {
      const { default: disableEthereum } = await import("./dev/disableEthereum");
      disableEthereum();
      console.log("[main] 🧹 disableEthereum loaded (dev only)");
    }
  } catch (e: any) {
    console.warn("[main] ⚠️ disableEthereum not loaded:", e?.message || e);
  }

  try {
    await import("./dev/exposeCheckProgram2");
    console.log("[main] ✅ exposeCheckProgram2 imported successfully");
  } catch (e: any) {
    console.error("[main] ❌ Failed to import exposeCheckProgram2:", e?.message || e);
  }
})().catch((err) => {
  console.error("❌ [main] unexpected error in bootstrap async:", err);
});

const App = () => {
  async function run() {
    try {
      const res = await (window as any).checkProgram2?.();
      console.log("[UI] checkProgram2 done:", res);
      alert("Program check completed — see console for details.");
    } catch (e: any) {
      console.error(e);
      alert("Program check failed — see console.");
    }
  }
  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>WeAre SUSU – Solana Dev</h1>
      <button onClick={run} style={{ padding: 10, fontWeight: 600 }}>
        Run Program Check
      </button>
      <p style={{ marginTop: 12 }}>
        Or open DevTools and run: <code>await window.checkProgram2()</code>
      </p>
    </div>
  );
};

const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error("❌ [main] #root not found in index.html");
} else {
  console.log("[main] 🧱 Rendering React App…");
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
