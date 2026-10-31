(function () {
  var RPC = '/api/rpc2';

  function send(event, extra) {
    var params = { event: event, path: location.pathname + location.search, route: location.pathname };
    if (extra) for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) params[k] = extra[k];
    try {
      fetch(RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method: 'public:recordVisitorEvent', params: params, id: 1 }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  send('page_view');
  var push = history.pushState;
  history.pushState = function () {
    push.apply(this, arguments);
    setTimeout(function () { send('page_view'); }, 60);
  };
  window.addEventListener('popstate', function () { setTimeout(function () { send('page_view'); }, 60); });
  document.addEventListener('click', function (e) {
    var c = e.target.closest ? e.target.closest('.k-card,.site-card,.k-list-row') : null;
    if (!c) return;
    var n = c.querySelector('.k-card-name,.card-name,.k-list-name');
    send('node_open', { target: n ? n.textContent.trim() : '' });
  }, true);

  var css = document.createElement('style');
  css.textContent =
    '#kv-badge{position:fixed;left:50%;bottom:10px;transform:translateX(-50%);z-index:9998;display:inline-flex;align-items:center;gap:6px;' +
    'padding:6px 10px;border-radius:10px;background:rgba(10,12,16,.55);border:1px solid rgba(255,255,255,.10);' +
    'color:#eef3fa;font:11.5px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.45);' +
    'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);user-select:none;' +
    'transition:opacity .42s cubic-bezier(.4,0,.2,1),transform .42s cubic-bezier(.4,0,.2,1);max-width:min(92vw,520px)}' +
    '#kv-badge.kv-hide{opacity:0;transform:translateX(-50%) translateY(8px) scale(.97);pointer-events:none}' +
    '#kv-badge .kv-globe{color:#3b82f6;font-size:12px;line-height:1;display:inline-flex;align-items:center}' +
    '#kv-badge .kv-ip{font-size:11.5px;font-weight:600;color:#ffffff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px}' +
    '#kv-badge .kv-sep{width:1px;height:12px;background:rgba(255,255,255,.26);flex:none;margin:0 1px}' +
    '#kv-badge .kv-country{font-size:11.5px;font-weight:500;color:#e6edf7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}';
  document.head.appendChild(css);

  var badge = document.createElement('div');
  badge.id = 'kv-badge';
  badge.innerHTML =
    '<span class="kv-globe"><i class="bi bi-globe2"></i></span>' +
    '<span class="kv-ip" id="kv-ip">定位中…</span>' +
    '<span class="kv-sep" id="kv-sep" style="display:none"></span>' +
    '<span class="kv-country" id="kv-country"></span>';
  document.body.appendChild(badge);

  function showWho(ip, country) {
    var ipEl = document.getElementById('kv-ip');
    var cEl = document.getElementById('kv-country');
    var sep = document.getElementById('kv-sep');
    if (!ipEl) return;
    ipEl.textContent = ip || '未知地址';
    if (country) {
      cEl.textContent = country;
      sep.style.display = '';
    } else {
      cEl.textContent = '';
      sep.style.display = 'none';
    }
  }

  fetch('https://ipwho.is/', { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (j) {
      if (!j || j.success === false) throw 0;
      showWho(j.ip || '', j.country || '');
    })
    .catch(function () {
      fetch('https://ipapi.co/json/', { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || j.error) throw 0;
          showWho(j.ip || '', j.country_name || j.country || '');
        })
        .catch(function () { showWho(location.hostname, ''); });
    });

  window.addEventListener("pageshow", function () { badge.classList.remove("kv-hide"); });
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") badge.classList.remove("kv-hide");
  });

  var idleTimer = null;
  window.addEventListener('scroll', function () {
    badge.classList.add('kv-hide');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { badge.classList.remove('kv-hide'); }, 800);
  }, { passive: true });
})();
