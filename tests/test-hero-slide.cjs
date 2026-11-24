const {chromium}=require('playwright');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const url=pathToFileURL(path.join(__dirname,'..','index.html')).href;
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900},hasTouch:width===390}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route('https://lh3.googleusercontent.com/**',r=>r.abort());await page.goto(url);
  const track=page.locator('.hero-track');const offset=()=>track.evaluate(e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).m41);
  const viewport=await page.locator('.hero-viewport').evaluate(e=>e.getBoundingClientRect().width),initial=await offset();
  if(Math.abs(initial-viewport)>2)errors.push('initial slide alignment');
  await page.locator('[data-action=hero-next]').click();await page.waitForTimeout(280);const mid=await offset();
  if(!(mid>initial+1&&mid<viewport*2-1))errors.push(`slide is not moving horizontally: ${initial}, ${mid}`);
  await page.waitForTimeout(750);const end=await offset();if(Math.abs(end-viewport*2)>2)errors.push(`next slide alignment ${end}`);
  await page.locator('[data-action=hero-next]').click();await page.locator('[data-action=hero-next]').click();
  if(await page.locator('.hero-dot[aria-pressed=true]').getAttribute('data-id')!=='0')errors.push('last to first state');
  await page.waitForTimeout(1000);if(Math.abs((await offset())-viewport)>2)errors.push('last to first wrap alignment');
  await page.locator('[data-action=hero-prev]').click();await page.waitForTimeout(1000);
  if(await page.locator('.hero-dot[aria-pressed=true]').getAttribute('data-id')!=='2'||Math.abs((await offset())-viewport*3)>2)errors.push('first to last wrap');
  const accessibility=await page.locator('.hero-slide:not([data-clone])').evaluateAll(xs=>xs.map(x=>({hidden:x.getAttribute('aria-hidden'),inert:x.hasAttribute('inert')})));
  if(accessibility.filter(x=>x.hidden==='false'&&!x.inert).length!==1)errors.push('inactive slide accessibility');
  if(width===390){
   const box=await page.locator('.hero-viewport').boundingBox();const client=await page.context().newCDPSession(page);const y=box.y+box.height/2;
   await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+70,y}]});
   await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:box.x+200,y}]});
   await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   if(await page.locator('.hero-dot[aria-pressed=true]').getAttribute('data-id')!=='0')errors.push('RTL touch swipe');
  }
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))errors.push('horizontal document overflow');
  if(errors.length)throw new Error(width+': '+errors.join(', '));
  console.log('PASS',width,'horizontal motion, alignment, wrap, accessibility'+(width===390?', touch swipe':''));await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
