// (C) 2026 SejmTracker

// Google tag (gtag.js)
let sc1 = document.createElement("script")
sc1.async = true;
sc1.src = "https://www.googletagmanager.com/gtag/js?id=G-8MGQNSPEFH";

let sc2 = document.createElement("script")
sc2.textContent = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-8MGQNSPEFH');`;

// Google Tag Manager
let sc3 = document.createElement("script");
sc3.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-W7Z2QZKT');`;
// End Google Tag Manager

document.querySelector("head").append(sc1, sc2, sc3);

// Google Tag Manager (noscript)
let nsc = document.createElement("noscript");
nsc.textContent = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W7Z2QZKT" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
// End Google Tag Manager (noscript)

document.querySelector("body").appendChild(nsc);