import { getSmartAccountWalletClient } from "@graphprotocol/grc-20";

// IMPORTANT: Be careful with your private key. Don't commit it to version control.
// You can get your private key using https://www.geobrowser.io/export-wallet

const privateKey = `#`;
const smartAccountWalletClient = await getSmartAccountWalletClient({
  privateKey,
});

export async function publish() {
  // publish an edit to IPFS
  // get the calldata for the edit
  const spaceId = "4gEXRknzoBx5cGdzCw42Lk";
  const cid = "#";

  // This returns the correct contract address and calldata depending on the space id
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${spaceId}/edit/calldata`,
    {
      method: "POST",
      body: JSON.stringify({
        cid: cid,
        // Optionally specify TESTNET or MAINNET. Defaults to MAINNET
        //network: "TESTNET",
      }),
    }
  );

  const { to, data } = await result.json();

  const txResult = await smartAccountWalletClient.sendTransaction({
    to: to,
    value: 0n,
    data: data,
  });

  console.log("txResult", txResult);
}

publish();
