export default function disableEthereum() {
  if (typeof window === "undefined") return;
  if ((window as any).ethereum) {
    try { delete (window as any).ethereum; }
    catch { (window as any).ethereum = undefined; }
    console.log("🧹 [disableEthereum] Removed window.ethereum");
  }
}
