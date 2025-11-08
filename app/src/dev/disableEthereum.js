export default function disableEthereum() {
    if (typeof window === "undefined")
        return;
    if (window.ethereum) {
        try {
            delete window.ethereum;
        }
        catch {
            window.ethereum = undefined;
        }
        console.log("🧹 [disableEthereum] Removed window.ethereum");
    }
}
