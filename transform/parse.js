const csv = require('csv-parser')
const fs = require('fs')
const results = []


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

  elem.values = elem.values || Object.assign({}, monthsTemplate);
  if (year === '2019') {
    elem.values[m] += 1
  }

  //Fill children
  if (propsIndex === props.length) return
  let property = data[props[propsIndex]]
  elem.children = elem.children || {};
  elem.children[property] = elem.children[property] || {};

  //Recourse
  iterateAndCountLessons(elem.children[property], data, props, propsIndex + 1)
}

var output = {};

function parse() {
  fs.createReadStream('ins.csv')
    .pipe(csv())
    .on('data', (data) => {
      iterateAndCountLessons(output, data, ['Country', 'Camp', 'School'], 0);
}).on('end', () => {
    let elapsed = new Date().getTime() - start
    console.log('Elapsed: ' + elapsed)
    fs.writeFile('parsed.json', JSON.stringify(output, null, 2), (err) => {
      if (err) return console.log(err);
      console.log('Saved results in parsed.json');
    });
  })
}

parse();
