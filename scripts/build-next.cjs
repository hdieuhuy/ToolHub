// npm ci && npm run build:next regenerates the browser bundle.
const esbuild=require('esbuild');
esbuild.buildSync({entryPoints:['src/next-core.js'],outfile:'dist/next-core.js',bundle:true,format:'iife',globalName:'ToolHubNextCore',platform:'browser',minify:true,legalComments:'eof'});
