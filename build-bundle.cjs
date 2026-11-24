// Rebuild the browser-ready static bundle after changing the source modules.
const fs = require('fs');
const path = require('path');
const root = __dirname;
const source = ['source-images.js', 'data.js', 'state.js', 'icons.js', 'app.js'].map(name => {
  return fs.readFileSync(path.join(root, 'js', name), 'utf8')
    .replace(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm, '')
    .replace(/^export\s+/gm, '');
}).join('\n\n');
fs.writeFileSync(path.join(root, 'js', 'bundle.js'), `// Generated from data.js, state.js and app.js.\n(() => {\n'use strict';\n${source}\n})();\n`);
