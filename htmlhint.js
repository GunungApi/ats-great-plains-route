#!/usr/bin/env node
const fs = require('fs');
const file = process.argv[2];
if (!file) {
  console.error('Usage: node htmlhint.js <file>');
  process.exit(1);
}
const html = fs.readFileSync(file, 'utf8');
let ok = true;
if (!/^<!DOCTYPE html>/i.test(html.trim())) {
  console.error('Missing <!DOCTYPE html>');
  ok = false;
}
if (!/<html[^>]*>/i.test(html) || !/<\/html>/i.test(html)) {
  console.error('Missing <html> or </html> tag');
  ok = false;
}
if (!/<head[\s\S]*<\/head>/i.test(html)) {
  console.error('Missing <head> or </head>');
  ok = false;
}
if (!/<body[^>]*>[\s\S]*<\/body>/i.test(html)) {
  console.error('Missing <body> or </body>');
  ok = false;
}
if (ok) {
  console.log(`${file} looks valid`);
  process.exit(0);
} else {
  process.exit(1);
}
