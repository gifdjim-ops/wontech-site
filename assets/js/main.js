const DATA = window.WONTECH_DATA || { products: [], locations: [] };
const requestKey = "wontechRequestV2";
let requestItems = loadRequest();

function loadRequest() {
  try {
    return JSON.parse(localStorage.getItem(requestKey) || "[]");
  } catch {
    return [];
  }
}

function saveRequest() {
  localStorage.setItem(requestKey, JSON.stringify(requestItems));
}

function productById(id) {
  return DATA.products.find((product) => product.id === id);
}

function updateRequestCount() {
  document.querySelectorAll("[data-request-count]").forEach((node) => {
    node.textContent = requestItems.length;
  });
}

function addProduct(id, openAfter = false) {
  const product = productById(id);
  if (!product) return;
  if (!requestItems.some((item) => item.id === id)) {
    requestItems.push({
      id: product.id,
      title: product.title,
      label: product.label,
      system: product.system,
      positions: product.positions
    });
    saveRequest();
  }
  updateRequestCount();
  renderRequestItems();
  if (openAfter) openRequest();
}

function removeProduct(id) {
  requestItems = requestItems.filter((item) => item.id !== id);
  saveRequest();
  updateRequestCount();
  renderRequestItems();
}

function renderRequestItems() {
  const wrap = document.querySelector("#requestItems");
  if (!wrap) return;
  if (!requestItems.length) {
    wrap.innerHTML = '<div class="empty-request">Позиции пока не выбраны. Можно отправить заявку без выбора карточек и описать задачу в комментарии.</div>';
    return;
  }
  wrap.innerHTML = requestItems.map((item) => `
    <div class="request-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.label)} · ${escapeHtml(item.system)} · ${escapeHtml(item.positions)}</span>
      </div>
      <button type="button" data-remove-product="${escapeHtml(item.id)}">Удалить</button>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function openRequest() {
  const panel = document.querySelector("#requestPanel");
  if (!panel) return;
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
  renderRequestItems();
  checkTelegramStatus();
}

function closeRequest() {
  const panel = document.querySelector("#requestPanel");
  if (!panel) return;
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-open");
}

function formFields(form) {
  const data = new FormData(form);
  return {
    name: (data.get("name") || "").trim(),
    company: (data.get("company") || "").trim(),
    contact: (data.get("contact") || "").trim(),
    region: (data.get("region") || "").trim(),
    comment: (data.get("comment") || "").trim(),
    specification: (data.get("specification") || "").trim()
  };
}

function buildPayload(form) {
  return {
    fields: formFields(form),
    items: requestItems,
    source: window.location.href,
    pageTitle: document.title,
    createdAt: new Date().toISOString()
  };
}

function requestText(payload) {
  const fields = payload.fields || {};
  const lines = [
    "Заявка WONTECH",
    "",
    `Имя: ${fields.name || "-"}`,
    `Компания: ${fields.company || "-"}`,
    `Контакт: ${fields.contact || "-"}`,
    `Регион доставки: ${fields.region || "-"}`,
    ""
  ];
  if (payload.items && payload.items.length) {
    lines.push("Позиции:");
    payload.items.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.title}`);
      lines.push(`   Система: ${item.system}`);
      lines.push(`   Позиции: ${item.positions}`);
    });
    lines.push("");
  }
  if (fields.specification) {
    lines.push("Спецификация:");
    lines.push(fields.specification);
    lines.push("");
  }
  lines.push(`Комментарий: ${fields.comment || "-"}`);
  lines.push(`Источник: ${payload.source || "-"}`);
  return lines.join("\n");
}

async function sendPayload(payload) {
  const response = await fetch("/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (!response.ok || !result.ok) {
    throw new Error(result.error || "Не удалось отправить заявку");
  }
  return result;
}

async function checkTelegramStatus() {
  const status = document.querySelector("#telegramStatus");
  if (!status) return;
  try {
    const response = await fetch("/api/status");
    const result = await response.json();
    const ready = Boolean(result.ok && result.telegramReady);
    status.className = `telegram-status ${ready ? "ok" : "warning"}`;
    status.textContent = ready
      ? "Telegram подключен. Заявка отправится через backend сайта."
      : "Telegram пока не готов. Заявку можно скопировать и отправить вручную.";
  } catch {
    status.className = "telegram-status warning";
    status.textContent = "Backend не отвечает. Для заявок нужен запуск через Node-сервер.";
  }
}

