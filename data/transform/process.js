const Downloader = require('../load/data-downloader');
const Uploader = require('../extract/data-uploader');
const fs = require('fs');
var requireFromString = require('require-from-string');



async function processDataset(sourceTx) {
  let data = await Downloader.download(sourceTx);
  let fileName = __dirname + "/tmp.csv";
  fs.writeFileSync(fileName, data);

  //LoadTransformer
  let moduleContent = fs.readFileSync(__dirname+"/ins-csv-transformer.js").toString();
  console.log(moduleContent);
  let Transformer = requireFromString(moduleContent);

  let transformed = await Transformer.transform(fileName);

  console.log(transformed);

  //await Uploader.uploadContent({type: "transformed"}, transformed);
}

function saveResults(data) {
  fs.writeFile('output.json', data, (err) => {
    if (err) return console.log(err);
    console.log('Saved results in output.json');
  });
}

processDataset("XMURkrX4pO3ddtwIz-_U2y15asijk7m68uL_H8OOzj8");
