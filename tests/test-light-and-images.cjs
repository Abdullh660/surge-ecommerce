const {chromium}=require('playwright');
const {pathToFileURL}=require('url');
const path=require('path');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:900}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 // Simulate successful access to the source host; actual access depends on Google permissions.
 const sample=fs.readFileSync(path.join(__dirname,'..','assets/images/embedded-d708f61e5e94.png'));
 await page.route('https://lh3.googleusercontent.com/**',route=>route.fulfill({status:200,contentType:'image/png',body:sample}));
 const url=pathToFileURL(path.join(__dirname,'..','index.html')).href;
 for(const theme of ['light','dark']) for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(url);
  await page.evaluate(theme=>{const s=JSON.parse(localStorage.getItem('surge.demo.v1')||'{}');s.theme=theme;localStorage.setItem('surge.demo.v1',JSON.stringify(s))},theme);
  for(const route of ['home','products','stores','store?id=tech','product?id=headphones']){
   await page.goto(url+'#'+route);await page.reload();
   await page.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));
   await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));
   const bad=await page.locator('img').evaluateAll(xs=>xs.filter(x=>!x.naturalWidth||x.src.includes('placeholder')).map(x=>x.src));
   if(bad.length)errors.push(`${theme} ${width} ${route} missing image: ${bad.join(',')}`);
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))errors.push(`${theme} ${width} ${route} overflow`);
   if(route==='home'){
    const heroSource=await page.locator('.hero img').getAttribute('src');
    if(!heroSource.startsWith('https://lh3.googleusercontent.com/aida/'))errors.push('original hero source not restored');
    const border=await page.locator('.product-card').first().evaluate(e=>getComputedStyle(e).borderTopColor);
    const expected=theme==='light'?'rgb(74, 148, 114)':'rgb(52, 68, 58)';
    if(border!==expected)errors.push(`${theme} border ${border}, expected ${expected}`);
    await page.screenshot({path:`screenshots/current-${theme}-${width}.png`});
   }
  }
  console.log('PASS checked',theme,width);
 }
 await browser.close();console.log(errors.length?errors.join('\n'):'PASS images, themes, borders, and layout');if(errors.length)process.exit(1);
})().catch(e=>{console.error(e);process.exit(1)});
