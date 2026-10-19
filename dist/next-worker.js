importScripts('next-core.js?v=20261019-next');
onmessage=e=>{try{const {kind,args}=e.data;const result=kind==='yaml'?ToolHubNextCore.convertConfig(...args):ToolHubNextCore.cronSchedule(...args);postMessage({ok:true,result})}catch(e){postMessage({ok:false,error:e.message})}};
