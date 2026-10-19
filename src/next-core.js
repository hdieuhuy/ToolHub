import * as YAML from 'js-yaml';
import { marked } from 'marked';
import { CronExpressionParser } from 'cron-parser';
export function convertConfig(text,direction){
 if(!text.trim())throw Error('Hãy nhập nội dung cần chuyển đổi.');
 if(text.length>200000)throw Error('Nội dung tối đa 200.000 ký tự.');
 const value=direction==='json-yaml'?JSON.parse(text):YAML.load(text,{schema:YAML.JSON_SCHEMA});
 const seen=new Set();let nodes=0;
 function validate(v,depth=0){if(++nodes>50000||depth>100)throw Error('Dữ liệu quá sâu hoặc có quá nhiều phần tử.');if(typeof v==='number'&&!Number.isFinite(v))throw Error('JSON không hỗ trợ NaN hoặc Infinity.');if(v&&typeof v==='object'){if(seen.has(v))throw Error('Không hỗ trợ alias lặp hoặc vòng tham chiếu YAML.');seen.add(v);for(const x of Object.values(v))validate(x,depth+1);seen.delete(v)}}validate(value);
 if(value===undefined)throw Error('Chưa có dữ liệu hợp lệ.');
 const result=direction==='json-yaml'?YAML.dump(value,{noRefs:true,lineWidth:100,indent:2}):JSON.stringify(value,null,2);
 if(result.length>2000000)throw Error('Kết quả vượt giới hạn 2 MB.');return result;
}
function explainField(value,index){
 if(value==='*')return ['Mỗi phút','Mỗi giờ','Mọi ngày trong tháng','Mọi tháng','Mọi thứ trong tuần'][index];
 const unit=['phút','giờ','ngày','tháng','thứ'][index];
 if(value.startsWith('*/'))return 'Mỗi '+value.slice(2)+' '+unit+' trong phạm vi trường';
 const atom=v=>index===4?(['Chủ nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy','Chủ nhật'][Number(v)]||v):v;
 return value.split(',').map(v=>{const [range,step]=v.split('/');return (range.includes('-')?'Từ '+range.split('-').map(atom).join(' đến '):atom(range))+(step?' · bước '+step:'')}).join(', ');
}
export function cronSchedule(expression,timezone='Asia/Ho_Chi_Minh',start=new Date().toISOString()){
 expression=expression.trim();const fields=expression.split(/\s+/);
 if(fields.length!==5)throw Error('Nhập cron 5 trường: phút giờ ngày tháng thứ.');
 if(expression.length>200||!/^[\d*,/\-\s]+$/.test(expression))throw Error('Hỗ trợ số, *, dấu phẩy, khoảng a-b và bước */n trong 5 trường.');
 try{new Intl.DateTimeFormat('vi-VN',{timeZone:timezone}).format()}catch{throw Error('Múi giờ không hợp lệ.')}
 if(typeof start==='string'&&!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/i.test(start))throw Error('Nhập thời điểm ISO kèm múi giờ, ví dụ 2026-10-19T08:00:00+07:00.');
 const startDate=new Date(start);if(!Number.isFinite(startDate.getTime()))throw Error('Thời điểm bắt đầu cần là ISO có múi giờ, ví dụ 2026-10-19T08:00:00+07:00.');
 const interval=CronExpressionParser.parse(expression,{tz:timezone,currentDate:startDate,endDate:new Date(startDate.getTime()+366*86400000*50)});
 const times=[];try{for(let i=0;i<10;i++)times.push(interval.next().toISOString())}catch{if(!times.length)throw Error('Không tìm thấy lần chạy trong 50 năm tới. Kiểm tra ngày và tháng.');}
 const names=['Phút (0–59)','Giờ (0–23)','Ngày trong tháng (1–31)','Tháng (1–12)','Thứ (0/7 = CN, 1 = T2)'];
 return {expression,timezone,times,fields:fields.map((value,i)=>({name:names[i],value,explanation:explainField(value,i)})),description:fields[0].startsWith('*/')&&fields.slice(1).every(v=>v==='*')?`Mỗi ${fields[0].slice(2)} phút.`:fields[0].match(/^\d+$/)&&fields[1].match(/^\d+$/)&&fields.slice(2).every(v=>v==='*')?`Hằng ngày lúc ${fields[1].padStart(2,'0')}:${fields[0].padStart(2,'0')}.`:'Lịch được xác định theo 5 trường bên dưới. Khi ngày và thứ đều bị giới hạn, cron dùng điều kiện HOẶC.'};
}
export function markdownRaw(text){if(text.length>100000)throw Error('Markdown tối đa 100.000 ký tự.');return marked.parse(text,{gfm:true,breaks:false});}
export function hexColor(hex){hex=String(hex).trim();if(!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex))throw Error('Nhập màu HEX dạng #RGB hoặc #RRGGBB.');return hex.length===4?'#'+hex.slice(1).split('').map(x=>x+x).join('').toUpperCase():hex.toUpperCase()}
export function contrast(fg,bg){const a=hexColor(fg),b=hexColor(bg);function lum(h){const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]}const l1=lum(a),l2=lum(b),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);return{foreground:a,background:b,ratio,aa:ratio>=4.5,aaLarge:ratio>=3,aaa:ratio>=7,aaaLarge:ratio>=4.5};}
export function cssGenerate(o){const color=hexColor(o.color),second=hexColor(o.second||'#e4eee7');const n=(key,min,max)=>{const x=Number(o[key]);if(String(o[key]).trim()===''||!Number.isFinite(x)||x<min||x>max)throw Error('Giá trị '+key+' phải từ '+min+' đến '+max+'.');return x};
 if(o.type==='gradient')return `background: linear-gradient(${n('angle',0,360)}deg, ${color} ${n('stop1',0,100)}%, ${second} ${n('stop2',0,100)}%);`;
 if(o.type==='shadow'){const r=parseInt(color.slice(1,3),16),g=parseInt(color.slice(3,5),16),b=parseInt(color.slice(5,7),16);return `box-shadow: ${o.inset?'inset ':''}${n('x',-100,100)}px ${n('y',-100,100)}px ${n('blur',0,150)}px ${n('spread',-100,100)}px rgba(${r}, ${g}, ${b}, ${n('opacity',0,100)/100});`;}
 if(o.type==='radius')return `border-radius: ${n('tl',0,200)}px ${n('tr',0,200)}px ${n('br',0,200)}px ${n('bl',0,200)}px;`;
 throw Error('Chọn loại CSS hợp lệ.');
}
