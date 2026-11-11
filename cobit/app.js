(() => {
  "use strict";
  const main = document.getElementById("main");
  const message = document.getElementById("storage-message");
  if (!window.COBIT_CONTENT || !Array.isArray(window.AUDIT_PROGRAMS)) {
    main.innerHTML = '<div class="notice warning"><h1>İçerik yüklenemedi / Content could not be loaded.</h1><p>content.js, audit-data.js ve app.js dosyalarının index.html ile aynı klasörde olduğunu kontrol et. / Check that content.js, audit-data.js and app.js are next to index.html.</p></div>';
    return;
  }
  const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const list = (items, ordered = false) => `<${ordered ? "ol" : "ul"}>${items.map(item => `<li>${escape(item)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`;
  const fold = value => String(value).toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i");
  const storageKey = "cobit-atolyesi-v1";
  const langKey = "cobit-atolyesi-lang";

  function readLanguage() {
    const fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "tr" || fromUrl === "en") return fromUrl;
    try {
      const saved = localStorage.getItem(langKey);
      if (saved === "tr" || saved === "en") return saved;
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
    }
    const preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "tr"];
    return preferred.some(code => String(code).toLowerCase().startsWith("tr")) ? "tr" : "en";
  }
  let lang = readLanguage();
  const L = (tr, en) => lang === "en" ? en : tr;

  let data, programs, catalog, practices, isoControl, isoClause, itgcLabels, englishFallback;
  const isoRef = window.ISO_REFERENCE || {controls:[], clauses:[], themes:{}, themesEn:{}};
  function loadLanguageData() {
    const trCatalog = Array.isArray(window.COBIT_CONTROLS) ? window.COBIT_CONTROLS : [];
    const enCatalog = Array.isArray(window.COBIT_CONTROLS_EN) ? window.COBIT_CONTROLS_EN : [];
    const enReady = window.COBIT_CONTENT_EN && Array.isArray(window.AUDIT_PROGRAMS_EN) && enCatalog.length === trCatalog.length;
    englishFallback = lang === "en" && !enReady;
    const useEn = lang === "en" && enReady;
    data = useEn ? window.COBIT_CONTENT_EN : window.COBIT_CONTENT;
    programs = useEn ? window.AUDIT_PROGRAMS_EN : window.AUDIT_PROGRAMS;
    catalog = (useEn ? enCatalog : trCatalog).slice().sort((a,b) => a.objective.localeCompare(b.objective));
    practices = catalog.flatMap(objective => objective.practices.map(practice => ({...practice, objective:objective.objective})));
    isoControl = new Map(isoRef.controls.map(control => [control[0], {en:control[1], tr:control[2]}]));
    isoClause = new Map(isoRef.clauses.map(clause => [clause[0], {tr:clause[1], en:clause[2] || clause[1]}]));
    itgcLabels = lang === "en"
      ? {access:"Access management", change:"Change management", operations:"IT operations", sdlc:"Development / SDLC"}
      : {access:"Erişim yönetimi", change:"Değişiklik yönetimi", operations:"BT operasyonları", sdlc:"Geliştirme / SDLC"};
  }
  loadLanguageData();
  const objectiveMeta = code => data.objectives.find(item => item[0] === code);
  const isoThemes = () => (lang === "en" ? isoRef.themesEn : isoRef.themes) || isoRef.themes;
  const brand = () => L("COBIT Atölyesi", "COBIT Workshop");

  let state = {completed:[], notes:{}};
  let storageAvailable = true;
  let activeDomain = "ALL";
  let catalogDomain = "ALL";
  let catalogItgc = "ALL";
  let isoTheme = "ALL";
  let scrollTarget = null;

  function storageWarning(text) {
    message.textContent = text;
    message.hidden = false;
  }
  function isStorageError(error) {
    return error instanceof DOMException && ["SecurityError","QuotaExceededError","InvalidStateError","NS_ERROR_DOM_QUOTA_REACHED"].includes(error.name);
  }
  function validState(value) {
    const lessonIds = window.COBIT_CONTENT.lessons.map(lesson => lesson.id);
    return value !== null && typeof value === "object" && Array.isArray(value.completed)
      && value.completed.every(id => typeof id === "string" && lessonIds.includes(id))
      && value.notes !== null && typeof value.notes === "object" && !Array.isArray(value.notes)
      && Object.entries(value.notes).every(([key, text]) => /^(lesson|case|audit)-[a-z0-9-]+$/.test(key) && typeof text === "string");
  }
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (validState(parsed)) state = {completed:[...new Set(parsed.completed)], notes:{...parsed.notes}};
      else storageWarning(L("Önceki yerel kayıt beklenen biçimde değil; yüklenmedi. Yeni kayıt yaptığında bu siteye ait eski kayıt değiştirilecektir.", "A previous local record was not in the expected format and was not loaded. Saving new progress will replace this site's old record."));
    }
  } catch (error) {
    if (error instanceof SyntaxError) storageWarning(L("Önceki yerel kayıt okunamadı; yüklenmedi. Yeni kayıt eski bozuk verinin yerini alacaktır.", "A previous local record could not be read and was not loaded. New progress will replace the damaged data."));
    else if (isStorageError(error)) {
      storageAvailable = false;
      storageWarning(L("Tarayıcı yerel depolamaya izin vermiyor. Site çalışır; ilerleme ve notların sayfa kapandıktan sonra saklanmaz.", "This browser blocks local storage. The site still works, but progress and notes will not be kept after the page closes."));
    } else throw error;
  }
  function persist() {
    if (!storageAvailable) return false;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch (error) {
      if (!isStorageError(error)) throw error;
      storageWarning(L("Kayıt yapılamadı: Tarayıcı depolama erişimini engelliyor veya alan dolu. Son değişiklikler yalnızca bu açık sayfada duruyor; kalıcı kaydedildi sayma.", "Could not save: the browser blocks storage or it is full. Recent changes exist only in this open page; do not treat them as saved."));
      return false;
    }
  }

  function updateChrome() {
    document.documentElement.lang = lang;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = L("COBIT 2019 kontrol kataloğu ve IT denetimi: 231 yönetim uygulaması için denetçi beklentisi, tasarım/işleyiş testi, kanıt, tipik bulgu ve ISO 27001/27002 eşleştirmesi. Sıfırdan Türkçe dersler.", "COBIT 2019 control catalog and IT audit guide: auditor expectation, test of design and operating effectiveness, evidence, typical findings and ISO 27001/27002 mapping for all 231 management practices. Lessons from zero.");
    document.querySelector(".skip").textContent = L("İçeriğe geç", "Skip to content");
    const brandLink = document.querySelector(".brand");
    brandLink.setAttribute("aria-label", L("COBIT Atölyesi ana sayfa", "COBIT Workshop home"));
    brandLink.querySelector("[data-brand-name]").innerHTML = lang === "en" ? "COBIT <strong>Workshop</strong>" : "COBIT <strong>Atölyesi</strong>";
    brandLink.querySelector("small").textContent = L("Türkçe · Bağımsız öğrenme kaynağı", "Independent learning resource");
    const menuButton = document.getElementById("menu-button");
    menuButton.textContent = L("Menü", "Menu");
    const navigation = document.getElementById("navigation");
    navigation.setAttribute("aria-label", L("Ana menü", "Main menu"));
    navigation.innerHTML = [["dersler",L("Öğren","Learn")],["kontroller",L("Kontrol kataloğu","Control catalog")],["iso27001","ISO 27001"],["iso27002","ISO 27002"],["denetim",L("Denetle","Audit")],["vakalar",L("Uygula","Practice")],["test",L("Sınav","Exam")],["sozluk",L("Sözlük","Glossary")]].map(([hash,label]) => `<a href="#${hash}">${escape(label)}</a>`).join("");
    document.querySelectorAll("[data-lang]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === lang)));
    document.querySelector(".lang-switch").setAttribute("aria-label", L("Dil seçimi", "Language"));
    document.getElementById("site-footer").innerHTML = `<div><strong>${escape(L("Ezberden önce nedenini anla.", "Understand the why before memorizing."))}</strong><p>${escape(L("Özgün Türkçe ve İngilizce anlatım · Kurgusal örnekler · Ücretsiz, hesapsız erişim", "Original Turkish and English content · Fictional examples · Free, no account needed"))}</p><p><a href="https://turhansolmaz.github.io/">← ${escape(L("Turhan Solmaz · Portfolyo", "Turhan Solmaz · Portfolio"))}</a></p></div><div><a href="#kaynaklar">${escape(L("Kaynaklar, kapsam ve kullanım", "Sources, scope and use"))}</a><p>${escape(L("COBIT, ISACA'nın çerçevesidir. Bu site resmî ISACA eğitimi değildir.", "COBIT is a framework of ISACA. This site is not official ISACA training."))}</p></div>`;
  }
  function setLanguage(next) {
    if (next === lang || (next !== "tr" && next !== "en")) return;
    lang = next;
    try { localStorage.setItem(langKey, lang); } catch (error) { if (!isStorageError(error)) throw error; }
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    loadLanguageData();
    updateChrome();
    render(false);
  }
  const objectiveHref = code => catalog.some(item => item.objective === code) ? `#kontrol/${code}` : `#hedefler/${code}`;
  const pills = codes => codes.map(code => `<a class="pill" href="${objectiveHref(code)}">${escape(code)}</a>`).join(" ");
  const isoTitle = number => isoControl.has(number) ? isoControl.get(number)[lang] : "";
  const clauseTitle = number => isoClause.has(number) ? isoClause.get(number)[lang] : "";
  const clauseLabel = () => L("27001 md.", "27001 cl.");
  const isoTags = practice => [
    ...practice.iso.map(number => `<a class="tag iso" href="#iso27002/${escape(number)}" title="${escape(isoTitle(number))}">27002 · ${escape(number)}</a>`),
    ...practice.clauses.map(number => `<a class="tag clause" href="#iso27001/${escape(number)}" title="${escape(clauseTitle(number))}">${clauseLabel()} ${escape(number)}</a>`),
    practice.itgc ? `<span class="tag itgc">ITGC · ${escape(itgcLabels[practice.itgc])}</span>` : ""
  ].join("");
  const printButton = () => `<button class="button secondary print-button" type="button" data-action="print">${escape(L("Bu görünümü yazdır / PDF", "Print this view / PDF"))}</button>`;
  function intro(label, title, description) {
    return `<div class="intro"><div class="eyebrow"><span class="dot"></span>${escape(label)}</div><h1>${escape(title)}</h1><p>${escape(description)}</p></div>`;
  }
  function fallbackNotice() {
    return englishFallback ? '<div class="notice warning">The English edition files could not be loaded completely, so this page is shown in Turkish.</div>' : "";
  }
  function lessonCard(lesson, index) {
    const complete = state.completed.includes(lesson.id);
    return `<article class="card"><div class="card-meta"><span class="number">${String(index + 1).padStart(2,"0")} / 12</span><span class="pill">${escape(lesson.level)}</span></div><h3><a href="#ders/${lesson.id}">${escape(lesson.title)}</a></h3><p>${escape(lesson.summary)}</p><div class="card-foot"><span>${lesson.time} ${L("dk","min")} ${complete ? `· <span class="complete-label">${L("Tamamlandı","Completed")}</span>` : ""}</span><a href="#ders/${lesson.id}">${L("Derse git →","Open lesson →")}</a></div></article>`;
  }
  function progressPanel() {
    const done = state.completed.length;
    const next = (data.lessons.find(lesson => !state.completed.includes(lesson.id)) || data.lessons[0]).id;
    return `<div class="progress-panel"><div class="progress-info"><strong>${L("Senin öğrenme yolun","Your learning path")}</strong><div class="progress-track" role="progressbar" aria-label="${L("Tamamlanan dersler","Completed lessons")}" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="12"><div class="progress-fill" style="width:${done/12*100}%"></div></div><p>${L(`${done} / 12 ders tamamlandı. İşaretler ve notlar yalnızca bu tarayıcıda saklanır.`, `${done} / 12 lessons completed. Progress and notes are stored only in this browser.`)}</p></div><a class="button secondary" href="#ders/${next}">${done ? L("Öğrenmeye devam et","Continue learning") : L("İlk derse başla","Start the first lesson")} →</a></div>`;
  }
  function home() {
    const count = practices.length || 231;
    main.innerHTML = `${fallbackNotice()}<section class="hero"><div><div class="eyebrow"><span class="dot"></span>${L("Teknik jargonla değil, bir örnekle başla","Start with an example, not jargon")}</div><h1>${L("COBIT'i ezberleme.<br><span>İşin mantığını öğren.</span>","Don't memorize COBIT.<br><span>Understand the logic.</span>")}</h1><p>${L("“Risk”, “kontrol”, “denetim”... Hepsi birbirine mi karışıyor? Günlük iş örnekleriyle sıfırdan başla. Sonra COBIT 2019'u ve bir IT denetçisinin nasıl düşündüğünü keşfet.","“Risk”, “control”, “audit”... all blurring together? Start from zero with everyday business examples. Then explore COBIT 2019 and how an IT auditor thinks.")}</p><div class="actions"><a class="button" href="#ders/risk-kontrol-kanit">${L("Sıfırdan öğrenmeye başla","Start learning from zero")} <span aria-hidden="true">↗</span></a><a class="button secondary" href="#kontroller">${L("Kontrol kataloğunu incele","Explore the control catalog")}</a></div><p class="tiny">${L("Ön bilgi gerekmez · Hesap açılmaz · Kendi hızında öğren","No prior knowledge · No account · Learn at your own pace")}</p></div><div class="hero-visual"><span class="visual-label">${L("Bir örnek, üç soru","One example, three questions")}</span><h2>${L("Çalışan ayrıldı.<br>Hesabı hâlâ açık.","An employee left.<br>The account is still active.")}</h2><div class="flow-item"><span class="flow-number">01</span><div><strong>${L("RİSK","RISK")}</strong><p>${L("Eski çalışan şirket verilerine erişebilir.","The former employee can still reach company data.")}</p></div></div><div class="flow-item"><span class="flow-number">02</span><div><strong>${L("KONTROL","CONTROL")}</strong><p>${L("Ayrılışta erişim kapatılır ve doğrulanır.","Access is removed at exit and verified.")}</p></div></div><div class="flow-item"><span class="flow-number">03</span><div><strong>${L("KANIT","EVIDENCE")}</strong><p>${L("Kapatma zamanı sistem kaydından kontrol edilir.","The removal time is checked in the system log.")}</p></div></div><div class="flow-bottom"><span class="pill dark">${L("İlk ders","First lesson")}</span> ${L("Denetimin mantığı tam burada başlıyor.","This is where audit logic begins.")}</div></div></section>
    <div class="stats"><div class="stat"><strong>${count}</strong><span>${L("Açıklamalı COBIT kontrol uygulaması","Annotated COBIT control practices")}</span></div><div class="stat"><strong>${isoRef.controls.length || 93}</strong><span>${L("ISO 27002 kontrolüyle köprü","ISO 27002 controls bridged")}</span></div><div class="stat"><strong>12</strong><span>${L("Sıfırdan adım adım ders","Step-by-step lessons from zero")}</span></div><div class="stat"><strong>${bank().length || 100}</strong><span>${L("Sertifika tarzı sınav sorusu","Certification-style exam questions")}</span></div></div>
    <section class="catalog-feature"><div><div class="section-label">${L("IT denetçisi için","For IT auditors")}</div><h2>${L(`${count} kontrol. Beklenti, test ve kanıt tek yerde.`,`${count} controls. Expectation, test and evidence in one place.`)}</h2><p>${L("ISO 27002'deki gibi her COBIT 2019 yönetim uygulamasının açıklaması: denetçi ne görmeyi bekler, tasarım ve işleyiş nasıl test edilir, hangi kanıt istenir, hangi bulgular sık çıkar ve hangi ISO 27001/27002 maddesiyle ilişkilidir.","Like ISO 27002, every COBIT 2019 management practice explained: what the auditor expects to see, how to test design and operating effectiveness, which evidence to request, which findings are typical and how it relates to ISO 27001/27002.")}</p><div class="actions"><a class="button" href="#kontroller">${L("Kontrol kataloğunu aç →","Open the control catalog →")}</a><a class="button secondary" href="#iso27002">${L("ISO 27001/27002 köprüsü","ISO 27001/27002 bridge")}</a></div></div><div class="feature-points"><div><strong>${L("Denetçi beklentisi","Auditor expectation")}</strong><span>${L("İyi yönetilen kurumda görülmesi beklenen durum","What a well-run organization should be able to show")}</span></div><div><strong>TOD + TOE</strong><span>${L("Tasarım ve dönem boyunca işleyiş testi","Test of design and of operating effectiveness")}</span></div><div><strong>${L("ITGC görünümü","ITGC view")}</strong><span>${L("Erişim, değişiklik, operasyon ve SDLC filtreleri","Access, change, operations and SDLC filters")}</span></div><div><strong>${L("Excel'e aktar","Export to Excel")}</strong><span>${L("Sonuç ve not sütunlu denetim programı","Audit program with result and note columns")}</span></div></div></section>
    ${progressPanel()}<section><div class="section-head"><div><div class="section-label">${L("Önce anla","Understand first")}</div><h2>${L("Küçük adımlar. Gerçek bağlantılar.","Small steps. Real connections.")}</h2><p>${L("Her derste sade anlatım, çözülmüş örnek ve cevabını karşılaştırabileceğin bir alıştırma var.","Each lesson has a plain explanation, a worked example and an exercise you can compare with a model answer.")}</p></div><a class="text-link" href="#dersler">${L("12 dersin tamamı →","All 12 lessons →")}</a></div><div class="grid">${data.lessons.slice(0,3).map(lessonCard).join("")}</div></section>
    <section><div class="section-head"><div><div class="section-label">${L("Sonra uygula","Then apply")}</div><h2>${L("Bir denetçi gibi düşün.","Think like an auditor.")}</h2><p>${L("Koddan önce iş riskini anla. Sonra kontrolü, kanıtı ve sonucu birbirine bağla.","Understand the business risk before the code. Then connect control, evidence and conclusion.")}</p></div></div><div class="grid"><article class="card"><span class="pill">${L("Keşfet","Explore")}</span><h3 style="margin-top:18px"><a href="#hedefler">${L("40 hedefin sade haritası","A plain map of the 40 objectives")}</a></h3><p>${L("Her hedef ne işe yarar? Denetçi hangi soruyu sorar? Hangi kanıta bakabilir?","What is each objective for? What does the auditor ask? Which evidence can be reviewed?")}</p></article><article class="card"><span class="pill">${L("İncele","Examine")}</span><h3 style="margin-top:18px"><a href="#denetim">${L("Kanıttan sonuca giden yol","From evidence to conclusion")}</a></h3><p>${L("Erişimden sürekliliğe: risk, kontrol, güvenli test adımları ve kırmızı bayraklar.","From access to continuity: risk, control, safe test steps and red flags.")}</p></article><article class="card"><span class="pill">${L("Pekiştir","Practice")}</span><h3 style="margin-top:18px"><a href="#vakalar">${L("Kurgusal şirket, gerçek düşünme","Fictional company, real thinking")}</a></h3><p>${L("Açık hesap, üretim kesintisi ve mükerrer ödeme vakalarını çöz, örnek çözümle karşılaştır.","Solve the orphan account, production outage and duplicate payment cases, then compare with model solutions.")}</p></article></div></section>
    <div class="notice"><strong>${L("Bu bir başlangıç ve uygulama atölyesi.","This is a foundation and practice workshop.")}</strong> ${L("COBIT'in temel kavramları ve 40 hedefin tamamı burada yer alır; resmî kitapların uygulama ve aktivite metinlerini yeniden üretmez. Sertifikasyon, teknik standart veya mesleki görüşün yerine geçmez.","It covers the core COBIT concepts and all 40 objectives; it does not reproduce the official publications' practice and activity texts. It does not replace certification, technical standards or professional judgment.")} <a href="#kaynaklar">${L("Kapsam ve kaynakları oku.","Read scope and sources.")}</a></div>`;
  }
  function lessonIndex() {
    main.innerHTML = `${fallbackNotice()}${intro(L("Öğrenme yolu","Learning path"),L("Nereden başlayacağını biliyorsun.","You know where to start."),L("İlk dersten sırayla ilerle. Önce işin mantığını öğren, sonra hedefleri ve denetim yaklaşımını birleştir. Toplam okuma ve alıştırma süresi yaklaşık 4–6 saat; denetim rehberleri ayrıca çalışılabilir.","Work through the lessons in order. Learn the logic first, then connect the objectives with the audit approach. Reading and exercises take about 4–6 hours; the audit guides can be studied separately."))}${progressPanel()}<div class="grid">${data.lessons.map(lessonCard).join("")}</div>`;
  }
  function exercise(key, question, answer) {
    return `<section class="exercise"><h2>${L("Şimdi sen dene","Now you try")}</h2><p>${escape(question)}</p><label for="answer-${escape(key)}">${L("Kendi cevabın","Your answer")}</label><textarea id="answer-${escape(key)}" data-note="${escape(key)}" placeholder="${escape(L("Kendi cümlelerinle yaz. Gerçek şirket veya kişisel bilgi ekleme.","Write in your own words. Do not add real company or personal information."))}">${escape(Object.hasOwn(state.notes,key) ? state.notes[key] : "")}</textarea><p class="privacy-hint">${L("Otomatik kayıt yalnızca bu tarayıcıya yapılır; sunucuya gönderilmez. Ortak bilgisayarda hassas bilgi yazma. Yerel kayıtların yönetimi kaynaklar sayfasındadır.","Autosave stays in this browser only; nothing is sent to a server. Avoid sensitive information on shared computers. Manage local records on the sources page.")}</p><p class="save-status" id="status-${escape(key)}" role="status"></p><details><summary>${L("Örnek cevabı göster","Show model answer")}</summary><p>${escape(answer)}</p></details></section>`;
  }
  function sidebar(activeId) {
    return `<aside class="sidebar"><h2>${L("12 adımda öğren","Learn in 12 steps")}</h2><p class="small">${L(`${state.completed.length} / 12 tamamlandı`,`${state.completed.length} / 12 completed`)}</p><ol>${data.lessons.map(lesson => `<li><a href="#ders/${lesson.id}"${lesson.id === activeId ? ' class="active" aria-current="page"' : ""}>${escape(lesson.title)}</a></li>`).join("")}</ol><a class="small" href="#dersler">${L("Tüm dersleri gör →","See all lessons →")}</a></aside>`;
  }
  function lessonView(requestedId) {
    const index = data.lessons.findIndex(lesson => lesson.id === requestedId);
    if (index < 0) return notFound();
    const lesson = data.lessons[index];
    /* Use the trusted id from the dataset, never the raw URL fragment, when building HTML. */
    const id = lesson.id;
    const complete = state.completed.includes(id);
    main.innerHTML = `${fallbackNotice()}<a class="back" href="#dersler">← ${L("Öğrenme yolu","Learning path")}</a><div class="split"><article class="article">${intro(L(`Ders ${index + 1} / 12`,`Lesson ${index + 1} / 12`),lesson.title,lesson.summary)}<div class="reading-meta"><span class="pill">${escape(lesson.level)}</span><span class="pill">${L(`${lesson.time} dakika + kendi hızın`,`${lesson.time} minutes + your own pace`)}</span></div><p>${escape(lesson.intro)}</p>${lesson.sections.map(section => `<section><h2>${escape(section.title)}</h2>${section.text ? `<p>${escape(section.text)}</p>` : ""}${section.bullets ? list(section.bullets) : ""}</section>`).join("")}<section class="example"><div class="example-label">${L("Birlikte çözelim","Worked example")}</div><h3>${escape(lesson.example.title)}</h3><p>${escape(lesson.example.story)}</p>${list(lesson.example.steps,true)}</section><div class="notice"><strong>${L("Akılda kalsın:","Remember:")}</strong> ${escape(lesson.takeaway)}</div><div class="notice purple"><strong>${L("IT denetçisi gözlüğü:","IT auditor's lens:")}</strong> ${escape(lesson.audit)}</div>${exercise("lesson-"+id,lesson.exercise.question,lesson.exercise.answer)}<p class="small" style="margin-top:22px">${L("Dayanak:","Basis:")} ${escape(lesson.source)} <a href="#kaynaklar">${L("Kaynaklar","Sources")}</a></p><div class="actions"><button type="button" class="button ${complete ? "success" : ""}" data-action="complete" data-id="${id}" aria-pressed="${complete}">${complete ? L("✓ Tamamlandı · işareti kaldır","✓ Completed · undo") : L("Bu dersi tamamladım","Mark lesson as completed")}</button>${printButton()}</div><div class="lesson-nav">${index ? `<a class="button secondary" href="#ders/${data.lessons[index-1].id}">← ${L("Önceki ders","Previous lesson")}</a>` : `<a class="button secondary" href="#dersler">${L("Ders listesi","Lesson list")}</a>`}${index < data.lessons.length-1 ? `<a class="button" href="#ders/${data.lessons[index+1].id}">${L("Sonraki ders","Next lesson")} →</a>` : `<a class="button" href="#vakalar">${L("Vakalarla uygula","Apply with cases")} →</a>`}</div></article>${sidebar(id)}</div>`;
    document.title = `${lesson.title} — ${brand()}`;
  }
  function objectivesView(code) {
    activeDomain = "ALL";
    main.innerHTML = `${fallbackNotice()}${intro(L("Tam harita","Full map"),L("40 hedef. Anlaşılır bir dil.","40 objectives. Plain language."),L("Önce alanı seç; sonra her hedefin ne işe yaradığını, denetçi sorusunu ve örnek kanıtını keşfet. Türkçe başlıklar açıklayıcıdır; resmî çeviri değildir.","Pick a domain, then see what each objective is for, the auditor's question and example evidence. Plain-language titles are explanatory, not official names."))}<div class="notice">${L("Kodları sırayla ezberleme. Önce <strong>hangi iş sorununu</strong> çözmek istediğini düşün. Kanıt örnekleri eksiksiz liste veya zorunlu kontrol kriteri değildir.","Don't memorize codes in order. First ask <strong>which business problem</strong> you are solving. Evidence examples are neither complete lists nor mandatory criteria.")}</div><div class="toolbar"><div class="field"><label for="objective-search">${L("Hedef adı, kod veya konuyla ara","Search by name, code or topic")}</label><input id="objective-search" type="search" placeholder="${escape(L("Örneğin: erişim, süreklilik, BAI06","For example: access, continuity, BAI06"))}" value="${escape(code || "")}"></div></div><div class="filter-group" role="group" aria-label="${L("Hedef alanı","Domain")}">${["ALL",...Object.keys(data.domains)].map(domain => `<button type="button" class="filter" data-domain="${domain}" aria-pressed="${domain === "ALL"}">${domain === "ALL" ? L("Tümü · 40","All · 40") : `${domain} · ${escape(data.domains[domain].name)}`}</button>`).join("")}</div><p id="objective-count" class="result-count" role="status"></p><div id="objective-results" class="grid"></div>`;
    updateObjectives();
  }
  function updateObjectives() {
    const query = fold(document.getElementById("objective-search").value);
    const results = data.objectives.filter(item => (activeDomain === "ALL" || item[0].startsWith(activeDomain)) && fold(item.join(" ")).includes(query));
    document.getElementById("objective-count").textContent = L(`${results.length} / 40 hedef gösteriliyor`,`Showing ${results.length} / 40 objectives`);
    document.getElementById("objective-results").innerHTML = results.length ? results.map(([code,title,english,meaning,question,evidence]) => `<article class="card objective"><div class="card-meta"><span class="objective-code">${code}</span><span class="pill">${escape(data.domains[code.slice(0,3)].kind)}</span></div><h3>${escape(title)}</h3><p class="small">${escape(english)}</p><p>${escape(meaning)}</p><p class="question">${L("Denetçi sorusu:","Auditor's question:")} ${escape(question)}</p><details><summary>${L("Hangi kanıtlara bakılabilir?","Which evidence can be reviewed?")}</summary><p>${escape(evidence)}</p><a href="#denetim">${L("Test rehberlerine git →","Go to the audit guides →")}</a></details><a class="small" href="#kontrol/${code}">${L("Bu hedefin kontrollerini aç →","Open this objective's controls →")}</a></article>`).join("") : `<p class="empty">${L("Bu aramada hedef bulunamadı. Aramayı kısalt veya başka bir alan seç.","No objective matches. Shorten the search or choose another domain.")}</p>`;
  }
  function auditIndex() {
    main.innerHTML = `${fallbackNotice()}${intro(L("IT denetçisi yolu","IT auditor path"),L("Sorudan kanıta, kanıttan sonuca.","From question to evidence to conclusion."),L("Bir kontrolün nasıl denetleneceğini 8 konuda gör. Her rehber iş örneği, risk, kontrol, kanıt listesi, güvenli test akışı ve karşılaştırmalı alıştırma içerir.","See how a control is audited across 8 topics. Each guide includes a business example, risk, control, evidence list, safe test steps and an exercise with a model answer."))}<div class="notice warning"><strong>${L("Bu bir otomatik denetim programı değil.","This is not an automated audit program.")}</strong> ${L("Kontrol süreleri ve testler eğitim örnekleridir; kurumun kriterine ve riskine uyarlanır. Üretimde işlem, tarama veya değişiklik için açık yetki ve güvenli plan gerekir. Örneklem için evrensel bir sabit sayı yoktur.","Control timings and tests are teaching examples; tailor them to the organization's criteria and risk. Transactions, scans or changes in production require explicit authorization and a safe plan. There is no universal fixed sample size.")}</div><div class="grid">${programs.map((program,index) => `<article class="card"><div class="card-meta"><span class="number">${L("REHBER","GUIDE")} ${String(index+1).padStart(2,"0")}</span><span class="pill">${L("Pratik","Practical")}</span></div><h3><a href="#denetim/${escape(program.id)}">${escape(program.title)}</a></h3><p>${escape(program.subtitle)}</p><div>${pills(program.objectives)}</div><div class="card-foot"><span>${L("Kanıt + test + örnek","Evidence + test + example")}</span><a href="#denetim/${escape(program.id)}">${L("İncele →","Open →")}</a></div></article>`).join("")}</div>`;
  }
  function auditView(requestedId) {
    const program = programs.find(item => item.id === requestedId);
    if (!program) return notFound();
    const id = program.id;
    main.innerHTML = `${fallbackNotice()}<a class="back" href="#denetim">← ${L("Tüm denetim rehberleri","All audit guides")}</a><article class="article">${intro(L("Pratik denetim rehberi","Practical audit guide"),program.title,program.subtitle)}<div class="reading-meta">${pills(program.objectives)}</div><div class="example"><div class="example-label">${L("İş yerinde bir gün","A day at work")}</div><p style="margin-top:12px">${escape(program.story)}</p></div><h2>${L("1. Ne ters gidebilir?","1. What can go wrong?")}</h2><p>${escape(program.risk)}</p><h2>${L("2. Nasıl bir kontrol bekleriz?","2. What control do we expect?")}</h2><p>${escape(program.control)}</p><div class="notice">${L("Bu kontrol açıklaması eğitim örneğidir. Gerçek kriteri politika, sözleşme, mevzuat ve kararlaştırılmış risk yaklaşımıyla netleştir.","This control description is a teaching example. Define the real criterion from policy, contract, regulation and the agreed risk approach.")}</div><h2>${L("3. Hangi kanıtları isteriz?","3. Which evidence do we request?")}</h2>${list(program.evidence)}<h2>${L("4. Nasıl test edebiliriz?","4. How can we test it?")}</h2>${list(program.steps,true)}<h2>${L("5. Neler dikkatini çekmeli?","5. What should catch your attention?")}</h2>${list(program.redFlags)}<div class="notice warning"><strong>${L("Kırmızı bayrak bulgu değildir.","A red flag is not a finding.")}</strong> ${L("Araştırma sinyalidir; sonucu doğrulanmış kanıt ve iş etkisiyle değerlendir.","It is a signal to investigate; conclude only on verified evidence and business impact.")}</div><h2>${L("6. Örnek bulgu nasıl görünür?","6. What does a sample finding look like?")}</h2><p>${escape(program.sampleFinding)}</p><h2>${L("7. Sınırları unutma","7. Remember the limits")}</h2><p>${escape(program.limits)}</p>${exercise("audit-"+id,program.exercise.question,program.exercise.answer)}<p class="small" style="margin-top:20px">${L("Özgün eğitim programı; tam resmî COBIT testi veya hukuki görüş değildir.","Original teaching program; not an official COBIT test or legal opinion.")} <a href="#kaynaklar">${L("Dayanak ve sınırlar","Basis and limits")}</a></p>${printButton()}</article>`;
    document.title = `${program.title} — ${brand()}`;
  }
  function casesIndex() {
    main.innerHTML = `${fallbackNotice()}${intro(L("Uygulama masası","Practice desk"),L("Önce sen çöz. Sonra karşılaştır.","Solve it first. Then compare."),L("Üç kurgusal vaka, öğrendiklerini tek bir düşünce zincirine bağlar. Gerçek şirket bilgisi kullanmadan risk, kriter, kontrol, kanıt ve sonuç yazmayı dene.","Three fictional cases connect what you learned into one line of reasoning. Practice writing risk, criterion, control, evidence and conclusion without real company data."))}<div class="grid">${data.cases.map(item => `<article class="card"><div class="card-meta"><span class="pill">${escape(item.tag)}</span><span class="small">${item.time}–${item.time+15} ${L("dk","min")}</span></div><h3><a href="#vaka/${item.id}">${escape(item.title)}</a></h3><p>${escape(item.story.slice(0,160))}…</p><div class="card-foot"><span>${L("Örnek çözüm + rubrik","Model solution + rubric")}</span><a href="#vaka/${item.id}">${L("Vakayı çöz →","Solve the case →")}</a></div></article>`).join("")}</div>`;
  }
  function caseView(requestedId) {
    const item = data.cases.find(entry => entry.id === requestedId);
    if (!item) return notFound();
    const id = item.id;
    main.innerHTML = `${fallbackNotice()}<a class="back" href="#vakalar">← ${L("Vaka listesi","Case list")}</a><article class="article">${intro(L("Kurgusal vaka","Fictional case"),item.title,L("Gerçek bir denetim raporu değil; düşünme ve yazma pratiği.","Not a real audit report; practice in thinking and writing."))}<div class="reading-meta"><span class="pill">${escape(item.tag)}</span>${pills(item.links)}</div><div class="example"><div class="example-label">${L("Vaka dosyası","Case file")}</div><p style="margin-top:12px">${escape(item.story)}</p></div><h2>${L("Görevin","Your task")}</h2>${list(item.tasks,true)}${exercise("case-"+id,L("Görevleri sırayla cevapla. Bilinmeyen bilgileri uydurmak yerine varsayım veya ek kanıt ihtiyacı olarak belirt.","Answer the tasks in order. Instead of inventing unknown facts, state them as assumptions or additional evidence needs."),L("Aşağıdaki ayrıntılı örnek çözümle karşılaştır. Tek bir doğru metin yok; gerekçe ve kanıt bağlantısı önemli.","Compare with the detailed model solution below. There is no single correct wording; reasoning and the link to evidence matter."))}<details><summary>${L("Ayrıntılı örnek çözümü aç","Open the detailed model solution")}</summary>${list(item.solution,true)}</details><h2>${L("Kendini değerlendir","Assess yourself")}</h2><p>${L("Dört başlığın her birine 0–3 puan ver: 0 = yok/temelden hatalı; 1 = kısmen doğru ama önemli eksik var; 2 = doğru, küçük eksik var; 3 = gerekçeli ve tam.","Score each of the four dimensions 0–3: 0 = missing/fundamentally wrong; 1 = partly right with a major gap; 2 = right with a minor gap; 3 = complete and well reasoned.")}</p>${list(item.rubric)}<div class="notice">${L("Toplam 12 üzerinden 9, bu sitenin öğrenme hedefidir; resmî değerlendirme puanı değildir. Eksik boyut için ilgili derse dön, metnini yeniden yaz.","9 out of 12 is this site's learning target, not an official grade. Revisit the related lesson for any weak dimension and rewrite your answer.")}</div>${printButton()}</article>`;
    document.title = `${item.title} — ${brand()}`;
  }
  const EXAM_TOPICS = ["foundations","performance","objectives","audit","itgc","iso"];
  const SECONDS_PER_QUESTION = 90;
  const PASS_TARGET = 65;
  const letters = ["A","B","C","D"];
  const bank = () => Array.isArray(window.EXAM_BANK) ? window.EXAM_BANK : [];
  const qText = item => item[lang] || item.tr;
  const topicLabel = key => ({foundations:L("COBIT temelleri","COBIT foundations"), performance:L("Performans, uygulama ve yönetişim","Performance, implementation and governance"), objectives:L("Yönetim hedefleri","Management objectives"), audit:L("IT denetim süreci","IT audit process"), itgc:L("ITGC ve uygulama kontrolleri","ITGC and application controls"), iso:"ISO/IEC 27001 / 27002"})[key] || key;
  const levelLabel = level => [L("Hatırlama","Recall"), L("Uygulama","Application"), L("Senaryo","Scenario")][Math.max(0, Math.min(2, (level || 2) - 1))];
  const shuffle = items => { const copy = items.slice(); for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; };
  const formatTime = ms => { const total = Math.max(0, Math.ceil(ms / 1000)); const h = Math.floor(total / 3600); const m = Math.floor((total % 3600) / 60); const s = total % 60; return (h ? `${h}:${String(m).padStart(2,"0")}` : String(m)) + `:${String(s).padStart(2,"0")}`; };
  let exam = null;
  let examTimer = null;
  function routeLabel(route) {
    const [kind, first, second] = String(route).split("/");
    if (kind === "ders") { const lesson = data.lessons.find(item => item.id === first); return lesson ? lesson.title : L("İlgili ders","Related lesson"); }
    if (kind === "kontrol") return `COBIT ${second || first}`;
    if (kind === "iso27001") return `ISO/IEC 27001 ${clauseLabel()} ${first}`;
    if (kind === "iso27002") return `ISO/IEC 27002 ${first}`;
    if (kind === "denetim") { const program = programs.find(item => item.id === first); return program ? program.title : L("Denetim rehberi","Audit guide"); }
    return L("İlgili konu","Related topic");
  }
  function stopTimer() { if (examTimer) { clearInterval(examTimer); examTimer = null; } }
  function startTimer() {
    stopTimer();
    if (exam && exam.deadline) examTimer = setInterval(tick, 1000);
  }
  function tick() {
    if (!exam || exam.finishedAt) return stopTimer();
    const left = exam.deadline - Date.now();
    const element = document.getElementById("exam-timer");
    if (element) {
      element.textContent = formatTime(left);
      element.classList.toggle("low", left < 5 * 60 * 1000);
    }
    if (left <= 0) { exam.timeout = true; finishExam(); }
  }
  function finishExam() {
    exam.finishedAt = Date.now();
    stopTimer();
    if (location.hash.slice(1).split("/")[0] === "test") { examResults(); main.focus({preventScroll:true}); window.scrollTo(0,0); }
  }
  function quizView() {
    if (!exam) return examSetup();
    if (exam.finishedAt) return examResults();
    examQuestion();
  }
  function examSetup() {
    const all = bank();
    if (!all.length) { main.innerHTML = intro(L("Sınav simülatörü","Exam simulator"), L("Soru bankası yüklenemedi.","The question bank could not be loaded."), L("exam-*.js dosyalarının index.html ile aynı klasörde olduğunu kontrol et.","Check that exam-*.js files are next to index.html.")); return; }
    const count = topic => all.filter(item => item.topic === topic).length;
    main.innerHTML = `${fallbackNotice()}${intro(L("Sınav simülatörü","Exam simulator"), L("Sertifika sınavı gibi çalış.","Practice like a certification exam."), L(`${all.length} özgün soru: dört seçenek, tek en iyi cevap ve her soruda gerekçeli açıklama. COBIT 2019 Foundation ve CISA tarzında yazıldı; gerçek sınav sorusu değildir.`,`${all.length} original questions: four options, one best answer and a reasoned explanation for each. Written in the style of COBIT 2019 Foundation and CISA; these are not real exam questions.`))}
    <form id="exam-setup" class="exam-setup"><fieldset class="card"><legend>${L("1. Konular","1. Topics")}</legend>${EXAM_TOPICS.filter(topic => count(topic)).map(topic => `<label class="check"><input type="checkbox" name="topic" value="${topic}" checked><span>${escape(topicLabel(topic))}</span><small>${count(topic)} ${L("soru","questions")}</small></label>`).join("")}</fieldset>
    <fieldset class="card"><legend>${L("2. Soru sayısı","2. Number of questions")}</legend>${[10,25,50,"all"].map(value => `<label class="check"><input type="radio" name="count" value="${value}" ${value === 25 ? "checked" : ""}><span>${value === "all" ? L("Tümü","All") : value}</span><small>${value === "all" ? L("seçili konulardaki tüm sorular","every question in the selected topics") : L(`yaklaşık ${Math.round(value * SECONDS_PER_QUESTION / 60)} dakika`,`about ${Math.round(value * SECONDS_PER_QUESTION / 60)} minutes`)}</small></label>`).join("")}</fieldset>
    <fieldset class="card"><legend>${L("3. Mod","3. Mode")}</legend><label class="check"><input type="radio" name="mode" value="exam" checked><span>${L("Sınav modu","Exam mode")}</span><small>${L(`Soru başına ${SECONDS_PER_QUESTION} saniye süre, soru işaretleme, sonuçlar sonda`,`${SECONDS_PER_QUESTION} seconds per question, flag for review, results at the end`)}</small></label><label class="check"><input type="radio" name="mode" value="practice"><span>${L("Alıştırma modu","Practice mode")}</span><small>${L("Süre yok, her sorudan sonra cevap ve açıklama","No timer, answer and explanation after each question")}</small></label></fieldset>
    <div class="actions"><button type="submit" class="button">${L("Sınavı başlat →","Start the exam →")}</button></div><p id="exam-setup-error" class="form-error" role="alert"></p></form>
    <div class="notice"><strong>${L("Sınav taktiği:","Exam technique:")}</strong> ${L("Her soruda tek bir EN İYİ cevap vardır. “EN İYİ”, “İLK”, “EN ÖNEMLİ”, “BİRİNCİL” gibi kelimeler cevabı belirler. Birden fazla seçenek doğru görünebilir; riski en doğrudan karşılayan, yetki ve bağımsızlığa uygun olanı seç. Sorular ve seçenekler her denemede karışır.","Each question has one BEST answer. Words like BEST, FIRST, MOST and PRIMARY decide the answer. Several options may look correct; choose the one that addresses the risk most directly and respects authority and independence. Questions and options are shuffled on every attempt.")}</div>
    <p class="small">${L(`%${PASS_TARGET} bu sitenin hedef puanıdır; herhangi bir resmî sınavın geçme notu veya puanlama yöntemi değildir. Cevaplar kaydedilmez.`,`${PASS_TARGET}% is this site's target score, not the pass mark or scoring method of any official exam. Answers are not stored.`)}</p>`;
  }
  function startExam(form, items, mode) {
    let selection = items;
    let chosenMode = mode;
    if (!selection) {
      const topics = [...form.querySelectorAll('input[name="topic"]:checked')].map(input => input.value);
      if (!topics.length) { document.getElementById("exam-setup-error").textContent = L("En az bir konu seç.","Select at least one topic."); return; }
      const pool = bank().filter(item => topics.includes(item.topic));
      const countValue = form.querySelector('input[name="count"]:checked').value;
      selection = shuffle(pool).slice(0, countValue === "all" ? pool.length : Math.min(Number(countValue), pool.length));
      chosenMode = form.querySelector('input[name="mode"]:checked').value;
    }
    const now = Date.now();
    exam = {mode:chosenMode, items:selection.map(question => ({q:question, order:shuffle([0,1,2,3])})), answers:{}, checked:{}, flags:new Set(), current:0, startedAt:now, deadline:chosenMode === "exam" ? now + selection.length * SECONDS_PER_QUESTION * 1000 : null, finishedAt:null, timeout:false};
    startTimer();
    examQuestion();
    focusQuestion();
  }
  function focusQuestion() {
    const legend = main.querySelector(".exam-card legend");
    if (legend) { legend.focus({preventScroll:true}); main.querySelector(".exam-bar").scrollIntoView({block:"nearest"}); }
  }
  function examQuestion(confirming = false) {
    const index = exam.current;
    const item = exam.items[index];
    const text = qText(item.q);
    const answer = exam.answers[index];
    const checked = exam.mode === "practice" && exam.checked[index];
    const total = exam.items.length;
    const answeredCount = Object.keys(exam.answers).length;
    const unanswered = total - answeredCount;
    const flagged = exam.flags.has(index);
    const optionClass = original => !checked ? "" : original === item.q.correct ? " correct" : original === answer ? " incorrect" : "";
    main.innerHTML = `<div class="exam-bar"><div><span class="pill">${exam.mode === "exam" ? L("Sınav modu","Exam mode") : L("Alıştırma modu","Practice mode")}</span> <strong>${L(`Soru ${index + 1} / ${total}`,`Question ${index + 1} of ${total}`)}</strong> <span class="small">· ${L(`${answeredCount} cevaplandı`,`${answeredCount} answered`)}</span></div>${exam.deadline ? `<div class="exam-clock" aria-live="off">${L("Kalan süre","Time left")} <span id="exam-timer" class="exam-timer">${formatTime(exam.deadline - Date.now())}</span></div>` : ""}<button type="button" class="button secondary print-button" data-action="exam-finish">${L("Sınavı bitir","Finish exam")}</button></div>
    <div class="progress-track" role="progressbar" aria-label="${L("Cevaplanan sorular","Answered questions")}" aria-valuenow="${answeredCount}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-fill" style="width:${answeredCount / total * 100}%"></div></div>
    ${confirming ? `<div class="notice warning" id="finish-confirm"><strong>${L(`${unanswered} soru boş.`,`${unanswered} question(s) unanswered.`)}</strong> ${L("Boş sorular yanlış sayılır. Yine de bitirmek istiyor musun?","Unanswered questions count as incorrect. Finish anyway?")}<div class="actions"><button type="button" class="button" data-action="exam-finish-confirm">${L("Evet, bitir","Yes, finish")}</button><button type="button" class="button secondary" data-action="exam-finish-cancel">${L("Sınava dön","Back to the exam")}</button></div></div>` : ""}
    <section class="exam-card quiz-card"><div class="card-meta"><span><span class="pill">${escape(topicLabel(item.q.topic))}</span> <span class="small">${escape(levelLabel(item.q.level))}</span></span>${flagged ? `<span class="tag itgc">⚑ ${L("İşaretli","Flagged")}</span>` : ""}</div><fieldset><legend tabindex="-1">${index + 1}. ${escape(text.q)}</legend>${item.order.map((original, position) => `<label class="option${optionClass(original)}"><input type="radio" name="exam-option" value="${original}" ${answer === original ? "checked" : ""} ${checked ? "disabled" : ""}><span class="letter">${letters[position]}</span><span>${escape(text.a[original])}</span></label>`).join("")}</fieldset>
    ${checked ? `<div class="quiz-feedback ${answer === item.q.correct ? "" : "wrong"}"><strong>${answer === item.q.correct ? L("✓ Doğru","✓ Correct") : L("✗ Yanlış","✗ Incorrect")} · ${L("Doğru cevap:","Correct answer:")} ${letters[item.order.indexOf(item.q.correct)]}</strong>${escape(text.why)} <a href="#${escape(item.q.link)}">${escape(routeLabel(item.q.link))} →</a></div>` : ""}
    <div class="actions exam-actions"><button type="button" class="button secondary" data-action="exam-prev" ${index === 0 ? "disabled" : ""}>← ${L("Önceki","Previous")}</button><button type="button" class="button secondary" data-action="exam-flag" aria-pressed="${flagged}">⚑ ${flagged ? L("İşareti kaldır","Unflag") : L("Sonra bakmak için işaretle","Flag for review")}</button>${exam.mode === "practice" && answer !== undefined && !checked ? `<button type="button" class="button" data-action="exam-check">${L("Cevabı kontrol et","Check answer")}</button>` : ""}${index < total - 1 ? `<button type="button" class="button${exam.mode === "practice" && answer !== undefined && !checked ? " secondary" : ""}" data-action="exam-next">${L("Sonraki","Next")} →</button>` : `<button type="button" class="button" data-action="exam-finish">${L("Sınavı bitir","Finish exam")}</button>`}</div></section>
    <nav class="palette" aria-label="${L("Soru listesi","Question list")}">${exam.items.map((_, position) => { const states = [exam.answers[position] !== undefined ? L("cevaplandı","answered") : L("boş","unanswered"), exam.flags.has(position) ? L("işaretli","flagged") : ""].filter(Boolean).join(", "); return `<button type="button" data-goto="${position}" class="${exam.answers[position] !== undefined ? "answered" : ""}${exam.flags.has(position) ? " flagged" : ""}${position === index ? " current" : ""}" aria-label="${L(`Soru ${position + 1}`,`Question ${position + 1}`)}, ${states}" ${position === index ? 'aria-current="step"' : ""}>${position + 1}</button>`; }).join("")}</nav>
    <p class="small">${L("Gösterge: koyu = cevaplandı, turuncu çerçeve = işaretli. Klavyeyle seçenekler arasında ok tuşlarıyla gezinebilirsin.","Legend: dark = answered, orange outline = flagged. Use arrow keys to move between options.")}</p>`;
  }
  function examResults() {
    const total = exam.items.length;
    const results = exam.items.map((item, index) => ({item, index, answer:exam.answers[index], correct:exam.answers[index] === item.q.correct}));
    const score = results.filter(result => result.correct).length;
    const percent = Math.round(score / total * 100);
    const topics = EXAM_TOPICS.map(topic => { const subset = results.filter(result => result.item.q.topic === topic); return {topic, total:subset.length, correct:subset.filter(result => result.correct).length}; }).filter(row => row.total);
    const wrong = results.filter(result => !result.correct).length;
    main.innerHTML = `${intro(L("Sınav sonucu","Exam result"), L(`${score} / ${total} doğru · %${percent}`,`${score} / ${total} correct · ${percent}%`), exam.timeout ? L("Süre doldu; sınav otomatik olarak bitirildi.","Time ran out; the exam was submitted automatically.") : L(`Süre: ${formatTime(exam.finishedAt - exam.startedAt)}`,`Time used: ${formatTime(exam.finishedAt - exam.startedAt)}`))}
    <div class="quiz-result"><h2>${percent >= PASS_TARGET ? L("Hedefin üzerindesin.","Above the target.") : L("Hedefin altındasın; açıklamalardan öğren.","Below the target; learn from the explanations.")}</h2><p>${L(`Bu sitenin hedefi %${PASS_TARGET}. Resmî bir sınavın geçme notu veya puanlama yöntemi değildir.`,`This site's target is ${PASS_TARGET}%. It is not the pass mark or scoring method of any official exam.`)}</p><div class="actions">${wrong ? `<button type="button" class="button" data-action="exam-retry-wrong">${L(`Yanlış ve boş ${wrong} soruyu yeniden çöz`,`Retry the ${wrong} incorrect/unanswered`)}</button>` : ""}<button type="button" class="button secondary" data-action="exam-new">${L("Yeni sınav","New exam")}</button></div></div>
    <h2>${L("Konu bazında sonuç","Results by topic")}</h2><div class="table-wrap"><table><thead><tr><th>${L("Konu","Topic")}</th><th>${L("Doğru","Correct")}</th><th>%</th></tr></thead><tbody>${topics.map(row => `<tr><td>${escape(topicLabel(row.topic))}</td><td>${row.correct} / ${row.total}</td><td>${Math.round(row.correct / row.total * 100)}%</td></tr>`).join("")}</tbody></table></div>
    <div class="section-head"><div><h2>${L("Cevap incelemesi","Answer review")}</h2><p>${L("Her sorunun doğru cevabını, gerekçesini ve tekrar edilecek konuyu gör.","See the correct answer, reasoning and topic to revisit for each question.")}</p></div><div class="filter-group" role="group" aria-label="${L("İnceleme filtresi","Review filter")}"><button type="button" class="filter" data-review="all" aria-pressed="true">${L("Tümü","All")}</button><button type="button" class="filter" data-review="wrong" aria-pressed="false">${L("Yalnız yanlış/boş","Incorrect/unanswered only")}</button></div></div>
    <div id="review-list">${results.map(({item, index, answer, correct}) => { const text = qText(item.q); const yours = answer === undefined ? L("Boş","Unanswered") : `${letters[item.order.indexOf(answer)]}. ${text.a[answer]}`; return `<article class="quiz-card review-item${correct ? "" : " is-wrong"}"><div class="card-meta"><span><span class="pill">${escape(topicLabel(item.q.topic))}</span> <span class="small">${escape(item.q.id)}</span></span><strong class="${correct ? "complete-label" : "wrong-label"}">${correct ? L("✓ Doğru","✓ Correct") : L("✗ Yanlış","✗ Incorrect")}</strong></div><p><strong>${index + 1}. ${escape(text.q)}</strong></p><ol class="review-options" type="A">${item.order.map(original => `<li class="${original === item.q.correct ? "is-correct" : original === answer ? "is-chosen" : ""}">${escape(text.a[original])}</li>`).join("")}</ol><p class="small">${L("Senin cevabın:","Your answer:")} ${escape(yours)} · ${L("Doğru cevap:","Correct answer:")} ${letters[item.order.indexOf(item.q.correct)]}</p><div class="quiz-feedback ${correct ? "" : "wrong"}">${escape(text.why)} <a href="#${escape(item.q.link)}">${escape(routeLabel(item.q.link))} →</a></div></article>`; }).join("")}</div>`;
  }
  function glossaryView() {
    main.innerHTML = `${fallbackNotice()}${intro(L("Yanında dursun","Keep it handy"),L("Bir kelimeye mi takıldın?","Stuck on a term?"),L("Terimi arat, sade karşılığını gör. Aynı kelime farklı teknik bağlamlarda farklı anlam taşıyabilir; açıklamalar bu öğrenme yoluna göredir.","Search a term and see a plain explanation. The same word can mean different things in other technical contexts; definitions follow this learning path."))}<div class="toolbar"><div class="field"><label for="glossary-search">${L("Terim veya anlam ara","Search term or meaning")}</label><input id="glossary-search" type="search" placeholder="${escape(L("Örneğin: RPO, kanıt, örneklem","For example: RPO, evidence, sample"))}"></div></div><p id="glossary-count" class="result-count" role="status"></p><dl id="glossary-results" class="grid two-grid glossary"></dl>`;
    updateGlossary();
  }
  function updateGlossary() {
    const query = fold(document.getElementById("glossary-search").value);
    const entries = data.glossary.filter(entry => fold(entry.join(" ")).includes(query));
    document.getElementById("glossary-count").textContent = L(`${entries.length} terim`,`${entries.length} terms`);
    document.getElementById("glossary-results").innerHTML = entries.length ? entries.map(([term,meaning]) => `<div class="card"><dt>${escape(term)}</dt><dd>${escape(meaning)}</dd></div>`).join("") : `<div class="empty"><dt>${L("Terim bulunamadı","No term found")}</dt><dd>${L("Daha kısa veya farklı bir kelime dene.","Try a shorter or different word.")}</dd></div>`;
  }
  function sourcesView() {
    const repository = "https://github.com/Lucho-A/Auditing-COBIT-2019/blob/2bf07ea971855f97b21783369ca8e81331d071e9/";
    const link = (href, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    const sections = lang === "en" ? [
      ["What is here and what is not", `<p>An annotated control catalog covering ${practices.length} management practices, an ISO 27001/27002 bridge, 12 foundation lessons, short descriptions of the 40 objectives, 8 sample audit programs, 3 worked cases, ${data.glossary.length} glossary terms and ${bank().length} original certification-style exam questions (not real ISACA or ISO exam content). The official publications' practice descriptions, activity lists, capability levels, full mapping tables and a complete professional audit methodology are not included.</p><p>Practice codes and official English practice names are used to reference COBIT 2019. Plain-language titles, expectations, tests, evidence and finding examples are original audit notes written for this project (in Turkish and English); they are not ISACA text. ISO 27001/27002 mappings are indicative, not official mappings by ISACA or ISO/IEC. ISO standards are copyrighted by ISO/IEC; only control numbers and short titles are shown.</p><p>Example objective links and control timings must be validated for each organization. Scores on this site are for learning only; they are not capability ratings, certifications or compliance results.</p>`],
      ["Primary sources", `<ul class="source-list"><li>${link("https://www.isaca.org/resources/cobit","ISACA — COBIT resource center")}: check current publications and terms of use at the official source.</li><li>${link(repository+"COBIT-2019-Framework-Introduction-and-Methodology_res_eng_1118.pdf","COBIT 2019 Framework: Introduction and Methodology")}: chapter 1 scope; 3 principles; 4 concepts; 6 performance; 7 design; 8 implementation.</li><li>${link(repository+"COBIT-2019-Framework-Governance-and-Management-Objectives_res_eng_1118.pdf","COBIT 2019 Framework: Governance and Management Objectives")}: chapter 3 structure, objective chapters and mapping appendices.</li><li>${link("https://github.com/Lucho-A/Auditing-COBIT-2019/tree/2bf07ea971855f97b21783369ca8e81331d071e9","Reviewed third-party repository version")}: two PDFs and a MySQL collection; not an official ISACA repository.</li></ul>`],
      ["What the repository tells us", "<p>The reviewed SQL dump contains 2 area types, 5 domains, 40 objectives, 231 practices and 1,202 activity records. On its own it is not a complete COBIT implementation: its five tables do not hold activity capability levels or the other governance components. The counts do not mean every row was verified against the official publication.</p>"],
      ["Copyright and attribution", "<p>COBIT is a framework of ISACA; related names and publication rights belong to their owners. This site is not affiliated with or endorsed by ISACA. The publication PDFs and SQL dump are not distributed with this site, and the third-party repository's license is not read as a right to relicense ISACA publications. Explanations, cases, questions and test examples were written for this project; they are not a full translation or a substitute for the official publications.</p>"],
      ["Professional and legal limits", "<p>Generic teaching examples must be evaluated against the organization's risk, authority, legal and contractual context and audit methodology before use. A red flag alone is not evidence of fraud. Active testing, changes or transactions in production require explicit authorization and a safe plan. Do not enter real company or employee data in these exercises.</p>"],
      ["Privacy and local storage", "<p>The site uses no accounts, ads, analytics or external fonts. Lesson progress, exercise notes and your language choice are kept in this browser's local storage; the application does not send them to a server. Quiz answers live only in the open page's memory. Progress does not move between devices or site addresses. Local storage is not an encrypted vault.</p><p>Hosting providers such as GitHub Pages may process request data such as IP addresses under their own policies. External links are governed by the terms of those sites.</p>"]
    ] : [
      ["Burada ne var, ne yok?", `<p>${practices.length} yönetim uygulamasını kapsayan açıklamalı kontrol kataloğu, ISO 27001/27002 köprüsü, 12 temel ders, 40 hedefin kısa açıklaması, 8 örnek denetim programı, 3 çözümlemeli vaka, ${data.glossary.length} terim ve ${bank().length} özgün sertifika tarzı sınav sorusu var (gerçek ISACA veya ISO sınav içeriği değildir). Resmî kitapların uygulama açıklamaları, aktivite listeleri, yetkinlik seviyeleri, bütün eşleştirme tabloları veya eksiksiz mesleki denetim metodolojisi yok.</p><p>Kontrol kataloğunda uygulama kodları ve İngilizce uygulama adları COBIT 2019'a referans vermek için kullanılır. Türkçe ve İngilizce başlıklar, beklentiler, testler, kanıt ve bulgu örnekleri bu proje için özgün yazılmış denetim notlarıdır; ISACA metni değildir. ISO 27001/27002 eşleştirmeleri gösterge niteliğindedir; ISACA veya ISO/IEC'in resmî eşleştirmesi değildir. ISO standartlarının hakları ISO/IEC'e aittir; burada yalnızca kontrol numarası ve kısa başlık verilir.</p><p>Açıklayıcı başlıklar resmî çeviri iddiası taşımaz. Örnek hedef bağlantıları ve kontrol süreleri kuruma göre doğrulanmalıdır. Sitedeki puanlar öğrenme içindir; yetkinlik derecesi, sertifika veya kurumsal uygunluk sonucu değildir.</p>`],
      ["Birincil kaynaklar", `<ul class="source-list"><li>${link("https://www.isaca.org/resources/cobit","ISACA — COBIT kaynak merkezi")}: Güncel yayın ve kullanım koşullarını resmî kaynaktan kontrol et.</li><li>${link(repository+"COBIT-2019-Framework-Introduction-and-Methodology_res_eng_1118.pdf","COBIT 2019 Framework: Introduction and Methodology")}: Bölüm 1 kapsam; 3 ilkeler; 4 kavramlar; 6 performans; 7 tasarım; 8 uygulama.</li><li>${link(repository+"COBIT-2019-Framework-Governance-and-Management-Objectives_res_eng_1118.pdf","COBIT 2019 Framework: Governance and Management Objectives")}: Bölüm 3 yapı, ilgili hedef bölümleri ve eşleştirme ekleri.</li><li>${link("https://github.com/Lucho-A/Auditing-COBIT-2019/tree/2bf07ea971855f97b21783369ca8e81331d071e9","İncelenen üçüncü taraf repo sürümü")}: İki PDF ve MySQL kaynak koleksiyonu; resmî ISACA deposu değildir.</li></ul>`],
      ["Repo bize ne söylüyor?", "<p>İncelenen SQL dökümü 2 alan türü, 5 alan, 40 hedef, 231 uygulama ve 1.202 aktivite kaydı içeriyor. Tek başına eksiksiz COBIT uygulaması değil. Bu beş tabloda aktivite yetkinlik düzeyi ve diğer tüm yönetişim bileşenleri bulunmuyor. Sayılar, tüm satırların resmî yayınla birebir doğrulandığı anlamına gelmez.</p>"],
      ["Telif ve atıf", "<p>COBIT, ISACA'nın çerçevesidir; ilgili ad ve yayın hakları sahiplerine aittir. Bu site ISACA ile bağlantılı veya onaylı değildir. Yayın PDF'leri ve SQL dökümü bu siteyle dağıtılmaz. Üçüncü taraf reponun lisansı ISACA yayınlarını yeniden lisanslama hakkı varmış gibi yorumlanmaz. Açıklamalar, vakalar, sorular ve test örnekleri bu proje için özgün hazırlanmıştır; tam çeviri veya resmî yayın özeti yerine geçen içerik değildir.</p>"],
      ["Mesleki ve hukuki sınır", "<p>Genel eğitim örnekleri gerçek şirkete uygulanmadan önce risk, yetki, hukuk, sözleşme ve kurum metodolojisiyle değerlendirilmelidir. Kırmızı bayrak tek başına suistimal kanıtı değildir. Üretim ortamında aktif test, değişiklik veya işlem için açık yetki ve güvenli plan gerekir. Gerçek şirket/çalışan bilgilerini bu alıştırmalara koyma.</p>"],
      ["Gizlilik ve yerel kayıt", "<p>Site hesap, reklam, analiz servisi veya dış yazı tipi kullanmaz. İlerleme işaretleri, alıştırma notları ve dil tercihi tarayıcının yerel depolamasında tutulur; uygulama bunları sunucuya göndermez. Test şıkları yalnızca açık sayfanın belleğindedir. Cihaz/site adresi değişirse ilerleme taşınmaz. Yerel kayıt şifreli bir sır kasası değildir.</p><p>GitHub Pages gibi barındırma sağlayıcısı, kendi politikası kapsamında istek/IP gibi erişim bilgilerini işleyebilir. Dış kaynak bağlantısını açtığında ilgili sitenin koşulları geçerlidir.</p>"]
    ];
    main.innerHTML = `${intro(L("Şeffaflık","Transparency"),L("Kaynaklar, sınırlar ve gizlilik.","Sources, limits and privacy."),L("Bu atölye, COBIT 2019 ile IT denetimi arasında bağlantı kurmak için hazırlanmış bağımsız, özgün bir eğitim projesidir.","This workshop is an independent, original learning project that connects COBIT 2019 with IT audit practice."))}<article class="article">${sections.map(([title,body]) => `<h2>${escape(title)}</h2>${body}`).join("")}<div class="notice warning"><strong>${L("Yerel öğrenme kayıtlarını sil","Delete local learning records")}</strong><p>${L("Yalnız bu uygulamanın tamamlanma işaretleri ve alıştırma notları silinir. Bu işlem geri alınamaz; diğer sitelerin kayıtlarına dokunulmaz.","Only this application's completion marks and exercise notes are deleted. This cannot be undone; other sites' data is not touched.")}</p><button class="button secondary" type="button" data-action="request-clear">${L("Silme onayını aç","Open delete confirmation")}</button><div id="clear-confirm" hidden><p>${L("Bu tarayıcıdaki tüm atölye notlarını ve ilerlemeyi silmek istediğinden emin misin?","Are you sure you want to delete all workshop notes and progress in this browser?")}</p><button class="button" type="button" data-action="confirm-clear">${L("Evet, kayıtlarımı sil","Yes, delete my records")}</button> <button class="button secondary" type="button" data-action="cancel-clear">${L("Vazgeç","Cancel")}</button></div><p id="clear-status" role="status"></p></div><h2>${L("İçerik sürümü","Content version")}</h2><p>${L("İlk sürüm: 11 Kasım 2026. Temel referans COBIT 2019 yayınlarıdır; sınav müfredatı veya sonraki rehberlerin eksiksiz güncelliği iddia edilmez. İngilizce sürüm aynı içeriğin çevirisidir. Yayınlayan kişi kaynak kontrolünü ve içerik bakımını sürdürmelidir.","First release: 11 November 2026. The primary reference is the COBIT 2019 publication set; completeness against exam syllabi or later guidance is not claimed. The English edition is a translation of the same content. The publisher remains responsible for source checks and maintenance.")}</p></article>`;
  }
  function catalogMissing() {
    main.innerHTML = intro(L("Kontrol kataloğu","Control catalog"),L("Katalog dosyaları yüklenemedi.","Catalog files could not be loaded."),L("controls-*.js ve iso-reference.js dosyalarının index.html ile aynı klasörde olduğunu kontrol edip sayfayı yenile.","Check that controls-*.js and iso-reference.js are next to index.html, then reload."));
  }
  function exportCsv(selection, filename) {
    const header = lang === "en"
      ? ["Domain","Objective","Objective name","Practice code","Practice name","Plain-language title","Auditor expectation","Test of design (TOD)","Test of operating effectiveness (TOE)","Evidence to request","Typical findings","ISO/IEC 27002:2022","ISO/IEC 27001:2022","ITGC area","Test result","Workpaper ref.","Auditor note"]
      : ["Alan","Hedef","Hedef adı (EN)","Uygulama kodu","Uygulama adı (EN)","Türkçe başlık","Denetçi beklentisi","Tasarım testi (TOD)","İşleyiş testi (TOE)","İstenecek kanıtlar","Tipik bulgular","ISO/IEC 27002:2022","ISO/IEC 27001:2022","ITGC alanı","Test sonucu","Çalışma kâğıdı ref.","Denetçi notu"];
    const cell = value => {
      let text = String(value);
      if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
      return `"${text.replace(/"/g,'""')}"`;
    };
    const rows = selection.map(practice => {
      const meta = objectiveMeta(practice.objective);
      return [practice.objective.slice(0,3), practice.objective, meta ? meta[2] : "", practice.code, practice.name, practice.title, practice.expectation, practice.design, practice.operating, practice.evidence.join(" | "), practice.findings.join(" | "), practice.iso.join(", "), practice.clauses.join(", "), practice.itgc ? itgcLabels[practice.itgc] : "", "", "", ""];
    });
    const csv = "\ufeff" + [header, ...rows].map(row => row.map(cell).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"}));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function catalogView() {
    if (!catalog.length) return catalogMissing();
    catalogDomain = "ALL";
    catalogItgc = "ALL";
    const mapped = practices.filter(practice => practice.iso.length || practice.clauses.length).length;
    const itgcTotal = practices.filter(practice => practice.itgc).length;
    main.innerHTML = `${fallbackNotice()}${intro(L("Kontrol kataloğu","Control catalog"),L("COBIT 2019 kontrol kataloğu.","COBIT 2019 control catalog."),L(`${catalog.length} hedef ve ${practices.length} yönetim uygulaması. ISO 27002'deki gibi her uygulama için denetçinin beklentisi, tasarım ve işleyiş testi, istenecek kanıtlar, tipik bulgular ve ISO 27001/27002 eşleştirmesi.`,`${catalog.length} objectives and ${practices.length} management practices. Like ISO 27002, each practice comes with the auditor's expectation, test of design and operating effectiveness, evidence to request, typical findings and ISO 27001/27002 mapping.`))}
    <div class="stats"><div class="stat"><strong>${practices.length}</strong><span>${L("Yönetim uygulaması","Management practices")}</span></div><div class="stat"><strong>${catalog.length}</strong><span>${L("Yönetişim / yönetim hedefi","Governance / management objectives")}</span></div><div class="stat"><strong>${mapped}</strong><span>${L("ISO 27001/27002 eşleştirmeli","Mapped to ISO 27001/27002")}</span></div><div class="stat"><strong>${itgcTotal}</strong><span>${L("ITGC ile doğrudan ilişkili","Directly ITGC-related")}</span></div></div>
    <details class="howto"><summary>${L("Katalog nasıl okunur? ISO 27002 ile benzerlik ve fark","How to read the catalog: similarities and differences with ISO 27002")}</summary><div class="howto-grid"><div><strong>${L("Hedef ≈ kontrol alanı","Objective ≈ control area")}</strong><p>${L("Örneğin DSS05 güvenlik hizmetleri. ISO 27002'deki tema/kontrol grubu gibi düşünülebilir.","For example DSS05 security services. Think of it like a theme or control group in ISO 27002.")}</p></div><div><strong>${L("Uygulama ≈ kontrol","Practice ≈ control")}</strong><p>${L("DSS05.04 gibi. Denetimde test edilen birim çoğunlukla budur; ISO'daki 8.2 gibi kontrol maddelerine benzer.","Such as DSS05.04. This is usually the unit tested in an audit, similar to an ISO control like 8.2.")}</p></div><div><strong>${L("Beklenti","Expectation")}</strong><p>${L("İyi yönetilen bir kurumda denetçinin makul olarak görmeyi beklediği durum. Kurumun kendi kriteriyle netleştirilir.","What an auditor can reasonably expect to see in a well-run organization, refined with the organization's own criteria.")}</p></div><div><strong>TOD / TOE</strong><p>${L("Test of Design: Kontrol riski karşılayacak biçimde mi tasarlanmış? Test of Operating Effectiveness: Dönem boyunca gerçekten işlemiş mi?","Test of design: is the control designed to address the risk? Test of operating effectiveness: did it actually operate throughout the period?")}</p></div></div><p class="small">${L("COBIT, ISO 27002 gibi teknik bir güvenlik kontrol seti değil; bilgi ve teknolojinin yönetişimi ve yönetimi için daha geniş bir çerçevedir. Bu yüzden bazı uygulamalar ISO 27001 yönetim sistemi maddeleriyle, bazıları Ek A kontrolleriyle, bazıları hiçbiriyle doğrudan eşleşmez.","COBIT is not a technical security control set like ISO 27002; it is a broader framework for governance and management of information and technology. Some practices therefore map to ISO 27001 management system clauses, some to Annex A controls, and some to neither.")}</p></details>
    <div class="toolbar"><div class="field"><label for="catalog-search">${L("Kod, konu veya ISO numarasıyla ara","Search by code, topic or ISO number")}</label><input id="catalog-search" type="search" placeholder="${escape(L("Örneğin: yedekleme, DSS05.04, 8.32, ayrıcalıklı","For example: backup, DSS05.04, 8.32, privileged"))}"></div><button class="button" type="button" data-action="export-catalog">${L("Görünenleri Excel'e aktar (CSV)","Export visible to Excel (CSV)")}</button></div>
    <div class="filter-group" role="group" aria-label="${L("Alan","Domain")}">${["ALL",...Object.keys(data.domains)].map(domain => `<button type="button" class="filter" data-catalog-domain="${domain}" aria-pressed="${domain === "ALL"}">${domain === "ALL" ? L("Tüm alanlar","All domains") : `${domain} · ${escape(data.domains[domain].name)}`}</button>`).join("")}</div>
    <div class="filter-group" role="group" aria-label="${L("ITGC alanı","ITGC area")}"><span class="filter-label">${L("ITGC görünümü:","ITGC view:")}</span>${["ALL",...Object.keys(itgcLabels)].map(key => `<button type="button" class="filter" data-catalog-itgc="${key}" aria-pressed="${key === "ALL"}">${key === "ALL" ? L("Hepsi","All") : escape(itgcLabels[key])}</button>`).join("")}</div>
    <p id="catalog-count" class="result-count" role="status"></p><div id="catalog-results"></div>`;
    updateCatalog();
  }
  function filteredPractices() {
    const raw = document.getElementById("catalog-search").value.trim();
    const query = fold(raw);
    const numeric = /^\d+\.\d+$/.test(raw);
    return practices.filter(practice => {
      if (catalogDomain !== "ALL" && !practice.objective.startsWith(catalogDomain)) return false;
      if (catalogItgc !== "ALL" && practice.itgc !== catalogItgc) return false;
      if (!query) return true;
      if (numeric) return practice.iso.includes(raw) || practice.clauses.includes(raw);
      return fold([practice.code, practice.name, practice.title, practice.expectation, practice.design, practice.operating, ...practice.evidence, ...practice.findings].join(" ")).includes(query);
    });
  }
  function updateCatalog() {
    const query = document.getElementById("catalog-search").value.trim();
    const results = document.getElementById("catalog-results");
    const matched = filteredPractices();
    if (!query && catalogItgc === "ALL") {
      const objectives = catalog.filter(objective => catalogDomain === "ALL" || objective.objective.startsWith(catalogDomain));
      document.getElementById("catalog-count").textContent = L(`${objectives.length} hedef · ${matched.length} uygulama`,`${objectives.length} objectives · ${matched.length} practices`);
      results.innerHTML = Object.keys(data.domains).filter(domain => catalogDomain === "ALL" || domain === catalogDomain).map(domain => `<section class="domain-block"><div class="domain-head"><span class="objective-code">${domain}</span><h2>${escape(data.domains[domain].full)}</h2><p>${escape(data.domains[domain].kind)} · ${escape(data.domains[domain].description)}</p></div><div class="grid">${objectives.filter(objective => objective.objective.startsWith(domain)).map(objective => {
        const meta = objectiveMeta(objective.objective);
        const tags = [...new Set(objective.practices.map(practice => practice.itgc).filter(Boolean))];
        return `<article class="card"><div class="card-meta"><span class="objective-code">${objective.objective}</span><span class="pill">${objective.practices.length} ${L("uygulama","practices")}</span></div><h3><a href="#kontrol/${objective.objective}">${escape(meta ? meta[1] : objective.objective)}</a></h3><p class="small">${escape(meta ? meta[2] : "")}</p><p>${escape(objective.purpose)}</p><div>${tags.map(tag => `<span class="tag itgc">ITGC · ${escape(itgcLabels[tag])}</span>`).join("")}</div><div class="card-foot"><span>${L("Beklenti · TOD · TOE · kanıt","Expectation · TOD · TOE · evidence")}</span><a href="#kontrol/${objective.objective}">${L("Kontrolleri aç →","Open controls →")}</a></div></article>`;
      }).join("")}</div></section>`).join("");
      return;
    }
    document.getElementById("catalog-count").textContent = L(`${matched.length} / ${practices.length} uygulama gösteriliyor`,`Showing ${matched.length} / ${practices.length} practices`);
    results.innerHTML = matched.length ? `<div class="grid two-grid">${matched.map(practice => `<article class="card practice-hit"><div class="card-meta"><span class="objective-code">${practice.code}</span><a class="small" href="#kontrol/${practice.objective}">${practice.objective}</a></div><h3><a href="#kontrol/${practice.objective}/${practice.code}">${escape(practice.title)}</a></h3><p class="small">${escape(practice.name)}</p><p>${escape(practice.expectation)}</p><div>${isoTags(practice)}</div></article>`).join("")}</div>` : `<p class="empty">${L("Bu filtrelerle uygulama bulunamadı. Aramayı kısalt veya filtreleri sıfırla.","No practice matches these filters. Shorten the search or reset the filters.")}</p>`;
  }
  function practiceBlock(practice) {
    return `<details class="practice" id="p-${practice.code}"><summary><span class="objective-code">${practice.code}</span><span class="practice-title"><strong>${escape(practice.title)}</strong><small>${escape(practice.name)}</small></span></summary><div class="practice-body"><div class="expect"><div class="label">${L("Denetçinin beklentisi","Auditor expectation")}</div><p>${escape(practice.expectation)}</p></div><div class="test-grid"><div><div class="label">${L("Tasarım testi · TOD","Test of design · TOD")}</div><p>${escape(practice.design)}</p></div><div><div class="label">${L("İşleyiş testi · TOE","Operating effectiveness · TOE")}</div><p>${escape(practice.operating)}</p></div><div><div class="label">${L("İstenecek kanıtlar","Evidence to request")}</div>${list(practice.evidence)}</div><div><div class="label">${L("Tipik bulgular","Typical findings")}</div>${list(practice.findings)}</div></div><div class="mapping"><span class="label">${L("Eşleştirme","Mapping")}</span>${isoTags(practice) || `<span class="small">${L("Doğrudan ISO 27001/27002 eşleştirmesi yok.","No direct ISO 27001/27002 mapping.")}</span>`}</div></div></details>`;
  }
  function controlView(requestedCode, practiceCode) {
    if (!catalog.length) return catalogMissing();
    const index = catalog.findIndex(objective => objective.objective === requestedCode);
    if (index < 0) return notFound();
    const objective = catalog[index];
    const code = objective.objective;
    const meta = objectiveMeta(code);
    const domain = data.domains[code.slice(0,3)];
    main.innerHTML = `${fallbackNotice()}<a class="back" href="#kontroller">← ${L("Kontrol kataloğu","Control catalog")}</a><article>${intro(`${code} · ${domain.kind} · ${domain.full}`, meta ? meta[1] : code, meta ? meta[2] : "")}<div class="reading-meta"><span class="pill">${objective.practices.length} ${L("yönetim uygulaması","management practices")}</span><button class="button secondary print-button" type="button" data-action="export-objective" data-id="${code}">${L("Bu hedefi Excel'e aktar","Export this objective to Excel")}</button>${printButton()}</div><div class="grid">${[[L("Neden önemli?","Why it matters"),objective.purpose],[L("Denetçi neye odaklanır?","Where the auditor focuses"),objective.auditFocus]].map(([title,text]) => `<div class="card"><div class="label">${escape(title)}</div><p>${escape(text)}</p></div>`).join("")}<div class="card"><div class="label">${L("Temel riskler","Key risks")}</div>${list(objective.keyRisks)}</div></div><div class="section-head"><div><h2>${L("Yönetim uygulamaları","Management practices")}</h2><p>${L("Her uygulamayı aç: beklenti, tasarım/işleyiş testi, kanıtlar, tipik bulgular ve ISO eşleştirmesi.","Open each practice: expectation, test of design and operating effectiveness, evidence, typical findings and ISO mapping.")}</p></div><div class="actions" style="margin:0"><button type="button" class="button secondary print-button" data-action="expand-all">${L("Tümünü aç","Expand all")}</button><button type="button" class="button secondary print-button" data-action="collapse-all">${L("Tümünü kapat","Collapse all")}</button></div></div>${objective.practices.map(practiceBlock).join("")}<p class="small" style="margin-top:20px">${L("Uygulama adları COBIT 2019'daki İngilizce başlıklardır ve referans içindir. Açıklamalar özgün denetim notlarıdır; ISACA metni veya resmî çeviri değildir. Eşleştirmeler gösterge niteliğindedir.","Practice names are the official COBIT 2019 English titles, used for reference. Explanations are original audit notes, not ISACA text. Mappings are indicative.")} <a href="#kaynaklar">${L("Sınırlar","Limits")}</a></p><div class="lesson-nav">${index ? `<a class="button secondary" href="#kontrol/${catalog[index-1].objective}">← ${catalog[index-1].objective}</a>` : `<a class="button secondary" href="#kontroller">${L("Katalog","Catalog")}</a>`}${index < catalog.length-1 ? `<a class="button" href="#kontrol/${catalog[index+1].objective}">${catalog[index+1].objective} →</a>` : `<a class="button" href="#iso27001">ISO 27001 →</a>`}</div></article>`;
    document.title = `${code} ${meta ? meta[1] : ""} — ${L("COBIT kontrol kataloğu","COBIT control catalog")}`;
    if (practiceCode) scrollTarget = document.getElementById(`p-${practiceCode}`);
  }
  const ISO_LINKS = {"27001":"https://www.iso.org/standard/27001", "27002":"https://www.iso.org/standard/75652.html"};
  const clauseGroups = () => lang === "en"
    ? {"4":"Context of the organization","5":"Leadership","6":"Planning","7":"Support","8":"Operation","9":"Performance evaluation","10":"Improvement"}
    : {"4":"Kuruluşun bağlamı","5":"Liderlik","6":"Planlama","7":"Destek","8":"Operasyon","9":"Performans değerlendirme","10":"İyileştirme"};
  const isoEntries = standard => standard === "27001"
    ? isoRef.clauses.map(clause => ({standard, number:clause[0], group:clause[0].split(".")[0], title:lang === "en" ? (clause[2] || clause[1]) : clause[1], alt:lang === "en" ? "" : (clause[2] || ""), matches:practices.filter(practice => practice.clauses.includes(clause[0]))}))
    : isoRef.controls.map(control => ({standard, number:control[0], group:control[0].split(".")[0], title:lang === "en" ? control[1] : control[2], alt:lang === "en" ? "" : control[1], matches:practices.filter(practice => practice.iso.includes(control[0]))}));
  const officialLink = standard => `<a class="button secondary print-button" href="${ISO_LINKS[standard]}" target="_blank" rel="noopener noreferrer">${L(`ISO/IEC ${standard}:2022 resmî sayfası ↗`,`Official ISO/IEC ${standard}:2022 page ↗`)}</a>`;
  function isoTabs(active) {
    return `<div class="iso-tabs" role="tablist" aria-label="${L("ISO standardı","ISO standard")}"><a role="tab" href="#iso27001" aria-selected="${active === "27001"}" class="${active === "27001" ? "active" : ""}"><strong>ISO/IEC 27001:2022</strong><span>${L("Yönetim sistemi gereksinimleri · Madde 4–10","Management system requirements · Clauses 4–10")}</span></a><a role="tab" href="#iso27002" aria-selected="${active === "27002"}" class="${active === "27002" ? "active" : ""}"><strong>ISO/IEC 27002:2022</strong><span>${L("93 kontrol için uygulama rehberi · Ek A","Implementation guidance for 93 controls · Annex A")}</span></a></div>`;
  }
  function isoView(standard, selected) {
    if (!catalog.length || !isoRef.controls.length) return catalogMissing();
    if (selected) return isoDetail(standard, selected);
    isoTheme = "ALL";
    const entries = isoEntries(standard);
    const covered = entries.filter(entry => entry.matches.length).length;
    const groups = standard === "27001" ? clauseGroups() : isoThemes();
    const head = standard === "27001"
      ? intro("ISO/IEC 27001:2022", L("Bilgi güvenliği yönetim sistemi (BGYS) gereksinimleri.","Information security management system (ISMS) requirements."), L("ISO 27001 belgelendirilebilen standarttır: Madde 4–10 yönetim sistemi gereksinimlerini tanımlar; Ek A ise 93 kontrolün listesidir. Bu kontrollerin uygulama rehberi ISO 27002'dedir. Aşağıda her madde için ilgili COBIT 2019 uygulamaları yer alır.","ISO 27001 is the certifiable standard: clauses 4–10 set the management system requirements and Annex A lists the 93 controls. Implementation guidance for those controls is in ISO 27002. Below, each clause links to related COBIT 2019 practices."))
      : intro("ISO/IEC 27002:2022", L("93 bilgi güvenliği kontrolü için rehber.","Guidance for 93 information security controls."), L("ISO 27002 belgelendirme standardı değildir; ISO 27001 Ek A'daki kontrollerin nasıl uygulanacağına rehberlik eder. Kontroller dört temada toplanır. Her kontrol için bu katalogdaki ilgili COBIT 2019 uygulamalarını gör.","ISO 27002 is not a certification standard; it guides how to implement the controls listed in ISO 27001 Annex A. Controls are grouped in four themes. See the related COBIT 2019 practices in this catalog for each control."));
    const facts = standard === "27001"
      ? `<div class="grid iso-facts"><div class="card"><div class="label">${L("Ne için?","Purpose")}</div><p>${L("Kuruluşun BGYS'yi kurması, uygulaması, sürdürmesi ve sürekli iyileştirmesi için gereksinimler. Bağımsız belgelendirme denetimi bu maddelere ve Uygulanabilirlik Bildirgesi'ne (SoA) göre yapılır.","Requirements to establish, implement, maintain and continually improve an ISMS. Independent certification audits assess these clauses and the Statement of Applicability (SoA).")}</p></div><div class="card"><div class="label">${L("Ek A ile ilişkisi","Link to Annex A")}</div><p>${L("Risk işleme (6.1.3) sırasında Ek A kontrolleri ile karşılaştırma yapılır ve uygulanabilirlik gerekçelendirilir. Ek A'daki 93 kontrol, ISO 27002 numaralandırmasıyla aynıdır.","During risk treatment (6.1.3) controls are compared with Annex A and applicability is justified. Annex A's 93 controls use the same numbering as ISO 27002.")}</p><a href="#iso27002">${L("Ek A / ISO 27002 kontrollerine git →","Go to Annex A / ISO 27002 controls →")}</a></div><div class="card"><div class="label">${L("COBIT ile ilişkisi","Relationship to COBIT")}</div><p>${L("COBIT bilgi ve teknolojinin yönetişim ve yönetimini kapsar; ISO 27001 bilgi güvenliği yönetim sistemine odaklanır. Birlikte kullanılabilir; eşleştirmeler gösterge niteliğindedir.","COBIT covers governance and management of information and technology; ISO 27001 focuses on the information security management system. They work together; mappings are indicative.")}</p></div></div>`
      : `<div class="grid iso-facts">${Object.keys(isoRef.themes).map(key => { const count = isoRef.controls.filter(control => control[0].startsWith(key + ".")).length; return `<button type="button" class="card theme-card" data-iso-theme="${key}"><span class="objective-code">${key}.x</span><strong>${escape(groups[key])}</strong><span>${count} ${L("kontrol","controls")}</span></button>`; }).join("")}</div>`;
    main.innerHTML = `${fallbackNotice()}${head}${isoTabs(standard)}<div class="reading-meta">${officialLink(standard)}</div>${facts}<div class="notice"><strong>${covered} / ${entries.length}</strong> ${standard === "27001" ? L("madde en az bir COBIT uygulamasıyla ilişkilendirildi.","clauses are linked to at least one COBIT practice.") : L("kontrol en az bir COBIT uygulamasıyla ilişkilendirildi.","controls are linked to at least one COBIT practice.")} ${L("Eşleştirmeler gösterge niteliğindedir; ISACA veya ISO'nun resmî eşleştirmesi değildir. Eşleşme olmaması önemsiz olduğu anlamına gelmez.","Mappings are indicative, not official ISACA or ISO mappings. No mapping does not mean unimportant.")}</div><div class="toolbar"><div class="field"><label for="iso-search">${standard === "27001" ? L("Madde numarası veya konu ara","Search clause number or topic") : L("Kontrol numarası veya konu ara","Search control number or topic")}</label><input id="iso-search" type="search" data-standard="${standard}" placeholder="${escape(standard === "27001" ? L("Örneğin: 9.2, risk, iç denetim","For example: 9.2, risk, internal audit") : L("Örneğin: 8.32, erişim, yedekleme","For example: 8.32, access, backup"))}"></div></div><div class="filter-group" role="group" aria-label="${standard === "27001" ? L("Madde","Clause") : L("Tema","Theme")}">${["ALL",...Object.keys(groups)].map(key => `<button type="button" class="filter" data-iso-theme="${key}" aria-pressed="${key === "ALL"}">${key === "ALL" ? L("Tümü","All") : `${key} · ${escape(groups[key])}`}</button>`).join("")}</div><p id="iso-count" class="result-count" role="status"></p><div id="iso-results"></div><p class="small">${L("ISO/IEC 27001 ve 27002 standartlarının hakları ISO/IEC'e aittir. Burada yalnızca numaralar ve kısa başlıklar referans olarak verilir; standart metni yer almaz.","ISO/IEC 27001 and 27002 are copyrighted by ISO/IEC. Only numbers and short titles are shown for reference; no standard text is included.")}</p>`;
    updateIso();
  }
  function updateIso() {
    const input = document.getElementById("iso-search");
    const standard = input.dataset.standard;
    const raw = input.value.trim();
    const query = fold(raw);
    const numeric = /^\d+(\.\d+)?$/.test(raw);
    const rows = isoEntries(standard).filter(entry => (isoTheme === "ALL" || entry.group === isoTheme) && (!query || (numeric ? entry.number === raw || entry.number.startsWith(raw + ".") || (raw.includes(".") && entry.number === raw) : fold([entry.number, entry.title, entry.alt].join(" ")).includes(query))));
    document.getElementById("iso-count").textContent = standard === "27001" ? L(`${rows.length} madde`,`${rows.length} clauses`) : L(`${rows.length} kontrol`,`${rows.length} controls`);
    document.getElementById("iso-results").innerHTML = rows.length ? `<div class="iso-list">${rows.map(entry => `<article class="iso-row"><div class="iso-number"><a class="tag ${standard === "27001" ? "clause" : "iso"}" href="#iso${standard}/${entry.number}">${standard === "27001" ? clauseLabel() : "27002"} ${escape(entry.number)}</a></div><div class="iso-text"><a href="#iso${standard}/${entry.number}"><strong>${escape(entry.title)}</strong></a>${entry.alt ? `<small>${escape(entry.alt)}</small>` : ""}</div><div class="iso-links">${entry.matches.length ? entry.matches.map(practice => `<a class="pill" href="#kontrol/${practice.objective}/${practice.code}" title="${escape(practice.title)}">${practice.code}</a>`).join(" ") : `<span class="small">${L("Bu katalogda doğrudan eşleşme yok","No direct mapping in this catalog")}</span>`}</div></article>`).join("")}</div>` : `<p class="empty">${L("Kayıt bulunamadı.","No entries found.")}</p>`;
  }
  function isoDetail(standard, number) {
    const entries = isoEntries(standard);
    const index = entries.findIndex(entry => entry.number === number);
    if (index < 0) return notFound();
    const entry = entries[index];
    const groupName = (standard === "27001" ? clauseGroups() : isoThemes())[entry.group];
    const prev = entries[index - 1];
    const next = entries[index + 1];
    const annexNote = standard === "27002"
      ? L(`ISO 27001:2022 Ek A'da aynı kontrol A.${entry.number} olarak listelenir. ISO 27002 bu kontrolün amacını ve uygulama rehberini verir; belgelendirme denetiminde kontrolün uygulanabilirliği SoA'da gerekçelendirilir.`,`ISO 27001:2022 Annex A lists the same control as A.${entry.number}. ISO 27002 provides the purpose and implementation guidance; in certification audits its applicability is justified in the SoA.`)
      : L(`Bu, ISO 27001'in zorunlu yönetim sistemi gereksinimlerinden biridir (Madde ${entry.group} · ${groupName}). Belgelendirme denetiminde bu maddeye uygunluk kanıtla değerlendirilir.`,`This is one of the mandatory ISO 27001 management system requirements (Clause ${entry.group} · ${groupName}). Certification audits assess conformity with this clause based on evidence.`);
    main.innerHTML = `${fallbackNotice()}<a class="back" href="#iso${standard}">← ISO/IEC ${standard}:2022</a>${intro(`ISO/IEC ${standard}:2022 · ${standard === "27001" ? L("Madde","Clause") : L("Kontrol","Control")} ${entry.number} · ${groupName}`, entry.title, entry.alt || (standard === "27001" ? L("Yönetim sistemi gereksinimi","Management system requirement") : L("Bilgi güvenliği kontrolü","Information security control")))}<div class="reading-meta">${officialLink(standard)}</div><div class="notice">${escape(annexNote)}</div><div class="section-head"><div><h2>${L("İlgili COBIT 2019 uygulamaları","Related COBIT 2019 practices")}</h2><p>${L("Aynı denetim kanıtını iki çerçevede kullanmak için başlangıç noktası. Her kartta denetçi beklentisi; ayrıntılı test ve kanıtlar için uygulamayı aç.","A starting point for reusing the same audit evidence across both frameworks. Each card shows the auditor expectation; open the practice for detailed tests and evidence.")}</p></div></div>${entry.matches.length ? `<div class="grid two-grid">${entry.matches.map(practice => `<article class="card practice-hit"><div class="card-meta"><span class="objective-code">${practice.code}</span>${practice.itgc ? `<span class="tag itgc">ITGC · ${escape(itgcLabels[practice.itgc])}</span>` : ""}</div><h3><a href="#kontrol/${practice.objective}/${practice.code}">${escape(practice.title)}</a></h3><p class="small">${escape(practice.name)}</p><p>${escape(practice.expectation)}</p><a class="small" href="#kontrol/${practice.objective}/${practice.code}">${L("Testleri ve kanıtları aç →","Open tests and evidence →")}</a></article>`).join("")}</div>` : `<p class="empty">${L("Bu katalogda doğrudan eşleşen COBIT uygulaması yok. COBIT yönetişim düzeyinde çalışır; bu konu daha teknik bir ayrıntı olabilir.","No COBIT practice in this catalog maps directly. COBIT works at governance level; this topic may be a more technical detail.")}</p>`}<p class="small" style="margin-top:20px">${L("Eşleştirmeler gösterge niteliğindedir. Standart metni için resmî ISO kaynağına başvur.","Mappings are indicative. Refer to the official ISO source for the standard text.")}</p><div class="lesson-nav">${prev ? `<a class="button secondary" href="#iso${standard}/${prev.number}">← ${prev.number}</a>` : `<a class="button secondary" href="#iso${standard}">ISO/IEC ${standard}</a>`}${next ? `<a class="button" href="#iso${standard}/${next.number}">${next.number} →</a>` : `<a class="button" href="#iso${standard === "27001" ? "27002" : "27001"}">ISO/IEC ${standard === "27001" ? "27002" : "27001"} →</a>`}</div>`;
    document.title = `ISO/IEC ${standard} ${entry.number} ${entry.title} — ${brand()}`;
  }
  function notFound() {
    main.innerHTML = `${intro(L("Bağlantı bulunamadı","Link not found"),L("Bu sayfa burada değil.","This page isn't here."),L("Bağlantı değişmiş veya yanlış yazılmış olabilir. İçerik silinmiş gibi görünüyorsa öğrenme yolundan tekrar seç.","The link may have changed or been mistyped. Choose again from the learning path."))}<a class="button" href="#dersler">${L("Öğrenme yoluna dön →","Back to the learning path →")}</a>`;
  }
  function render(focus = true) {
    let parts;
    try { parts = location.hash.slice(1).split("/").map(part => decodeURIComponent(part)); }
    catch (error) { if (!(error instanceof URIError)) throw error; parts = ["gecersiz"]; }
    const [page,id,sub] = parts;
    document.title = L("COBIT Atölyesi — COBIT 2019 kontrol kataloğu ve IT denetimi", "COBIT Workshop — COBIT 2019 control catalog and IT audit");
    scrollTarget = null;
    switch (page || "baslangic") {
      case "baslangic": home(); break;
      case "dersler": lessonIndex(); break;
      case "ders": lessonView(id); break;
      case "hedefler": objectivesView(id); break;
      case "kontroller": catalogView(); break;
      case "kontrol": controlView(id, sub); break;
      case "iso": {
        const legacy = /^(27001|27002)-(\d+\.\d+)$/.exec(id || "");
        location.replace(legacy ? `#iso${legacy[1]}/${legacy[2]}` : "#iso27002");
        return;
      }
      case "iso27001": isoView("27001", id); break;
      case "iso27002": isoView("27002", id); break;
      case "denetim": id ? auditView(id) : auditIndex(); break;
      case "vakalar": casesIndex(); break;
      case "vaka": caseView(id); break;
      case "test": quizView(); break;
      case "sozluk": glossaryView(); break;
      case "kaynaklar": sourcesView(); break;
      default: notFound();
    }
    const active = page === "ders" ? "dersler" : page === "vaka" ? "vakalar" : page === "kontrol" || page === "hedefler" ? "kontroller" : page;
    document.querySelectorAll("#navigation a").forEach(navLink => {
      if (navLink.hash === `#${active}`) navLink.setAttribute("aria-current","page");
      else navLink.removeAttribute("aria-current");
    });
    document.getElementById("navigation").classList.remove("open");
    document.getElementById("menu-button").setAttribute("aria-expanded","false");
    if (focus) { main.focus({preventScroll:true}); window.scrollTo(0,0); }
    if (scrollTarget) {
      scrollTarget.open = true;
      scrollTarget.classList.add("highlight");
      scrollTarget.scrollIntoView({block:"start"});
      scrollTarget.querySelector("summary").focus({preventScroll:true});
    }
  }
  document.getElementById("menu-button").addEventListener("click", event => {
    const open = document.getElementById("navigation").classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded",String(open));
  });
  document.querySelector(".lang-switch").addEventListener("click", event => {
    const button = event.target.closest("[data-lang]");
    if (button) setLanguage(button.dataset.lang);
  });
  document.querySelector(".skip").addEventListener("click", event => {
    event.preventDefault();
    main.focus({preventScroll:true});
    main.scrollIntoView({block:"start"});
  });
  main.addEventListener("input", event => {
    if (event.target.id === "objective-search") updateObjectives();
    if (event.target.id === "glossary-search") updateGlossary();
    if (event.target.id === "catalog-search") updateCatalog();
    if (event.target.id === "iso-search") updateIso();
    if (event.target.matches("textarea[data-note]")) {
      const key = event.target.dataset.note;
      if (event.target.value) state.notes[key] = event.target.value;
      else delete state.notes[key];
      document.getElementById(`status-${key}`).textContent = persist() ? L("Bu tarayıcıya kaydedildi.","Saved in this browser.") : L("Kalıcı kaydedilmedi; yalnızca bu açık sayfada duruyor.","Not saved permanently; it exists only in this open page.");
    }
  });
  main.addEventListener("change", event => {
    if (event.target.matches('input[name="exam-option"]') && exam && !exam.finishedAt) {
      exam.answers[exam.current] = Number(event.target.value);
      examQuestion();
      const selected = main.querySelector('input[name="exam-option"]:checked');
      if (selected) selected.focus();
    }
  });
  main.addEventListener("submit", event => {
    if (event.target.id === "exam-setup") {
      event.preventDefault();
      startExam(event.target);
    }
  });
  main.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.goto !== undefined && exam && !exam.finishedAt) {
      exam.current = Number(button.dataset.goto);
      examQuestion();
      focusQuestion();
      return;
    }
    if (button.dataset.review) {
      main.querySelectorAll("[data-review]").forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
      main.querySelectorAll(".review-item").forEach(item => { item.hidden = button.dataset.review === "wrong" && !item.classList.contains("is-wrong"); });
      return;
    }
    if (button.dataset.domain) {
      activeDomain = button.dataset.domain;
      main.querySelectorAll("[data-domain]").forEach(filter => filter.setAttribute("aria-pressed",String(filter === button)));
      updateObjectives();
    }
    if (button.dataset.catalogDomain) {
      catalogDomain = button.dataset.catalogDomain;
      main.querySelectorAll("[data-catalog-domain]").forEach(filter => filter.setAttribute("aria-pressed",String(filter === button)));
      updateCatalog();
    }
    if (button.dataset.catalogItgc) {
      catalogItgc = button.dataset.catalogItgc;
      main.querySelectorAll("[data-catalog-itgc]").forEach(filter => filter.setAttribute("aria-pressed",String(filter === button)));
      updateCatalog();
    }
    if (button.dataset.isoTheme) {
      isoTheme = button.dataset.isoTheme;
      main.querySelectorAll(".filter[data-iso-theme]").forEach(filter => filter.setAttribute("aria-pressed",String(filter.dataset.isoTheme === isoTheme)));
      updateIso();
      if (button.classList.contains("theme-card")) document.getElementById("iso-results").scrollIntoView({block:"start"});
    }
    switch (button.dataset.action) {
      case "export-catalog": {
        const selection = filteredPractices();
        if (selection.length) exportCsv(selection, L("cobit-2019-denetim-programi.csv","cobit-2019-audit-program.csv"));
        break;
      }
      case "export-objective": {
        const id = button.dataset.id;
        exportCsv(practices.filter(practice => practice.objective === id), L(`cobit-2019-${id}-denetim-programi.csv`,`cobit-2019-${id}-audit-program.csv`));
        break;
      }
      case "expand-all": main.querySelectorAll("details.practice").forEach(item => { item.open = true; }); break;
      case "collapse-all": main.querySelectorAll("details.practice").forEach(item => { item.open = false; }); break;
      case "complete": {
        const id = button.dataset.id;
        const wasComplete = state.completed.includes(id);
        state.completed = wasComplete ? state.completed.filter(value => value !== id) : [...state.completed,id];
        const saved = persist();
        render(false);
        main.querySelector('[data-action="complete"]').focus({preventScroll:true});
        if (!saved) storageWarning(L("İşaret bu sayfada güncellendi ama kalıcı kaydedilmedi. Tarayıcı depolama izinlerini kontrol et.","The mark was updated on this page but not saved permanently. Check the browser's storage permissions."));
        break;
      }
      case "print": window.print(); break;
      case "exam-prev": if (exam.current > 0) { exam.current--; examQuestion(); focusQuestion(); } break;
      case "exam-next": if (exam.current < exam.items.length - 1) { exam.current++; examQuestion(); focusQuestion(); } break;
      case "exam-flag": {
        if (exam.flags.has(exam.current)) exam.flags.delete(exam.current); else exam.flags.add(exam.current);
        examQuestion();
        main.querySelector('[data-action="exam-flag"]').focus();
        break;
      }
      case "exam-check": exam.checked[exam.current] = true; examQuestion(); main.querySelector(".quiz-feedback").setAttribute("tabindex","-1"); main.querySelector(".quiz-feedback").focus(); break;
      case "exam-finish": {
        const unanswered = exam.items.length - Object.keys(exam.answers).length;
        if (unanswered) { examQuestion(true); main.querySelector('[data-action="exam-finish-confirm"]').focus(); }
        else finishExam();
        break;
      }
      case "exam-finish-confirm": finishExam(); break;
      case "exam-finish-cancel": examQuestion(); focusQuestion(); break;
      case "exam-new": stopTimer(); exam = null; examSetup(); main.focus({preventScroll:true}); window.scrollTo(0,0); break;
      case "exam-retry-wrong": {
        const wrongItems = exam.items.filter((item, index) => exam.answers[index] !== item.q.correct).map(item => item.q);
        const mode = exam.mode;
        startExam(null, wrongItems, mode);
        window.scrollTo(0,0);
        break;
      }
      case "request-clear": document.getElementById("clear-confirm").hidden = false; main.querySelector('[data-action="confirm-clear"]').focus(); break;
      case "cancel-clear": document.getElementById("clear-confirm").hidden = true; main.querySelector('[data-action="request-clear"]').focus(); break;
      case "confirm-clear": {
        try {
          localStorage.removeItem(storageKey);
        } catch (error) {
          if (!isStorageError(error)) throw error;
          document.getElementById("clear-status").textContent = L("Tarayıcı kayıt silmeye izin vermedi. Kayıtlar silindi sayılmaz; site verilerini tarayıcı ayarlarından yönet.","The browser did not allow deletion. Records are not deleted; manage site data in browser settings.");
          break;
        }
        state = {completed:[], notes:{}};
        document.getElementById("clear-confirm").hidden = true;
        document.getElementById("clear-status").textContent = L("Bu atölyenin yerel notları ve ilerleme işaretleri silindi.","This workshop's local notes and progress marks were deleted.");
        main.querySelector('[data-action="request-clear"]').focus();
        break;
      }
    }
  });
  window.addEventListener("hashchange",() => render());
  window.addEventListener("beforeprint",() => main.querySelectorAll("details.practice").forEach(item => { item.open = true; }));
  updateChrome();
  render(false);
})();
