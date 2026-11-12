/* Language switch + table-of-contents highlight for the privacy policy pages.
   The initial language is chosen by the inline script in <head>. */
(function () {
  var root = document.documentElement;
  var KEY = 'policy-lang';

  function current() { return root.getAttribute('data-lang') || 'en'; }

  function setLang(lang, save) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    var pane = document.querySelector('[data-pane="' + lang + '"]');
    if (pane && pane.getAttribute('data-title')) document.title = pane.getAttribute('data-title');
    var links = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute('aria-current', links[i].getAttribute('data-set-lang') === lang ? 'true' : 'false');
    }
    if (save) { try { localStorage.setItem(KEY, lang); } catch (e) {} }
    watch();
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('[data-set-lang]');
    if (!a) return;
    ev.preventDefault();
    var lang = a.getAttribute('data-set-lang');
    if (lang === current()) return;
    setLang(lang, true);
    try { history.replaceState(null, '', '#' + lang); } catch (e) {}
    window.scrollTo(0, 0);
  });

  window.addEventListener('hashchange', function () {
    var h = '';
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
    var el = h && document.getElementById(h);
    var pane = el && el.closest('[data-pane]');
    if (pane && pane.getAttribute('data-pane') !== current()) {
      setLang(pane.getAttribute('data-pane'), false);
      el.scrollIntoView();
    }
  });

  /* Highlight the section currently being read in the table of contents. */
  var observer = null;
  function watch() {
    if (observer) observer.disconnect();
    if (!('IntersectionObserver' in window)) return;
    var pane = document.querySelector('[data-pane="' + current() + '"]');
    if (!pane) return;
    var tocLinks = pane.querySelectorAll('.toc a');
    var byId = {};
    for (var i = 0; i < tocLinks.length; i++) byId[tocLinks[i].getAttribute('href').slice(1)] = tocLinks[i];
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        for (var k in byId) byId[k].classList.toggle('active', k === en.target.id);
      });
    }, { rootMargin: '-90px 0px -65% 0px' });
    var sections = pane.querySelectorAll('.content section[id]');
    for (var j = 0; j < sections.length; j++) observer.observe(sections[j]);
  }

  setLang(current(), false);
})();
