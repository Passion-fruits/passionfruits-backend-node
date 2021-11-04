import * as Caver from 'caver-js';
import { readFileSync } from 'fs';
import * as path from 'path';
export const caver = new Caver(process.env.BAOBAB_TESTNET_HOST);

const keyring = new caver.wallet.keyring.singleKeyring(
  process.env.FEE_PAYER_ADDRESS,
  process.env.FEE_PAYER_SECRET,
);
caver.wallet.add(keyring);

const abi = JSON.parse(
  readFileSync(path.join(process.cwd(), 'abi.json')).toString(),
);

export const KIP7 = new caver.kct.kip7(process.env.KDT_CONTRACT_ADDRESS);
export const kdtContract = new caver.contract(
  abi,
  process.env.KDT_CONTRACT_ADDRESS,
  {
    feeDelegation: true,
    feePayer: process.env.FEE_PAYER_ADDRESS,
  },
);
