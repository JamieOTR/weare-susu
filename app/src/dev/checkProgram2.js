// src/dev/exposeCheckProgram2.ts
// Purpose: define a global window.checkProgram2 and log loudly so we know this file actually ran.
import * as anchor from "@coral-xyz/anchor";
import idlJson from "../sdk/weare_susu.json"; // <-- confirm your IDL path
// Loud boot marker so we can confirm this file executed:
console.log("[exposeCheckProgram2] ✅ Module loaded and initializing...");
// Default export is not necessary since we attach directly to window
(async () => {
    // Define the main async function for checking the program
    async function checkProgram2() {
        try {
            console.group("[checkProgram2] ⚙️ Solana Program Check Starting");
            // 1️⃣ Resolve RPC endpoint (env > fallback)
            const rpc = import.meta.env?.VITE_RPC_URL ||
                "https://api.devnet.solana.com";
            const connection = new anchor.web3.Connection(rpc, "confirmed");
            console.log("RPC endpoint:", rpc);
            // 2️⃣ Generate lightweight wallet
            const kp = anchor.web3.Keypair.generate();
            const wallet = {
                publicKey: kp.publicKey,
                signTransaction: async (tx) => tx,
                signAllTransactions: async (txs) => txs,
                payer: kp,
            };
            // 3️⃣ Validate IDL structure
            if (!idlJson || !idlJson.metadata || !idlJson.address) {
                console.error("[checkProgram2] ❌ Invalid IDL JSON: missing metadata or address.");
                console.log("IDL JSON content preview:", idlJson);
                return;
            }
            // 4️⃣ Create Anchor provider + program client
            const provider = new anchor.AnchorProvider(connection, wallet, {
                commitment: "confirmed",
            });
            anchor.setProvider(provider);
            const programId = new anchor.web3.PublicKey(idlJson.address);
            const program = new anchor.Program(idlJson, programId, provider);
            console.log("[checkProgram2] Program ID:", programId.toBase58());
            console.log("[checkProgram2] Program name:", idlJson.name || "(unnamed)");
            // 5️⃣ Optional: fetch some account or state to confirm connectivity
            const programAccounts = await connection.getProgramAccounts(programId, {
                dataSlice: { offset: 0, length: 0 },
            });
            console.log(`[checkProgram2] Found ${programAccounts.length} accounts owned by program ${programId.toBase58()}`);
            if (programAccounts.length > 0) {
                console.log("Sample account:", programAccounts[0].pubkey.toBase58());
            }
            console.groupEnd();
            console.log("✅ [checkProgram2] Completed successfully");
        }
        catch (err) {
            console.error("❌ [checkProgram2] Error running program check:", err);
        }
    }
    // Attach to global window so main.tsx can call it
    window.checkProgram2 = checkProgram2;
    console.log("[exposeCheckProgram2] 🧩 Attached window.checkProgram2 successfully.");
})();
