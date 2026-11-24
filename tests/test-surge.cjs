const { chromium } = require('playwright');
const fs = require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 const check=(condition,msg)=>{if(!condition)throw new Error(msg);console.log('PASS',msg)};
 await page.goto('http://127.0.0.1:8000/?demo=1');await page.waitForSelector('.hero');
 check(await page.locator('.product-card').count()===8,'homepage products');
 await page.locator('[data-action="quick-add"][data-id="headphones"]').first().click();await page.waitForURL('**#product?id=headphones');
 await page.locator('[data-action="edition"][data-id="الإصدار القياسي"]').click();await page.locator('[data-action="detail-plus"]').click();await page.locator('[data-action="add-detail"]').click();
 await page.goto('http://127.0.0.1:8000/?demo=1#stores');await page.locator('a[href="#store?id=perfume"]').first().click();await page.locator('[data-action="quick-add"][data-id="oud"]').click();
 await page.goto('http://127.0.0.1:8000/?demo=1#cart');check(await page.locator('.cart-group').count()===2,'multi-vendor cart');
 await page.locator('#coupon input').fill('SURGE10');await page.locator('#coupon button').first().click();check(await page.evaluate(()=>JSON.parse(localStorage.getItem('surge.demo.v1')).appliedCoupon)==='SURGE10', 'coupon applied');
 await page.locator('a[href="#checkout"]').click();await page.locator('#checkout-form button[type=submit]').click();check(await page.locator('[data-error="name"]').innerText()!=='','checkout validation');
 await page.locator('[name=name]').fill('أحمد التجريبي');await page.locator('[name=phone]').fill('771234567');await page.locator('[name=address]').fill('المكلا شارع السلام ١٠');await page.locator('#checkout-form button[type=submit]').click();await page.waitForURL('**#success?id=*');check(await page.getByText('تم تأكيد طلبك بنجاح').count()===1,'order success');
 await page.reload();check(await page.getByText('تم تأكيد طلبك بنجاح').count()===1,'order persists on refresh');
 await page.goto('http://127.0.0.1:8000/?demo=1#products');await page.locator('[name=category][value=beauty]').check();check(await page.locator('.product-card').count()===2,'category filter');
 await page.locator('[data-action="theme"]').first().click();await page.reload();check(await page.locator('html').getAttribute('data-theme')==='dark','theme persistence');
 await page.locator('[data-action="favorite"]').first().click();await page.locator('[data-action="favorites"]').first().click();check(await page.locator('.modal .product-card').count()===1,'favorites');await page.keyboard.press('Escape');
 const routes=['home','products','stores','store?id=tech','product?id=headphones','cart','checkout'];
 for(const theme of ['light','dark'])for(const size of [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}]){
  await page.setViewportSize({width:size.width,height:size.height});await page.evaluate(theme=>{let s=JSON.parse(localStorage.getItem('surge.demo.v1'));s.theme=theme;s.cart=[{id:'headphones',qty:1,color:'أسود مطفي',edition:'إصدار برو مع حقيبة السفر'},{id:'oud',qty:1,color:'',edition:''}];localStorage.setItem('surge.demo.v1',JSON.stringify(s))},theme);
  for(const r of routes){await page.goto('http://127.0.0.1:8000/#'+r);await page.reload();await page.evaluate(()=>document.querySelectorAll('img').forEach(x=>x.loading='eager'));await page.waitForTimeout(200);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)errors.push(`overflow ${theme} ${size.name} ${r}`);const broken=await page.locator('img').evaluateAll(xs=>xs.filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.src));if(broken.length)errors.push(`broken images ${r}: ${broken}`);await page.screenshot({path:`screenshots/${theme}-${size.name}-${r.split('?')[0]}.png`,fullPage:true})}
 }
 console.log('ERRORS',JSON.stringify(errors));await browser.close();if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
