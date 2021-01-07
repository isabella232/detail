const Arweave = require('arweave/node')
const WALLET_FILE = require('../alice-arweave-wallet')
const fs = require('fs')

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 60000,     // Network request timeouts in milliseconds
  logging: false     // Enable network request logging
});

async function uploadFile(tags, fileName) {
  // Prepare local file
  console.log("Uploading file: " + fileName);
  let content = fs.readFileSync(fileName);

  await uploadContent(tags, content.toString());
}

async function uploadContent(tags, content) {
  // Prepare transaction
  let uploadTx = await arweave.createTransaction({data: content}, WALLET_FILE)
  Object.keys(tags).forEach(function(key) {
    uploadTx.addTag(key, tags[key])
  });
  await arweave.transactions.sign(uploadTx, WALLET_FILE);

  // Send transaction
  const response = await arweave.transactions.post(uploadTx);
  if (response.status !== 200) {
    throw response.data;
  } else {
    console.log("Content uploaded: " + uploadTx.id);
  }
}

module.exports.uploadFile = uploadFile;
module.exports.uploadContent = uploadContent;

//uploadFile({type: "test"}, "./data/source/ins.csv");
