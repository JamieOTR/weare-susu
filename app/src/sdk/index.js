// /src/sdk/index.ts
// Minimal, safe Anchor SDK stub for WeAre-SUSU.
// This version never throws — useful during early testing.
// Later, replace getProgram() with a real anchor.Program factory.
import * as anchor from "@coral-xyz/anchor";
/**
 * Create a minimal Program-like object.
 * Keeps main.tsx functional even if the IDL or Program is not ready.
 */
export function getProgram(provider, programId) {
    // For debugging — helps confirm in the console.
    console.log("[sdk/getProgram] called with programId:", programId);
    try {
        // If you later add an actual IDL (JSON) and program ID, uncomment:
        // const idl = require("./weare_susu.json");
        // return new anchor.Program(idl, programId, provider);
        // For now, return a non-throwing mock.
        return {
            programId: {
                toBase58: () => programId || "<unset-program-id>",
            },
            provider,
            methods: {},
            rawIdl: null,
        };
    }
    catch (e) {
        console.error("[sdk/getProgram] failed:", e);
        // Fail-safe fallback — still return a safe dummy object.
        return {
            programId: {
                toBase58: () => "<error-creating-program>",
            },
            provider: null,
            methods: {},
            rawIdl: null,
        };
    }
}
// Export anchor for convenience — allows calling anchor.web3, etc.
export { anchor };
