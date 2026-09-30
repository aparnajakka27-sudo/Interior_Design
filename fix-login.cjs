const fs = require('fs');
let code = fs.readFileSync('test-routing.js', 'utf8');
code = code.replace("await page.click('button[type=\"submit\"]');", "await page.type('input[type=\"email\"]', 'admin@decormart.com');\n  await page.click('button[type=\"submit\"]');");
fs.writeFileSync('test-routing.js', code);