function initRequestForm() {
  const form = document.querySelector("#requestForm");
  const status = document.querySelector("#formStatus");
  const copy = document.querySelector("#copyRequest");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = buildPayload(form);
    status.textContent = "Отправляем заявку...";
    status.classList.remove("error");
    try {
      await sendPayload(payload);
      status.textContent = "Заявка отправлена.";
      requestItems = [];
      saveRequest();
      updateRequestCount();
      renderRequestItems();
      form.reset();
    } catch (error) {
      status.textContent = `Не удалось отправить через Telegram: ${error.message}. Скопируйте текст заявки.`;
      status.classList.add("error");
    }
  });

  copy?.addEventListener("click", async () => {
    const payload = buildPayload(form);
    try {
      await navigator.clipboard.writeText(requestText(payload));
      status.textContent = "Текст заявки скопирован.";
      status.classList.remove("error");
    } catch {
      status.textContent = "Не удалось скопировать автоматически.";
      status.classList.add("error");
    }
  });
}

function initSpecificationForm() {
  const form = document.querySelector("#specificationForm");
  if (!form) return;
  const status = document.querySelector("[data-spec-status]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = buildPayload(form);
    status.textContent = "Отправляем спецификацию...";
    status.classList.remove("error");
    try {
      await sendPayload(payload);
      status.textContent = "Спецификация отправлена.";
      form.reset();
    } catch (error) {
      status.textContent = `Не удалось отправить: ${error.message}. Откройте короткую заявку и скопируйте текст вручную.`;
      status.classList.add("error");
    }
  });
}

function initCatalogFilter() {
  const search = document.querySelector("[data-catalog-search]");
  const category = document.querySelector("[data-catalog-category]");
  const cards = [...document.querySelectorAll("[data-product-card]")];
  const count = document.querySelector("[data-catalog-count]");
  if (!cards.length) return;

  function apply() {
    const query = (search?.value || "").trim().toLowerCase();
    const currentCategory = category?.value || "all";
    let visible = 0;
    cards.forEach((card) => {
      const matchCategory = currentCategory === "all" || card.dataset.category === currentCategory;
      const matchSearch = !query || (card.dataset.search || "").includes(query);
      const show = matchCategory && matchSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} позиций`;
  }

  search?.addEventListener("input", apply);
  category?.addEventListener("change", apply);
  document.querySelector("[data-reset-filter]")?.addEventListener("click", () => {
    if (search) search.value = "";
    if (category) category.value = "all";
    apply();
  });
  apply();
}

function initYandexMap() {
  const mapNode = document.querySelector("[data-yandex-map]");
  if (!mapNode) return;

  function fallback() {
    mapNode.innerHTML = '<iframe title="Яндекс.Карта поставок" src="https://yandex.ru/map-widget/v1/?ll=63.000000%2C57.500000&z=4&mode=search&text=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C%20%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%2C%20%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA" loading="lazy"></iframe>';
  }

  function render() {
    if (!window.ymaps) {
      fallback();
      return;
    }
    window.ymaps.ready(() => {
      mapNode.innerHTML = "";
      const map = new window.ymaps.Map(mapNode, {
        center: [57.2, 65.0],
        zoom: 4,
        controls: ["zoomControl", "fullscreenControl"]
      });
      DATA.locations.forEach((point) => {
        const placemark = new window.ymaps.Placemark(point.coords, {
          balloonContentHeader: point.city,
          balloonContentBody: point.note,
          hintContent: point.city
        }, {
          preset: "islands#orangeDotIcon"
        });
        map.geoObjects.add(placemark);
      });
      const bounds = map.geoObjects.getBounds();
      if (bounds) map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 60 });
    });
  }

  const script = document.createElement("script");
  script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
  script.async = true;
  script.onload = render;
  script.onerror = fallback;
  document.head.appendChild(script);
  window.setTimeout(() => {
    if (!window.ymaps && !mapNode.querySelector("iframe")) fallback();
  }, 4500);
}

document.addEventListener("click", (event) => {
  const add = event.target.closest("[data-add-product]");
  if (add) {
    addProduct(add.dataset.addProduct, Boolean(add.dataset.openAfterAdd));
  }
  if (event.target.closest("[data-open-request]")) openRequest();
  if (event.target.closest("[data-close-request]")) closeRequest();
  const remove = event.target.closest("[data-remove-product]");
  if (remove) removeProduct(remove.dataset.removeProduct);
});

document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => {
  document.querySelector("[data-main-nav]")?.classList.toggle("is-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeRequest();
});

updateRequestCount();
renderRequestItems();
initRequestForm();
initSpecificationForm();
initCatalogFilter();
initYandexMap();
checkTelegramStatus();
