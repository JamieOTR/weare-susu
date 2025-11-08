// /src/solana/provider.ts
import { Connection, PublicKey } from "@solana/web3.js";
const RPC = import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com";
const PROGRAM_ID = import.meta.env.VITE_PROGRAM_ID ||
    "4wZNSkNLR9T1fQYHqcn5h6ZtxDERLg5jeD6nqT6RvWwh";
export function getProvider() {
    // Minimal provider-like object (no wallet integration)
    const connection = new Connection(RPC, "confirmed");
    return { connection };
}
export function getProgramId() {
    return new PublicKey(PROGRAM_ID);
}
