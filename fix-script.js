const fs = require('fs');
let code = fs.readFileSync('src/middleware.ts', 'utf8');
code = code.replace(
    /const response = NextResponse.redirect\((.*?),\s*308\);/,
    'const response = NextResponse.rewrite($1);'
);
fs.writeFileSync('src/middleware.ts', code);
console.log('Fixed format in middleware.ts!');
