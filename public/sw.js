if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let r={};const c=e=>s(e,n),o={module:{uri:n},exports:r,require:c};a[n]=Promise.all(i.map((e=>o[e]||c(e)))).then((e=>(t(...e),r)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"59be2c5c1a9de792df8ac2d2348fa236"},{url:"/_next/static/HyqJaKazWqKUrEqobxeQd/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/HyqJaKazWqKUrEqobxeQd/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1001.da0be97a41e5c146.js",revision:"da0be97a41e5c146"},{url:"/_next/static/chunks/1072-21b71f3f8b21b08a.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/1408.c51cf4d19ba42561.js",revision:"c51cf4d19ba42561"},{url:"/_next/static/chunks/1568-3c602a56f2772c3f.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/1679-a8ecb3a33941977b.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/1829.0162366444ee5044.js",revision:"0162366444ee5044"},{url:"/_next/static/chunks/1837.2c1e184a3ac9b085.js",revision:"2c1e184a3ac9b085"},{url:"/_next/static/chunks/1845.cc11c6edc66a4680.js",revision:"cc11c6edc66a4680"},{url:"/_next/static/chunks/1941.ce519390a498f832.js",revision:"ce519390a498f832"},{url:"/_next/static/chunks/2259-5164eac8f9133186.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/2280-8498e4aa208a718d.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/2352.d71f31261d3a28f6.js",revision:"d71f31261d3a28f6"},{url:"/_next/static/chunks/2477.c583a1f520bc57d9.js",revision:"c583a1f520bc57d9"},{url:"/_next/static/chunks/2637.bade15f5e7718f2d.js",revision:"bade15f5e7718f2d"},{url:"/_next/static/chunks/2810-7794bed2f1416762.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/2975-a0dffbeb9d2a5e2c.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/3174-64d94d3aad399e1a.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/3475-5bf91f89604e4007.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/3690.d2b0e6f1f61753de.js",revision:"d2b0e6f1f61753de"},{url:"/_next/static/chunks/3742-e2fc56637c86b4af.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/3745.2416a73297044c49.js",revision:"2416a73297044c49"},{url:"/_next/static/chunks/3896-e8c71688f57df699.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/3959-c2035e01d58a8baa.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/4099.630117e14c84fcc9.js",revision:"630117e14c84fcc9"},{url:"/_next/static/chunks/4349.8fce8ca06da81400.js",revision:"8fce8ca06da81400"},{url:"/_next/static/chunks/4487-90389c2288077e2f.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/4791.abb320fee59d6957.js",revision:"abb320fee59d6957"},{url:"/_next/static/chunks/5041-1d2015737f37650a.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/5104.6feea4708148a623.js",revision:"6feea4708148a623"},{url:"/_next/static/chunks/5267.c78458ee17841361.js",revision:"c78458ee17841361"},{url:"/_next/static/chunks/5392-1c41e66d1130e4a3.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/5484.48c137c653b0da3a.js",revision:"48c137c653b0da3a"},{url:"/_next/static/chunks/5569.19aec587ce48fabb.js",revision:"19aec587ce48fabb"},{url:"/_next/static/chunks/5650.33bc2c1667bc3f8a.js",revision:"33bc2c1667bc3f8a"},{url:"/_next/static/chunks/5662-8a647bf249b0d20a.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/5786.ce1186424c334315.js",revision:"ce1186424c334315"},{url:"/_next/static/chunks/5932.51eb5141126759fc.js",revision:"51eb5141126759fc"},{url:"/_next/static/chunks/6001.14a5677dd2ebd885.js",revision:"14a5677dd2ebd885"},{url:"/_next/static/chunks/6154.8ccbd1399f31ea89.js",revision:"8ccbd1399f31ea89"},{url:"/_next/static/chunks/6206.d7207067accdef9b.js",revision:"d7207067accdef9b"},{url:"/_next/static/chunks/6888-6b94c909a69383d1.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/7023-26bc3be7e73090c3.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/7393-e7a3b570a778f3fe.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/745.a211f2ecdd195358.js",revision:"a211f2ecdd195358"},{url:"/_next/static/chunks/7572.163cede6c6d727ff.js",revision:"163cede6c6d727ff"},{url:"/_next/static/chunks/7636-b4659bcc4758a9db.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/7642-407059e9ae373ed7.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/7858.47322526c7d7cdf4.js",revision:"47322526c7d7cdf4"},{url:"/_next/static/chunks/7886.7408ff950e26abe8.js",revision:"7408ff950e26abe8"},{url:"/_next/static/chunks/789.84d1854618b40f80.js",revision:"84d1854618b40f80"},{url:"/_next/static/chunks/797-b47a29bfd7f43df1.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/7997.b6e7acdea49502ed.js",revision:"b6e7acdea49502ed"},{url:"/_next/static/chunks/80-66563e9ee89d5278.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/8158-4329f8ca2885af9f.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/8173-4aa28779afc4ac19.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/8188-b506bce103a40219.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/864-6736f9f8500690ed.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/8666-45c90543203d5f80.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/8683.0d73615e877d06d0.js",revision:"0d73615e877d06d0"},{url:"/_next/static/chunks/8873-5273095be9f8d075.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/8941-13332804f1ac6fe1.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/9112.a0041e2ee9cef134.js",revision:"a0041e2ee9cef134"},{url:"/_next/static/chunks/9167.c4aa3e4378a106e6.js",revision:"c4aa3e4378a106e6"},{url:"/_next/static/chunks/9173.bc06d91173c54ce6.js",revision:"bc06d91173c54ce6"},{url:"/_next/static/chunks/9310-4ed30fc5eff2373c.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/937.a8d9f0e3bfa2f854.js",revision:"a8d9f0e3bfa2f854"},{url:"/_next/static/chunks/9389-c1ac17071a85f607.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/9460.edb755b10d94e225.js",revision:"edb755b10d94e225"},{url:"/_next/static/chunks/9489-b2631ba8041237ab.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/9579.941f5ab226735d8a.js",revision:"941f5ab226735d8a"},{url:"/_next/static/chunks/9611.8e55c81b034e2618.js",revision:"8e55c81b034e2618"},{url:"/_next/static/chunks/9655.228dcf36ed50efc8.js",revision:"228dcf36ed50efc8"},{url:"/_next/static/chunks/9671.da5960ca539548df.js",revision:"da5960ca539548df"},{url:"/_next/static/chunks/9847-faf9c09645eac9fe.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/994.07988e5bb9d9f28b.js",revision:"07988e5bb9d9f28b"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/check-phone-number/page-7d09474f8abb5fef.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/confirm-code/page-8ce7731c9bd3ad0c.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/listing/page-91eed05e69a38af2.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/page-4ce69882b5816e3c.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/register/page-55ce4ecaa14a3665.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/sign-up/page-8505af19841f6387.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/create/page-9567d2e2920f8190.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/edit/%5Bid%5D/page-68bf081ea37693c0.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/page-9db2a9fb5619c69a.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/page-10357aa7e644a9a1.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/skus/create/page-195a58d3227f090d.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/skus/edit/%5Bid%5D/page-b83a693db7ad3306.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/skus/page-d8c4142435f378cb.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/blob/page-2f55a56351d63cf3.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/create/page-431376861a07b671.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/edit/%5Bid%5D/page-3b0f44b91bbbf0aa.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/page-b3c1a417fdb82d22.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/check-phone-number/page-fbeffbd09b0dfca4.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/confirm-code/page-e2d069822b8e9309.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/confirm-email/page-2970604ca9c00b67.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/confirm-new-email/page-f2706993f55a3052.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/forgot-password/page-632385cb382cbe31.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/garantia/page-e72c0783c0124b4f.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/layout-dff62e7b11d20cce.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/listing/page-b4543268f57efc9d.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/loading-6ce4c0942df53c52.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/page-882a0419ea02a99a.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/password-change/page-05f2779182996d6a.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/privacy-policy/page-393868587c9c5f2c.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/profile/edit/page-b9900d6cf08230da.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/profile/page-7c3e4bdd08c08b8c.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/scan/page-69669610c2ad256d.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/sign-in/page-4fb854a08a2c97db.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/%5Blanguage%5D/sign-up/page-ce9f45e4ac7d2a69.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/app/_not-found/page-6edc63799cffe2db.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/fd9d1056-eada8e4fc13f2930.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/main-939bad33d9b82fba.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/main-app-eaadcfff9d7d0a3e.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-0c852f96efbe89c2.js",revision:"HyqJaKazWqKUrEqobxeQd"},{url:"/_next/static/css/ba87a2e5cc08f324.css",revision:"ba87a2e5cc08f324"},{url:"/_next/static/media/logo.WSE.short.e23f209c.svg",revision:"7d8d36227699935ce7ae13d6cbe88e16"},{url:"/_next/static/media/roboto-cyrillic-300-normal.17dc3449.woff",revision:"17dc3449"},{url:"/_next/static/media/roboto-cyrillic-300-normal.88798412.woff2",revision:"88798412"},{url:"/_next/static/media/roboto-cyrillic-400-normal.19f93502.woff",revision:"19f93502"},{url:"/_next/static/media/roboto-cyrillic-400-normal.2d9c9d60.woff2",revision:"2d9c9d60"},{url:"/_next/static/media/roboto-cyrillic-500-normal.6e4060e5.woff",revision:"6e4060e5"},{url:"/_next/static/media/roboto-cyrillic-500-normal.aa68ea54.woff2",revision:"aa68ea54"},{url:"/_next/static/media/roboto-cyrillic-700-normal.1ea775f3.woff",revision:"1ea775f3"},{url:"/_next/static/media/roboto-cyrillic-700-normal.258a358e.woff2",revision:"258a358e"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.cd7c5715.woff2",revision:"cd7c5715"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.de365ce5.woff",revision:"de365ce5"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.02e18372.woff",revision:"02e18372"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.d7827ae3.woff2",revision:"d7827ae3"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a05054d8.woff",revision:"a05054d8"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a1b5c90d.woff2",revision:"a1b5c90d"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.46ca43b3.woff",revision:"46ca43b3"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.dd3651fb.woff2",revision:"dd3651fb"},{url:"/_next/static/media/roboto-greek-300-normal.122e04f2.woff",revision:"122e04f2"},{url:"/_next/static/media/roboto-greek-300-normal.25dc89b0.woff2",revision:"25dc89b0"},{url:"/_next/static/media/roboto-greek-400-normal.63e6dc18.woff2",revision:"63e6dc18"},{url:"/_next/static/media/roboto-greek-400-normal.e3b5876b.woff",revision:"e3b5876b"},{url:"/_next/static/media/roboto-greek-500-normal.533b03d2.woff2",revision:"533b03d2"},{url:"/_next/static/media/roboto-greek-500-normal.55bbf615.woff",revision:"55bbf615"},{url:"/_next/static/media/roboto-greek-700-normal.432b858b.woff2",revision:"432b858b"},{url:"/_next/static/media/roboto-greek-700-normal.b3d9786c.woff",revision:"b3d9786c"},{url:"/_next/static/media/roboto-greek-ext-300-normal.69dd9b06.woff",revision:"69dd9b06"},{url:"/_next/static/media/roboto-greek-ext-300-normal.bc5ce703.woff2",revision:"bc5ce703"},{url:"/_next/static/media/roboto-greek-ext-400-normal.2b547ded.woff2",revision:"2b547ded"},{url:"/_next/static/media/roboto-greek-ext-400-normal.d17f5f2b.woff",revision:"d17f5f2b"},{url:"/_next/static/media/roboto-greek-ext-500-normal.7ea6cffa.woff2",revision:"7ea6cffa"},{url:"/_next/static/media/roboto-greek-ext-500-normal.fcc37f63.woff",revision:"fcc37f63"},{url:"/_next/static/media/roboto-greek-ext-700-normal.950178dd.woff",revision:"950178dd"},{url:"/_next/static/media/roboto-greek-ext-700-normal.a8d16efd.woff2",revision:"a8d16efd"},{url:"/_next/static/media/roboto-latin-300-normal.73b81266.woff",revision:"73b81266"},{url:"/_next/static/media/roboto-latin-300-normal.a4eae32d.woff2",revision:"a4eae32d"},{url:"/_next/static/media/roboto-latin-400-normal.d6d4cf7b.woff",revision:"d6d4cf7b"},{url:"/_next/static/media/roboto-latin-400-normal.f2894edc.woff2",revision:"f2894edc"},{url:"/_next/static/media/roboto-latin-500-normal.3170fd9a.woff2",revision:"3170fd9a"},{url:"/_next/static/media/roboto-latin-500-normal.cdad2023.woff",revision:"cdad2023"},{url:"/_next/static/media/roboto-latin-700-normal.71b2beb8.woff2",revision:"71b2beb8"},{url:"/_next/static/media/roboto-latin-700-normal.f3ddaf9d.woff",revision:"f3ddaf9d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.37d4965d.woff2",revision:"37d4965d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.b9b4688a.woff",revision:"b9b4688a"},{url:"/_next/static/media/roboto-latin-ext-400-normal.21abc8c8.woff2",revision:"21abc8c8"},{url:"/_next/static/media/roboto-latin-ext-400-normal.9600b4a6.woff",revision:"9600b4a6"},{url:"/_next/static/media/roboto-latin-ext-500-normal.41845160.woff",revision:"41845160"},{url:"/_next/static/media/roboto-latin-ext-500-normal.85ebfb55.woff2",revision:"85ebfb55"},{url:"/_next/static/media/roboto-latin-ext-700-normal.6af98c24.woff2",revision:"6af98c24"},{url:"/_next/static/media/roboto-latin-ext-700-normal.b6be88e2.woff",revision:"b6be88e2"},{url:"/_next/static/media/roboto-vietnamese-300-normal.44e9a722.woff",revision:"44e9a722"},{url:"/_next/static/media/roboto-vietnamese-300-normal.b3d3e960.woff2",revision:"b3d3e960"},{url:"/_next/static/media/roboto-vietnamese-400-normal.b339d926.woff",revision:"b339d926"},{url:"/_next/static/media/roboto-vietnamese-400-normal.c95fc061.woff2",revision:"c95fc061"},{url:"/_next/static/media/roboto-vietnamese-500-normal.65b57a7f.woff",revision:"65b57a7f"},{url:"/_next/static/media/roboto-vietnamese-500-normal.7f8c0554.woff2",revision:"7f8c0554"},{url:"/_next/static/media/roboto-vietnamese-700-normal.72bf832f.woff2",revision:"72bf832f"},{url:"/_next/static/media/roboto-vietnamese-700-normal.82ca662a.woff",revision:"82ca662a"},{url:"/_next/static/media/scan.dcbaf80d.svg",revision:"ec5d4f5d4a7fa6fb36379d2c3edc9aa0"},{url:"/_next/static/media/tanque.0fa48534.svg",revision:"817932d82329a615932ecbd97ccff3f4"},{url:"/assets/images/WSE192x192.png",revision:"f1011da4bdfe7e2d712e57532886f354"},{url:"/assets/images/bg01.jpg",revision:"33f519aa5548c1913fffb78a33559f21"},{url:"/assets/images/drawing.svg",revision:"0e43f944b3399c268d63cbd964f0647f"},{url:"/assets/images/logo.WSE.short.svg",revision:"7d8d36227699935ce7ae13d6cbe88e16"},{url:"/assets/images/logo.WSE.square.svg",revision:"3a9f0696891e4b6e530823cee1d73173"},{url:"/assets/images/logo320x132.png",revision:"79998e3aaecba4c84a38a53662333b2c"},{url:"/assets/images/logowse.svg",revision:"6f17a474f9e7c7f348ea724469b90a95"},{url:"/assets/images/logowse.white.svg",revision:"e2d6d34dfc2b6aa114206208b2680e19"},{url:"/assets/images/scan.svg",revision:"ec5d4f5d4a7fa6fb36379d2c3edc9aa0"},{url:"/assets/images/screenshot_desktop_1280x800.png",revision:"d9bf9f48b15f05da9cd7731c718e43f4"},{url:"/assets/images/screenshot_mobile_1080x1920.png",revision:"38a89c260a21638dda8cd2e30daa3014"},{url:"/assets/images/tanque.svg",revision:"817932d82329a615932ecbd97ccff3f4"},{url:"/manifest.json",revision:"162771ca621332e1605c2e8863cc7f06"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
