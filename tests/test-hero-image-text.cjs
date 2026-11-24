const {chromium}=require('playwright');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const url=pathToFileURL(path.join(__dirname,'..','index.html')).href;
 for(const [width,reduced] of [[320,'no-preference'],[390,'no-preference'],[1440,'no-preference'],[390,'reduce']]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:reduced}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route('https://lh3.googleusercontent.com/**',r=>r.abort());await page.goto(url);
  const copy=page.locator('.hero-copy'),track=page.locator('.hero-track');
  if(await copy.evaluate(e=>!!e.closest('.hero-track')))errors.push('text inside image track');
  const before=await copy.boundingBox();const initial=await track.evaluate(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).m41);
  await page.locator('[data-action=hero-next]').click();
  if(reduced==='no-preference'){
   await page.waitForTimeout(80);const mid=await copy.boundingBox(),opacity=await copy.evaluate(e=>Number(getComputedStyle(e).opacity));
   const moved=await track.evaluate(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).m41);
   if(Math.abs(before.x-mid.x)>1||Math.abs(before.y-mid.y)>1)errors.push(`text moved ${JSON.stringify(before)} -> ${JSON.stringify(mid)}`);
   if(!(opacity<1))errors.push('text did not fade');
   if(!(moved>initial))errors.push('image did not slide');
   await page.waitForTimeout(350);
  }
  if(!(await page.locator('.hero-copy h1').innerText()).includes('منزلك دفئاً'))errors.push('text not synchronized with image');
  if(await page.locator('.hero-cta').getAttribute('href')!=='#products?category=home')errors.push('link not synchronized');
  const settled=await copy.boundingBox();if(Math.abs(before.x-settled.x)>1||Math.abs(before.y-settled.y)>1||Math.abs(before.height-settled.height)>1)errors.push(`text container shifted after update: ${JSON.stringify(before)} -> ${JSON.stringify(settled)}`);
  await page.locator('[data-action=hero-next]').click();await page.locator('[data-action=hero-prev]').click();
  if(reduced==='no-preference')await page.waitForTimeout(650);
  if(!(await page.locator('.hero-copy h1').innerText()).includes('منزلك دفئاً'))errors.push('rapid changes desynchronized text');
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))errors.push('overflow');
  if(errors.length)throw new Error(`${width} ${reduced}: ${errors.join(', ')}`);
  console.log('PASS',width,reduced,'image slides independently, fixed text fades and stays synchronized');await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
