const Arweave = require('arweave/node');
const WALLET_FILE = require('../alice-arweave-wallet');

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 60000,     // Network request timeouts in milliseconds
  logging: false     // Enable network request logging
});


async function download(txId) {
  console.log("Downloading tx: " + txId);
  let data = await arweave.transactions.getData(txId, {decode: true, string: true});
  console.log(data);
  return data;
}

module.exports.download = download;

//download("c1Wtlfbdl4YkNgBMqOsu665JpqHovX4Z8nSugXHkF4k");
