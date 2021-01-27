const Transformer = require('./ict-csv-transformer');
const fs = require('fs');



async function processDataset(fileName) {
  let transformed = await Transformer.transform(fileName);

  console.log(transformed);
  saveResults(transformed);
}

function saveResults(data) {
  fs.writeFile('output.json', data, (err) => {
    if (err) return console.log(err);
    console.log('Saved results in output.json');
  });
}

processDataset("/Users/kuba/projects/detail/data/source/ict_teachers.csv");
