import { connect, transactions, keyStores } from "near-api-js";
const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const CREDENTIALS_DIR = ".near-credentials";
export const CONTRACT_NAME = "yusufdimari.testnet";

const credentialsPath = path.join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const config = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
};
export async function initNear() {
  const near = await connect({ ...config, keyStore });
  const account = await near.account(CONTRACT_NAME);
  return { near, account };
}
