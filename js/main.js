/* ═══════════════════════════════════════════════════
   SANTO — Hamburguesas & Bistró · main.js
   ═══════════════════════════════════════════════════ */

// ══════════ DATOS DEL MENÚ ══════════
// Edita nombres, descripciones y precios aquí. "tag" es opcional.
const MENU = {
  categorias: [
    { id: "hamburguesas", nombre: "Hamburguesas", icono: "i-burger" },
    { id: "sandwiches", nombre: "Sándwiches", icono: "i-sandwich" },
    { id: "picar", nombre: "Para picar", icono: "i-fries" },
    { id: "bistro", nombre: "Del bistró", icono: "i-chef" },
    { id: "bebidas", nombre: "Bebidas", icono: "i-cup" },
  ],
  items: [
    // ── Hamburguesas ──
    {
      cat: "hamburguesas",
      nombre: "Santo Clásica",
      precio: 18000,
      desc: "Carne de res a la parrilla, queso cheddar, lechuga, tomate, cebolla y salsa de la casa en pan artesanal.",
      tag: "La de siempre",
    },
    {
      cat: "hamburguesas",
      nombre: "La Bendita",
      precio: 26000,
      desc: "Doble carne smash, doble cheddar fundido, tocineta crocante, pepinillos y salsa secreta del chef.",
      tag: "Favorita de la casa",
    },
    {
      cat: "hamburguesas",
      nombre: "Santo Pecado",
      precio: 34000,
      desc: "Triple carne, triple queso, tocineta ahumada y cebolla caramelizada. Un pecado que se perdona.",
      tag: "Para valientes",
    },
    {
      cat: "hamburguesas",
      nombre: "Crispy Santa",
      precio: 22000,
      desc: "Pollo crocante marinado, queso, ensalada fresca de col y nuestra miel-mostaza.",
    },
    // ── Sándwiches ──
    {
      cat: "sandwiches",
      nombre: "Sándwich de la Casa",
      precio: 17000,
      desc: "Pollo desmechado al grill, queso fundido y vegetales frescos en pan artesanal tostado.",
    },
    {
      cat: "sandwiches",
      nombre: "Philly Santo",
      precio: 24000,
      desc: "Carne de res en julianas, queso derretido, pimentón y cebolla salteados al estilo bistró.",
      tag: "Recomendado",
    },
    {
      cat: "sandwiches",
      nombre: "Club Santo",
      precio: 19000,
      desc: "Triple piso con pollo, tocineta, queso, lechuga y tomate. Acompañado de papas de la casa.",
    },
    // ── Para picar ──
    {
      cat: "picar",
      nombre: "Empanadas Santo (x3)",
      precio: 13000,
      desc: "Empanadas artesanales rellenas, doradas al momento, con ají casero para acompañar.",
      tag: "Clásico llanero",
    },
    {
      cat: "picar",
      nombre: "Papas Santo",
      precio: 16000,
      desc: "Papas crocantes bañadas en queso fundido, tocineta y salsas de la casa.",
    },
    {
      cat: "picar",
      nombre: "Nachos del Bistró",
      precio: 21000,
      desc: "Totopos con queso gratinado, carne, pico de gallo y crema agria.",
    },
    // ── Del bistró ──
    {
      cat: "bistro",
      nombre: "Costillas BBQ · Media",
      precio: 32000,
      desc: "Costillas de cerdo cocinadas a fuego lento, glaseadas con nuestra BBQ ahumada.",
    },
    {
      cat: "bistro",
      nombre: "Costillas BBQ · Completa",
      precio: 49000,
      desc: "La porción completa para compartir, con papas de la casa y ensalada fresca.",
      tag: "Para compartir",
    },
    {
      cat: "bistro",
      nombre: "Corte del Chef",
      precio: 45000,
      desc: "Corte de res a la parrilla en su punto, con romero, sal parrillera y toque del chef.",
      tag: "Firma del chef",
    },
    // ── Bebidas ──
    {
      cat: "bebidas",
      nombre: "Limonada Natural / Cerezada",
      precio: 8000,
      desc: "Preparada al momento, bien fría.",
    },
    {
      cat: "bebidas",
      nombre: "Malteada de la Casa",
      precio: 14000,
      desc: "Cremosa, con sabores rotativos. Pregunta por el sabor del día.",
    },
    {
      cat: "bebidas",
      nombre: "Gaseosa / Agua",
      precio: 6000,
      desc: "Bebidas frías para acompañar tu pedido.",
    },
  ],
};

const formatoCOP = (n) =>
  "$" + n.toLocaleString("es-CO", { maximumFractionDigits: 0 });

// ══════════ RENDER DEL MENÚ ══════════
const tabsEl = document.getElementById("menuTabs");
const gridEl = document.getElementById("menuGrid");

