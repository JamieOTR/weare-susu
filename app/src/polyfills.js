// src/polyfills.ts
// Make Node-like globals available for browser libraries (e.g., @solana/web3.js).
import { Buffer } from "buffer";
import process from "process";
// Attach to globalThis/window so DevTools and app code can use them.
window.Buffer = Buffer;
window.process = process;
if (!window.global)
    window.global = window;
