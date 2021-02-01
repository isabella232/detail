const csv = require('csv-parser')
const fs = require('fs')


let start = new Date().getTime();



function iterateAndCountLessons(elem, data, props, propsIndex) {
  //Fill values
  elem.values = elem.values || {};

  elem.values[data['Gender']] = elem.values[data['Gender']] || {};

  elem.values[data['Gender']].base_count = elem.values[data['Gender']].base_count || 0;
  elem.values[data['Gender']].base_skills = elem.values[data['Gender']].base_skills || 0;
  elem.values[data['Gender']].end_count = elem.values[data['Gender']].end_count || 0;
  elem.values[data['Gender']].end_skills = elem.values[data['Gender']].end_skills || 0;



  let base = 0;
  for(var i=1;i<=21;i++) {
    base += parseInt(data['B_ICT_'+i]);
  }

  let end = 0;
  for(var i=1;i<=21;i++) {
    end += parseInt(data['E_ICT_'+i]);
  }

    elem.values[data['Gender']].base_count += parseInt(data['B_Count']);
    elem.values[data['Gender']].base_skills += base;
    elem.values[data['Gender']].end_count += parseInt(data['E_Count']);
    elem.values[data['Gender']].end_skills += end;


  let propertyName = props[propsIndex];





  //Fill children
  if (propsIndex === props.length) {
    //ICT Details
    for (var i = 1; i <= 21; i++) {
      elem.values["Skill "+i] = elem.values["Skill "+i]  || { base : {}, end: {} };
      elem.values["Skill "+i].base[data['Gender']+"_raw"] = parseInt(data['B_ICT_' + i]);
      elem.values["Skill "+i].base[data['Gender']+"_pct"] = parseInt(data['B_ICT_' + i]) * 100 / elem.values[data['Gender']].base_count
      elem.values["Skill "+i].end[data['Gender']+"_raw"] = parseInt(data['E_ICT_' + i])
      elem.values["Skill "+i].end[data['Gender']+"_pct"] = parseInt(data['E_ICT_' + i]) * 100 / elem.values[data['Gender']].end_count
    }
      return;
    process.exit();
  }

  let property = data[propertyName];
  if (property === "Unknown" && propertyName === "Country") {
    property = "Tanzania";
  }
  if (property === "Unknown" && propertyName === "Camp") {
    property = "Nyarugusu";
  }



  elem.children = elem.children || {};
  elem.children[property] = elem.children[property] || {};

  //Recourse
  iterateAndCountLessons(elem.children[property], data, props, propsIndex + 1)
}

var output = {};

function postprocess(data) {
  console.log("POST");
  data.values.Female.base_avg = data.values.Female.base_skills / data.values.Female.base_count;
  data.values.Female.end_avg = data.values.Female.end_skills / data.values.Female.end_count;

  data.values.Male.base_avg = data.values.Male.base_skills / data.values.Male.base_count;
  data.values.Male.end_avg = data.values.Male.end_skills / data.values.Male.end_count;

  data.values.Total = {};
  data.values.Total.base_avg = (data.values.Male.base_skills + data.values.Female.base_skills)
                               / (data.values.Male.base_count + data.values.Female.base_count);

  data.values.Total.end_avg = (data.values.Male.end_skills + data.values.Female.end_skills)
                              / (data.values.Male.end_count + data.values.Female.end_count);

  if (data.children) {
    Object.keys(data.children).forEach(child => postprocess(data.children[child]));
  } else {
    for (var i = 1; i <= 21; i++) {
      data.values["Skill "+i].base.Total_raw = data.values["Skill "+i].base.Female_raw + data.values["Skill "+i].base.Male_raw;
      data.values["Skill "+i].base.Total_pct =
        (data.values["Skill "+i].base.Female_pct * data.values.Female.base_count
      + data.values["Skill "+i].base.Male_pct * data.values.Male.base_count)
      / (data.values.Female.base_count + data.values.Male.base_count);

      data.values["Skill "+i].end.Total_raw = data.values["Skill "+i].end.Female_raw + data.values["Skill "+i].end.Male_raw;
      data.values["Skill "+i].end.Total_pct =
        (data.values["Skill "+i].end.Female_pct * data.values.Female.end_count
          + data.values["Skill "+i].end.Male_pct * data.values.Male.end_count)
        / (data.values.Female.end_count + data.values.Male.end_count);
    }
  }
}

async function transform(fileName) {
  console.log("Parsing: " + fileName);
  return new Promise((resolve, reject) => {
    fs.createReadStream(fileName)
      .pipe(csv())
      .on('data', (data) => {
        iterateAndCountLessons(output, data, ['Country', 'Camp', 'School'], 0);
      }).on('end', () => {
      postprocess(output);
      let elapsed = new Date().getTime() - start;
      console.log('Elapsed: ' + elapsed);
      return resolve(JSON.stringify(output, null, 2));
    })
  });
}

module.exports.transform = transform
