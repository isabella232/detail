const csv = require('csv-parser')
const fs = require('fs')


let start = new Date().getTime();

let monthsTemplate = {};
for(var i=1; i<=12; i++) {
  monthsTemplate[i] = 0;
}


function iterateAndCountLessons(elem, data, props, propsIndex) {
  //Fill values
  let dateParts = data.Date.split('/')
  let year = dateParts[2]
  let m = parseInt(dateParts[1])

  elem.values = elem.values || {};
  elem.values[year] = elem.values[year] || Object.assign({}, monthsTemplate);
  elem.values = elem.values || Object.assign({}, monthsTemplate);
  elem.values[year][m] += 1

  //Fill children
  if (propsIndex === props.length) return;
  let property = data[props[propsIndex]];
  elem.children = elem.children || {};
  elem.children[property] = elem.children[property] || {};

  //Recourse
  iterateAndCountLessons(elem.children[property], data, props, propsIndex + 1)
}

var output = {};

async function transform(fileName) {
  console.log("Parsing: " + fileName);
  return new Promise((resolve, reject) => {
    fs.createReadStream(fileName)
      .pipe(csv())
      .on('data', (data) => {
        iterateAndCountLessons(output, data, ['Country', 'Camp', 'School', 'Subject'], 0);
      }).on('end', () => {
      let elapsed = new Date().getTime() - start;
      console.log('Elapsed: ' + elapsed);
      return resolve(JSON.stringify(output, null, 2));
    })
  });
}

module.exports.transform = transform
