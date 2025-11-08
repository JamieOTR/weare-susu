// src/wallet/tryConnectMetaMask.ts
export type EthLike = {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: any[] }) => Promise<any>;
};

export async function tryConnectMetaMask() {
  const eth: EthLike | undefined = (globalThis as any).ethereum;

  if (!eth || typeof eth.request !== "function") {
    console.info("[MetaMask] No injected provider found; skipping connect.");
    return { ok: false as const, reason: "no-provider" };
  }

  // Optional: only attempt if it *looks* like MetaMask
  if (!eth.isMetaMask) {
    console.info("[MetaMask] Non-MetaMask EIP-1193 provider detected; skipping auto-connect.");
    return { ok: false as const, reason: "not-metamask" };
  }

  try {
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    const chainId = await eth.request({ method: "eth_chainId" });
    console.log("[MetaMask] Connected", { accounts, chainId });
    return { ok: true as const, accounts, chainId };
  } catch (err) {
    console.warn("[MetaMask] Connect failed:", err);
    return { ok: false as const, reason: "request-failed", error: err };
  }
}
