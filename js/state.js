import {productById} from './data.js';
const KEY='surge.demo.v1';
const defaults=()=>({theme:'light',cart:[],favorites:[],followedStores:[],selectedLocation:'المكلا',appliedCoupon:null,orders:[],recentSearches:[],demoScenario:'default',paymentFailure:false,events:[]});
let saved;try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch{saved={}}
export let state={...defaults(),...(saved&&typeof saved==='object'?saved:{})};
for(const k of ['cart','favorites','followedStores','orders','recentSearches','events'])if(!Array.isArray(state[k]))state[k]=[];
state.theme=['light','dark'].includes(state.theme)?state.theme:'light';
// Migrate locations saved by the earlier Saudi-focused demo; retain later Yemeni selections.
if(!state.selectedLocation||['الرياض','جدة','الدمام','مكة المكرمة'].includes(state.selectedLocation))state.selectedLocation='المكلا';
state.cart=state.cart.filter(x=>x&&productById(x.id)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=productById(x.id).stock&&(!productById(x.id).variants||(['أسود مطفي','أخضر غابات'].includes(x.color)&&['إصدار برو مع حقيبة السفر','الإصدار القياسي'].includes(x.edition))));
state.orders=state.orders.filter(x=>x&&typeof x.id==='string'&&Array.isArray(x.items));
if(state.appliedCoupon!=='SURGE10')state.appliedCoupon=null;
export function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
export function reset(){state=defaults();save()}
export function price(item){let p=productById(item.id);return p.price+(p.variants&&item.edition==='الإصدار القياسي'?-5000:0)}
export function totals(){const subtotal=state.cart.reduce((n,x)=>n+price(x)*x.qty,0);const vendorIds=[...new Set(state.cart.map(x=>productById(x.id).store))];const shipping=vendorIds.reduce((n,id)=>n+(state.cart.filter(x=>productById(x.id).store===id).every(x=>productById(x.id).free)?0:2500),0);const discount=state.appliedCoupon==='SURGE10'?Math.round(subtotal*.1):0;return {subtotal,shipping,discount,total:subtotal+shipping-discount}}
export function add(id,qty=1,color='',edition=''){const p=productById(id);if(!p)return false;const existing=state.cart.find(x=>x.id===id&&x.color===color&&x.edition===edition);if((existing?.qty||0)+qty>p.stock)return false;if(existing)existing.qty+=qty;else state.cart.push({id,qty,color,edition});save();return true}
export function log(...messages){state.events.push(...messages.map(message=>({message,time:new Date().toLocaleTimeString('ar-YE')})));state.events=state.events.slice(-30);save()}
export const money=n=>`${new Intl.NumberFormat('ar-YE',{maximumFractionDigits:2}).format(n/100)} ر.ي`;
