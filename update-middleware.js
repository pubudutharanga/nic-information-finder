const fs = require('fs');
let content = fs.readFileSync('src/middleware.ts', 'utf8');
content = content.replace(
    'const response = NextResponse.redirect(newUrl, 308);',
    'const response = NextResponse.rewrite(newUrl);'
);
fs.writeFileSync('src/middleware.ts', content);
console.log('Replaced correctly!');
