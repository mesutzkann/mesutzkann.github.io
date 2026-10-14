/* =========================================================
   Mesut Özkan — Portfolyo etkileşimleri
   Dil geçişi, scroll animasyonları, filtreler, form
   ========================================================= */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------------------------------------------------
       1) İki dilli içerik sözlüğü
       HTML içindeki Türkçe metinler varsayılandır; EN seçildiğinde
       aşağıdaki karşılıklarla değiştirilir.
       --------------------------------------------------------- */
    var I18N = {
        en: {
            "nav.about": "About",
            "nav.exp": "Experience",
            "nav.projects": "Projects",
            "nav.skills": "Skills",
            "nav.contact": "Contact",
            "nav.cv": "CV",

            "hero.eyebrow": "Backend &amp; AI Engineer",
            "hero.hi": "Hi, I'm",
            "hero.lead": "I build enterprise-scale microservice architectures, event-driven systems and AI-powered solutions. I care about clean, testable and maintainable code.",
            "hero.ctaProjects": "View My Work",
            "hero.ctaContact": "Get in Touch",
            "hero.scroll": "Scroll",

            "stat.teknofest": "TEKNOFEST 2024 · 70,000 teams",
            "stat.intern": "Corporate internships",
            "stat.modules": "Modules &amp; services shipped",

            "about.kicker": "01 — About",
            "about.title": "An engineer who understands the problem",
            "about.p1": "I graduated in Computer Engineering from Recep Tayyip Erdoğan University. I have a strong interest in backend development and artificial intelligence. During my internship in the banking sector, I had the opportunity to work on enterprise-scale microservice architectures, event-driven systems and AI-powered solutions.",
            "about.p2": "Alongside that, I gained hands-on experience in AI fields such as image processing, object detection and natural language processing. I value solving complex problems, writing clean and sustainable code, and continuously growing as a computer engineer.",
            "about.eduTitle": "Education",
            "about.eduBody": "Recep Tayyip Erdoğan University<br>B.Sc. — Computer Engineering<br><em>2021 — 2026</em>",
            "about.langTitle": "Languages",
            "about.langBody": "Turkish — Native<br>English — B2",
            "about.locTitle": "Location",
            "about.locBody": "İstanbul, Türkiye<br>Open to on-site / hybrid roles",

            "exp.kicker": "02 — Experience",
            "exp.title": "Work Experience",
            "exp.o.role": "Software Engineering Intern",
            "exp.o.date": "July 2025 — Present",
            "exp.o.b1": "<b>Workforce Management Platform:</b> Built an enterprise platform actively used by HR to manage hierarchical team structures, full-stack with .NET 8 and React.js; implemented role-based access control and multi-service integration.",
            "exp.o.b2": "<b>Fraud Detection &amp; Authentication:</b> Developed authentication services on a RabbitMQ-based event-driven architecture; designed NFC, PIN and SMS flows for loosely-coupled inter-service communication.",
            "exp.o.b3": "<b>Trendyol Finance Chatbot (RAG &amp; MCP):</b> Designed a RAG server that automates API interactions through natural language queries; built NLP-powered middleware applying dynamic endpoint selection and hybrid search strategies via MCP integration.",
            "exp.o.b4": "<b>Centralized Logging Infrastructure:</b> Designed and implemented a RabbitMQ-based distributed logging system providing reliable, asynchronous log transfer across microservices.",
            "exp.o.b5": "<b>API Gateway Modernization:</b> Restructured the existing API Gateway with JWT and OAuth 2.0 security integration and performance optimizations.",
            "exp.o.b6": "<b>Timesheet &amp; Job Descriptions:</b> Took an active role in the end-to-end development of effort-entry and corporate job-description modules on both backend and frontend.",
            "exp.o.b7": "<b>Quality &amp; Sustainability:</b> Increased service reliability by writing unit tests covering core business rules; improved codebase readability through targeted refactoring that reduced duplication.",
            "exp.t.role": "Backend Developer Intern",
            "exp.t.date": "2023",
            "exp.t.b1": "Developed and maintained backend API endpoints using Node.js; handled data processing logic and service-layer operations for the main product.",
            "exp.t.b2": "Wrote and optimized SQL queries for database operations including data retrieval, filtering and reporting; ensured data consistency across related tables.",
            "exp.t.b3": "Worked closely with the development team in a structured process with weekly task distribution; delivered features on time and documented completed work.",

            "proj.kicker": "03 — Projects",
            "proj.title": "Selected Work",
            "proj.fAll": "All",
            "proj.fAi": "Artificial Intelligence",
            "proj.fBackend": "Backend",
            "proj.fMobile": "Mobile",
            "proj.rag.title": "RAG System",
            "proj.rag.desc": "Designed a Retrieval-Augmented Generation server enabling natural-language interaction with API documentation and automatically suggesting the relevant endpoints for a user query. Built hybrid retrieval combining dense and sparse search, optimized document chunking and a query orchestration layer returning structured responses.",
            "proj.kys.title": "Workforce Management System",
            "proj.kys.desc": "Developed, full-stack, an enterprise platform actively used by HR that manages and visualizes organizational structures through an interactive hierarchy interface. Built RESTful services for hierarchical personnel data and role-based authorization, a responsive React interface for intuitive navigation, and multiple internal service integrations.",
            "proj.eys.title": "Barrier-Free Life System",
            "proj.eys.desc": "A mobile application that recognizes sign-language gestures in real time with AI and image processing, converts them to text and reads them aloud — building a communication bridge between hearing- and visually-impaired people. Ranked 13th in Türkiye among 70,000 teams; designed to stay freely accessible on mobile devices.",
            "proj.recycle.title": "Smart Recycling Project",
            "proj.recycle.desc": "A smart recycling system that separates four different materials in a single bin using object detection. I am building the mobile app that encourages regular recycling through reward mechanics and gamification. Accepted into the TÜBİTAK 2209-A University Research Support Programme.",
            "tag.vision": "Image Processing",
            "tag.mobile": "Mobile",
            "tag.detect": "Object Detection",
            "tag.mobile2": "Mobile",

            "skills.kicker": "04 — Skills",
            "skills.title": "Technical Skills",
            "skills.c1": "Programming Languages",
            "skills.c2": "Backend &amp; Frameworks",
            "skills.c3": "Frontend",
            "skills.c4": "AI &amp; NLP",
            "skills.c5": "Messaging &amp; Architecture",
            "skills.c6": "Databases",
            "skills.c7": "DevOps &amp; Tools",
            "skills.c8": "Security",

            "award.a1t": "TEKNOFEST 2024",
            "award.a1d": "Ranked 13th in Türkiye among 70,000 teams with the Barrier-Free Life System project.",
            "award.a2t": "TÜBİTAK 2209-A",
            "award.a2d": "The Smart Recycling Project was accepted into the national research support programme.",

            "contact.kicker": "05 — Contact",
            "contact.title": "Let's work together",
            "contact.lead": "Reach out for a new opportunity, a project, or just to say hello.",
            "contact.mail": "Email",
            "contact.phone": "Phone",
            "contact.copy": "Copy",
            "contact.cvLabel": "Résumé",
            "contact.cvValue": "Download CV as PDF",

            "form.name": "Full Name",
            "form.email": "Email",
            "form.subject": "Subject",
            "form.message": "Your Message",
            "form.send": "Send Message",
            "form.note": "Pressing send opens the message ready to go in your default mail app.",

            "footer.made": "Designed &amp; coded — İstanbul"
        }
    };

    var TYPED = {
        tr: ["Bilgisayar Mühendisi", "Backend Geliştirici", ".NET & Mikroservis", "RAG / NLP ile AI çözümleri", "Event-Driven Mimari"],
        en: ["Computer Engineer", "Backend Developer", ".NET & Microservices", "AI solutions with RAG / NLP", "Event-Driven Architecture"]
    };

    var TOAST = {
        tr: { copied: "E-posta adresi kopyalandı", mail: "E-posta uygulamanız açılıyor…", fill: "Lütfen zorunlu alanları doldurun" },
        en: { copied: "Email address copied", mail: "Opening your mail app…", fill: "Please fill in the required fields" }
    };

    var lang = "tr";
    var trCache = {}; // HTML'deki özgün Türkçe metinler

    /* ---------------------------------------------------------
       2) Dil değiştirme
       --------------------------------------------------------- */
    function cacheTurkish() {
        document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach(function (el) {
            var key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
            if (!(key in trCache)) trCache[key] = el.innerHTML;
        });
    }

    function applyLang(next) {
        lang = next;
        document.documentElement.lang = next;
        document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach(function (el) {
            var key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
            var value = next === "tr" ? trCache[key] : (I18N.en[key] || trCache[key]);
            if (value !== undefined) el.innerHTML = value;
        });

        var sw = document.getElementById("langSwitch");
        if (sw) {
            sw.classList.toggle("is-en", next === "en");
            var labels = sw.querySelectorAll("span");
            labels[0].classList.toggle("is-active", next === "tr");
            labels[1].classList.toggle("is-active", next === "en");
        }
        try { localStorage.setItem("mo-lang", next); } catch (e) { /* özel sekme */ }
        startTyping();
    }

    var langSwitch = document.getElementById("langSwitch");
    if (langSwitch) {
        langSwitch.addEventListener("click", function () {
            applyLang(lang === "tr" ? "en" : "tr");
        });
    }

    /* ---------------------------------------------------------
       3) Hero'daki yazı makinesi efekti
       --------------------------------------------------------- */
    var typedEl = document.getElementById("typed");
    var typeTimer = null;

    function startTyping() {
        if (!typedEl) return;
        clearTimeout(typeTimer);
        var words = TYPED[lang];
        if (reduceMotion) { typedEl.textContent = words[0]; return; }

        var w = 0, c = 0, deleting = false;
        (function tick() {
            var word = words[w];
            typedEl.textContent = word.slice(0, c);
            var wait = deleting ? 45 : 85;

            if (!deleting && c === word.length) {
                deleting = true;
                wait = 1700;
            } else if (deleting && c === 0) {
                deleting = false;
                w = (w + 1) % words.length;
                wait = 320;
            } else {
                c += deleting ? -1 : 1;
            }
            typeTimer = setTimeout(tick, wait);
        })();
    }

    /* ---------------------------------------------------------
       4) Scroll ile ortaya çıkma + sayaç animasyonu
       --------------------------------------------------------- */
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            entry.target.querySelectorAll(".count").forEach(runCounter);
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    document.querySelectorAll(".reveal").forEach(function (el) {
        revealObserver.observe(el);
    });

    function runCounter(el) {
        if (el.dataset.done) return;
        el.dataset.done = "1";
        var target = parseInt(el.dataset.count, 10);
        var suffix = el.dataset.suffix || "";
        if (reduceMotion || isNaN(target)) { el.textContent = target + suffix; return; }

        var start = performance.now(), dur = 1100;
        (function frame(now) {
            var p = Math.min((now - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(frame);
        })(start);
    }

    /* ---------------------------------------------------------
       5) Navigasyon: scroll durumu, aktif bölüm, mobil menü
       --------------------------------------------------------- */
    var nav = document.getElementById("siteNav");
    var progressBar = document.getElementById("progressBar");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
    var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });
    var ticking = false;

    function onScroll() {
        var y = window.scrollY;
        if (nav) nav.classList.toggle("is-stuck", y > 40);

        if (progressBar) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
        }

        var activeIndex = -1;
        sections.forEach(function (sec, i) {
            if (sec && sec.getBoundingClientRect().top <= window.innerHeight * 0.35) activeIndex = i;
        });
        navLinks.forEach(function (a, i) { a.classList.toggle("is-active", i === activeIndex); });
        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });

    var burger = document.getElementById("burger");
    var navMenu = document.getElementById("navLinks");
    if (burger && navMenu) {
        burger.addEventListener("click", function () {
            var open = navMenu.classList.toggle("is-open");
            burger.classList.toggle("is-open", open);
            burger.setAttribute("aria-expanded", String(open));
            document.body.classList.toggle("nav-open", open);
        });
        navMenu.addEventListener("click", function (e) {
            if (e.target.tagName !== "A") return;
            navMenu.classList.remove("is-open");
            burger.classList.remove("is-open");
            burger.setAttribute("aria-expanded", "false");
            document.body.classList.remove("nav-open");
        });
    }

    /* ---------------------------------------------------------
       6) Kart içi ışık (spotlight) + 3B eğilme (tilt)
       --------------------------------------------------------- */
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (fine && !reduceMotion) {
        document.querySelectorAll(".spotlight").forEach(function (card) {
            card.addEventListener("pointermove", function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty("--mx", (e.clientX - r.left) + "px");
                card.style.setProperty("--my", (e.clientY - r.top) + "px");
            });
        });

        document.querySelectorAll(".tilt").forEach(function (el) {
            el.addEventListener("pointermove", function (e) {
                var r = el.getBoundingClientRect();
                var rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
                var ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
                el.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-5px)";
            });
            el.addEventListener("pointerleave", function () { el.style.transform = ""; });
        });

        // Mıknatıs butonlar
        document.querySelectorAll(".magnetic").forEach(function (btn) {
            btn.addEventListener("pointermove", function (e) {
                var r = btn.getBoundingClientRect();
                btn.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.16 + "px," +
                    (e.clientY - r.top - r.height / 2) * 0.28 + "px)";
            });
            btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
        });

        // Fareyi izleyen ışık
        var glow = document.getElementById("cursorGlow");
        if (glow) {
            window.addEventListener("pointermove", function (e) {
                glow.style.opacity = "1";
                glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)";
            }, { passive: true });
        }
    }

    /* ---------------------------------------------------------
       7) Proje filtreleri
       --------------------------------------------------------- */
    var filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
            btn.classList.add("is-active");
            var filter = btn.dataset.filter;

            document.querySelectorAll(".project-card").forEach(function (card) {
                var match = filter === "all" || (card.dataset.type || "").indexOf(filter) !== -1;
                card.classList.toggle("is-hidden", !match);
                if (match) {
                    card.classList.remove("is-visible");
                    requestAnimationFrame(function () { card.classList.add("is-visible"); });
                }
            });
        });
    });

    /* ---------------------------------------------------------
       8) Bildirim balonu + kopyalama
       --------------------------------------------------------- */
    var toastEl = document.getElementById("toast");
    var toastTimer = null;

    function toast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.classList.add("is-visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2400);
    }

    document.querySelectorAll(".copy-btn").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var text = btn.dataset.copy;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function () { toast(TOAST[lang].copied); });
            } else {
                var tmp = document.createElement("input");
                tmp.value = text;
                document.body.appendChild(tmp);
                tmp.select();
                document.execCommand("copy");
                document.body.removeChild(tmp);
                toast(TOAST[lang].copied);
            }
        });
    });

    /* ---------------------------------------------------------
       9) İletişim formu — varsayılan e-posta uygulamasını açar
       --------------------------------------------------------- */
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var nameEl = document.getElementById("cf-name");
            var emailEl = document.getElementById("cf-email");
            var subjectEl = document.getElementById("cf-subject");
            var messageEl = document.getElementById("cf-message");

            var name = nameEl.value.trim();
            var email = emailEl.value.trim();
            var subject = subjectEl.value.trim();
            var message = messageEl.value.trim();

            var ok = true;
            [nameEl, emailEl, messageEl].forEach(function (input) {
                var valid = input.value.trim() !== "" && (input.type !== "email" || /.+@.+\..+/.test(input.value));
                input.classList.toggle("invalid", !valid);
                if (!valid) ok = false;
            });
            if (!ok) { toast(TOAST[lang].fill); return; }

            var body = name + " (" + email + ")\n\n" + message;
            var href = "mailto:mesutzkann@gmail.com" +
                "?subject=" + encodeURIComponent(subject || "Portfolyo üzerinden mesaj — " + name) +
                "&body=" + encodeURIComponent(body);
            toast(TOAST[lang].mail);
            window.location.href = href;
        });
    }

    /* ---------------------------------------------------------
       10) Başlangıç
       --------------------------------------------------------- */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    cacheTurkish();

    var saved = null;
    try { saved = localStorage.getItem("mo-lang"); } catch (e) { /* özel sekme */ }
    if (!saved) saved = (navigator.language || "tr").toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
    applyLang(saved);

    onScroll();
})();
