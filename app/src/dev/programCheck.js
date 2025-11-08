// src/dev/programCheck.ts
// -----------------------------------------------------------------------------
// Quick Solana program health check for development.
// Accessible from DevTools via:  await window.checkProgram()
// -----------------------------------------------------------------------------
import * as anchor from "@coral-xyz/anchor";
import { getProgram } from "../sdk";
import idlJson from "../sdk/weare_susu.json";
window.checkProgram = async () => {
    console.log("🧭 Starting checkProgram() …");
    try {
        // --- Step 1: Resolve RPC and program ID ---
        const rpc = import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com";
        const connection = new anchor.web3.Connection(rpc, "confirmed");
        const programId = idlJson.address ||
            import.meta.env.VITE_PROGRAM_ID ||
            "4wZNSkNLR9T1fQYHqcn5h6ZtxDERLg5jeD6nqT6RvWwh";
        // --- Step 2: Create a read-only dummy provider/wallet ---
        const dummyKey = anchor.web3.Keypair.generate();
        const wallet = {
            publicKey: dummyKey.publicKey,
            signTransaction: async (tx) => tx,
            signAllTransactions: async (txs) => txs,
            payer: dummyKey,
        };
        const provider = new anchor.AnchorProvider(connection, wallet, {
            commitment: "confirmed",
        });
        // --- Step 3: Get program handle ---
        const program = getProgram(provider, programId);
        console.group("🧩 Program Check Summary");
        console.log("RPC URL:", rpc);
        console.log("Program ID:", program.programId?.toBase58?.() ?? programId);
        // --- Step 4: Inspect IDL and list available methods ---
        const idl = program.rawIdl ?? idlJson;
        if (idl?.instructions) {
            const methods = idl.instructions.map((i) => i.name);
            console.log("IDL Methods:", methods.length ? methods : "none found");
        }
        else {
            console.log("No IDL instructions found in local JSON.");
        }
        // --- Step 5: Optional: verify on-chain account exists ---
        const info = await connection.getAccountInfo(new anchor.web3.PublicKey(programId));
        if (info) {
            console.log("Program account found on chain.");
            console.log("Lamports:", info.lamports);
            console.log("Executable:", info.executable);
        }
        else {
            console.warn("⚠️ No account found at that Program ID on this cluster.");
        }
        console.groupEnd();
        console.log("✅ checkProgram finished successfully.");
    }
    catch (err) {
        console.error("❌ checkProgram error:", err);
    }
};
console.log("✅ window.checkProgram() is ready. Open DevTools and run it.");
