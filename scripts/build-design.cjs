const esbuild=require('esbuild');
esbuild.buildSync({entryPoints:['src/design-core.js'],outfile:'dist/design-core.js',bundle:true,format:'iife',globalName:'ToolHubDesignCore',platform:'browser',minify:true,legalComments:'eof'});
