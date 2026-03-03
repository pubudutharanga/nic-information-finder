#!/bin/bash
sed -i -e 's/const response = NextResponse.redirect(newUrl, 308);/const response = NextResponse.rewrite(newUrl);/' src/middleware.ts
