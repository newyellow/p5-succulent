
// import fs
const fs = require('fs');

// get file names in succulent-bgs folder
const succulentBgs = fs.readdirSync('./succulent-bg-1920');

// to json string
const succulentBgsJson = JSON.stringify(succulentBgs);

// write to file
fs.writeFileSync('./succulent-bg-1920/fileList.json', succulentBgsJson);

console.log(succulentBgsJson);