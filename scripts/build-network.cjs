const esbuild=require('esbuild');
esbuild.buildSync({entryPoints:['src/network-core.js'],outfile:'dist/network-core.js',bundle:true,format:'iife',globalName:'ToolHubNetworkCore',platform:'browser',minify:true,legalComments:'eof'});
