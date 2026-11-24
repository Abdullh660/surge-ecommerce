import {originalImages} from './source-images.js';
export const categories=[['electronics','الإلكترونيات','⌁'],['phones','الجوالات','▯'],['fashion','الأزياء','♧'],['beauty','العطور والجمال','✿'],['home','المنزل والأثاث','⌂'],['food','المواد الغذائية','♨'],['sport','الرياضة','◉'],['kids','الأطفال والألعاب','☆']];
export const stores=[
 {id:'tech',name:'عالم التقنية',category:'electronics',specialty:'إلكترونيات وأجهزة ذكية',description:'أحدث السماعات والأجهزة الذكية وإكسسوارات العمل بضمان الوكيل المعتمد.',rating:4.9,city:'الرياض',cover:11,verified:true},
 {id:'perfume',name:'لمسة للعطور',category:'beauty',specialty:'عطور شرقية وبخور',description:'تشكيلة مختارة من دهن العود الفاخر والعطور الشرقية والغربية الأصلية.',rating:4.8,city:'جدة',cover:12,verified:true},
 {id:'home',name:'بيتي للأثاث',category:'home',specialty:'أثاث وديكور منزلي',description:'تصاميم أثاث عصرية من الخشب الطبيعي والمنسوجات المريحة لكل غرفة.',rating:4.7,city:'الدمام',cover:13,verified:true},
 {id:'appliance',name:'بيت الأجهزة',category:'home',specialty:'أجهزة منزلية',description:'أجهزة منزلية مختارة للاستخدام اليومي.',rating:4.7,city:'الرياض',cover:6,verified:false},
 {id:'sport',name:'رياضي',category:'sport',specialty:'الرياضة واللياقة',description:'منتجات رياضية مختارة لحركتك اليومية.',rating:4.6,city:'الرياض',cover:5,verified:false},
 {id:'nature',name:'سوق الطبيعة',category:'food',specialty:'الضيافة والتمور',description:'تشكيلة من الضيافة والمنتجات الغذائية.',rating:4.9,city:'الرياض',cover:8,verified:false},
 {id:'beauty',name:'لمسة جمال',category:'beauty',specialty:'العناية والجمال',description:'منتجات مختارة للعناية اليومية.',rating:4.8,city:'جدة',cover:9,verified:false},
 {id:'smart',name:'سمارت ستور',category:'electronics',specialty:'أجهزة ذكية',description:'أجهزة ذكية وإكسسوارات عصرية.',rating:4.9,city:'الرياض',cover:5,verified:false}
];
export const products=[
 {id:'headphones',name:'سماعة لاسلكية عازلة للضوضاء برو — إصدار 2026',store:'tech',category:'electronics',brand:'SoundCore',price:44900,old:56000,rating:4.8,reviews:142,image:1,stock:10,free:true,description:'سماعة رأس لاسلكية متطورة بتقنية عزل الضوضاء النشط، مع بطارية تدوم 50 ساعة وشحن سريع عبر USB-C، ووسائد أذن مريحة للعمل والسفر.',variants:true},
 {id:'oud',name:'عطر عود ملكي عنبر فاخر — 100 مل',store:'perfume',category:'beauty',brand:'لمسة',price:32000,old:41000,rating:4.9,reviews:89,image:2,stock:8,free:false,description:'عطر شرقي بلمسات العود والعنبر الفاخرة.'},
 {id:'coffee',name:'ماكينة تحضير الإسبريسو بضغط 15 بار ستانلس ستيل',store:'appliance',category:'home',brand:'بيت الأجهزة',price:89000,old:115000,rating:4.7,reviews:64,image:3,stock:5,free:true,description:'ماكينة إسبريسو منزلية لتحضير قهوتك المفضلة.'},
 {id:'shoe',name:'حذاء جري رياضي مريح بنعل مزدوج التوسيد',store:'sport',category:'sport',brand:'رياضي',price:27500,old:34000,rating:4.6,reviews:215,image:4,stock:7,free:false,description:'حذاء رياضي خفيف ومريح للاستخدام اليومي.'},
 {id:'watch',name:'ساعة ذكية رياضية بإطار تيتانيوم وتتبع نبض القلب',store:'smart',category:'electronics',brand:'Smart',price:78000,rating:4.9,reviews:73,image:7,stock:6,free:true,description:'ساعة ذكية لمتابعة نشاطك اليومي.'},
 {id:'dates',name:'صندوق ضيافة تمور خلاص ملكي مع قهوة عربية محمصة',store:'nature',category:'food',brand:'سوق الطبيعة',price:16500,rating:5,reviews:194,image:8,stock:9,free:false,description:'صندوق ضيافة مختار من التمور والقهوة العربية.'},
 {id:'serum',name:'مجموعة العناية اليومية: سيروم فيتامين C وكريم ترطيب',store:'beauty',category:'beauty',brand:'لمسة جمال',price:21000,rating:4.8,reviews:118,image:9,stock:12,free:false,description:'مجموعة عناية يومية للبشرة.'},
 {id:'chair',name:'كرسي استرخاء عصري من خشب البلوط وقماش البوكليه',store:'home',category:'home',brand:'بيتي',price:119000,rating:4.7,reviews:42,image:10,stock:4,free:false,description:'كرسي استرخاء بتصميم عصري وخامات مريحة.'}
];
export const storeById=id=>stores.find(s=>s.id===id);
export const productById=id=>products.find(p=>p.id===id);
// Use embedded originals first; otherwise try the original remote link.
const localImages={1:'embedded-7b0cad82b437.png',2:'embedded-ada652e2fc27.png',8:'embedded-d708f61e5e94.png',14:'embedded-4809e46e6806.png'};
const fallbackImage=n=>`assets/images/${Number(n)===6?'demo-interior.jpg':([0,5,11,12,13].includes(Number(n))?'cover-placeholder.svg':'product-placeholder.svg')}`;
export const image=n=>localImages[n]?`assets/images/${localImages[n]}`:(originalImages[n]||fallbackImage(n));
export const fallbackForImage=src=>{const entry=Object.entries(originalImages).find(([,url])=>url===src);return entry?fallbackImage(entry[0]):null};