function renderTabs() {
  MENU.categorias.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "menu__tab" + (i === 0 ? " is-active" : "");
    btn.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#${cat.icono}"/></svg><span>${cat.nombre}</span>`;
    btn.dataset.cat = cat.id;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.addEventListener("click", () => {
      tabsEl.querySelectorAll(".menu__tab").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      renderItems(cat.id);
    });
    tabsEl.appendChild(btn);
  });
}

function renderItems(catId) {
  gridEl.innerHTML = "";
  MENU.items
    .filter((it) => it.cat === catId)
    .forEach((it, i) => {
      const card = document.createElement("article");
      card.className = "menu-item";
      card.style.animationDelay = i * 0.07 + "s";
      card.innerHTML = `
        <div class="menu-item__head">
          <h3 class="menu-item__name">${it.nombre}</h3>
          <span class="menu-item__dots"></span>
          <span class="menu-item__price">${formatoCOP(it.precio)}</span>
        </div>
        <p class="menu-item__desc">${it.desc}</p>
        ${it.tag ? `<span class="menu-item__tag">✦ ${it.tag}</span>` : ""}
      `;
      gridEl.appendChild(card);
    });
}

if (tabsEl && gridEl) {
  renderTabs();
  renderItems(MENU.categorias[0].id);
}

// ══════════ VIDEO DEL HERO (autoplay robusto en iOS/Android) ══════════
const heroVideo = document.querySelector(".hero__video");
if (heroVideo) {
  heroVideo.defaultMuted = true;
  heroVideo.muted = true;
  const tryPlayHero = () => {
    if (heroVideo.paused) {
      const p = heroVideo.play();
      if (p) p.catch(() => {});
    }
  };
  window.addEventListener("load", tryPlayHero);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tryPlayHero();
  });
  // Si el sistema bloqueó el autoplay (p. ej. modo bajo consumo en iPhone),
  // el primer toque o scroll del usuario ya permite reproducirlo.
  ["touchstart", "click", "scroll"].forEach((ev) =>
    document.addEventListener(ev, tryPlayHero, { once: true, passive: true })
  );
}

// ══════════ PRELOADER ══════════
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  setTimeout(() => pre.classList.add("is-done"), 500);
});
// Respaldo por si "load" tarda (videos pesados)
setTimeout(() => {
  document.getElementById("preloader")?.classList.add("is-done");
}, 3500);

// ══════════ NAVBAR ══════════
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const burger = document.getElementById("navBurger");

window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  },
  { passive: true }
);

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});

// Cerrar menú móvil al navegar
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  })
);

// Enlace activo según la sección visible
const secciones = document.querySelectorAll("section[id]");
const enlaces = document.querySelectorAll(".nav__link");

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        enlaces.forEach((l) =>
          l.classList.toggle(
            "is-active",
            l.getAttribute("href") === "#" + entry.target.id
          )
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
secciones.forEach((s) => spy.observe(s));

// ══════════ REVEAL AL HACER SCROLL ══════════
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ══════════ VIDEO DEL CHEF ══════════
const chefVideo = document.getElementById("chefVideo");
const chefPlayBtn = document.getElementById("chefPlayBtn");
const chefMuteBtn = document.getElementById("chefMuteBtn");
const phoneFrame = document.querySelector(".phone-frame");

if (chefVideo && chefPlayBtn) {
  const toggleChef = () => {
    if (chefVideo.paused) {
      chefVideo.play();
      phoneFrame.classList.add("is-playing");
      chefPlayBtn.setAttribute("aria-label", "Pausar video del chef");
    } else {
      chefVideo.pause();
      phoneFrame.classList.remove("is-playing");
      chefPlayBtn.setAttribute("aria-label", "Reproducir video del chef");
    }
  };
  chefPlayBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleChef();
  });
  chefVideo.addEventListener("click", toggleChef);
  chefVideo.addEventListener("ended", () => {
    phoneFrame.classList.remove("is-playing");
    chefVideo.currentTime = 0;
  });

  // Botón de silencio (como el de la referencia)
  if (chefMuteBtn) {
    chefMuteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      chefVideo.muted = !chefVideo.muted;
      chefMuteBtn.classList.toggle("is-muted", chefVideo.muted);
      chefMuteBtn.setAttribute(
        "aria-label",
        chefVideo.muted ? "Activar sonido" : "Silenciar"
      );
    });
  }
  // Pausar si sale de pantalla
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && !chefVideo.paused) {
          chefVideo.pause();
          phoneFrame.classList.remove("is-playing");
        }
      });
    },
    { threshold: 0.25 }
  ).observe(chefVideo);
}

// ══════════ AÑO DEL FOOTER ══════════
document.getElementById("year").textContent = new Date().getFullYear();
