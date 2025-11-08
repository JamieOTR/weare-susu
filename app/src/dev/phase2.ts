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
    signTransaction: async (tx: any) => tx,
    signAllTransactions: async (txs: any[]) => txs,
    payer: kp,
  };
  const provider = new (anchor as any).AnchorProvider(connection, wallet, { commitment: "confirmed" });
  return { rpc, provider };
}

export async function getIdlSummary() {
  const { provider } = makeProvider();
  const programId = (idlJson as any).address || import.meta.env.VITE_PROGRAM_ID || "";
  const program = getProgram(provider as any, programId);
  const idl = (program as any).rawIdl ?? (idlJson as any);
  return {
    programId: program.programId?.toBase58?.() ?? programId,
    hasInstructions: Array.isArray(idl?.instructions),
    instructionCount: Array.isArray(idl?.instructions) ? idl.instructions.length : 0,
  };
}

export async function listMethods() {
  const { provider } = makeProvider();
  const programId = (idlJson as any).address || import.meta.env.VITE_PROGRAM_ID || "";
  const program = getProgram(provider as any, programId);
  const idl = (program as any).rawIdl ?? (idlJson as any);
  if (!Array.isArray(idl?.instructions)) return [];
  return idl.instructions.map((i: any) => i.name);
}

// placeholder that just prints a name
export async function describe(name: string) {
  const methods = await listMethods();
  if (!methods.includes(name)) return `No method named "${name}" in IDL.`;
  return `Method "${name}" exists in IDL.`;
}
