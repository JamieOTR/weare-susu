// /home/allow-bad-names/Projects/weare-susu/app/src/dev/programCheck.ts
import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
// If you have a path alias "@/sdk/weare_susu.json" configured, use that.
// Otherwise use the relative path below.
import idlJson from "../sdk/weare_susu.json";
const PROGRAM_ID = new PublicKey("4wZNSkNLR9T1fQYHqcn5h6ZtxDERLg5jeD6nqT6RvWwh");
const RPC = import.meta.env?.VITE_RPC_URL || "https://api.devnet.solana.com";
function makeReadOnlyProvider() {
    const connection = new Connection(RPC, "confirmed");
    // Minimal "dummy" wallet so AnchorProvider can be constructed in the browser
    const dummy = {
        publicKey: PublicKey.default,
        signTransaction: async (tx) => tx,
        signAllTransactions: async (txs) => txs,
    };
    return new anchor.AnchorProvider(connection, dummy, { commitment: "confirmed" });
}
// Expose a global function so you can run it from the DevTools Console
// Usage: checkProgram()
window.checkProgram = async () => {
    try {
        const provider = makeReadOnlyProvider();
        anchor.setProvider(provider);
        // Construct an Anchor Program using the local IDL JSON
        const program = new anchor.Program(idlJson, PROGRAM_ID, provider);
        console.log("RPC:", RPC);
        console.log("Program ID:", program.programId.toBase58());
        const names = program.idl?.instructions?.map((i) => i.name) ?? [];
        console.log("IDL instructions:", names);
        if (!names.length) {
            console.warn("No instructions found in IDL. If you expected initializePool/contribute/advanceRound, your IDL may be a placeholder.");
        }
        return { rpc: RPC, programId: program.programId.toBase58(), instructions: names };
    }
    catch (e) {
        console.error("checkProgram() error:", e);
        throw e;
    }
};
