importScripts('upgrade-core.js?v=20261020-upgrade');
onmessage=async e=>{try{const{kind,args}=e.data;const result=await ToolHubUpgradeCore[kind](...args);postMessage({ok:true,result})}catch(e){postMessage({ok:false,error:e.message})}};
