import * as anchor from "@coral-xyz/anchor";
import idlJson from "../sdk/weare_susu.json";

console.log("[exposeCheckProgram2] ✅ Module loaded; attaching checkProgram2…");

declare global {
  interface Window { checkProgram2?: () => Promise<void>; }
}

(async () => {
  async function checkProgram2() {
    try {
      console.group("[checkProgram2] ⚙️ Solana Program Check");

      const rpc =
        (import.meta as any).env?.VITE_RPC_URL || "https://api.devnet.solana.com";
      const connection = new anchor.web3.Connection(rpc, "confirmed");
      console.log("RPC:", rpc);

      const kp = anchor.web3.Keypair.generate();
      const wallet = {
        publicKey: kp.publicKey,
        signTransaction: async (tx: any) => tx,
        signAllTransactions: async (txs: any[]) => txs,
        payer: kp,
      };

      const idlAddress =
        (idlJson as any).address || (idlJson as any)?.metadata?.address;
      if (!idlAddress) {
        console.error("❌ IDL missing required 'address'.", idlJson);
        console.groupEnd();
        return;
      }

      const provider = new anchor.AnchorProvider(connection, wallet as any, {
        commitment: "confirmed",
      });
      anchor.setProvider(provider);

      const programId = new anchor.web3.PublicKey(idlAddress);
      const idl = idlJson as unknown as anchor.Idl;
      // @ts-expect-error – force the 3-arg overload across anchor 0.28–0.30
const program = new (anchor as any).Program(idl, programId, provider);

      console.log("Program ID:", programId.toBase58());
      console.log("Program name:", (idlJson as any).name || "(unnamed)");

      const owned = await connection.getProgramAccounts(programId, {
        dataSlice: { offset: 0, length: 0 },
      });
      console.log(`Owned accounts: ${owned.length}`);
      if (owned[0]) console.log("Sample account:", owned[0].pubkey.toBase58());

      console.groupEnd();
      console.log("✅ [checkProgram2] Completed successfully");
    } catch (err) {
      console.error("❌ [checkProgram2] Error:", err);
    }
  }

  window.checkProgram2 = checkProgram2;
  console.log("[exposeCheckProgram2] 🧩 window.checkProgram2 attached.");
})();
