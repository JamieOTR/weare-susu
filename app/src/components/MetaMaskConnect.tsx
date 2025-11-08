// src/components/MetaMaskConnect.tsx
import React from "react";
import { tryConnectMetaMask } from "../wallet/tryConnectMetaMask";

export default function MetaMaskConnect() {
  const [status, setStatus] = React.useState<"idle"|"connecting"|"connected"|"absent"|"error">("idle");
  const [info, setInfo] = React.useState<any>(null);

  const onClick = async () => {
    setStatus("connecting");
    const res = await tryConnectMetaMask();
    if (res.ok) {
      setStatus("connected");
      setInfo({ accounts: res.accounts, chainId: res.chainId });
    } else if (res.reason === "no-provider" || res.reason === "not-metamask") {
      setStatus("absent");
      setInfo(res.reason);
    } else {
      setStatus("error");
      setInfo(res.error ?? res.reason);
    }
  };

  return (
    <div style={{ padding: 12, border: "1px solid #ccc", borderRadius: 8, margin: 12 }}>
      <div style={{ marginBottom: 8, fontWeight: 600 }}>MetaMask (optional)</div>
      <button onClick={onClick} disabled={status === "connecting"}>
        {status === "connecting" ? "Connecting…" : "Connect MetaMask"}
      </button>
      <pre style={{ marginTop: 8, overflowX: "auto" }}>
        {JSON.stringify({ status, info }, null, 2)}
      </pre>
    </div>
  );
}
