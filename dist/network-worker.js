importScripts('network-core.js?v=20261019-network');
onmessage=e=>{try{const {kind,args}=e.data;const result=kind==='schema'?ToolHubNetworkCore.validateSchema(...args):ToolHubNetworkCore.formatSQL(...args);postMessage({ok:true,result})}catch(e){postMessage({ok:false,error:e.message})}};
