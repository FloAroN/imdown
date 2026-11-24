/* Date-Link v1 – static, no backend. The invite lives entirely in the URL hash. */
(() => {
  // ---- Brand (change here to rename) ----
  const BRAND = { word: "imdown", cta: "I'm down <span class=\"emo\">🙌</span>" };
  // ---- Look: Standard = ivory (Hell), umschaltbar auf gala (Dunkel) ----
  const validLook = (v) => (v === "gala" || v === "ivory" ? v : "");
  let look = validLook(new URLSearchParams(location.search).get("look")) || validLook((() => { try { return localStorage.getItem("look"); } catch { return ""; } })()) || "ivory";
  function applyLook(v, persist) {
    look = validLook(v) || "ivory";
    document.documentElement.dataset.look = look;
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.content = look === "gala" ? "#0C0C0B" : "#F6F4EF";
    if (persist) { try { localStorage.setItem("look", look); } catch {} }
  }
  applyLook(look, false);

  const IDEAS = [
    ["xmas", "🎄", "Christmas market & mulled wine", "Weihnachtsmarkt & Glühwein"],
    ["drinks", "🍸", "Drinks at a cozy bar", "Drinks in einer gemütlichen Bar"],
    ["coffee", "☕", "Coffee & a walk", "Kaffee & Spaziergang"],
    ["dinner", "🍝", "Dinner – I'll pick a great spot", "Essen – ich such was Schönes aus"],
    ["wine", "🍷", "Wine bar", "Weinbar"],
    ["skate", "⛸️", "Ice skating", "Eislaufen"],
    ["boulder", "🧗", "Bouldering", "Bouldern"],
    ["museum", "🖼️", "Museum or gallery", "Museum oder Galerie"],
    ["brunch", "🥞", "Brunch", "Brunch"],
    ["minigolf", "⛳", "Mini golf", "Minigolf"],
    ["bowling", "🎳", "Bowling", "Bowling"],
    ["karaoke", "🎤", "Karaoke", "Karaoke"],
    ["sunset", "🌅", "Sunset walk", "Sonnenuntergang-Spaziergang"],
    ["icecream", "🍦", "Ice cream & a stroll", "Eis & schlendern"],
  ];
  const IDEA = Object.fromEntries(IDEAS.map(([k, e, en, de]) => [k, { e, en, de }]));
  const TIMES = ["12:00", "15:00", "18:00", "19:00", "19:30", "20:00", "21:00"];

  const T = {
    en: {
      h1: "Dating, <em>made simple.</em>",
      sub: "Pick 1–3 ideas and times — you take the lead, your match confirms in 2 taps. No app, no login.",
      lookLbl: "Style", lookLight: "Light", lookDark: "Dark",
      you: "Your first name", them: "Your match's name", opt: "optional",
      ideas: "Your date ideas", custom: "Your own idea…", add: "Add",
      times: "Your open times", timesHelp: "Tap a day, then a time. Up to 3.",
      today: "Today", tomorrow: "Tomorrow",
      create: "Create invitation",
      needName: "Add your first name", needIdea: "Pick at least 1 idea", needTime: "Add at least 1 time",
      readyH: "Ready to send.",
      readySub: "Send it as a printed card image with the link below — feels personal, shows real initiative.",
      share: "Share link only", copy: "Copy text", wa: "WhatsApp", preview: "Preview", edit: "Edit",
      msgInvite: "I put a little plan together for us – let me know what works: {link}",
      copied: "Copied ✓",
      tip: "Tip: “Send as card image + link” drops a clean invitation card into chat with the link right below.",
      from: "Invitation from {f}",
      invH: (t) => (t ? `${t}, I've got a plan.` : "I've got a plan for us."),
      invSub: "I put this together — just tap what works best for you.",
      qIdea: "My picks", qTime: "Open times", past: "passed",
      other: "Nothing fits? Suggest something else",
      msgOther: "Hey {f}, love the initiative! None of these work for me though – how about …",
      privacy: "<span class=\"emo\">🔒 </span>Nothing is stored · lives only in this link.",
      picked: "It's a date.",
      pickedSub: "Last step: send your pick back to {f} as a normal message.",
      tell: "Send to {f}", msgYes: "I'm down · {idea} · {time}\n{link}",
      cal: "Calendar (.ics)", gcal: "Google Calendar",
      friend: "Share plan with a friend", msgFriend: "Heads-up: I've got a date with {f} · {idea} · {time}",
      own: "Create your own invite →",
      ansFrom: "Reply from {t}", ansH: (t) => (t ? `${t} is in.` : "It's a date."),
      ansSub: "Save it to your calendar — and maybe book a table.",
      newLink: "Create a new invite",
      calTitle: (n, idea) => `Date${n ? " with " + n : ""}: ${idea}`,
      broken: "This link looks broken.", brokenSub: "Ask for a new one — or make your own.",
      with: "with {f}", made: "made with",
      msgLbl: "Short note on the card", msgPh: "e.g. Free sometime this week?",
      shareImg: "Send as card image + link", imgSaved: "Card saved · text copied",
      no: "Not this time", msgNo: "Thanks for the invite, {f} – not this time.",
      expired: "This invite has expired.", expiredSub: "All suggested times are over. Ask for a new one — or make your own.",
      story: "Save Story card", storyMade: "IT'S A DATE", imgCta: "Tap the link below to confirm",
    },
    de: {
      h1: "Dating, <em>einfach.</em>",
      sub: "Wähl 1–3 Ideen und Zeiten – du übernimmst die Initiative, dein Match bestätigt mit 2 Taps. Ohne App.",
      lookLbl: "Stil", lookLight: "Hell", lookDark: "Dunkel",
      you: "Dein Vorname", them: "Name deines Matches", opt: "optional",
      ideas: "Deine Date-Ideen", custom: "Eigene Idee…", add: "Dazu",
      times: "Deine möglichen Zeiten", timesHelp: "Tipp einen Tag, dann eine Uhrzeit. Bis zu 3.",
      today: "Heute", tomorrow: "Morgen",
      create: "Einladung erstellen",
      needName: "Trag deinen Vornamen ein", needIdea: "Wähl mindestens 1 Idee", needTime: "Füg mindestens 1 Zeit hinzu",
      readyH: "Bereit zum Senden.",
      readySub: "Schick sie als Bildkarte mit Link darunter – zeigt Initiative und wirkt persönlicher als ein nackter Link.",
      share: "Nur Link teilen", copy: "Text kopieren", wa: "WhatsApp", preview: "Vorschau", edit: "Bearbeiten",
      msgInvite: "Ich hab mal was für uns geplant – sag mir, was dir passt: {link}",
      copied: "Kopiert ✓",
      tip: "Tipp: „Als Bildkarte senden“ schickt eine fertige Einladungskarte als Foto + Link in den Chat.",
      from: "Einladung von {f}",
      invH: (t) => (t ? `${t}, mein Plan für uns.` : "Mein Plan für uns."),
      invSub: "Ich hab schon mal vorgeplant – bestätige einfach, was dir passt.",
      qIdea: "Meine Vorschläge", qTime: "Mögliche Zeiten", past: "vorbei",
      other: "Passt nichts? Schlag was anderes vor",
      msgOther: "Hey {f}, starke Initiative! Davon passt mir leider nichts – wie wär's mit …",
      privacy: "<span class=\"emo\">🔒 </span>Nichts wird gespeichert · lebt nur in diesem Link.",
      picked: "Date steht.",
      pickedSub: "Letzter Schritt: Schick deine Auswahl als normale Nachricht an {f} zurück.",
      tell: "An {f} senden", msgYes: "I'm down · {idea} · {time}\n{link}",
      cal: "Kalender (.ics)", gcal: "Google Kalender",
      friend: "Plan an Freundin teilen", msgFriend: "Kurze Info: Ich hab ein Date mit {f} · {idea} · {time}",
      own: "Eigene Einladung erstellen →",
      ansFrom: "Antwort von {t}", ansH: (t) => (t ? `${t} ist dabei.` : "Date steht."),
      ansSub: "Ab in den Kalender – und vielleicht schon mal reservieren.",
      newLink: "Neue Einladung erstellen",
      calTitle: (n, idea) => `Date${n ? " mit " + n : ""}: ${idea}`,
      broken: "Dieser Link ist leider kaputt.", brokenSub: "Lass dir einen neuen schicken – oder bau deinen eigenen.",
      with: "mit {f}", made: "erstellt mit",
      msgLbl: "Kurze Nachricht auf der Karte", msgPh: "z. B. Lust auf diese Woche?",
      shareImg: "Als Bildkarte + Link senden", imgSaved: "Karte gespeichert · Text kopiert",
      no: "Diesmal nicht", msgNo: "Danke für die Einladung, {f} – diesmal nicht.",
      expired: "Diese Einladung ist abgelaufen.", expiredSub: "Alle Zeiten sind vorbei. Lass dir eine neue schicken – oder bau deine eigene.",
      story: "Story-Karte speichern", storyMade: "DATE STEHT", imgCta: "Unten auf den Link tippen & bestätigen",
    },
  };

  // ---- helpers ----
  const $app = document.getElementById("app");
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fill = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => (o[k] ?? ""));
  const pad = (n) => String(n).padStart(2, "0");

  function enc(o) {
    const bytes = new TextEncoder().encode(JSON.stringify(o));
    let bin = ""; bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function dec(s) {
    s = s.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    const bin = atob(s);
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
  }

  const pathIsDe = /\/de\/(index\.html)?$/.test(location.pathname);
  const BASE = location.href.split(/[?#]/)[0].replace(/de\/(index\.html)?$/, "").replace(/index\.html$/, "");
  let lang = store.get("lang") || ((navigator.language || "").toLowerCase().startsWith("de") || pathIsDe ? "de" : "en");
  const t = () => T[lang];

  const toDate = (s) => { const [d, tm] = s.split("T"); const [y, m, dd] = d.split("-").map(Number); const [h, mi] = tm.split(":").map(Number); return new Date(y, m - 1, dd, h, mi); };
  const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const loc = () => (lang === "de" ? "de-DE" : "en-US");
  function fmtSlot(s) {
    const d = toDate(s);
    const wd = d.toLocaleDateString(loc(), { weekday: "long" });
    const dm = lang === "de" ? `${d.getDate()}.${d.getMonth() + 1}.` : d.toLocaleDateString(loc(), { month: "short", day: "numeric" });
    const tm = d.toLocaleTimeString(loc(), { hour: "numeric", minute: "2-digit" });
    return `${wd}, ${dm} · ${tm}`;
  }
  function fmtSlotParts(s) {
    const d = toDate(s);
    const wd = d.toLocaleDateString(loc(), { weekday: "short" }).replace(/\.$/, "");
    const dm = lang === "de" ? `${d.getDate()}.${d.getMonth() + 1}.` : d.toLocaleDateString(loc(), { month: "short", day: "numeric" });
    const tm = d.toLocaleTimeString(loc(), { hour: "numeric", minute: "2-digit" });
    return { day: `${wd} · ${dm}`, tm };
  }
  function fmtSlotShort(s) {
    const d = toDate(s);
    const wd = d.toLocaleDateString(loc(), { weekday: "short" });
    const tm = d.toLocaleTimeString(loc(), { hour: "numeric", minute: "2-digit" });
    return `${wd} ${d.getDate()}.${d.getMonth() + 1}. · ${tm}`;
  }
  const idea = (k) => (k.startsWith("c:") ? { e: "✨", label: k.slice(2) } : IDEA[k] ? { e: IDEA[k].e, label: IDEA[k][lang] } : { e: "✨", label: k });
  const linkFor = (key, obj) => BASE + (lang === "de" ? "de/" : "") + "?look=" + look + "#" + key + "=" + enc(obj);

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch {} ta.remove();
    }
    toast(t().copied);
  }
  async function share(text) {
    if (navigator.share) {
      try { await navigator.share({ text }); return; } catch (e) { if (e && e.name === "AbortError") return; }
    }
    copy(text);
  }
  const wa = (text) => window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");

  function calStamp(d) { return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`; }
  function downloadIcs(slot, title) {
    const d = toDate(slot), e = new Date(d.getTime() + 2 * 3600e3), now = new Date();
    const utc = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//" + BRAND.word + "//EN", "BEGIN:VEVENT",
      `UID:${Date.now()}@${BRAND.word}`, `DTSTAMP:${utc}`, `DTSTART:${calStamp(d)}`, `DTEND:${calStamp(e)}`,
      `SUMMARY:${title.replace(/([,;\\])/g, "\\$1")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    a.download = "date.ics"; document.body.appendChild(a); a.click(); a.remove();
  }
  function googleCal(slot, title) {
    const d = toDate(slot), e = new Date(d.getTime() + 2 * 3600e3);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${calStamp(d)}/${calStamp(e)}`, "_blank");
  }

  // ---- share images (canvas): pure editorial letterpress cards (no AI-slop, no emojis) ----
  const PAL = {
    ivory: { bg: "#F6F4EF", card: "#FFFFFF", ink: "#111111", muted: "#6E6A63", accent: "#8F7D63", line: "rgba(17,17,17,.11)", frame: "rgba(17,17,17,.08)", row: "#FAF9F6", shadow: "rgba(17,17,17,.08)" },
    gala:  { bg: "#0C0C0B", card: "#141413", ink: "#F4F1EA", muted: "rgba(244,241,234,.55)", accent: "#CBB99B", line: "rgba(244,241,234,.12)", frame: "rgba(203,185,155,.22)", row: "rgba(255,255,255,.03)", shadow: "rgba(0,0,0,.55)" },
  };
  const SERIF = '"Instrument Serif", Didot, Georgia, serif', SANS = '"Plus Jakarta Sans", -apple-system, "Segoe UI", sans-serif';
  const ROMAN = ["I", "II", "III"];
  async function fontsReady() {
    try { await Promise.all([`80px ${SERIF}`, `italic 80px ${SERIF}`, `500 40px ${SANS}`, `600 40px ${SANS}`].map((f) => document.fonts.load(f))); } catch {}
  }
  function paintBg(x, w, h, P) {
    x.fillStyle = P.bg; x.fillRect(0, 0, w, h);
  }
  function rr(x, X, Y, W, H, r) { x.beginPath(); if (x.roundRect) x.roundRect(X, Y, W, H, r); else x.rect(X, Y, W, H); }
  function wrap(x, text, maxW) {
    const out = []; let cur = "";
    String(text).split(/\s+/).forEach((w) => { const test = cur ? cur + " " + w : w; if (x.measureText(test).width > maxW && cur) { out.push(cur); cur = w; } else cur = test; });
    if (cur) out.push(cur); return out;
  }
  function textBlock(x, text, cx, y, maxW, lh, maxLines) {
    let ls = wrap(x, text, maxW);
    if (ls.length > maxLines) { ls = ls.slice(0, maxLines); ls[maxLines - 1] = ls[maxLines - 1].replace(/\s*\S*$/, "") + " …"; }
    ls.forEach((l, i) => x.fillText(l, cx, y + i * lh)); return y + (ls.length - 1) * lh;
  }
  function fit(x, s, maxW) { s = String(s); if (x.measureText(s).width <= maxW) return s; while (s.length > 1 && x.measureText(s + "…").width > maxW) s = s.slice(0, -1); return s + "…"; }
  function seal(x, cx, cy, r, ch, P) {
    x.fillStyle = P.card; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
    x.strokeStyle = P.frame; x.lineWidth = 2.5; x.stroke();
    x.beginPath(); x.arc(cx, cy, r - 9, 0, Math.PI * 2); x.strokeStyle = P.line; x.lineWidth = 1.5; x.stroke();
    x.fillStyle = P.ink; x.font = `italic ${Math.round(r * 1.05)}px ${SERIF}`; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(ch, cx, cy + r * 0.06); x.textBaseline = "alphabetic";
  }
  const plain = (h) => String(h).replace(/<[^>]+>/g, "");
  const quote = (s) => (lang === "de" ? `„${s}“` : `“${s}”`);
  const toBlob = (c) => new Promise((res) => c.toBlob(res, "image/png"));

  async function drawInvite() {
    await fontsReady();
    const L = t(), P = PAL[look], W = 1080, Hh = 1350, o = { f: C.f, t: C.t, m: C.m, i: C.ideas, s: C.slots };
    const c = document.createElement("canvas"); c.width = W; c.height = Hh;
    const x = c.getContext("2d"); paintBg(x, W, Hh, P);

    // Centered letterpress card
    const padX = 76, padY = 76, cw = W - padX * 2, ch = Hh - padY * 2;
    x.save(); x.shadowColor = P.shadow; x.shadowBlur = 54; x.shadowOffsetY = 20;
    x.fillStyle = P.card; rr(x, padX, padY, cw, ch, 36); x.fill(); x.restore();
    x.strokeStyle = P.line; x.lineWidth = 2; rr(x, padX, padY, cw, ch, 36); x.stroke();
    x.strokeStyle = P.frame; x.lineWidth = 1.5; rr(x, padX + 18, padY + 18, cw - 36, ch - 36, 26); x.stroke();

    x.textAlign = "center";
    seal(x, W / 2, padY + 120, 52, (o.f || "I").trim().charAt(0).toUpperCase(), P);

    x.fillStyle = P.accent; x.font = `600 22px ${SANS}`; try { x.letterSpacing = "6px"; } catch {}
    x.fillText(fill(L.from, { f: o.f }).toUpperCase(), W / 2, padY + 232); try { x.letterSpacing = "0px"; } catch {}

    x.fillStyle = P.ink; x.font = `92px ${SERIF}`;
    let y = textBlock(x, plain(L.invH(o.t, o.i.length)), W / 2, padY + 336, cw - 140, 92, 2);

    if (o.m) {
      x.fillStyle = P.muted; x.font = `italic 42px ${SERIF}`;
      y = textBlock(x, quote(o.m), W / 2, y + 66, cw - 180, 50, 2);
    }

    // Fine divider
    y += 56;
    x.strokeStyle = P.line; x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(W / 2 - 48, y); x.lineTo(W / 2 + 48, y); x.stroke();
    y += 52;

    // 3 clean letterpress rows with Roman numerals (zero emojis)
    const rx = padX + 76, rw = cw - 152, rowH = 92;
    o.i.forEach((k, idx) => {
      const d = idea(k);
      x.fillStyle = P.row; rr(x, rx, y, rw, rowH, 18); x.fill();
      x.strokeStyle = P.line; x.lineWidth = 1.5; x.stroke();
      // Roman badge
      const bx = rx + 46, by = y + rowH / 2;
      x.beginPath(); x.arc(bx, by, 23, 0, Math.PI * 2); x.strokeStyle = P.line; x.lineWidth = 1.5; x.stroke();
      x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = P.accent; x.font = `italic 26px ${SERIF}`;
      x.fillText(ROMAN[idx] || String(idx + 1), bx, by + 2);
      // Label
      x.textAlign = "left"; x.fillStyle = P.ink; x.font = `500 32px ${SANS}`;
      x.fillText(fit(x, d.label, rw - 130), rx + 94, by + 1);
      x.textBaseline = "alphabetic";
      y += rowH + 16;
    });

    // Horizontal date row
    y += 22;
    const cols = o.s.length, gap = 16, tw = (rw - gap * (cols - 1)) / cols, th = 98;
    o.s.forEach((s, idx) => {
      const p = fmtSlotParts(s), tx = rx + idx * (tw + gap);
      x.fillStyle = P.row; rr(x, tx, y, tw, th, 16); x.fill();
      x.strokeStyle = P.line; x.lineWidth = 1.5; x.stroke();
      x.textAlign = "center";
      x.fillStyle = P.muted; x.font = `600 18px ${SANS}`; try { x.letterSpacing = "2px"; } catch {}
      x.fillText(p.day.toUpperCase(), tx + tw / 2, y + 36); try { x.letterSpacing = "0px"; } catch {}
      x.fillStyle = P.ink; x.font = `40px ${SERIF}`;
      x.fillText(p.tm, tx + tw / 2, y + 78);
    });

    // Bottom calm cue + brand
    x.textAlign = "center";
    x.fillStyle = P.muted; x.font = `500 22px ${SANS}`;
    x.fillText(L.imgCta, W / 2, padY + ch - 108);
    x.fillStyle = P.ink; x.font = `italic 48px ${SERIF}`;
    x.fillText(BRAND.word + ".", W / 2, padY + ch - 48);
    return toBlob(c);
  }

  async function drawStory() {
    await fontsReady();
    const L = t(), P = PAL[look], o = H.inv, d = idea(o.i[H.pickIdea]), when = toDate(o.s[H.pickSlot]);
    const W = 1080, Hh = 1920, c = document.createElement("canvas"); c.width = W; c.height = Hh;
    const x = c.getContext("2d"); paintBg(x, W, Hh, P); x.textAlign = "center";

    // Calm upright museum-grade letterpress card (no giant emoji, no tilt)
    const cx = 108, cy = 440, cw = W - 216, ch = 1000;
    x.save(); x.shadowColor = P.shadow; x.shadowBlur = 64; x.shadowOffsetY = 24;
    x.fillStyle = P.card; rr(x, cx, cy, cw, ch, 34); x.fill(); x.restore();
    x.strokeStyle = P.line; x.lineWidth = 2; rr(x, cx, cy, cw, ch, 34); x.stroke();
    x.strokeStyle = P.frame; x.lineWidth = 1.5; rr(x, cx + 24, cy + 24, cw - 48, ch - 48, 22); x.stroke();

    x.fillStyle = P.accent; x.font = `600 24px ${SANS}`; try { x.letterSpacing = "8px"; } catch {}
    x.fillText(L.storyMade.toUpperCase(), W / 2, cy + 165); try { x.letterSpacing = "0px"; } catch {}

    x.strokeStyle = P.line; x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(W / 2 - 44, cy + 215); x.lineTo(W / 2 + 44, cy + 215); x.stroke();

    x.fillStyle = P.ink; x.font = `104px ${SERIF}`;
    const ly = textBlock(x, d.label, W / 2, cy + 440, cw - 150, 108, 3);

    x.strokeStyle = P.line; x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(W / 2 - 44, ly + 88); x.lineTo(W / 2 + 44, ly + 88); x.stroke();

    x.fillStyle = P.muted; x.font = `600 28px ${SANS}`; try { x.letterSpacing = "7px"; } catch {}
    x.fillText(when.toLocaleDateString(loc(), { weekday: "long" }).toUpperCase(), W / 2, ly + 158); try { x.letterSpacing = "0px"; } catch {}

    x.fillStyle = P.ink; x.font = `italic 56px ${SERIF}`;
    x.fillText(BRAND.word + ".", W / 2, cy + ch - 96);
    return toBlob(c);
  }

  // pre-render so the share call stays inside the tap (iOS needs that)
  const IMG = { key: "", p: null };
  function imgFor(kind) {
    const key = [kind, look, lang, kind === "inv" ? C.link : location.hash + H.pickIdea + "-" + H.pickSlot].join("|");
    if (IMG.key !== key) { IMG.key = key; IMG.p = (kind === "inv" ? drawInvite() : drawStory()).catch(() => null); }
    return IMG.p;
  }
  async function shareImage(kind, name, text) {
    const blob = await imgFor(kind); if (!blob) return;
    const file = new File([blob], name, { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share(text ? { files: [file], text } : { files: [file] }); return; } catch (e) { if (e && e.name === "AbortError") return; }
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    if (text) { await copy(text); toast(t().imgSaved); }
  }

  const ICON = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="10" fill="#141B34"/><path d="M9.5 16.5l4.3 4.3 8.7-9" stroke="#FFB38A" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="25" cy="7" r="2.8" fill="#FF6F96"/></svg>`;
  const top = () => `<div class="top"><a class="logo" href="${esc(BASE + (lang === "de" ? "de/" : "") + "?look=" + look)}">${ICON}<span>${BRAND.word}<i>.</i></span></a>
    <div class="controls">
      <button class="theme-btn" data-act="toggleLook" aria-label="Light / Dark" title="${look === "gala" ? "Light" : "Dark"}">${look === "gala" ? "☀" : "☾"}</button>
      <div class="lang"><button data-act="lang" data-v="en" class="${lang === "en" ? "on" : ""}">EN</button><button data-act="lang" data-v="de" class="${lang === "de" ? "on" : ""}">DE</button></div>
    </div></div>`;
  const foot = () => `<div class="foot"><a href="${esc(BASE + (lang === "de" ? "de/" : "") + "?look=" + look)}">${t().made} <b>${BRAND.word}.</b></a></div>`;

  // ---- state ----
  const C = { f: store.get("name") || "", t: "", m: "", ideas: [], slots: [], day: null, err: "", link: null };
  const H = { inv: null, pickIdea: null, pickSlot: null, done: false }; // her
  let view = "create", lastView = "";

  function route() {
    const m = location.hash.match(/^#([ir])=(.+)$/);
    if (!m) { view = C.link ? "ready" : "create"; return; }
    try {
      const o = dec(m[2]);
      if (m[1] === "i") {
        if (!o || !Array.isArray(o.i) || !Array.isArray(o.s) || !o.f) throw 0;
        H.inv = o; H.done = false;
        H.pickIdea = o.i.length === 1 ? 0 : null;
        H.pickSlot = o.s.length === 1 ? 0 : null;
        view = "invite";
      } else {
        if (!o || !o.i || !o.s) throw 0;
        H.ans = o; view = "answer";
      }
    } catch { view = "broken"; }
  }

  // ---- views ----
  function vCreate() {
    const L = t();
    const now = new Date();
    const days = Array.from({ length: 10 }, (_, i) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + i));
    const dayLabel = (d, i) => i === 0 ? L.today : i === 1 ? L.tomorrow : `${d.toLocaleDateString(loc(), { weekday: "short" })} ${d.getDate()}.${d.getMonth() + 1}.`;
    const full = C.slots.length >= 3;
    const customs = C.ideas.filter((k) => k.startsWith("c:"));
    return `${top()}
      <h1>${L.h1}</h1><p class="sub">${L.sub}</p>
      <div class="sec grid2">
        <label class="field"><small>${L.you}</small><input class="text" data-in="f" value="${esc(C.f)}" placeholder="Flo" maxlength="24" autocomplete="given-name"></label>
        <label class="field"><small>${L.them} · ${L.opt}</small><input class="text" data-in="t" value="${esc(C.t)}" placeholder="Lisa" maxlength="24" autocomplete="off"></label>
      </div>
      <div class="sec"><label class="field"><small>${L.msgLbl} · ${L.opt}</small><input class="text" data-in="m" value="${esc(C.m)}" placeholder="${esc(L.msgPh)}" maxlength="90" autocomplete="off"></label></div>
      <div class="sec">
        <div class="label">${L.ideas} <span>${C.ideas.length}/3</span></div>
        <div class="chips">
          ${IDEAS.map(([k, e]) => { const on = C.ideas.includes(k); return `<button class="chip ${on ? "on" : ""}" data-act="idea" data-v="${k}" ${!on && C.ideas.length >= 3 ? "disabled" : ""}><span class="emo">${e} </span>${esc(IDEA[k][lang])}</button>`; }).join("")}
          ${customs.map((k) => `<button class="chip x" data-act="idea" data-v="${esc(k)}">${esc(k.slice(2))}<b>✕</b></button>`).join("")}
        </div>
        <div class="row"><input class="text" data-in="custom" placeholder="${L.custom}" maxlength="60" ${C.ideas.length >= 3 ? "disabled" : ""}><button class="btn ghost sm" data-act="addCustom" ${C.ideas.length >= 3 ? "disabled" : ""}>${L.add}</button></div>
      </div>
      <div class="sec">
        <div class="label">${L.times} <span>${C.slots.length}/3</span></div>
        ${C.slots.length ? `<div class="chips" style="margin-bottom:12px">${C.slots.map((s, i) => `<button class="chip x" data-act="delSlot" data-v="${i}">${esc(fmtSlotShort(s))}<b>✕</b></button>`).join("")}</div>` : ""}
        <div class="scroll" data-scroll="days">${days.map((d, i) => `<button class="chip ${C.day === isoDay(d) ? "on" : ""}" data-act="day" data-v="${isoDay(d)}" ${full ? "disabled" : ""}>${dayLabel(d, i)}</button>`).join("")}</div>
        ${C.day && !full ? `<div class="scroll subrow fade" data-scroll="times">${TIMES.map((tm) => { const v = `${C.day}T${tm}`; const past = toDate(v) < now; return `<button class="chip" data-act="time" data-v="${tm}" ${past || C.slots.includes(v) ? "disabled" : ""}>${toDate(v).toLocaleTimeString(loc(), { hour: "numeric", minute: "2-digit" })}</button>`; }).join("")}</div>` : ""}
        <p class="help">${L.timesHelp}</p>
      </div>
      <div class="sec">
        <div class="label">${L.lookLbl}</div>
        <div class="look-pick">
          <button class="chip ${look === "ivory" ? "on" : ""}" data-act="setLook" data-v="ivory">☀ ${L.lookLight}</button>
          <button class="chip ${look === "gala" ? "on" : ""}" data-act="setLook" data-v="gala">☾ ${L.lookDark}</button>
        </div>
      </div>
      <div class="sticky"><div class="err">${esc(C.err)}</div><button class="btn primary" data-act="create">${L.create}</button></div>`;
  }

  function vReady() {
    const L = t();
    const ideaLabels = C.ideas.map((k) => idea(k).label).join(" · ");
    const slotLabels = C.slots.map((s) => fmtSlotShort(s)).join(" · ");
    return `${top()}
      <div class="eyebrow">${BRAND.word}</div>
      <h1>${L.readyH}</h1><p class="sub">${L.readySub}</p>
      <div class="mini-card">
        <div class="mc-eb">${esc(fill(L.from, { f: C.f }))}</div>
        <div class="mc-h">${L.invH(C.t ? `<em>${esc(C.t)}</em>` : "")}</div>
        <div class="mc-meta">${esc(ideaLabels)}<br>${esc(slotLabels)}</div>
      </div>
      <div class="btns">
        <button class="btn primary" data-act="imgInvite">${L.shareImg}</button>
        <div class="grid2" style="margin-top:10px"><button class="btn ghost" data-act="waInvite">${L.wa}</button><button class="btn ghost" data-act="copyInvite">${L.copy}</button></div>
        <div class="grid2" style="margin-top:10px"><button class="btn ghost" data-act="shareInvite">${L.share}</button><button class="btn ghost" data-act="preview">${L.preview}</button></div>
      </div>
      <button class="textlink" data-act="edit">${L.edit}</button>
      <p class="note">${L.tip}</p>`;
  }

  function vInvite() {
    const L = t(), o = H.inv, now = new Date();
    if (o.s.every((s) => toDate(s) < now)) return `${top()}<h1>${L.expired}</h1><p class="sub">${L.expiredSub}</p><button class="btn primary" data-act="own">${L.newLink}</button>${foot()}`;
    const ready = H.pickIdea !== null && H.pickSlot !== null;
    const init = esc((o.f || "I").trim().charAt(0).toUpperCase());
    return `${top()}
      <div class="inv-head">
        <div class="inv-seal" aria-hidden="true">${init}</div>
        <div class="eyebrow"><span class="emo">💌</span> ${esc(fill(L.from, { f: o.f }))}</div>
        <h1>${L.invH(o.t ? `<em>${esc(o.t)}</em>` : "", o.i.length)}</h1>${o.m ? `<p class="quote">${esc(quote(String(o.m).slice(0, 90)))}</p>` : ""}<p class="sub">${L.invSub}</p>
      </div>
      <div class="inv-sheet">
        <div class="sec sec-ideas"><div class="label">${L.qIdea}</div>
          ${o.i.map((k, i) => { const d = idea(k); return `<button class="opt ${H.pickIdea === i ? "on" : ""}" data-act="pickIdea" data-v="${i}"><span class="em">${d.e}</span><span class="tx">${esc(d.label)}</span><span class="tick">✓</span></button>`; }).join("")}
        </div>
        <div class="sec sec-times"><div class="label">${L.qTime}</div>
          <div class="times-grid">
            ${o.s.map((s, i) => { const past = toDate(s) < now; const p = fmtSlotParts(s); return `<button class="opt time ${H.pickSlot === i ? "on" : ""}" data-act="pickSlot" data-v="${i}" ${past ? "disabled" : ""}><span class="em">🗓️</span><span class="tx"><span class="t-full">${esc(fmtSlot(s))}${past ? ` · ${L.past}` : ""}</span><span class="t-compact"><b>${esc(p.day)}</b><i>${esc(p.tm)}</i>${past ? `<small>${L.past}</small>` : ""}</span></span><span class="tick">✓</span></button>`; }).join("")}
          </div>
        </div>
        <div class="sticky"><button class="btn primary" data-act="down" ${ready ? "" : "disabled"}>${BRAND.cta}</button></div>
      </div>
      <button class="textlink" data-act="other">${L.other}</button>
      <button class="textlink quiet" data-act="no">${L.no}</button>
      <p class="note">${L.privacy}</p>${foot()}`;
  }

  function vPicked() {
    const L = t(), o = H.inv, d = idea(o.i[H.pickIdea]), s = o.s[H.pickSlot];
    return `${top()}
      <div class="datecard"><div class="big">${d.e}</div><h2>${esc(d.label)}</h2><p>${esc(fmtSlot(s))}</p><span class="with">${esc(fill(L.with, { f: o.f }))}</span></div>
      <h1 style="text-align:center">${L.picked}</h1><p class="sub" style="text-align:center">${esc(fill(L.pickedSub, { f: o.f }))}</p>
      <div class="btns">
        <button class="btn primary" data-act="tell">${esc(fill(L.tell, { f: o.f }))}</button>
        <button class="btn ghost" data-act="waTell">${L.wa}</button>
        <div class="grid2" style="margin-top:10px"><button class="btn ghost" data-act="ics">${L.cal}</button><button class="btn ghost" data-act="gcal">${L.gcal}</button></div>
        <button class="btn ghost" data-act="friend">${L.friend}</button>
        <button class="btn ghost" data-act="story">${L.story}</button>
      </div>
      <button class="textlink" data-act="own">${L.own}</button>`;
  }

  function vAnswer() {
    const L = t(), a = H.ans, d = idea(a.i);
    return `${top()}
      <div class="eyebrow" style="text-align:center">${a.t ? esc(fill(L.ansFrom, { t: a.t })) : "💌"}</div>
      <div class="datecard"><div class="big">${d.e}</div><h2>${esc(d.label)}</h2><p>${esc(fmtSlot(a.s))}</p>${a.t ? `<span class="with">${esc(fill(L.with, { f: a.t }))}</span>` : ""}</div>
      <h1 style="text-align:center">${esc(L.ansH(a.t))}</h1><p class="sub" style="text-align:center">${L.ansSub}</p>
      <div class="btns">
        <div class="grid2"><button class="btn primary" data-act="ics">${L.cal}</button><button class="btn ghost" data-act="gcal">${L.gcal}</button></div>
        <button class="btn ghost" data-act="own">${L.newLink}</button>
      </div>`;
  }

  function vBroken() {
    const L = t();
    return `${top()}<h1>${L.broken}</h1><p class="sub">${L.brokenSub}</p><button class="btn primary" data-act="own">${L.newLink}</button>`;
  }

  function render() {
    const scrolls = {};
    $app.querySelectorAll("[data-scroll]").forEach((el) => (scrolls[el.dataset.scroll] = el.scrollLeft));
    document.documentElement.lang = lang;
    const html = { create: vCreate, ready: vReady, invite: H.done ? vPicked : vInvite, answer: vAnswer, broken: vBroken }[view]();
    const key = view + (H.done ? "+" : "");
    $app.innerHTML = `<div class="wrap ${key !== lastView ? "fade" : ""}">${html}</div>`;
    if (key !== lastView) window.scrollTo(0, 0);
    lastView = key;
    $app.querySelectorAll("[data-scroll]").forEach((el) => { if (scrolls[el.dataset.scroll]) el.scrollLeft = scrolls[el.dataset.scroll]; });
    if (view === "ready" && C.link) imgFor("inv");
    if (view === "invite" && H.done) imgFor("story");
    document.title = view === "invite" && H.inv ? `${fill(T[lang].from, { f: H.inv.f })}` : `${BRAND.word} · ${T[lang].h1.replace(/<[^>]+>/g, "")}`;
  }

  // ---- actions ----
  const yesData = () => { const o = H.inv; return { idea: idea(o.i[H.pickIdea]).label, time: fmtSlot(o.s[H.pickSlot]) }; };
  const yesMsg = () => {
    const o = H.inv;
    const link = linkFor("r", { v: 1, f: o.f, t: o.t || "", i: o.i[H.pickIdea], s: o.s[H.pickSlot] });
    return fill(t().msgYes, { ...yesData(), link });
  };
  const calArgs = () => {
    if (view === "answer") return [H.ans.s, t().calTitle(H.ans.t, idea(H.ans.i).label)];
    return [H.inv.s[H.pickSlot], t().calTitle(H.inv.f, idea(H.inv.i[H.pickIdea]).label)];
  };

  const actions = {
    lang: (v) => { lang = v; store.set("lang", v); if (C.link) C.link = buildInvite(); },
    toggleLook: () => { applyLook(look === "gala" ? "ivory" : "gala", true); if (C.link) C.link = buildInvite(); },
    setLook: (v) => { applyLook(v, true); if (C.link) C.link = buildInvite(); },
    idea: (v) => { C.ideas = C.ideas.includes(v) ? C.ideas.filter((x) => x !== v) : C.ideas.length < 3 ? [...C.ideas, v] : C.ideas; C.err = ""; },
    addCustom: () => {
      const inp = $app.querySelector('[data-in="custom"]'); const v = (inp.value || "").trim();
      if (v && C.ideas.length < 3 && !C.ideas.includes("c:" + v)) C.ideas.push("c:" + v); C.err = "";
    },
    day: (v) => { C.day = C.day === v ? null : v; },
    time: (v) => { const s = `${C.day}T${v}`; if (C.slots.length < 3 && !C.slots.includes(s)) { C.slots.push(s); C.slots.sort(); } C.day = null; C.err = ""; },
    delSlot: (v) => { C.slots.splice(Number(v), 1); },
    create: () => {
      const L = t();
      C.f = C.f.trim(); C.t = C.t.trim(); C.m = C.m.trim().slice(0, 90);
      if (!C.f) return (C.err = L.needName);
      if (!C.ideas.length) return (C.err = L.needIdea);
      if (!C.slots.length) return (C.err = L.needTime);
      store.set("name", C.f); C.err = ""; C.link = buildInvite(); view = "ready";
    },
    shareInvite: () => share(inviteMsg()),
    imgInvite: () => { shareImage("inv", "date-invite.png", inviteMsg()); },
    waInvite: () => wa(inviteMsg()),
    copyInvite: () => copy(inviteMsg()),
    preview: () => window.open(C.link, "_blank"),
    edit: () => { view = "create"; },
    pickIdea: (v) => { H.pickIdea = Number(v); },
    pickSlot: (v) => { H.pickSlot = Number(v); },
    down: () => { if (H.pickIdea !== null && H.pickSlot !== null) H.done = true; },
    other: () => share(fill(t().msgOther, { f: H.inv.f })),
    no: () => share(fill(t().msgNo, { f: H.inv.f })),
    story: () => { shareImage("story", "date-story.png", ""); },
    tell: () => share(yesMsg()),
    waTell: () => wa(yesMsg()),
    friend: () => share(fill(t().msgFriend, { f: H.inv.f, ...yesData() })),
    ics: () => downloadIcs(...calArgs()),
    gcal: () => googleCal(...calArgs()),
    own: () => { history.pushState(null, "", BASE + (lang === "de" ? "de/" : "")); C.link = null; route(); },
  };
  const buildInvite = () => linkFor("i", { v: 1, f: C.f, t: C.t, ...(C.m ? { m: C.m } : {}), i: C.ideas, s: C.slots });
  const inviteMsg = () => (C.m ? `${C.m}\n${C.link}` : fill(t().msgInvite, { link: C.link }));

  $app.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b || b.disabled) return;
    const fn = actions[b.dataset.act]; if (!fn) return;
    if (b.tagName === "A") e.preventDefault();
    fn(b.dataset.v); render();
  });
  $app.addEventListener("input", (e) => { const k = e.target.dataset.in; if (k === "f" || k === "t" || k === "m") C[k] = e.target.value; });
  $app.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.dataset.in === "custom") { actions.addCustom(); render(); } });
  window.addEventListener("hashchange", () => { route(); render(); });
  window.addEventListener("popstate", () => { route(); render(); });

  route(); render();
})();
