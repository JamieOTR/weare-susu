// /src/dev/phase2.ts
import * as anchor from "@coral-xyz/anchor";
import { getProgram } from "../sdk";
import idlJson from "../sdk/weare_susu.json";
function makeProvider() {
    const rpc = import.meta.env.VITE_RPC_URL || "https://api.devnet.solana.com";
    const connection = new anchor.web3.Connection(rpc, "confirmed");
    const kp = anchor.web3.Keypair.generate();
    const wallet = {
        publicKey: kp.publicKey,
        signTransaction: async (tx) => tx,
        signAllTransactions: async (txs) => txs,
        payer: kp,
    };
    const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });
    return { rpc, provider };
}
export async function getIdlSummary() {
    const { provider } = makeProvider();
    const programId = idlJson.address || import.meta.env.VITE_PROGRAM_ID || "";
    const program = getProgram(provider, programId);
    const idl = program.rawIdl ?? idlJson;
    return {
        programId: program.programId?.toBase58?.() ?? programId,
        hasInstructions: Array.isArray(idl?.instructions),
        instructionCount: Array.isArray(idl?.instructions) ? idl.instructions.length : 0,
    };
}
export async function listMethods() {
    const { provider } = makeProvider();
    const programId = idlJson.address || import.meta.env.VITE_PROGRAM_ID || "";
    const program = getProgram(provider, programId);
    const idl = program.rawIdl ?? idlJson;
    if (!Array.isArray(idl?.instructions))
        return [];
    return idl.instructions.map((i) => i.name);
}
// placeholder that just prints a name
export async function describe(name) {
    const methods = await listMethods();
    if (!methods.includes(name))
        return `No method named "${name}" in IDL.`;
    return `Method "${name}" exists in IDL.`;
}
