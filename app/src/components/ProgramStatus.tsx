// /home/allow-bad-names/Projects/weare-susu/app/src/components/ProgramStatus.tsx
import React, { useState } from "react";

export default function ProgramStatus() {
  const [out, setOut] = useState<any>(null);
  const [err, setErr] = useState<string>("");

  const run = async () => {
    setErr("");
    setOut(null);
    try {
      const res = await (window as any).checkProgram2?.();
      setOut(res || {});
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
  };

  return (
    <div style={{padding:16, border:"1px solid #ddd", borderRadius:12, marginTop:16}}>
      <h3>Program Status (Phase 2)</h3>
      <button onClick={run}>Check Program</button>
      {err && <pre style={{color:"crimson"}}>{err}</pre>}
      {out && (
        <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(out, null, 2)}</pre>
      )}
    </div>
  );
}
