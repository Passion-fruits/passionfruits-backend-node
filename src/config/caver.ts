import * as Caver from 'caver-js';
export const caver = new Caver(process.env.BAOBAB_TESTNET_HOST);

const keyring = new caver.wallet.keyring.singleKeyring(
  process.env.FEE_PAYER_ADDRESS,
  process.env.FEE_PAYER_SECRET,
);
caver.wallet.add(keyring);

export const KIP7 = new caver.kct.kip7(process.env.KDT_CONTRACT_ADDRESS);
