import{r as o,j as e}from"./framer-motion-B4cnRtdk.js";const c="/assets/Webseite%20-%20Produkt-ntCPjsyM.png",x="/assets/Webshop%20-%20Produkt-BvyE6BFF.png",p="/assets/App%20-%20Produkt-Ct3z-qbS.png",d="/assets/Kasse%20-%20Produkt-BSsEG5jC.png",m="/assets/Kiosk%202%20-%20Produkt-DlNNhOqF.png",f=()=>{const[a,l]=o.useState(0),i=[{id:"webseite",title:"Webseite",imageUrl:c,ctaText:"Webseiten entdecken",ctaUrl:"/produkte/pakete/webseite"},{id:"online-shop",title:"Online Shop",imageUrl:x,ctaText:"Mehr erfahren",ctaUrl:"/produkte/pakete/online-bestellshop"},{id:"app-system",title:"App System",imageUrl:p,ctaText:"Apps ansehen",ctaUrl:"/produkte/pakete/bestell-app"},{id:"kasse",title:"Kasse",imageUrl:d,ctaText:"Hier ansehen",ctaUrl:"/produkte/pakete/kassensystem"},{id:"kiosk",title:"Kiosk",imageUrl:m,ctaText:"Mehr erfahren",ctaUrl:"/produkte/add-ons/kiosk"}],r=t=>{l(t)};return e.jsx("section",{className:"section-padding bg-background",children:e.jsxs("div",{className:"container-tight",children:[e.jsxs("div",{className:"text-center mb-16",children:[e.jsx("span",{className:"text-cyan-brand text-sm font-semibold uppercase tracking-wider mb-3 block",children:"UNSERE PRODUKTE"}),e.jsx("h2",{className:"text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4",children:"Das komplette Paket. Aus einer Hand."})]}),e.jsx("div",{className:"md:hidden space-y-6",children:i.map(t=>e.jsxs("div",{className:"relative rounded-2xl overflow-hidden bg-muted h-[280px] flex flex-col items-center justify-end",children:[e.jsx("img",{src:t.imageUrl,alt:t.title,loading:"lazy",className:"absolute inset-0 w-full h-full object-contain bg-white",onError:s=>{s.currentTarget.onerror=null,s.currentTarget.src="https://placehold.co/1280x720/2d3748/ffffff?text=Product"}}),e.jsx("div",{className:"absolute inset-0 bg-black/20"}),e.jsxs("div",{className:"relative z-10 flex flex-col items-center justify-center text-center px-4 pb-6 gap-3",children:[e.jsx("span",{className:"font-black text-3xl text-white block",children:t.title}),e.jsxs("a",{href:t.ctaUrl,className:"px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 text-sm font-black text-white flex items-center gap-2",style:{backgroundColor:"#f99e2c"},children:[t.ctaText,e.jsx("span",{children:"→"})]})]})]},t.id))}),e.jsx("div",{className:"hidden md:flex items-center justify-center overflow-hidden -mx-48",children:e.jsx("div",{className:"flex gap-3 items-center justify-center w-full px-48",children:i.map((t,s)=>e.jsxs("div",{className:`
                  relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-700 ease-in-out
                  h-[320px] md:h-[380px] lg:h-[420px]
                  ${s===a?"w-[420px] md:w-[620px] lg:w-[780px]":"w-[120px] md:w-[150px]"}
                `,onMouseEnter:()=>r(s),onClick:()=>{s===a?window.location.href=t.ctaUrl:l(s)},role:"link","aria-label":`${t.title} – ${t.ctaText}`,children:[e.jsx("img",{src:t.imageUrl,alt:t.title,loading:"lazy",className:"absolute inset-0 w-full h-full object-cover bg-muted",onError:n=>{n.currentTarget.onerror=null,n.currentTarget.src="https://placehold.co/1280x720/2d3748/ffffff?text=Product"}}),e.jsx("div",{className:`
                    absolute inset-0 transition-opacity duration-700 ease-in-out
                    ${s===a?"opacity-[0.125] bg-black/40":"opacity-100 bg-black/40"}
                  `}),e.jsx("div",{className:`
                    absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-center
                    transition-all duration-700 ease-in-out
                    ${s===a?"opacity-0 pointer-events-none":"opacity-100"}
                  `,children:e.jsx("span",{className:"font-black text-xl md:text-2xl lg:text-3xl leading-tight text-white",style:{textShadow:`
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px 1px 0 #000,
                        1px 1px 0 #000,
                        -2px 0 0 #000,
                        2px 0 0 #000,
                        0 -2px 0 #000,
                        0 2px 0 #000
                      `},children:t.title})}),e.jsxs("div",{className:`
                    absolute bottom-8 left-6 right-6 flex flex-col items-start gap-4
                    transition-opacity duration-500 ease-in-out
                    ${s===a?"opacity-100 delay-500":"opacity-0 pointer-events-none"}
                  `,children:[e.jsx("span",{className:"font-black text-3xl md:text-4xl lg:text-5xl text-left text-white",style:{textShadow:`
                        -1px -1px 0 #000,
                        1px -1px 0 #000,
                        -1px 1px 0 #000,
                        1px 1px 0 #000,
                        -2px 0 0 #000,
                        2px 0 0 #000,
                        0 -2px 0 #000,
                        0 2px 0 #000
                      `},children:t.title}),e.jsxs("a",{href:t.ctaUrl,className:"px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 text-sm md:text-base font-black text-white flex items-center gap-2",style:{backgroundColor:"#f99e2c"},children:[t.ctaText,e.jsx("span",{children:"→"})]})]})]},t.id))})})]})})};export{f as default};
