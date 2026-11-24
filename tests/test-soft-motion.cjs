const {chromium}=require('playwright');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const url=pathToFileURL(path.join(__dirname,'..','index.html')).href;
 for(const reduced of ['no-preference','reduce']){
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:reduced}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://lh3.googleusercontent.com/**',r=>r.abort());
  await page.goto(url);
  await page.waitForFunction(()=>document.querySelector('.hero-slide.is-active .hero-image').complete&&document.querySelector('.hero-slide.is-active .hero-image').naturalWidth>0);
  await page.locator('[data-action=hero-next]').click();
  await page.waitForTimeout(60);
  const running=await page.locator('.hero-track').evaluate(e=>e.getAnimations().length);
  if(reduced==='no-preference'&&!running)errors.push('horizontal hero transition missing');
  if(reduced==='reduce'&&running)errors.push('reduced-motion hero animated');
  await page.locator('[data-action=hero-next]').click();
  if(await page.locator('.hero-dot[aria-pressed=true]').getAttribute('data-id')!=='2')errors.push('rapid navigation state');
  await page.waitForTimeout(800);
  if(await page.locator('.hero-slide.is-active').count()!==1)errors.push('active slide state');
  const track=page.locator('.categories'),before=await track.evaluate(e=>e.scrollLeft);
  await page.locator('[data-action=categories-next]').click();
  if(reduced==='no-preference'){
   await page.waitForTimeout(200);const mid=await track.evaluate(e=>e.scrollLeft);
   await page.waitForTimeout(850);const end=await track.evaluate(e=>e.scrollLeft);
   if(!(Math.abs(mid-before)>0&&Math.abs(mid-before)<Math.abs(end-before)))errors.push('category did not animate progressively');
  }else if((await track.evaluate(e=>e.scrollLeft))===before)errors.push('reduced-motion category did not move');
  const overlay=await page.locator('.category').first().evaluate(e=>getComputedStyle(e,'::after').backgroundColor);
  if(!overlay.startsWith('rgba(238, 245, 238,'))errors.push('full-card overlay missing');
  if(errors.length)throw new Error(`${reduced}: ${errors.join(', ')}`);
  console.log('PASS',reduced,'hero and category motion, rapid navigation, and full-card overlay');await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
