(function(){try{var k="komari_monitor_snapshot",v=localStorage.getItem(k);if(!v)return;
var d=JSON.parse(v);if(!d||!d.live||typeof d.live!=="object")return;var n=0;
for(var u in d.live){if(!d.live[u]||d.live[u].online!==true){delete d.live[u];n++;}}
if(n)localStorage.setItem(k,JSON.stringify(d));}catch(e){}})();
