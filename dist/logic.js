/* Pure conversion and generation functions shared by the UI and checks. */
(function(root){
  const upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ',lower='abcdefghijklmnopqrstuvwxyz',digits='0123456789';
  const symbols='!@#$%^&*()-_=+[]{}:;,.?';
  function integer(value,min,max,label){const n=Number(value);if(!Number.isInteger(n)||n<min||n>max)throw Error(`${label}: nhập số nguyên từ ${min} đến ${max}.`);return n;}
  function randomIndex(max){const limit=4294967296-4294967296%max;const buffer=new Uint32Array(1);do{crypto.getRandomValues(buffer)}while(buffer[0]>=limit);return buffer[0]%max;}
  function passwordConfig(options){const length=integer(options.length,4,128,'Độ dài'),count=integer(options.count,1,50,'Số lượng');let excluded=new Set(options.exclude||'');if(options.ambiguous)for(const c of 'Il1O0o|`\'"')excluded.add(c);
    if(options.symbols&&(!options.customSymbols||/[^!-~]|[A-Za-z0-9]/.test(options.customSymbols)))throw Error('Ký hiệu tùy chỉnh chỉ gồm dấu câu ASCII, không có chữ, số hoặc khoảng trắng.');
    let groups=[[options.upper,upper],[options.lower,lower],[options.digits,digits],[options.symbols,options.customSymbols]].filter(([enabled])=>enabled).map(([,s])=>[...new Set([...s].filter(c=>!excluded.has(c)))]);
    if(!groups.length)throw Error('Chọn ít nhất một nhóm ký tự.');if(groups.some(g=>!g.length))throw Error('Một nhóm đã chọn không còn ký tự sau khi loại trừ. Hãy chỉnh tùy chọn.');const pool=[...new Set(groups.flat())];if(pool.length<2)throw Error('Cần ít nhất 2 ký tự khác nhau để tạo ngẫu nhiên.');if(options.unique&&length>pool.length)throw Error(`Chỉ còn ${pool.length} ký tự khác nhau. Giảm độ dài hoặc tắt “Không lặp ký tự”.`);return {length,count,groups,pool};
  }
  function passwords(options){const {length,count,groups,pool}=passwordConfig(options);const results=[];for(let i=0;i<count;i++){let candidate;let tries=0;do{if(++tries>10000)throw Error('Không tạo được với cấu hình này. Hãy tăng độ dài hoặc nới tùy chọn.');let available=[...pool],letters=[];for(let j=0;j<length;j++){const index=randomIndex(available.length);letters.push(available[index]);if(options.unique)available.splice(index,1);}candidate=letters.join('');}while(options.everyGroup&&!groups.every(group=>[...candidate].some(c=>group.includes(c))));results.push(candidate);}return results.join('\n');}
  function convertBase(text,from,to){from=integer(from,2,36,'Hệ số đầu vào');to=integer(to,2,36,'Hệ số kết quả');let s=text.trim().toLowerCase(),negative=s.startsWith('-');if(negative)s=s.slice(1);if(!s)throw Error('Nhập một số nguyên cần chuyển đổi.');let n=0n;for(const c of s){const d='0123456789abcdefghijklmnopqrstuvwxyz'.indexOf(c);if(d<0||d>=from)throw Error(`Ký tự “${c}” không thuộc hệ ${from}. Nhập số nguyên, không kèm tiền tố 0x hoặc 0b.`);n=n*BigInt(from)+BigInt(d);}return(negative&&n!==0n?'-':'')+n.toString(to).toUpperCase();}
  function htmlEncode(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function extractEmails(s){return [...new Set((s.match(/[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+/gi)||[]).map(x=>x.toLowerCase()))].join('\n')||'Không tìm thấy địa chỉ email.';}
  root.ToolHubLogic={passwords,passwordConfig,convertBase,htmlEncode,extractEmails,symbols,integer};
})(globalThis);
