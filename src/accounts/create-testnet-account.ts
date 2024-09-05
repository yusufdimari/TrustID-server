import { connect, KeyPair, keyStores, utils } from "near-api-js";
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
const HELP = `Please run this script in the following format:

    node create-testnet-account.js CREATOR_ACCOUNT.testnet NEW_ACCOUNT.testnet AMOUNT
`;

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};

if (process.argv.length !== 5) {
  console.info(HELP);
  process.exit(1);
}

// createAccount(process.argv[2], process.argv[3], process.argv[4]);

export async function createAccount(
  newAccountId: string,
  amount: string = "0"
) {
  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account("yusufdimari.testnet");
  const keyPair = KeyPair.fromRandom("ed25519");
  const publicKey = keyPair.getPublicKey().toString();
  await keyStore.setKey(config.networkId, newAccountId, keyPair);

  // return await creatorAccount.createAccount(
  //   newAccountId,
  //   publicKey,
  //   BigInt(utils.format.parseNearAmount(amount) || 0)
  // );
  return await creatorAccount.functionCall({
    contractId: "testnet",
    methodName: "create_account",
    args: {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    gas: BigInt("300000000000000"),
    attachedDeposit: BigInt(utils.format.parseNearAmount(amount) || 0),
  });
}
