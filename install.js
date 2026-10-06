// Invito ad aggiungere l'app alla schermata Home
(function(){
  if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('/Allenatore-SSM/sw.js',{scope:'/Allenatore-SSM/'}).catch(function(){});
  var standalone=window.navigator.standalone||window.matchMedia('(display-mode: standalone)').matches;
  if(standalone)return;
  try{if(localStorage.getItem('ssm-install-closed')==='1')return}catch(e){}
  var ua=navigator.userAgent;
  var ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var inApp=/FBAN|FBAV|Instagram|WhatsApp|Line\//i.test(ua);
  var deferred=null;
  var share='<svg width="15" height="18" viewBox="0 0 15 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px"><path d="M7.5 1.5v10M4 5l3.5-3.5L11 5"/><path d="M4.5 8H2.5v8.5h10V8h-2"/></svg>';
  function show(){
    if(document.getElementById('ssm-inst'))return;
    var st=document.createElement('style');
    st.textContent='#ssm-inst{position:fixed;left:12px;right:12px;margin:0 auto;max-width:440px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:30;display:flex;gap:12px;align-items:flex-start;padding:14px 14px 14px 16px;border-radius:20px;font:15px/1.4 -apple-system,BlinkMacSystemFont,"SF Pro Text",Inter,system-ui,sans-serif;color:var(--ink,#121a17);background:var(--glass-strong,rgba(255,255,255,.9));-webkit-backdrop-filter:blur(22px) saturate(180%);backdrop-filter:blur(22px) saturate(180%);border:1px solid var(--glass-edge,rgba(255,255,255,.75));box-shadow:0 12px 34px rgba(0,0,0,.18)}#ssm-inst img{width:44px;height:44px;border-radius:11px;flex:none}#ssm-inst b{display:block;margin-bottom:2px}#ssm-inst .x{margin-left:auto;border:0;background:transparent;color:var(--mute,#5d6b66);font-size:22px;line-height:1;padding:0 2px;cursor:pointer}#ssm-inst .go{margin-top:8px;border:0;border-radius:999px;padding:9px 16px;font-weight:600;font-size:14px;font-family:inherit;background:var(--acc,#0e7a64);color:var(--acc-ink,#fff);cursor:pointer}';
    document.head.appendChild(st);
    var d=document.createElement('div');d.id='ssm-inst';d.setAttribute('role','dialog');d.setAttribute('aria-label','Aggiungi alla schermata Home');
    var body;
    if(deferred) body='<b>Installa Allenatore SSM</b>Avrai l’icona sulla schermata Home e l’app funzionerà anche offline.<br><button class="go" type="button">Installa</button>';
    else if(inApp) body='<b>Aggiungila alla schermata Home</b>Apri prima questa pagina in Safari dal menu <b style="display:inline">⋯</b>, poi tocca Condividi '+share+' e «Aggiungi alla schermata Home».';
    else body='<b>Aggiungila alla schermata Home</b>Tocca Condividi '+share+' in Safari, poi «Aggiungi alla schermata Home». Si aprirà come un’app, a tutto schermo.';
    d.innerHTML='<img src="/Allenatore-SSM/icon-180.png" alt=""><div>'+body+'</div><button class="x" type="button" aria-label="Chiudi">×</button>';
    (document.querySelector('.shell')||document.body).appendChild(d);
    d.querySelector('.x').onclick=function(){d.remove();try{localStorage.setItem('ssm-install-closed','1')}catch(e){}};
    var g=d.querySelector('.go');if(g)g.onclick=function(){deferred.prompt();deferred.userChoice.then(function(){d.remove()})};
  }
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;var o=document.getElementById('ssm-inst');if(o)o.remove();show()});
  window.addEventListener('appinstalled',function(){var o=document.getElementById('ssm-inst');if(o)o.remove()});
  if(ios)window.addEventListener('load',function(){setTimeout(show,1200)});
})();
