// src/polyfills.ts
// Make Node-like globals available for browser libraries (e.g., @solana/web3.js).
import { Buffer } from "buffer";
import process from "process";

declare global {
  interface Window {
    Buffer: typeof Buffer;
    process: typeof process;
    global: any;
  }
}

// Attach to globalThis/window so DevTools and app code can use them.
(window as any).Buffer = Buffer;
(window as any).process = process;
if (!(window as any).global) (window as any).global = window;
