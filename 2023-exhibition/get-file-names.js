
// import fs
const fs = require('fs');

// get file names in succulent-bgs folder
const succulentBgs = fs.readdirSync('./succulent-bgs');

// to json string
const succulentBgsJson = JSON.stringify(succulentBgs);

// write to file
fs.writeFileSync('./succulent-bgs/fileList.json', succulentBgsJson);

console.log(succulentBgsJson);