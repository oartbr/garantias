if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const c=e=>a(e,n),r={module:{uri:n},exports:o,require:c};s[n]=Promise.all(t.map((e=>r[e]||c(e)))).then((e=>(i(...e),o)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"92f4f3155b54392bb4524eafc091921b"},{url:"/_next/static/PE5wpsdomqmDXNHtzvoAU/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/PE5wpsdomqmDXNHtzvoAU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1001.da0be97a41e5c146.js",revision:"da0be97a41e5c146"},{url:"/_next/static/chunks/104-94dab80db0dc241c.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/1072-cf4420fd787a40fb.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/1408.c51cf4d19ba42561.js",revision:"c51cf4d19ba42561"},{url:"/_next/static/chunks/1568-3c602a56f2772c3f.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/1679-a8ecb3a33941977b.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/1829.0162366444ee5044.js",revision:"0162366444ee5044"},{url:"/_next/static/chunks/1837.2c1e184a3ac9b085.js",revision:"2c1e184a3ac9b085"},{url:"/_next/static/chunks/1845.cc11c6edc66a4680.js",revision:"cc11c6edc66a4680"},{url:"/_next/static/chunks/1941.ce519390a498f832.js",revision:"ce519390a498f832"},{url:"/_next/static/chunks/2259-5164eac8f9133186.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/2280-8498e4aa208a718d.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/2352.d71f31261d3a28f6.js",revision:"d71f31261d3a28f6"},{url:"/_next/static/chunks/2477.c583a1f520bc57d9.js",revision:"c583a1f520bc57d9"},{url:"/_next/static/chunks/2604-d5ca56a84040d1f3.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/2637.bade15f5e7718f2d.js",revision:"bade15f5e7718f2d"},{url:"/_next/static/chunks/2810-cb2749650c884b32.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/3037-02accfa027d3be87.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/3444-b189afc07449e59b.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/3475-5bf91f89604e4007.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/3690.d2b0e6f1f61753de.js",revision:"d2b0e6f1f61753de"},{url:"/_next/static/chunks/3745.2416a73297044c49.js",revision:"2416a73297044c49"},{url:"/_next/static/chunks/3896-cc9303070a0ce60e.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/3959-c2035e01d58a8baa.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/4099.630117e14c84fcc9.js",revision:"630117e14c84fcc9"},{url:"/_next/static/chunks/4349.8fce8ca06da81400.js",revision:"8fce8ca06da81400"},{url:"/_next/static/chunks/4791.abb320fee59d6957.js",revision:"abb320fee59d6957"},{url:"/_next/static/chunks/5041-1d2015737f37650a.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/5104.6feea4708148a623.js",revision:"6feea4708148a623"},{url:"/_next/static/chunks/5253.0d02d2142070ecb6.js",revision:"0d02d2142070ecb6"},{url:"/_next/static/chunks/5267.c78458ee17841361.js",revision:"c78458ee17841361"},{url:"/_next/static/chunks/5392-1c41e66d1130e4a3.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/5484.48c137c653b0da3a.js",revision:"48c137c653b0da3a"},{url:"/_next/static/chunks/5569.e371c95f83b291ff.js",revision:"e371c95f83b291ff"},{url:"/_next/static/chunks/5650.ff3f4f9f1c631909.js",revision:"ff3f4f9f1c631909"},{url:"/_next/static/chunks/5786.ce1186424c334315.js",revision:"ce1186424c334315"},{url:"/_next/static/chunks/5848-2e0033f6e2c2d25b.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/5932.51eb5141126759fc.js",revision:"51eb5141126759fc"},{url:"/_next/static/chunks/6001.14a5677dd2ebd885.js",revision:"14a5677dd2ebd885"},{url:"/_next/static/chunks/6154.8ccbd1399f31ea89.js",revision:"8ccbd1399f31ea89"},{url:"/_next/static/chunks/6206.d7207067accdef9b.js",revision:"d7207067accdef9b"},{url:"/_next/static/chunks/6888-b0bed593cbb2a3af.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/7023-26bc3be7e73090c3.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/7393-4f78eb9d7a024afe.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/745.e3c89ad4a7d4961f.js",revision:"e3c89ad4a7d4961f"},{url:"/_next/static/chunks/7572.163cede6c6d727ff.js",revision:"163cede6c6d727ff"},{url:"/_next/static/chunks/7636-b4659bcc4758a9db.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/7642-407059e9ae373ed7.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/7858.47322526c7d7cdf4.js",revision:"47322526c7d7cdf4"},{url:"/_next/static/chunks/7886.7408ff950e26abe8.js",revision:"7408ff950e26abe8"},{url:"/_next/static/chunks/789.84d1854618b40f80.js",revision:"84d1854618b40f80"},{url:"/_next/static/chunks/797-44080237959bb1a1.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/7997.b90f897a2604c72b.js",revision:"b90f897a2604c72b"},{url:"/_next/static/chunks/80-1f620fa1f9fd2169.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/8158-4329f8ca2885af9f.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/8173-4aa28779afc4ac19.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/8188-b506bce103a40219.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/8433-fa52d18fc4a078fd.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/864-6736f9f8500690ed.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/8666-45c90543203d5f80.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/8683.0d73615e877d06d0.js",revision:"0d73615e877d06d0"},{url:"/_next/static/chunks/8873-5273095be9f8d075.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/9112.a0041e2ee9cef134.js",revision:"a0041e2ee9cef134"},{url:"/_next/static/chunks/9167.c4aa3e4378a106e6.js",revision:"c4aa3e4378a106e6"},{url:"/_next/static/chunks/9173.bc06d91173c54ce6.js",revision:"bc06d91173c54ce6"},{url:"/_next/static/chunks/9310-4ed30fc5eff2373c.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/937.a8d9f0e3bfa2f854.js",revision:"a8d9f0e3bfa2f854"},{url:"/_next/static/chunks/9460.edb755b10d94e225.js",revision:"edb755b10d94e225"},{url:"/_next/static/chunks/9489-41c73e008de18b06.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/9579.941f5ab226735d8a.js",revision:"941f5ab226735d8a"},{url:"/_next/static/chunks/9611.1bc55a3ab0615c17.js",revision:"1bc55a3ab0615c17"},{url:"/_next/static/chunks/9655.228dcf36ed50efc8.js",revision:"228dcf36ed50efc8"},{url:"/_next/static/chunks/9671.da5960ca539548df.js",revision:"da5960ca539548df"},{url:"/_next/static/chunks/9847-faf9c09645eac9fe.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/994.07988e5bb9d9f28b.js",revision:"07988e5bb9d9f28b"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/check-phone-number/page-0c352923350c7406.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/confirm-code/page-1a8c430bcbd92756.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/listing/page-35c8417260c16554.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/page-6d8dd79f6716ac3a.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/register/page-38a940c81a8b4f6d.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/%5Bid%5D/sign-up/page-1544fa690c9114bd.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/assign/%5Bid%5D/page-a2ac534fd25383c9.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/check/%5Bid%5D/page-6632cc7d2aeda2e1.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/create/page-58637aa93e182606.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/edit/%5Bid%5D/page-b5602503e3a0da8d.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/garantias/page-7d26695df13d490c.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/page-bf8e5e5ff938349d.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/skus/create/page-8bc7aba56bf378d4.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/skus/edit/%5Bid%5D/page-6a6bad9a13491ee7.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/skus/page-3aeb8794060859f7.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/blob/page-2f55a56351d63cf3.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/create/page-e987d0de2378e019.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/edit/%5Bid%5D/page-267a86656cbc8623.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/admin-panel/users/page-7cae65daf24bacb1.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/check-phone-number/page-cb2b614647646a92.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/confirm-code/page-d3a9f043edb1b1c6.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/confirm-email/page-59bbc53277826617.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/confirm-new-email/page-a0cdb929ec68dfb7.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/forgot-password/page-f7b2e9d8984c5a05.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/garantia/page-02f8c147413429e0.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/layout-4f391704c1dad3e4.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/listing/page-65e5c0802704aadf.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/loading-6ce4c0942df53c52.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/page-b1873ad3b81af0cc.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/password-change/page-55e4cbef8f9f49ba.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/privacy-policy/page-5d0786679ceab116.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/profile/edit/page-9d3eb216d1956f5d.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/profile/page-30cb1e546fab177c.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/scan/page-9a22322ba8e38524.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/sign-in/page-78fedbc4599d1066.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/%5Blanguage%5D/sign-up/page-84ee9793f28f9dc8.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/app/_not-found/page-6edc63799cffe2db.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/fd9d1056-eada8e4fc13f2930.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/main-939bad33d9b82fba.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/main-app-eaadcfff9d7d0a3e.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-1647fcad071dc6b2.js",revision:"PE5wpsdomqmDXNHtzvoAU"},{url:"/_next/static/css/62fa35cc558ac5a1.css",revision:"62fa35cc558ac5a1"},{url:"/_next/static/media/logo.WSE.short.e23f209c.svg",revision:"7d8d36227699935ce7ae13d6cbe88e16"},{url:"/_next/static/media/roboto-cyrillic-300-normal.17dc3449.woff",revision:"17dc3449"},{url:"/_next/static/media/roboto-cyrillic-300-normal.88798412.woff2",revision:"88798412"},{url:"/_next/static/media/roboto-cyrillic-400-normal.19f93502.woff",revision:"19f93502"},{url:"/_next/static/media/roboto-cyrillic-400-normal.2d9c9d60.woff2",revision:"2d9c9d60"},{url:"/_next/static/media/roboto-cyrillic-500-normal.6e4060e5.woff",revision:"6e4060e5"},{url:"/_next/static/media/roboto-cyrillic-500-normal.aa68ea54.woff2",revision:"aa68ea54"},{url:"/_next/static/media/roboto-cyrillic-700-normal.1ea775f3.woff",revision:"1ea775f3"},{url:"/_next/static/media/roboto-cyrillic-700-normal.258a358e.woff2",revision:"258a358e"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.cd7c5715.woff2",revision:"cd7c5715"},{url:"/_next/static/media/roboto-cyrillic-ext-300-normal.de365ce5.woff",revision:"de365ce5"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.02e18372.woff",revision:"02e18372"},{url:"/_next/static/media/roboto-cyrillic-ext-400-normal.d7827ae3.woff2",revision:"d7827ae3"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a05054d8.woff",revision:"a05054d8"},{url:"/_next/static/media/roboto-cyrillic-ext-500-normal.a1b5c90d.woff2",revision:"a1b5c90d"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.46ca43b3.woff",revision:"46ca43b3"},{url:"/_next/static/media/roboto-cyrillic-ext-700-normal.dd3651fb.woff2",revision:"dd3651fb"},{url:"/_next/static/media/roboto-greek-300-normal.122e04f2.woff",revision:"122e04f2"},{url:"/_next/static/media/roboto-greek-300-normal.25dc89b0.woff2",revision:"25dc89b0"},{url:"/_next/static/media/roboto-greek-400-normal.63e6dc18.woff2",revision:"63e6dc18"},{url:"/_next/static/media/roboto-greek-400-normal.e3b5876b.woff",revision:"e3b5876b"},{url:"/_next/static/media/roboto-greek-500-normal.533b03d2.woff2",revision:"533b03d2"},{url:"/_next/static/media/roboto-greek-500-normal.55bbf615.woff",revision:"55bbf615"},{url:"/_next/static/media/roboto-greek-700-normal.432b858b.woff2",revision:"432b858b"},{url:"/_next/static/media/roboto-greek-700-normal.b3d9786c.woff",revision:"b3d9786c"},{url:"/_next/static/media/roboto-greek-ext-300-normal.69dd9b06.woff",revision:"69dd9b06"},{url:"/_next/static/media/roboto-greek-ext-300-normal.bc5ce703.woff2",revision:"bc5ce703"},{url:"/_next/static/media/roboto-greek-ext-400-normal.2b547ded.woff2",revision:"2b547ded"},{url:"/_next/static/media/roboto-greek-ext-400-normal.d17f5f2b.woff",revision:"d17f5f2b"},{url:"/_next/static/media/roboto-greek-ext-500-normal.7ea6cffa.woff2",revision:"7ea6cffa"},{url:"/_next/static/media/roboto-greek-ext-500-normal.fcc37f63.woff",revision:"fcc37f63"},{url:"/_next/static/media/roboto-greek-ext-700-normal.950178dd.woff",revision:"950178dd"},{url:"/_next/static/media/roboto-greek-ext-700-normal.a8d16efd.woff2",revision:"a8d16efd"},{url:"/_next/static/media/roboto-latin-300-normal.73b81266.woff",revision:"73b81266"},{url:"/_next/static/media/roboto-latin-300-normal.a4eae32d.woff2",revision:"a4eae32d"},{url:"/_next/static/media/roboto-latin-400-normal.d6d4cf7b.woff",revision:"d6d4cf7b"},{url:"/_next/static/media/roboto-latin-400-normal.f2894edc.woff2",revision:"f2894edc"},{url:"/_next/static/media/roboto-latin-500-normal.3170fd9a.woff2",revision:"3170fd9a"},{url:"/_next/static/media/roboto-latin-500-normal.cdad2023.woff",revision:"cdad2023"},{url:"/_next/static/media/roboto-latin-700-normal.71b2beb8.woff2",revision:"71b2beb8"},{url:"/_next/static/media/roboto-latin-700-normal.f3ddaf9d.woff",revision:"f3ddaf9d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.37d4965d.woff2",revision:"37d4965d"},{url:"/_next/static/media/roboto-latin-ext-300-normal.b9b4688a.woff",revision:"b9b4688a"},{url:"/_next/static/media/roboto-latin-ext-400-normal.21abc8c8.woff2",revision:"21abc8c8"},{url:"/_next/static/media/roboto-latin-ext-400-normal.9600b4a6.woff",revision:"9600b4a6"},{url:"/_next/static/media/roboto-latin-ext-500-normal.41845160.woff",revision:"41845160"},{url:"/_next/static/media/roboto-latin-ext-500-normal.85ebfb55.woff2",revision:"85ebfb55"},{url:"/_next/static/media/roboto-latin-ext-700-normal.6af98c24.woff2",revision:"6af98c24"},{url:"/_next/static/media/roboto-latin-ext-700-normal.b6be88e2.woff",revision:"b6be88e2"},{url:"/_next/static/media/roboto-vietnamese-300-normal.44e9a722.woff",revision:"44e9a722"},{url:"/_next/static/media/roboto-vietnamese-300-normal.b3d3e960.woff2",revision:"b3d3e960"},{url:"/_next/static/media/roboto-vietnamese-400-normal.b339d926.woff",revision:"b339d926"},{url:"/_next/static/media/roboto-vietnamese-400-normal.c95fc061.woff2",revision:"c95fc061"},{url:"/_next/static/media/roboto-vietnamese-500-normal.65b57a7f.woff",revision:"65b57a7f"},{url:"/_next/static/media/roboto-vietnamese-500-normal.7f8c0554.woff2",revision:"7f8c0554"},{url:"/_next/static/media/roboto-vietnamese-700-normal.72bf832f.woff2",revision:"72bf832f"},{url:"/_next/static/media/roboto-vietnamese-700-normal.82ca662a.woff",revision:"82ca662a"},{url:"/_next/static/media/scan.dcbaf80d.svg",revision:"ec5d4f5d4a7fa6fb36379d2c3edc9aa0"},{url:"/_next/static/media/tanque.0fa48534.svg",revision:"817932d82329a615932ecbd97ccff3f4"},{url:"/assets/images/WSE192x192.png",revision:"14077c166a59fea15975fbdde80472a7"},{url:"/assets/images/WSE512x512.png",revision:"ecae4b318d1afaa46b5c9b52f3ff3faa"},{url:"/assets/images/bg01.jpg",revision:"33f519aa5548c1913fffb78a33559f21"},{url:"/assets/images/drawing.svg",revision:"0e43f944b3399c268d63cbd964f0647f"},{url:"/assets/images/g15.png",revision:"ecae4b318d1afaa46b5c9b52f3ff3faa"},{url:"/assets/images/logo.WSE.short.svg",revision:"7d8d36227699935ce7ae13d6cbe88e16"},{url:"/assets/images/logo.WSE.splash.svg",revision:"5da5eaac5e8afd5d613244e6d1f2bcc8"},{url:"/assets/images/logo.WSE.square.svg",revision:"093dee886bfbb27f57768cb2a4e6437e"},{url:"/assets/images/logo320x132.png",revision:"79998e3aaecba4c84a38a53662333b2c"},{url:"/assets/images/logowse.svg",revision:"6f17a474f9e7c7f348ea724469b90a95"},{url:"/assets/images/logowse.white.svg",revision:"e2d6d34dfc2b6aa114206208b2680e19"},{url:"/assets/images/scan.svg",revision:"ec5d4f5d4a7fa6fb36379d2c3edc9aa0"},{url:"/assets/images/screenshot_desktop_1280x800.png",revision:"d9bf9f48b15f05da9cd7731c718e43f4"},{url:"/assets/images/screenshot_mobile_1080x1920.png",revision:"38a89c260a21638dda8cd2e30daa3014"},{url:"/assets/images/splash-1125x2436.png",revision:"f4af5eb7abdf6b71449e531068e4ab96"},{url:"/assets/images/splash-1242x2208.png",revision:"f04e40454f7beaf27225259626258b6c"},{url:"/assets/images/splash-1536x2048.png",revision:"5b2ebb2cf6bf86312ce007fea6200714"},{url:"/assets/images/splash-2048x2732.png",revision:"ff8b8a6279697a4574050569aabed71a"},{url:"/assets/images/splash-640x1136.png",revision:"da59ce6f2353439d63795ea55aeb962e"},{url:"/assets/images/splash-750x1334.png",revision:"5f7dc829f42df9be2215611ec3e8e681"},{url:"/assets/images/splash-828x1792.png",revision:"bc6ad0d994f4b3cbafd0d93d766fb10c"},{url:"/assets/images/tanque.svg",revision:"817932d82329a615932ecbd97ccff3f4"},{url:"/manifest.json",revision:"82bdd8f1625083e04177fa712dd6c670"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
