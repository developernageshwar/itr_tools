
const fs = require('fs');
let code = fs.readFileSync('src/config/fieldsConfig.js', 'utf8');
const idx = code.indexOf(ieldsConfig['Individual4'] =);
if (idx !== -1) {
  fs.writeFileSync('src/config/fieldsConfig.js', code.substring(0, idx).trim() + '\n');
  console.log('Removed Individual4');
} else {
  console.log('Not found');
}

