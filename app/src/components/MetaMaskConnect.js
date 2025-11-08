import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/MetaMaskConnect.tsx
import React from "react";
import { tryConnectMetaMask } from "../wallet/tryConnectMetaMask";
export default function MetaMaskConnect() {
    const [status, setStatus] = React.useState("idle");
    const [info, setInfo] = React.useState(null);
    const onClick = async () => {
        setStatus("connecting");
        const res = await tryConnectMetaMask();
        if (res.ok) {
            setStatus("connected");
            setInfo({ accounts: res.accounts, chainId: res.chainId });
        }
        else if (res.reason === "no-provider" || res.reason === "not-metamask") {
            setStatus("absent");
            setInfo(res.reason);
        }
        else {
            setStatus("error");
            setInfo(res.error ?? res.reason);
        }
    };
    return (_jsxs("div", { style: { padding: 12, border: "1px solid #ccc", borderRadius: 8, margin: 12 }, children: [_jsx("div", { style: { marginBottom: 8, fontWeight: 600 }, children: "MetaMask (optional)" }), _jsx("button", { onClick: onClick, disabled: status === "connecting", children: status === "connecting" ? "Connecting…" : "Connect MetaMask" }), _jsx("pre", { style: { marginTop: 8, overflowX: "auto" }, children: JSON.stringify({ status, info }, null, 2) })] }));
}
