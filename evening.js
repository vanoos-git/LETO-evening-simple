(() => {
  // scroll-fade.js
  var section = document.querySelector("[data-gdk]");
  var night = section.querySelector("[data-gdk-night]");
  // Keep both images at the same scale and position during the fade.
  night.style.transform = "none";
  var sun = section.querySelector("[data-gdk-sun]");
  var motion = matchMedia("(prefers-reduced-motion: reduce)");
  var scheduledFrame = 0;
  function updateFade() {
    scheduledFrame = 0;
    const { top, height } = section.getBoundingClientRect();
    const distance = height - innerHeight;
    const progress = distance > 0 ? -top / distance : 0;
    const portion = Math.max(0, Math.min(1, (progress - 0.1) / 0.76));
    const opacity = portion * portion * (3 - 2 * portion);
    night.style.opacity = motion.matches ? "0" : opacity.toFixed(4);
    sun.style.setProperty("--sun", `${-22 + 42 * opacity}px`);
  }
  function requestFade() {
    if (!scheduledFrame) scheduledFrame = requestAnimationFrame(updateFade);
  }
  addEventListener("scroll", requestFade, { passive: true });
  addEventListener("resize", requestFade, { passive: true });
  motion.addEventListener("change", requestFade);
  updateFade();

  // core.DDAMnLP2.js
  var e = () => typeof matchMedia == `function` && matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  var n = 0;
  function r(e3) {
    n = Math.max(0, n + (e3 ? 1 : -1)), document.documentElement.classList.toggle(`locked`, n > 0);
  }
  function s() {
    let e3 = -1e9, t2 = false, n3 = 0, r4 = 0, i4 = -1e9, a4 = 0, o4 = 0, s5 = 0, c2 = 0, l2 = (e4, t3) => {
      let r5 = t3 - i4;
      i4 = t3, r5 > 70 && (a4 = 0, o4 = 0, s5 = 4, c2 = 0);
      let l3 = e4 / Math.min(50, Math.max(4, r5)) * 16, u3 = l3 > a4 * 1.1 + 0.5;
      c2 = (c2 << 1 | u3) & 7, u3 ? s5 < 4 && (s5 = 0, o4 = l3) : (s5++, o4 = Math.min(o4, l3)), a4 = l3;
      let d4 = (c2 & 1) + (c2 >> 1 & 1) + (c2 >> 2);
      return !(s5 >= 4 && u3 && d4 >= 2 && l3 > o4 * 2 + 6 && t3 - n3 > 140);
    }, u2 = (n4, r5) => {
      let i5 = n4.timeStamp, a5 = i5 - e3;
      return e3 = i5, a5 > 180 || t2 && !l2(Math.abs(r5), i5);
    }, d3 = (e4, l3) => {
      r4 = 0, t2 = true, n3 = i4 = l3, a4 = o4 = e4, s5 = 0, c2 = 0;
    };
    return { hold(e4, n4 = e4.deltaY) {
      return u2(e4, n4) && (t2 = false), t2;
    }, feed(e4, n4 = e4.deltaY) {
      if (u2(e4, n4) && (t2 = false, r4 = 0), t2 || (r4 += n4, Math.abs(r4) < 12)) return 0;
      let i5 = Math.sign(r4);
      return d3(Math.abs(n4), e4.timeStamp), i5;
    }, claim(t3, n4 = t3.deltaY) {
      e3 = t3.timeStamp, d3(Math.abs(n4), e3);
    } };
  }
  function d(e3 = document) {
    e3.querySelectorAll(`.btn`).forEach((e4) => {
      e4.dataset.fx || (e4.dataset.fx = `1`, e4.addEventListener(`pointerenter`, (t2) => {
        if (t2.pointerType !== `mouse`) return;
        let n3 = e4.getBoundingClientRect(), r4 = t2.clientX - n3.left, i4 = t2.clientY - n3.top, a4 = 2 * Math.hypot(Math.max(r4, n3.width - r4), Math.max(i4, n3.height - i4));
        e4.style.setProperty(`--x`, r4 + `px`), e4.style.setProperty(`--y`, i4 + `px`), e4.style.setProperty(`--d`, a4 + `px`);
      }));
    });
  }
  function p(e3, t2) {
    if (t2.key !== `Tab`) return;
    let n3 = Array.from(e3.querySelectorAll(`a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])`)).filter((e4) => e4.offsetParent !== null);
    if (!n3.length) return;
    let r4 = n3[0], i4 = n3[n3.length - 1];
    t2.shiftKey && document.activeElement === r4 ? (t2.preventDefault(), i4.focus()) : !t2.shiftKey && document.activeElement === i4 && (t2.preventDefault(), r4.focus());
  }

  // sun.RDKthkAj.js
  var e2 = 46.7105;
  var t = Math.PI / 180;
  var n2 = 864e5;
  var r2 = 108e5;
  var i;
  var a = (e3, t2) => {
    try {
      return i ??= new Intl.DateTimeFormat(`ru-RU`, { timeZone: `Europe/Moscow`, hour: `2-digit`, minute: `2-digit` }), i.format(e3);
    } catch {
      return t2;
    }
  };
  function o(i4) {
    let a4 = new Date(i4.getTime() + r2), o4 = Date.UTC(a4.getUTCFullYear(), a4.getUTCMonth(), a4.getUTCDate(), 9) / n2 + 24405875e-1, s5 = Math.round(o4 - 2451545 + 8e-4) - 38.2735 / 360, c2 = (357.5291 + 0.98560028 * s5) % 360, l2 = (c2 + (1.9148 * Math.sin(c2 * t) + 0.02 * Math.sin(2 * c2 * t) + 3e-4 * Math.sin(3 * c2 * t)) + 180 + 102.9372) % 360, u2 = 2451545 + s5 + 53e-4 * Math.sin(c2 * t) - 69e-4 * Math.sin(2 * l2 * t), d3 = Math.asin(Math.sin(l2 * t) * Math.sin(23.4397 * t)), f2 = (Math.sin(-0.833 * t) - Math.sin(e2 * t) * Math.sin(d3)) / (Math.cos(e2 * t) * Math.cos(d3));
    if (f2 < -1 || f2 > 1) return null;
    let p3 = Math.acos(f2) / t / 360, m2 = (e3) => new Date((e3 - 24405875e-1) * n2);
    return { rise: m2(u2 - p3), set: m2(u2 + p3) };
  }
  function s2(e3) {
    let t2 = o(e3);
    return t2 ? a(t2.set, `19:20`) : `19:20`;
  }

  // lightbox.BMqEFhwF.js
  var r3 = document.querySelector(`[data-lb]`);
  var i2 = [];
  var a2 = [];
  var o2 = [];
  var s3 = 0;
  var c = 0;
  var l = {};
  var u = null;
  var d2 = false;
  var f = 0;
  var p2 = (e3) => r3.querySelector(e3);
  var m = (e3) => Math.max(0, Math.min(i2.length - 1, e3));
  function h() {
    let e3 = p2(`[data-lb-track]`), t2 = p2(`[data-lb-thumbs]`);
    e3.innerHTML = ``, t2.innerHTML = ``, a2 = i2.map((t3, n3) => {
      let r4 = document.createElement(`figure`);
      if (r4.className = `lb__slide`, r4.dataset.i = String(n3), t3.type === `video`) {
        let e4 = document.createElement(`video`);
        e4.className = `lb__media`, e4.poster = t3.poster, e4.preload = `none`, e4.playsInline = true, e4.setAttribute(`playsinline`, ``), e4.dataset.src = t3.src, e4.setAttribute(`aria-label`, t3.alt), r4.dataset.video = ``, r4.appendChild(e4);
      } else {
        let e4 = document.createElement(`img`);
        e4.className = `lb__media`, e4.alt = t3.alt, e4.width = t3.w, e4.height = t3.h, e4.decoding = `async`, e4.draggable = false, r4.appendChild(e4);
      }
      return e3.appendChild(r4), r4;
    }), o2 = i2.map((e4, n3) => {
      let r4 = document.createElement(`button`);
      r4.type = `button`, r4.className = `lb__thumb` + (e4.type === `video` ? ` lb__thumb--video` : ``), r4.setAttribute(`aria-label`, e4.type === `video` ? e4.alt : `\u041A\u0430\u0434\u0440 ${n3 + 1}`);
      let i4 = document.createElement(`img`);
      return i4.src = e4.thumb || (e4.type === `video` ? e4.poster : e4.src), i4.alt = ``, i4.loading = `lazy`, i4.draggable = false, r4.appendChild(i4), r4.addEventListener(`click`, () => y(n3)), t2.appendChild(r4), r4;
    }), p2(`[data-lb-all]`).textContent = String(i2.length).padStart(2, `0`);
  }
  function g() {
    let e3 = p2(`[data-lb-stage]`), t2 = parseFloat(getComputedStyle(r3).getPropertyValue(`--side`)) || 24, n3 = e3.clientWidth - t2 * 2, o4 = e3.clientHeight;
    a2.forEach((e4, t3) => {
      let r4 = i2[t3].w / i2[t3].h, a4 = o4, s5 = a4 * r4;
      s5 > n3 && (s5 = n3, a4 = s5 / r4), e4.style.width = `${Math.round(s5)}px`, e4.style.height = `${Math.round(a4)}px`;
      let c2 = e4.querySelector(`img`);
      c2?.srcset && (c2.sizes = `${Math.ceil(s5)}px`);
    }), _(false);
  }
  function _(e3, t2 = 0) {
    let n3 = a2[s3];
    if (!n3) return;
    let r4 = p2(`[data-lb-track]`);
    c = p2(`[data-lb-stage]`).clientWidth / 2 - (n3.offsetLeft + n3.offsetWidth / 2), r4.style.transition = e3 ? `` : `none`, r4.style.transform = `translate3d(${c + t2}px,0,0)`, e3 || (r4.offsetWidth, r4.style.transition = ``);
  }
  function v(e3) {
    let t2 = i2[e3], n3 = a2[e3];
    if (!t2 || !n3 || t2.type !== `img`) return;
    let r4 = n3.querySelector(`img`);
    r4.srcset || (r4.sizes = `${Math.ceil(n3.offsetWidth || 1280)}px`, r4.srcset = t2.srcset, r4.src = t2.src);
  }
  function y(e3, t2 = true, n3 = false) {
    e3 = m(e3);
    let r4 = a2[s3];
    if (r4 && r4 !== a2[e3]) {
      let e4 = r4.querySelector(`video`);
      e4 && (e4.pause(), e4.controls = false);
    }
    s3 = e3, a2.forEach((t3, n4) => t3.toggleAttribute(`data-current`, n4 === e3)), o2.forEach((t3, n4) => {
      n4 === e3 ? t3.setAttribute(`aria-current`, `true`) : t3.removeAttribute(`aria-current`);
    }), p2(`[data-lb-now]`).textContent = String(e3 + 1).padStart(2, `0`), p2(`[data-lb-prev]`).disabled = e3 === 0, p2(`[data-lb-next]`).disabled = e3 === i2.length - 1;
    for (let t3 = e3 - 1; t3 <= e3 + 2; t3++) v(t3);
    _(t2);
    let c2 = o2[e3], u2 = p2(`[data-lb-thumbs]`);
    c2 && u2.scrollWidth > u2.clientWidth + 1 && u2.scrollTo({ left: c2.offsetLeft - (u2.clientWidth - c2.offsetWidth) / 2, behavior: t2 ? `smooth` : `auto` });
    let d3 = a2[e3].querySelector(`video`);
    d3 && (d3.controls = true, d3.getAttribute(`src`) || (d3.preload = `auto`, d3.src = d3.dataset.src), n3 && l.startAt && (d3.currentTime = l.startAt), d3.muted = n3 ? !!l.muted : false, d3.play().catch(() => {
      d3.muted = true, d3.play().catch(() => {
      });
    }));
  }
  function b(t2, n3, a4 = {}) {
    r3 && t2.length && (i2 = t2, l = a4, u = document.activeElement, clearTimeout(f), r3.removeAttribute(`data-closing`), h(), r3.hidden = false, r3.setAttribute(`data-opening`, ``), setTimeout(() => r3.removeAttribute(`data-opening`), 500), d2 = true, r(true), window.dispatchEvent(new CustomEvent(`leto:lightbox`, { detail: true })), s3 = m(n3), g(), y(n3, false, true), p2(`[data-lb-close]`).focus({ preventScroll: true }));
  }
  function x() {
    if (!d2 || !r3) return;
    d2 = false;
    let t2 = a2[s3]?.querySelector(`video`), n3 = t2?.getAttribute(`src`) ? { time: t2.currentTime, muted: t2.muted, ended: t2.ended } : void 0;
    r3.querySelectorAll(`video`).forEach((e3) => e3.pause()), r3.setAttribute(`data-closing`, ``), f = window.setTimeout(() => {
      r3.hidden = true, r3.removeAttribute(`data-closing`), p2(`[data-lb-track]`).innerHTML = ``, p2(`[data-lb-thumbs]`).innerHTML = ``, a2 = [], o2 = [];
    }, 260), r(false), window.dispatchEvent(new CustomEvent(`leto:lightbox`, { detail: false })), l.onClose?.(s3, n3), u?.focus({ preventScroll: true });
  }
  if (r3) {
    let e3 = p2(`[data-lb-stage]`), o4 = p2(`[data-lb-track]`);
    p2(`[data-lb-close]`).addEventListener(`click`, x), p2(`[data-lb-prev]`).addEventListener(`click`, () => y(s3 - 1)), p2(`[data-lb-next]`).addEventListener(`click`, () => y(s3 + 1)), document.addEventListener(`keydown`, (e4) => {
      d2 && (e4.key === `Escape` ? x() : e4.key === `ArrowLeft` ? y(s3 - 1) : e4.key === `ArrowRight` ? y(s3 + 1) : p(r3, e4));
    }), window.addEventListener(`resize`, () => {
      d2 && g();
    }, { passive: true });
    let l2 = s();
    r3.addEventListener(`wheel`, (e4) => {
      if (!d2) return;
      e4.preventDefault();
      let t2 = l2.feed(e4, Math.abs(e4.deltaX) > Math.abs(e4.deltaY) ? e4.deltaX : e4.deltaY);
      t2 && y(s3 + t2);
    }, { passive: false });
    let u2 = -1, f2 = 0, h2 = 0, v2 = ``, b2 = false, S = 0, C = 0, w = 0, T = null;
    o4.addEventListener(`dragstart`, (e4) => e4.preventDefault()), e3.addEventListener(`pointerdown`, (e4) => {
      if (e4.button !== 0) return;
      let t2 = e4.target, n3 = t2.closest(`video`);
      n3 && t2.closest(`[data-current]`) && e4.clientY > n3.getBoundingClientRect().bottom - 56 || (u2 = e4.pointerId, f2 = S = e4.clientX, h2 = e4.clientY, C = performance.now(), v2 = ``, b2 = false, w = 0, T = t2);
    }), e3.addEventListener(`pointermove`, (t2) => {
      if (t2.pointerId !== u2) return;
      let n3 = t2.clientX - f2, l3 = t2.clientY - h2;
      if (!v2 && Math.hypot(n3, l3) > 8 && (v2 = Math.abs(n3) >= Math.abs(l3) ? `x` : `y`, e3.setPointerCapture(u2), e3.setAttribute(`data-drag`, ``)), !v2) return;
      b2 = true;
      let d3 = performance.now();
      if (w = (t2.clientX - S) / Math.max(1, d3 - C), S = t2.clientX, C = d3, v2 === `x`) (s3 === 0 && n3 > 0 || s3 === i2.length - 1 && n3 < 0) && (n3 *= 0.35), o4.style.transition = `none`, o4.style.transform = `translate3d(${c + n3}px,0,0)`;
      else {
        let e4 = a2[s3], t3 = Math.abs(l3);
        e4.style.transition = `none`, e4.style.transform = `translateY(${l3}px) scale(${1 - Math.min(0.12, t3 / 2600)})`, r3.style.setProperty(`--dim`, String(Math.max(0.2, 1 - t3 / 500)));
      }
    });
    let E = (t2) => {
      if (t2.pointerId !== u2) return;
      u2 = -1, e3.removeAttribute(`data-drag`);
      let n3 = t2.clientX - f2, i4 = t2.clientY - h2, o5 = a2[s3];
      if (o5 && (o5.style.transition = ``, o5.style.transform = ``), r3.style.removeProperty(`--dim`), v2 === `x`) {
        let e4 = Math.abs(n3) > 60 || Math.abs(w) > 0.45 ? n3 < 0 ? 1 : -1 : 0;
        e4 && m(s3 + e4) !== s3 ? y(s3 + e4) : _(true);
      } else if (v2 === `y`) Math.abs(i4) > 110 && x();
      else if (!b2 && t2.type === `pointerup`) {
        let e4 = T?.closest(`.lb__slide`);
        e4 && !e4.hasAttribute(`data-current`) ? y(Number(e4.dataset.i)) : e4 || x();
      }
    };
    e3.addEventListener(`pointerup`, E), e3.addEventListener(`pointercancel`, E), window.addEventListener(`leto:pinch`, () => {
      if (u2 < 0) return;
      u2 = -1, e3.removeAttribute(`data-drag`);
      let t2 = a2[s3];
      t2 && (t2.style.transition = ``, t2.style.transform = ``), r3.style.removeProperty(`--dim`), v2 === `x` && _(true);
    });
  }

  // gallery.astro_astro_type_script_index_0_lang.BKRUxM8n.js
  document.addEventListener(`click`, (e3) => {
    let t2 = e3.target.closest(`[data-g-open]`);
    if (!t2) return;
    let n3 = t2.closest(`[data-gch]`), i4 = n3?.querySelector(`[data-g-lb]`)?.textContent;
    if (!i4) return;
    n3.querySelectorAll(`[data-g-loop]`).forEach((e4) => e4.pause());
    let a4 = t2.querySelector(`[data-g-loop]`);
    b(JSON.parse(i4), Number(t2.dataset.gOpen) || 0, { startAt: a4 && !a4.ended ? a4.currentTime : 0, onClose: (e4, t3) => {
      let r4 = n3.querySelector(`[data-g-open="${e4}"] [data-g-loop]`);
      r4 && t3 && (r4.currentTime = t3.ended ? 0 : t3.time), o3();
    } });
  });
  var i3 = Array.from(document.querySelectorAll(`[data-g-loop]`));
  var a3 = /* @__PURE__ */ new Set();
  var o3 = () => i3.forEach((e3) => {
    a3.has(e3) && !document.documentElement.classList.contains(`locked`) ? e3.play().catch(() => {
    }) : e3.pause();
  });
  if (i3.length && `IntersectionObserver` in window && !e()) {
    let e3 = new IntersectionObserver((e4) => {
      e4.forEach((e5) => {
        let t2 = e5.target;
        e5.isIntersecting ? (a3.add(t2), t2.preload = `auto`) : a3.delete(t2);
      }), o3();
    }, { threshold: 0.35 });
    i3.forEach((t2) => e3.observe(t2));
  }
  var s4 = s2(/* @__PURE__ */ new Date());
  document.querySelectorAll(`[data-g-sunset]`).forEach((e3) => {
    e3.textContent = s4;
  }), d();
})();
