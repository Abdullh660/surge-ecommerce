const {chromium}=require('playwright');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const url=pathToFileURL(path.join(__dirname,'..','index.html')).href;
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://lh3.googleusercontent.com/**',r=>r.abort());await page.goto(url);
  await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('surge.demo.v1')||'{}');s.theme='dark';localStorage.setItem('surge.demo.v1',JSON.stringify(s))});await page.reload();
  const actual=await page.evaluate(()=>{const css=getComputedStyle(document.documentElement);return Object.fromEntries(['primary','secondary','surface','soft','card','text','muted','border','elevated'].map(k=>[k,css.getPropertyValue('--'+k).trim()]))});
  const expected={primary:'#39b980',secondary:'#2d8661',surface:'#101713',soft:'#151f19',card:'#202c25',text:'#f1f5f2',muted:'#a8b7ae',border:'#34443a',elevated:'#28382e'};
  for(const [k,v] of Object.entries(expected))if(actual[k].toLowerCase()!==v)errors.push(`${k} was ${actual[k]}`);
  for(const [selector,expectedColor] of [['body','rgb(16, 23, 19)'],['.header','rgb(16, 23, 19)'],['.topbar','rgb(40, 56, 46)'],['.hero','rgb(40, 56, 46)'],['.product-card','rgb(32, 44, 37)'],['footer','rgb(21, 31, 25)']]){
   const actualColor=await page.locator(selector).first().evaluate(e=>getComputedStyle(e).backgroundColor);if(actualColor!==expectedColor)errors.push(`${selector}: ${actualColor}`)
  }
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))errors.push('horizontal overflow');
  if(errors.length)throw new Error(width+': '+errors.join(', '));
  console.log('PASS',width,'dark source colors and component surfaces');await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
