importScripts('vendor/jsQR.js','qr-reader.js?v=20261020');
onmessage=e=>{try{postMessage({ok:true,result:ToolHubQRReader.scan(e.data.data,e.data.width,e.data.height)})}catch(error){postMessage({ok:false,error:error.message})}};
