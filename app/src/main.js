import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    }
    catch (e) {
        console.warn("[main] ⚠️ disableEthereum not loaded:", e?.message || e);
    }
    try {
        await import("./dev/exposeCheckProgram2");
        console.log("[main] ✅ exposeCheckProgram2 imported successfully");
    }
    catch (e) {
        console.error("[main] ❌ Failed to import exposeCheckProgram2:", e?.message || e);
    }
})().catch((err) => {
    console.error("❌ [main] unexpected error in bootstrap async:", err);
});
const App = () => {
    async function run() {
        try {
            const res = await window.checkProgram2?.();
            console.log("[UI] checkProgram2 done:", res);
            alert("Program check completed — see console for details.");
        }
        catch (e) {
            console.error(e);
            alert("Program check failed — see console.");
        }
    }
    return (_jsxs("div", { style: { padding: 16, fontFamily: "system-ui, sans-serif" }, children: [_jsx("h1", { children: "WeAre SUSU \u2013 Solana Dev" }), _jsx("button", { onClick: run, style: { padding: 10, fontWeight: 600 }, children: "Run Program Check" }), _jsxs("p", { style: { marginTop: 12 }, children: ["Or open DevTools and run: ", _jsx("code", { children: "await window.checkProgram2()" })] })] }));
};
const rootEl = document.getElementById("root");
if (!rootEl) {
    console.error("❌ [main] #root not found in index.html");
}
else {
    console.log("[main] 🧱 Rendering React App…");
    ReactDOM.createRoot(rootEl).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
}
