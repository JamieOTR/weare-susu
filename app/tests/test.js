[scripts]
test = "node app/tests/test.js"

// app/tests/test.js
const anchor = require('@coral-xyz/anchor');
const { PublicKey } = require('@solana/web3.js');
const fs = require('fs');

(async () => {
  // Use the provider that Anchor sets via env when you run `anchor test`
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Load the IDL that Anchor built
  const idlPath = 'target/idl/weare_susu.json';
  const idl = JSON.parse(fs.readFileSync(idlPath, 'utf8'));

  // Your deployed Program ID (must match keypair + lib.rs + Anchor.toml)
  const programId = new PublicKey('4wZNSkNLR9T1fQYHqcn5h6ZtxDERLg5jeD6nqT6RvWwh');

  // Construct the Program client
  const program = new anchor.Program(idl, programId, provider);

  console.log('🔗 Cluster:', provider.connection.rpcEndpoint);
  console.log('👛 Wallet:', provider.wallet.publicKey.toBase58());
  console.log('📦 Program:', program.programId.toBase58());

  // Call initialize(); your context has no accounts, so just call it
  const sig = await program.methods.initialize().rpc();

  console.log('✅ initialize() success.');
  console.log('🧾 Signature:', sig);
})().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
