import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// /home/allow-bad-names/Projects/weare-susu/app/src/components/ProgramStatus.tsx
import { useState } from "react";
export default function ProgramStatus() {
    const [out, setOut] = useState(null);
    const [err, setErr] = useState("");
    const run = async () => {
        setErr("");
        setOut(null);
        try {
            const res = await window.checkProgram2?.();
            setOut(res || {});
        }
        catch (e) {
            setErr(String(e?.message || e));
        }
    };
    return (_jsxs("div", { style: { padding: 16, border: "1px solid #ddd", borderRadius: 12, marginTop: 16 }, children: [_jsx("h3", { children: "Program Status (Phase 2)" }), _jsx("button", { onClick: run, children: "Check Program" }), err && _jsx("pre", { style: { color: "crimson" }, children: err }), out && (_jsx("pre", { style: { whiteSpace: "pre-wrap" }, children: JSON.stringify(out, null, 2) }))] }));
}
