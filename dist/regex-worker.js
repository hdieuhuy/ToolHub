importScripts('advanced-core.js?v=20261019-suite');
onmessage=e=>{try{postMessage({ok:true,result:ToolHubAdvancedCore.regex(e.data.pattern,e.data.flags,e.data.text)})}catch(error){postMessage({ok:false,error:error.message})}};
