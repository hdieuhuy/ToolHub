importScripts('design-core.js?v=20261019-design');
onmessage=e=>{try{postMessage({ok:true,result:ToolHubDesignCore.optimizeSVG(e.data.svg,e.data.precision)})}catch(e){postMessage({ok:false,error:e.message})}};
