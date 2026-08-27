const fs = require("fs");
const path = require("path");

const root = __dirname;

const categories = [
  {
    id: "hammers",
    nav: "Пневмоударники",
    title: "Пневмоударники WONTECH",
    page: "/category-hammers.html",
    image: "/assets/images/COP64_QL60_hammer.jpg",
    intro:
      "Пневмоударники для DTH-бурения. Подбор выполняется по системе, буровой установке, условиям работы и требуемой совместимости с коронками.",
    cta: "Подобрать пневмоударник"
  },
  {
    id: "wt-series",
    nav: "WT-серия",
    title: "WT-серия WONTECH",
    page: "/category-wt-series.html",
    image: "/assets/images/official/official-wt-hammers.png",
    intro:
      "Пневмоударники и коронки WT-серии. Модели и совместимость уточняются по системе, диаметру и оборудованию заказчика.",
    cta: "Запросить WT-серию"
  },
  {
    id: "bits",
    nav: "Коронки",
    title: "Буровые коронки WONTECH",
    page: "/category-bits.html",
    image: "/assets/images/local/stock-crowns-wrapped.jpg",
    intro:
      "Коронки для DTH-систем с известными группами диаметров. Точный размер, наличие и сроки поставки уточняются перед расчетом.",
    cta: "Уточнить наличие"
  },
  {
    id: "pdc",
    nav: "PDC / PDS",
    title: "PDC / PDS-коронки и долота",
    page: "/category-pdc.html",
    image: "/assets/images/local/pdc-crowns-studio.png",
    intro:
      "Коронки и долота PDC / PDS. Конкретная модель, резьба, диаметр и исполнение подтверждаются по спецификации заказчика.",
    cta: "Отправить спецификацию"
  },
  {
    id: "rc",
    nav: "RC",
    title: "RC-инструмент",
    page: "/category-rc.html",
    image: "/assets/images/local/stock-grey-bits.jpg",
    intro:
      "Направление для заявок на инструмент обратной циркуляции. Совместимость и комплект поставки подтверждаются при подборе.",
    cta: "Запросить подбор"
  },
  {
    id: "top-hammer",
    nav: "Гидроперфораторное бурение",
    title: "Гидроперфораторное бурение WONTECH",
    page: "/category-top-hammer.html",
    image: "/assets/images/official/official-top-hammer-bits.png",
    intro:
      "Резьбовые и конические коронки, штанги, муфты и хвостовики для верхнего гидроударного бурения. Подбор выполняется по резьбе и диаметру.",
    cta: "Подобрать резьбу"
  },
  {
    id: "large-diameter",
    nav: "Большой диаметр",
    title: "Инструмент большого диаметра WONTECH",
    page: "/category-large-diameter.html",
    image: "/assets/images/official/official-wt370.png",
    intro:
      "Пневмоударники, коронки и комплектующие большого диаметра из каталогов WONTECH. Конкретная система, диаметр и комплектность уточняются по проекту и буровой установке.",
    cta: "Запросить большой диаметр"
  },
  {
    id: "cluster",
    nav: "Кластерные молоты",
    title: "Кластерные пневмоударники WONTECH",
    page: "/category-cluster.html",
    image: "/assets/images/official/official-cluster-wtc380.png",
    intro:
      "Кластерные DTH-системы для задач большого диаметра. Модельный ряд и конфигурация подбираются по требуемому диаметру, оборудованию и условиям бурения.",
    cta: "Запросить кластерный молот"
  },
  {
    id: "casing",
    nav: "Обсадные системы",
    title: "Обсадные системы WONTECH",
    page: "/category-casing.html",
    image: "/assets/images/local/casing-system-front.jpg",
    intro:
      "Эксцентриковые, концентрические и крыльевые системы для бурения с обсадной колонной. Размер и комплектность уточняются перед расчетом.",
    cta: "Запросить обсадную систему"
  },
  {
    id: "tricone",
    nav: "Шарошечные долота",
    title: "Шарошечные долота WONTECH",
    page: "/category-tricone.html",
    image: "/assets/images/external/tricone-drill-bit-usgs-public-domain.jpg",
    intro:
      "Шарошечные долота как отдельное направление поставки. Тип, диаметр и присоединение подбираются по задаче и спецификации.",
    cta: "Запросить долото"
  },
  {
    id: "accessories",
    nav: "Комплектующие",
    title: "Комплектующие",
    page: "/category-accessories.html",
    image: "/assets/images/local/workshop-stock.jpg",
    intro:
      "Переходники, штанги, приемные устройства и сопутствующие позиции. Состав заявки формируется по задаче и спецификации.",
    cta: "Отправить список"
  }
];

const products = [
  {
    id: "hammer-cop44-ql40",
    slug: "hammer-cop44-ql40",
    title: "Пневмоударник WONTECH COP44 / QL40",
    category: "hammers",
    label: "Пневмоударник",
    system: "COP44 / QL40",
    image: "/assets/images/COP44_QL40_hammer.jpg",
    summary:
      "Группа пневмоударников для DTH-бурения. Совместимость, характеристики и наличие уточняются при подборе.",
    positions: "COP44 / QL40",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "COP44 / QL40"],
      ["Характеристики", "уточняются при подборе"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "bit-cop44-ql40",
    slug: "bits-cop44-ql40",
    title: "Коронки WONTECH для COP44 / QL40",
    category: "bits",
    label: "Коронки",
    system: "COP44 / QL40",
    image: "/assets/images/COP44_QL40_bits_110_115_130.jpg",
    summary:
      "Группа коронок для системы COP44 / QL40. Диаметр выбирается по задаче и подтверждается перед расчетом.",
    positions: "110 / 115 / 130 мм",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "COP44 / QL40"],
      ["Доступные диаметры", "110 / 115 / 130 мм"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "hammer-cop54-ql50",
    slug: "hammer-cop54-ql50",
    title: "Пневмоударник WONTECH COP54 / QL50",
    category: "hammers",
    label: "Пневмоударник",
    system: "COP54 / QL50",
    image: "/assets/images/COP54_QL50_hammer.jpg",
    summary:
      "Группа пневмоударников для DTH-задач. Параметры и совместимость уточняются по буровой установке.",
    positions: "COP54 / QL50",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "COP54 / QL50"],
      ["Характеристики", "уточняются при подборе"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "bit-cop54-ql50",
    slug: "bits-cop54-ql50",
    title: "Коронки WONTECH для COP54 / QL50",
    category: "bits",
    label: "Коронки",
    system: "COP54 / QL50",
    image: "/assets/images/COP54_QL50_bits_140_146_152.jpg",
    summary:
      "Коронки для системы COP54 / QL50. Диаметры вынесены группой, чтобы не дробить каталог без необходимости.",
    positions: "140 / 146 / 152 мм",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "COP54 / QL50"],
      ["Доступные диаметры", "140 / 146 / 152 мм"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "hammer-cop64-ql60",
    slug: "hammer-cop64-ql60",
    title: "Пневмоударник WONTECH COP64 / QL60",
    category: "hammers",
    label: "Пневмоударник",
    system: "COP64 / QL60",
    image: "/assets/images/COP64_QL60_hammer.jpg",
    summary:
      "Группа пневмоударников COP64 / QL60. Подбор выполняется по системе, оборудованию и условиям бурения.",
    positions: "COP64 / QL60",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "COP64 / QL60"],
      ["Характеристики", "уточняются при подборе"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "bit-cop64-ql60",
    slug: "bits-cop64-ql60",
    title: "Коронки WONTECH для COP64 / QL60",
    category: "bits",
    label: "Коронки",
    system: "COP64 / QL60",
    image: "/assets/images/COP64_QL60_bits_165_171_178_190.jpg",
    summary:
      "Коронки для системы COP64 / QL60. Размер и количество подтверждаются в заявке.",
    positions: "165 / 171 / 178 / 190 мм",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "COP64 / QL60"],
      ["Доступные диаметры", "165 / 171 / 178 / 190 мм"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "hammer-ql80",
    slug: "hammer-ql80",
    title: "Пневмоударник WONTECH QL80",
    category: "hammers",
    label: "Пневмоударник",
    system: "QL80",
    image: "/assets/images/QL80_hammer.jpg",
    summary:
      "Группа пневмоударников QL80. Наличие и параметры подтверждаются перед заказом.",
    positions: "QL80",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "QL80"],
      ["Характеристики", "уточняются при подборе"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "bit-ql80",
    slug: "bits-ql80",
    title: "Коронки WONTECH для QL80",
    category: "bits",
    label: "Коронки",
    system: "QL80",
    image: "/assets/images/QL80_bits_203_219_254_279_305.jpg",
    summary:
      "Коронки для QL80. Диаметр подбирается по требуемому размеру скважины и совместимости.",
    positions: "203 / 219 / 254 / 279 / 305 мм",
    specs: [
      ["Бренд", "WONTECH"],
      ["Система", "QL80"],
      ["Доступные диаметры", "203 / 219 / 254 / 279 / 305 мм"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "wt-series-hammers",
    slug: "wt-series-hammers",
    title: "Пневмоударники WONTECH WT-серии",
    category: "wt-series",
    label: "WT-серия",
    system: "WT3 / WT4 / WT5 / WT6 / WT8",
    image: "/assets/images/official/official-wt-hammers.png",
    summary:
      "Высокоскоростная WT-серия пневмоударников. В каталоге WONTECH указаны группы WT3, WT4, WT5, WT6 и WT8; конкретная модель подбирается по диаметру и задаче.",
    positions: "WT3 / WT4 / WT5 / WT6 / WT8",
    specs: [
      ["Бренд", "WONTECH"],
      ["Серия", "WT"],
      ["Модели из каталога", "WT3 / WT4 / WT5 / WT6 / WT8"],
      ["Подбор", "по диаметру скважины, системе и оборудованию"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "wt-series-bits",
    slug: "wt-series-bits",
    title: "Коронки WONTECH WT-серии",
    category: "wt-series",
    label: "WT-серия",
    system: "BWT3 / BWT4 / BWT5 / BWT6 / BWT8",
    image: "/assets/images/official/official-bit-wt.png",
    summary:
      "Коронки для WT-серии. Диаметр, форма фронтальной части и совместимость подтверждаются по спецификации заказчика.",
    positions: "BWT3 / BWT4 / BWT5 / BWT6 / BWT8",
    specs: [
      ["Бренд", "WONTECH"],
      ["Серия", "WT"],
      ["Группы из каталога", "BWT3 / BWT4 / BWT5 / BWT6 / BWT8"],
      ["Характеристики", "уточняются при подборе"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "pdc-request",
    slug: "pdc-request",
    title: "PDC / PDS-коронки и долота WONTECH",
    category: "pdc",
    label: "PDC / PDS",
    system: "По спецификации",
    image: "/assets/images/local/pdc-crowns-studio.png",
    summary:
      "Направление PDC / PDS-коронок и долот. Конкретная модель, резьба, диаметр и исполнение уточняются по задаче и спецификации.",
    positions: "PDC / PDS-коронки и долота",
    specs: [
      ["Бренд", "WONTECH"],
      ["Направление", "PDC / PDS-коронки и долота"],
      ["Подбор", "по спецификации заказчика"],
      ["Фото", "коронки и долота добавлены в карточку"],
      ["Цена", "рассчитывается индивидуально"]
    ],
    gallery: [
      "/assets/images/local/pdc-crowns-studio.png",
      "/assets/images/local/stock-crowns-wrapped.jpg",
      "/assets/images/local/stock-grey-bits.jpg",
      "/assets/images/local/pdc-bit-146.jpg",
      "/assets/images/local/pdc-bit-gold.jpg",
      "/assets/images/local/pdc-bits-group.jpg"
    ]
  },
  {
    id: "pdc-crowns-request",
    slug: "pdc-crowns-request",
    title: "PDC / PDS-коронки WONTECH",
    category: "pdc",
    label: "PDC / PDS",
    system: "Коронки",
    image: "/assets/images/local/stock-crowns-wrapped.jpg",
    summary:
      "Коронки PDC / PDS как отдельная позиция для запроса. Диаметр, резьба и исполнение подтверждаются перед расчетом.",
    positions: "PDC / PDS-коронки",
    specs: [
      ["Бренд", "WONTECH"],
      ["Тип", "PDC / PDS-коронки"],
      ["Подбор", "по спецификации заказчика"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "по расчету"]
    ],
    gallery: [
      "/assets/images/local/stock-crowns-wrapped.jpg",
      "/assets/images/local/pdc-crowns-studio.png"
    ]
  },
  {
    id: "pdc-bits-request",
    slug: "pdc-bits-request",
    title: "PDC / PDS-долота WONTECH",
    category: "pdc",
    label: "PDC / PDS",
    system: "Долота",
    image: "/assets/images/local/stock-grey-bits.jpg",
    summary:
      "Долота PDC / PDS для заявок по спецификации. Модель и присоединение уточняются по оборудованию и условиям бурения.",
    positions: "PDC / PDS-долота",
    specs: [
      ["Бренд", "WONTECH"],
      ["Тип", "PDC / PDS-долота"],
      ["Подбор", "по задаче и спецификации"],
      ["Параметры", "уточняются при подборе"],
      ["Цена", "по расчету"]
    ],
    gallery: [
      "/assets/images/local/stock-grey-bits.jpg",
      "/assets/images/local/pdc-bit-146.jpg",
      "/assets/images/local/pdc-bit-gold.jpg",
      "/assets/images/local/pdc-bits-group.jpg"
    ]
  },
  {
    id: "rc-request",
    slug: "rc-request",
    title: "RC-молоты и RC-коронки WONTECH",
    category: "rc",
    label: "RC",
    system: "По спецификации",
    image: "/assets/images/local/warehouse-wide.jpg",
    summary:
      "Направление для заявок на RC-инструмент. Состав поставки и совместимость уточняются при подборе.",
    positions: "подбор по спецификации",
    specs: [
      ["Бренд", "WONTECH"],
      ["Направление", "RC-инструмент"],
      ["Подбор", "по спецификации заказчика"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ],
    gallery: [
      "/assets/images/local/warehouse-wide.jpg",
      "/assets/images/local/warehouse-aisle.jpg",
      "/assets/images/local/warehouse-hammers.jpg"
    ]
  },
  {
    id: "top-hammer-threaded-bits",
    slug: "top-hammer-threaded-bits",
    title: "Резьбовые кнопочные коронки для гидроперфораторного бурения",
    category: "top-hammer",
    label: "Гидроперфораторное бурение",
    system: "R28 / R32 / R38 / T38 / T45 / T51 / ST58 / GT60",
    image: "/assets/images/official/official-top-hammer-bits.png",
    summary:
      "Резьбовые кнопочные коронки для верхнего гидроударного бурения. В каталоге указаны резьбы R28, R32, R38, T38, T45, T51, ST58 и GT60.",
    positions: "43 / 51 / 76 / 89 / 102 / 110 / 115 / 127 / 140 / 152 мм",
    specs: [
      ["Бренд", "WONTECH"],
      ["Тип", "резьбовая кнопочная коронка"],
      ["Резьбы", "R28 / R32 / R38 / T38 / T45 / T51 / ST58 / GT60"],
      ["Диаметры из каталога", "43-152 мм"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "top-hammer-rods-adapters",
    slug: "top-hammer-rods-adapters",
    title: "Штанги, муфты и хвостовики для гидроперфораторного бурения",
    category: "top-hammer",
    label: "Гидроперфораторное бурение",
    system: "По резьбе и установке",
    image: "/assets/images/official/official-top-hammer-rods.png",
    summary:
      "Штанги, соединительные муфты и хвостовики. Подбор выполняется по резьбе, буровой установке и текущей спецификации.",
    positions: "штанги / муфты / хвостовики",
    specs: [
      ["Бренд", "WONTECH"],
      ["Тип", "комплектующие для верхнего гидроударного бурения"],
      ["Подбор", "по резьбе и оборудованию"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "casing-systems-request",
    slug: "casing-systems-request",
    title: "Обсадные системы WONTECH",
    category: "casing",
    label: "Обсадные системы",
    system: "ODEX / концентрические / крыльевые",
    image: "/assets/images/local/casing-system-front.jpg",
    summary:
      "Системы бурения с продвижением обсадной колонны: эксцентриковые, концентрические и крыльевые решения. Комплектность уточняется по задаче.",
    positions: "ODEX / концентрические / крыльевые системы",
    specs: [
      ["Бренд", "WONTECH"],
      ["Тип", "обсадные системы"],
      ["Системы", "ODEX, концентрические, крыльевые"],
      ["Подбор", "по наружному диаметру трубы и задаче"],
      ["Цена", "по расчету"]
    ],
    gallery: [
      "/assets/images/local/casing-system-front.jpg",
      "/assets/images/local/casing-system-side.jpg",
      "/assets/images/local/casing-system-assembled.jpg"
    ]
  },
  {
    id: "tricone-bits-request",
    slug: "tricone-bits-request",
    title: "Шарошечные долота WONTECH",
    category: "tricone",
    label: "Шарошечные долота",
    system: "По спецификации",
    image: "/assets/images/external/tricone-drill-bit-usgs-public-domain.jpg",
    summary:
      "Шарошечные долота вынесены отдельным направлением, чтобы не смешивать их с PDC/PDS и DTH-коронками. Диаметр и присоединение уточняются по заявке.",
    positions: "подбор по спецификации",
    specs: [
      ["Бренд", "WONTECH"],
      ["Тип", "шарошечное долото"],
      ["Подбор", "по диаметру, породе и присоединению"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "по расчету"]
    ],
    gallery: [
      "/assets/images/external/tricone-drill-bit-usgs-public-domain.jpg"
    ]
  },
  {
    id: "dth-pipes-adapters",
    slug: "dth-pipes-adapters",
    title: "Буровые трубы и адаптеры DTH WONTECH",
    category: "accessories",
    label: "Комплектующие",
    system: "API Reg / IF / BECO по запросу",
    image: "/assets/images/local/workshop-stock.jpg",
    summary:
      "Буровые трубы, переходники и адаптеры DTH. Длина, диаметр и резьбовое соединение уточняются по спецификации.",
    positions: "трубы / адаптеры / переходники",
    specs: [
      ["Бренд", "WONTECH"],
      ["Тип", "буровые трубы и адаптеры DTH"],
      ["Резьбы", "API Reg / IF / BECO по запросу"],
      ["Подбор", "по системе и длине"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "accessories-request",
    slug: "accessories-request",
    title: "Комплектующие для бурового инструмента",
    category: "accessories",
    label: "Комплектующие",
    system: "По спецификации",
    image: "/assets/images/local/workshop-stock.jpg",
    summary:
      "Переходники, штанги, приемные устройства и сопутствующие элементы. Список формируется по задаче.",
    positions: "подбор по спецификации",
    specs: [
      ["Бренд", "WONTECH"],
      ["Направление", "комплектующие"],
      ["Подбор", "по системе и задаче"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  }
];

const extendedProducts = [
  {
    id: "hammers-2-3-inch",
    slug: "hammers-2-3-inch",
    title: "Пневмоударники 2-3 дюйма WONTECH",
    category: "hammers",
    label: "DTH-пневмоударники",
    system: "2-3 inch",
    image: "/assets/images/official/official-wd-hammers.png",
    summary:
      "Малая размерная группа DTH-пневмоударников для заявок, где требуется компактная система. Точная модель, присоединение и рабочие параметры уточняются при подборе.",
    positions: "2-3 inch DTH hammers",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Группа", "2-3 inch DTH hammers"],
      ["Подбор", "по оборудованию, диаметру и условиям бурения"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "hammers-10-12-inch",
    slug: "hammers-10-12-inch",
    title: "Пневмоударники 10-12+ дюймов WONTECH",
    category: "hammers",
    label: "DTH-пневмоударники",
    system: "10 / 12+ inch",
    image: "/assets/images/official/official-wmsd-hammers.png",
    summary:
      "Крупная размерная группа DTH-пневмоударников для промышленных заявок. Конкретная модель и комплектность согласуются по спецификации заказчика.",
    positions: "10 inch / 12+ inch DTH hammers",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Группа", "10 inch / 12+ inch DTH hammers"],
      ["Наличие и сроки", "уточняются перед заказом"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "wbr-series-hammers",
    slug: "wbr-series-hammers",
    title: "Пневмоударники WBR-серии WONTECH",
    category: "hammers",
    label: "DTH-пневмоударники",
    system: "WBR series",
    image: "/assets/images/official/official-wbr-hammers.png",
    summary:
      "WBR-серия вынесена отдельной карточкой, чтобы не смешивать ее с WT, WQL и другими системами. Совместимость и параметры подтверждаются при подборе.",
    positions: "WBR series DTH hammers",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "WBR"],
      ["Подбор", "по системе, оборудованию и задаче"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "wql-series-hammers",
    slug: "wql-series-hammers",
    title: "Пневмоударники WQL-серии WONTECH",
    category: "hammers",
    label: "DTH-пневмоударники",
    system: "WQL series",
    image: "/assets/images/official/official-wql-hammers.png",
    summary:
      "WQL-серия DTH-пневмоударников. Для расчета нужны система, требуемый диаметр, буровая установка, регион доставки и количество.",
    positions: "WQL series DTH hammers",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "WQL"],
      ["Характеристики", "уточняются при подборе"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "wd-series-hammers",
    slug: "wd-series-hammers",
    title: "Пневмоударники WD-серии WONTECH",
    category: "hammers",
    label: "DTH-пневмоударники",
    system: "WD series",
    image: "/assets/images/official/official-wd-hammers.png",
    summary:
      "WD-серия добавлена как отдельное направление из каталога. Модель, присоединение и комплект поставки подтверждаются перед заказом.",
    positions: "WD series DTH hammers",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "WD"],
      ["Наличие и сроки", "уточняются перед заказом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "wmsd-series-hammers",
    slug: "wmsd-series-hammers",
    title: "Пневмоударники WMSD-серии WONTECH",
    category: "hammers",
    label: "DTH-пневмоударники",
    system: "WMSD series",
    image: "/assets/images/official/official-wmsd-hammers.png",
    summary:
      "WMSD-серия DTH-пневмоударников. Карточка нужна для заявок, где клиент указывает именно эту серию или подбирает замену по системе.",
    positions: "WMSD series DTH hammers",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "WMSD"],
      ["Подбор", "по спецификации заказчика"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "large-diameter-hammers",
    slug: "large-diameter-hammers",
    title: "Пневмоударники большого диаметра WONTECH",
    category: "large-diameter",
    label: "Большой диаметр",
    system: "WT320 / WT370 / WSD12AR / WNM125",
    image: "/assets/images/official/official-wt370.png",
    summary:
      "Большие DTH-пневмоударники из каталогов WONTECH. Подбор выполняется по требуемому диаметру скважины, буровой установке и условиям работы.",
    positions: "WT320 / WT370 / WSD12AR / WNM125",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Модели из каталогов", "WT320 / WT370 / WSD12AR / WNM125"],
      ["Подбор", "по проекту и буровому оборудованию"],
      ["Цена", "рассчитывается индивидуально"]
    ],
    gallery: [
      "/assets/images/official/official-wt320.png",
      "/assets/images/official/official-wt370.png",
      "/assets/images/official/official-wsd12ar.png",
      "/assets/images/official/official-wnm125.png"
    ]
  },
  {
    id: "large-diameter-bits",
    slug: "large-diameter-bits",
    title: "Коронки большого диаметра WONTECH",
    category: "large-diameter",
    label: "Большой диаметр",
    system: "Large size DTH bits",
    image: "/assets/images/QL80_bits_203_219_254_279_305.jpg",
    summary:
      "Коронки большого диаметра для DTH-систем. Диаметр, хвостовик, форма забоя и исполнение уточняются по спецификации и условиям бурения.",
    positions: "203 / 219 / 254 / 279 / 305 / 311 / 315 / 330 / 356 / 381 мм по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Группа", "Large size DTH bits"],
      ["Диаметры", "уточняются перед расчетом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "cluster-drill-wtc",
    slug: "cluster-drill-wtc",
    title: "Кластерные пневмоударники WTC WONTECH",
    category: "cluster",
    label: "Кластерные молоты",
    system: "WTC380 / WTC445 / WTC465 / WTC525 / WTC800",
    image: "/assets/images/official/official-cluster-wtc380.png",
    summary:
      "Кластерные DTH-системы WTC для задач большого диаметра. Конфигурация подбирается по требуемому диаметру, оборудованию и проектной задаче.",
    positions: "WTC380 / WTC445 / WTC465 / WTC525 / WTC800",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "WTC"],
      ["Подбор", "по диаметру, установке и условиям бурения"],
      ["Цена", "рассчитывается индивидуально"]
    ],
    gallery: [
      "/assets/images/official/official-cluster-wtc380.png",
      "/assets/images/official/official-cluster-wtc445.png",
      "/assets/images/official/official-cluster-wtc465.png",
      "/assets/images/official/official-cluster-wtc525.png",
      "/assets/images/official/official-cluster-wtc800.png"
    ]
  },
  {
    id: "bits-dhd-series",
    slug: "bits-dhd-series",
    title: "Коронки DHD-серии WONTECH",
    category: "bits",
    label: "DTH-коронки",
    system: "DHD series",
    image: "/assets/images/official/official-bit-dhd.png",
    summary:
      "DHD-серия DTH-коронок выделена отдельно от уже добавленных QL/COP-групп. Диаметр и исполнение подтверждаются по заявке.",
    positions: "DHD series DTH bits",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "DHD"],
      ["Подбор", "по системе и диаметру"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "bits-sd-series",
    slug: "bits-sd-series",
    title: "Коронки SD-серии WONTECH",
    category: "bits",
    label: "DTH-коронки",
    system: "SD series",
    image: "/assets/images/official/official-bit-sd.png",
    summary:
      "SD-серия DTH-коронок. Карточка используется для заявок по системе SD без выдумывания неподтвержденных размеров и параметров.",
    positions: "SD series DTH bits",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "SD"],
      ["Характеристики", "уточняются при подборе"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "bits-mission-series",
    slug: "bits-mission-series",
    title: "Коронки MISSION-серии WONTECH",
    category: "bits",
    label: "DTH-коронки",
    system: "MISSION series",
    image: "/assets/images/official/official-bit-mission.png",
    summary:
      "MISSION-серия DTH-коронок. Совместимость, диаметр и форма рабочей части подтверждаются перед расчетом.",
    positions: "MISSION series DTH bits",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "MISSION"],
      ["Наличие и сроки", "уточняются перед заказом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "bits-numa-series",
    slug: "bits-numa-series",
    title: "Коронки NUMA-серии WONTECH",
    category: "bits",
    label: "DTH-коронки",
    system: "NUMA series",
    image: "/assets/images/official/official-bit-numa.png",
    summary:
      "NUMA-серия DTH-коронок для заявок, где важна совместимость с соответствующей системой. Параметры уточняются при подборе.",
    positions: "NUMA series DTH bits",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "NUMA"],
      ["Подбор", "по спецификации заказчика"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "bits-br-series",
    slug: "bits-br-series",
    title: "Коронки BR-серии WONTECH",
    category: "bits",
    label: "DTH-коронки",
    system: "BR series",
    image: "/assets/images/official/official-bit-br.png",
    summary:
      "BR-серия DTH-коронок из каталога. Карточка не пересекается с QL/COP-группами и используется для отдельного запроса по BR.",
    positions: "BR series DTH bits",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Серия", "BR"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "rc-hammers",
    slug: "rc-hammers",
    title: "RC-молоты WONTECH",
    category: "rc",
    label: "RC",
    system: "CIR / RE по спецификации",
    image: "/assets/images/local/warehouse-wide.jpg",
    summary:
      "RC-молоты для бурения с обратной циркуляцией. Серия, хвостовик, диаметр и комплект поставки уточняются по спецификации заказчика.",
    positions: "RC hammers: CIR50 / CIR60 / CIR65 / CIR70 / CIR90 / CIR110 / CIR130 / CIR150 / CIR170 по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Тип", "RC-молоты"],
      ["Подбор", "по системе и оборудованию"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "rc-bits",
    slug: "rc-bits",
    title: "RC-коронки WONTECH",
    category: "rc",
    label: "RC",
    system: "RE543 / RE040 / RE052 / RE054 / RE140",
    image: "/assets/images/local/stock-grey-bits.jpg",
    summary:
      "RC-коронки выделены отдельно от DTH-коронок, чтобы не смешивать разные системы бурения. Диаметр и хвостовик уточняются перед расчетом.",
    positions: "RE543 / RE040 / RE052 / RE054 / RE140 по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Тип", "RC-коронки"],
      ["Подбор", "по хвостовику, диаметру и системе"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "rc-accessories",
    slug: "rc-accessories",
    title: "Комплектующие для RC-бурения",
    category: "rc",
    label: "RC",
    system: "по спецификации",
    image: "/assets/images/local/stock-small-bits-box.jpg",
    summary:
      "Комплектующие для RC-направления: переходники, элементы сборки и сопутствующие позиции по спецификации заказчика.",
    positions: "комплектующие RC по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Тип", "комплектующие RC"],
      ["Подбор", "по спецификации заказчика"],
      ["Наличие и сроки", "уточняются перед заказом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "casing-odex-system",
    slug: "casing-odex-system",
    title: "ODEX-системы WONTECH",
    category: "casing",
    label: "Обсадные системы",
    system: "ODEX",
    image: "/assets/images/local/casing-system-front.jpg",
    summary:
      "ODEX-системы для бурения с обсадной колонной. Размер, комплектность и совместимость подбираются по наружному диаметру трубы и условиям работы.",
    positions: "ODEX85 / ODEX90 / ODEX115 / ODEX140 / ODEX165 / ODEX190 / ODEX240 / ODEX280 по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Система", "ODEX"],
      ["Подбор", "по трубе, диаметру и задаче"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "casing-wing-system",
    slug: "casing-wing-system",
    title: "Крыльевые обсадные системы WONTECH",
    category: "casing",
    label: "Обсадные системы",
    system: "Wing system",
    image: "/assets/images/official/official-casing-wing.png",
    summary:
      "Крыльевые системы для бурения с обсадкой. Подбор выполняется по диаметру обсадной трубы, грунтам и требуемой схеме бурения.",
    positions: "Wing system W90 / W117 / W136 / W142 / W160 по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Система", "Wing system"],
      ["Подбор", "по обсадной трубе и проекту"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "casing-block-system",
    slug: "casing-block-system",
    title: "Блочные обсадные системы WONTECH",
    category: "casing",
    label: "Обсадные системы",
    system: "Block system",
    image: "/assets/images/official/official-casing-block.png",
    summary:
      "Блочные обсадные системы из каталога. Комплектность, диаметр и совместимость уточняются перед расчетом.",
    positions: "Block system по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Система", "Block system"],
      ["Наличие", "уточняется перед заказом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "casing-eccentric-system",
    slug: "casing-eccentric-system",
    title: "Эксцентриковые обсадные системы WONTECH",
    category: "casing",
    label: "Обсадные системы",
    system: "Eccentric casing system",
    image: "/assets/images/official/official-casing-eccentric.png",
    summary:
      "Эксцентриковые системы для продвижения обсадной колонны. Диаметр и состав комплекта подтверждаются по спецификации.",
    positions: "эксцентриковые обсадные системы по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Система", "Eccentric casing system"],
      ["Подбор", "по обсадной трубе и задаче"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "casing-concentric-system",
    slug: "casing-concentric-system",
    title: "Концентрические обсадные системы WONTECH",
    category: "casing",
    label: "Обсадные системы",
    system: "Concentric casing system",
    image: "/assets/images/official/official-casing-concentric.png",
    summary:
      "Концентрические системы бурения с обсадкой. Карточка используется для отдельного запроса по системе и комплектности.",
    positions: "концентрические обсадные системы по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Система", "Concentric casing system"],
      ["Характеристики", "уточняются при подборе"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "top-hammer-tapered-bits",
    slug: "top-hammer-tapered-bits",
    title: "Конические коронки для гидроперфораторного бурения WONTECH",
    category: "top-hammer",
    label: "Гидроперфораторное бурение",
    system: "Tapered bits",
    image: "/assets/images/official/official-top-hammer-bits.png",
    summary:
      "Конические коронки для верхнего ударного бурения. Угол конуса, диаметр и исполнение подтверждаются по оборудованию и задаче.",
    positions: "tapered bits по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Тип", "конические коронки"],
      ["Подбор", "по оборудованию и диаметру"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "top-hammer-tapered-rods",
    slug: "top-hammer-tapered-rods",
    title: "Конические штанги для гидроперфораторного бурения WONTECH",
    category: "top-hammer",
    label: "Гидроперфораторное бурение",
    system: "Tapered rods",
    image: "/assets/images/official/official-top-hammer-rods.png",
    summary:
      "Конические штанги для верхнего ударного бурения. Длина, присоединение и совместимость уточняются по спецификации заказчика.",
    positions: "tapered rods по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Бренд инструмента", "WONTECH"],
      ["Тип", "конические штанги"],
      ["Подбор", "по длине, конусу и оборудованию"],
      ["Цена", "рассчитывается индивидуально"]
    ]
  },
  {
    id: "top-hammer-couplings-shanks",
    slug: "top-hammer-couplings-shanks",
    title: "Муфты и хвостовики для гидроперфораторного бурения",
    category: "top-hammer",
    label: "Гидроперфораторное бурение",
    system: "R / T / ST / GT по запросу",
    image: "/assets/images/official/official-top-hammer-rods.png",
    summary:
      "Соединительные муфты и хвостовики для резьбовых систем верхнего ударного бурения. Подбор выполняется по резьбе и буровой установке.",
    positions: "муфты / хвостовики / переходники по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Тип", "муфты и хвостовики"],
      ["Резьбы", "R / T / ST / GT по запросу"],
      ["Подбор", "по оборудованию и текущей спецификации"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "dth-drill-pipes",
    slug: "dth-drill-pipes",
    title: "Буровые трубы DTH",
    category: "accessories",
    label: "Комплектующие",
    system: "по длине и резьбе",
    image: "/assets/images/official/official-top-hammer-rods.png",
    summary:
      "Буровые трубы для DTH-направления. Длина, наружный диаметр, стенка и резьбовое соединение уточняются по заявке.",
    positions: "буровые трубы DTH по запросу",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Тип", "буровые трубы DTH"],
      ["Подбор", "по длине, диаметру и резьбе"],
      ["Наличие и сроки", "уточняются перед заказом"],
      ["Цена", "по расчету"]
    ]
  },
  {
    id: "dth-subs-adapters",
    slug: "dth-subs-adapters",
    title: "Переходники и адаптеры DTH",
    category: "accessories",
    label: "Комплектующие",
    system: "API Reg / IF / BECO по запросу",
    image: "/assets/images/local/workshop-stock.jpg",
    summary:
      "Переходники, адаптеры и переводники для DTH-сборки. Присоединение и комплект поставки подтверждаются перед расчетом.",
    positions: "subs / adapters / переходники DTH",
    specs: [
      ["Поставщик", "Бето Инкам"],
      ["Тип", "переходники и адаптеры DTH"],
      ["Резьбы", "API Reg / IF / BECO по запросу"],
      ["Подбор", "по текущей сборке и системе"],
      ["Цена", "по расчету"]
    ]
  }
];

products.push(...extendedProducts);

const locations = [
  { city: "Санкт-Петербург", coords: [59.9386, 30.3141], note: "точка возможной отгрузки на северо-западе" },
  { city: "Екатеринбург", coords: [56.8389, 60.6057], note: "точка возможной отгрузки на Урале" },
  { city: "Красноярск", coords: [56.0153, 92.8932], note: "точка возможной отгрузки в Сибири" }
];

const articles = [
  {
    id: "request-data",
    slug: "kakie-dannye-nuzhny-dlya-rascheta",
    label: "Заявка",
    title: "Какие данные нужны, чтобы быстро получить расчет бурового инструмента",
    image: "/assets/images/local/workshop-stock.jpg",
    summary:
      "Большой практический материал о том, что указывать в заявке: система, диаметр, количество, оборудование, регион доставки и условия работы.",
    lead:
      "Расчет бурового инструмента редко делается по одному названию позиции. Для нормального подбора нужны исходные данные: какая система используется, какой диаметр нужен, на каком оборудовании будет работать инструмент и куда его нужно доставить.",
    sections: [
      {
        title: "Почему одной фразы «нужна коронка» недостаточно",
        paragraphs: [
          "В промышленной заявке важна не только номенклатура, но и совместимость. Одна и та же группа инструмента может иметь разные исполнения, а похожие визуально коронки могут относиться к разным системам. Если менеджер получает только общую фразу, расчет превращается в серию уточняющих вопросов.",
          "Правильная заявка экономит время снабженца и снижает риск ошибки. В ней должны быть параметры, которые позволяют проверить наличие, подобрать совместимую позицию и оценить сроки поставки. Если часть информации неизвестна, ее можно заменить фото старого инструмента, маркировки или описанием задачи."
        ]
      },
      {
        title: "Минимальный набор для расчета",
        paragraphs: [
          "Для пневмоударников и коронок желательно указать систему: COP, QL, DHD, SD, TD, Mission, NUMA или CIR. Если система неизвестна, добавьте фото инструмента, пневмоударника или маркировки. Для коронок укажите диаметр скважины или требуемый диаметр коронки.",
          "Следующий блок - количество, регион доставки, желаемые сроки и оборудование. Эти данные не заменяют технический подбор, но позволяют сразу понять, нужно ли искать позицию на ближайшем складе или считать поставку под заказ."
        ],
        bullets: [
          "тип инструмента: пневмоударник, коронка, PDC, RC или комплектующие",
          "система: COP / QL / DHD / SD / TD / Mission / NUMA / CIR",
          "диаметр или диапазон диаметров",
          "количество и желаемые сроки",
          "регион доставки и контакты для связи",
          "фото старой позиции, если есть сомнения по совместимости"
        ]
      },
      {
        title: "Как писать, если точных характеристик нет",
        paragraphs: [
          "Не нужно придумывать давление, резьбу, вес, ресурс или страну производства, если этих данных нет в исходной спецификации. Корректнее написать, что подбор выполняется по задаче, а характеристики уточняются при подтверждении.",
          "Такой подход выглядит профессионально: сайт не обещает неподтвержденные параметры, но дает клиенту понятный сценарий действия. Он выбирает направление, отправляет заявку и получает расчет после проверки наличия и совместимости."
        ]
      },
      {
        title: "Пример хорошей заявки",
        paragraphs: [
          "«Нужны коронки WONTECH для QL80, диаметр 219 мм, количество 6 шт. Регион доставки - Красноярский край. Работа на буровой установке под DTH. Просьба уточнить наличие, срок отгрузки и цену».",
          "Если точного диаметра нет: «Нужно подобрать инструмент для DTH-бурения, есть фото старого пневмоударника и коронки, объект в Свердловской области, нужен расчет по наличию». Этого уже достаточно, чтобы начать предметную работу."
        ]
      }
    ]
  },
  {
    id: "dth-hammer-selection",
    slug: "kak-podobrat-pnevmoudarnik-dth",
    label: "DTH",
    title: "Как подобрать пневмоударник DTH под буровую установку",
    image: "/assets/images/COP64_QL60_hammer.jpg",
    summary:
      "Разбор логики подбора пневмоударника: система, совместимость, задача, условия бурения и данные для заявки.",
    lead:
      "Пневмоударник подбирается не по внешнему виду и не только по названию системы. Важно сопоставить его с буровой установкой, коронками, условиями работы и реальной задачей на объекте.",
    sections: [
      {
        title: "Система - это отправная точка",
        paragraphs: [
          "В каталоге вынесены группы COP44 / QL40, COP54 / QL50, COP64 / QL60 и QL80. Эти обозначения помогают быстро определить направление подбора. Но сама по себе система не заменяет проверку совместимости с конкретной буровой установкой и коронкой.",
          "Если клиент уже использует инструмент определенной системы, это нужно написать в заявке. Если система неизвестна, лучше приложить фото старого пневмоударника, коронки и маркировки. По фото нельзя гарантировать точный подбор во всех случаях, но оно ускоряет первичную проверку."
        ]
      },
      {
        title: "Что влияет на подбор",
        paragraphs: [
          "На подбор влияет не только система, но и задача: добыча, карьер, геологоразведка, строительное бурение, условия породы и требуемый диаметр скважины. Отдельно уточняются компрессор, буровая установка и фактические условия эксплуатации.",
          "На сайте не стоит указывать точные рабочие давления, расход воздуха или ресурс, если они не подтверждены техническим паспортом. Такие данные должны появляться только после проверки документации или спецификации."
        ],
        bullets: [
          "какая буровая установка используется",
          "какой диаметр скважины требуется",
          "какая система применялась раньше",
          "какие коронки планируются к работе",
          "какой регион и срок поставки"
        ]
      },
      {
        title: "Почему B2B-формат лучше обычной корзины",
        paragraphs: [
          "Для промышленного инструмента кнопка «купить» без проверки часто создает риск неправильной покупки. B2B-каталог работает иначе: клиент выбирает направление, отправляет заявку, а менеджер подтверждает наличие, совместимость и цену.",
          "Это особенно важно, когда каталог запускается без полного набора технических паспортов и расширенных характеристик. Сайт остается рабочим, но не выдает неподтвержденные обещания."
        ]
      },
      {
        title: "Что получит клиент после заявки",
        paragraphs: [
          "После отправки заявки проверяются выбранные позиции, склад, сроки отгрузки и возможность поставки под заказ. Итоговый расчет должен содержать позиции, количество, сроки, условия доставки и цену, рассчитанную индивидуально.",
          "Если данных для подбора недостаточно, клиенту задают короткий список уточнений. Это нормальный этап для B2B-продажи бурового инструмента."
        ]
      }
    ]
  },
  {
    id: "bit-diameter",
    slug: "kak-vybrat-diametr-burovoy-koronki",
    label: "Коронки",
    title: "Как выбрать диаметр буровой коронки и не ошибиться с системой",
    image: "/assets/images/local/stock-crowns-wrapped.jpg",
    summary:
      "Почему диаметр коронки нужно рассматривать вместе с системой, пневмоударником и задачей, а не отдельно от остальной спецификации.",
    lead:
      "Диаметр коронки - один из самых заметных параметров в заявке, но он не работает отдельно от системы. Для расчета нужно понимать, к какому пневмоударнику и задаче относится эта коронка.",
    sections: [
      {
        title: "Диаметр без системы не дает полного ответа",
        paragraphs: [
          "Клиент может написать «нужна коронка 152 мм», но для расчета этого недостаточно. Нужно понимать систему, совместимость с пневмоударником, количество и регион доставки. Без этих данных менеджер вынужден возвращаться с уточнениями.",
          "Поэтому в каталоге диаметры сгруппированы: 110 / 115 / 130 мм, 140 / 146 / 152 мм, 165 / 171 / 178 / 190 мм, 203 / 219 / 254 / 279 / 305 мм. Такой формат не перегружает сайт десятками повторяющихся карточек."
        ]
      },
      {
        title: "Когда размер нужно выносить отдельно",
        paragraphs: [
          "Если в наличии есть подтвержденные остатки по каждому диаметру, можно сделать отдельные карточки. Но когда точные остатки и фотографии по каждой позиции еще не собраны, честнее оставить группу размеров и уточнять конкретный диаметр в заявке.",
          "Это не делает сайт слабее. Наоборот, клиент видит доступное направление и понимает, что финальная цена и наличие подтверждаются перед заказом."
        ]
      },
      {
        title: "Что добавить в заявку по коронкам",
        paragraphs: [
          "Укажите систему, диаметр, количество, регион доставки и желаемый срок. Если есть старая коронка, добавьте фото. Если нужно подобрать замену, напишите условия работы и оборудование.",
          "Для PDC и RC лучше сразу отправлять спецификацию. Эти направления оставлены на сайте как отдельные категории без выдуманного списка моделей."
        ],
        bullets: [
          "система: COP44 / QL40, COP54 / QL50, COP64 / QL60, QL80 или другая",
          "требуемый диаметр",
          "количество",
          "фото или маркировка, если есть",
          "город или регион доставки"
        ]
      },
      {
        title: "Как выглядит корректная карточка",
        paragraphs: [
          "Карточка товара должна показывать направление, систему, известные диаметры, фото или заглушку, а также честные статусы: «наличие уточняется», «цена рассчитывается индивидуально», «характеристики уточняются при подборе».",
          "Такая структура позволяет запустить сайт до появления полного каталога, не создавая ложного впечатления, что все параметры уже подтверждены."
        ]
      }
    ]
  },
  {
    id: "systems",
    slug: "cop-ql-dhd-sd-td-mission-numa-cir",
    label: "Системы",
    title: "COP, QL, DHD, SD, TD, Mission, NUMA, CIR: что писать в заявке",
    image: "/assets/images/local/stock-small-bits-box.jpg",
    summary:
      "Справочник по тому, как аккуратно указывать систему инструмента в заявке и что делать, если точная система неизвестна.",
    lead:
      "В буровом инструменте названия систем помогают быстрее перейти от общего запроса к реальному расчету. Но если система указана неверно, это может привести к ошибке в подборе.",
    sections: [
      {
        title: "Зачем указывать систему",
        paragraphs: [
          "Система нужна для первичной проверки совместимости. В заявках часто встречаются обозначения COP, QL, DHD, SD, TD, Mission, NUMA и CIR. Они помогают понять, с каким типом инструмента клиент работает и какие позиции нужно проверять.",
          "Если система известна, ее нужно писать в первой строке заявки. Если система неизвестна, лучше не угадывать, а отправить фото старого инструмента, маркировку или спецификацию от оборудования."
        ]
      },
      {
        title: "Как сайт разделяет системы",
        paragraphs: [
          "В каталоге разделены основные DTH-системы, WT/WBR/WQL/WD/WMSD-серии, коронки DHD, SD, Mission, NUMA и BR, RC-инструмент, обсадные системы, гидроперфораторное бурение и инструмент большого диаметра. Это помогает клиенту выбрать направление без смешения разных типов бурения.",
          "Если точной модели или подтвержденной характеристики нет, карточка не выдает ее за готовый параметр. Клиент отправляет спецификацию, а расчет готовится после проверки совместимости, наличия и сроков."
        ]
      },
      {
        title: "Что писать, если система под вопросом",
        paragraphs: [
          "Напишите, что система требует уточнения, и приложите все доступные данные. Это может быть фото старой коронки, пневмоударника, упаковки, маркировки или фрагмента спецификации. Если фото нет, опишите оборудование и задачу.",
          "Не нужно добавлять неподтвержденные характеристики ради заполнения карточки. В промышленном сегменте аккуратная формулировка лучше, чем уверенная ошибка."
        ],
        bullets: [
          "«система предположительно QL, просим проверить по фото»",
          "«нужен аналог старой позиции, фото приложим в Telegram»",
          "«точных данных нет, требуется подбор по задаче»",
          "«отправляем спецификацию на проверку совместимости»"
        ]
      },
      {
        title: "Что должно быть в ответе по заявке",
        paragraphs: [
          "После проверки клиенту нужно дать не только цену, но и статус наличия, предполагаемый срок, условия поставки и список уточнений, если они нужны. Это делает процесс прозрачным и помогает согласовать закупку внутри компании.",
          "Для сайта главный сценарий остается простым: выбрать направление, отправить заявку, получить расчет."
        ]
      }
    ]
  },
  {
    id: "stock-delivery",
    slug: "nalichie-sklady-i-dostavka",
    label: "Логистика",
    title: "Наличие, склады и доставка бурового инструмента по России",
    image: "/assets/images/local/hero-logistics.jpg",
    summary:
      "Как показывать географию поставок, не обещая неподтвержденные остатки и сроки, и зачем нужна карта с точками отгрузки.",
    lead:
      "Для B2B-клиента важно понимать, откуда может идти отгрузка и почему наличие нужно подтверждать перед заказом. Карта помогает сориентироваться, но не заменяет расчет логистики.",
    sections: [
      {
        title: "Какие точки показывать на карте",
        paragraphs: [
          "На сайте отмечены Санкт-Петербург, Екатеринбург и Красноярск как точки возможной отгрузки. Формулировка «возможной» важна: конкретный склад, остаток и срок подтверждаются только после проверки заявки.",
          "Карта должна быть не декоративной картинкой, а нормальным виджетом. Поэтому используется Яндекс.Карта с точками. Если внешний скрипт недоступен, сайт показывает резервную карту через iframe."
        ]
      },
      {
        title: "Почему наличие меняется",
        paragraphs: [
          "Буровой инструмент закупается партиями, а спрос может быть неравномерным по регионам и диаметрам. Поэтому фиксировать на сайте точные остатки без постоянной синхронизации опасно. Лучше честно писать: наличие и сроки поставки уточняются перед заказом.",
          "Это особенно важно для коронок по диаметрам. Сегодня нужный размер может быть на складе, завтра он уйдет под другой заказ. B2B-клиенту нужна актуальная информация на момент расчета."
        ]
      },
      {
        title: "Что влияет на срок поставки",
        paragraphs: [
          "На срок влияют регион, выбранный склад, транспортная компания, объем заказа, габариты и необходимость поставки под заказ. Если позиция есть на складе, сценарий один. Если требуется поставка с производственной площадки, сроки согласуются отдельно.",
          "Поэтому форма заявки должна собирать регион доставки и комментарий. Эти поля не декоративные: без них невозможно корректно оценить логистику."
        ],
        bullets: [
          "город или регион доставки",
          "количество и вес партии, если известны",
          "желательный срок поставки",
          "выбранная транспортная компания, если она уже определена",
          "наличие срочности или объектного графика"
        ]
      },
      {
        title: "Как показывать логистику на дорогом сайте",
        paragraphs: [
          "Хорошая верстка не должна прятать важные ограничения мелким шрифтом. Складская география, карта, порядок расчета и условия подтверждения должны быть видны на отдельной странице.",
          "Так сайт выглядит серьезно: он не обещает невозможное, но показывает понятный процесс поставки и снижает неопределенность для клиента."
        ]
      }
    ]
  },
  {
    id: "pdc-rc-spec",
    slug: "pdc-i-rc-kak-otpravit-specifikaciyu",
    label: "PDC и RC",
    title: "PDC и RC: как отправить спецификацию, если моделей нет в каталоге",
    image: "/assets/images/local/hero-product-set.jpg",
    summary:
      "Почему PDC и RC лучше вести через спецификацию, а не через выдуманные карточки, и что клиенту нужно приложить к заявке.",
    lead:
      "PDC и RC оставлены на сайте как отдельные направления поставки. Это правильный подход, если нет полного списка моделей, паспортов, фотографий и подтвержденных характеристик.",
    sections: [
      {
        title: "Почему не стоит выдумывать модели",
        paragraphs: [
          "Если в исходных данных нет точного каталога PDC или RC, нельзя создавать список моделей ради визуального объема. Это создает риск неправильных ожиданий и спорных обещаний. Гораздо профессиональнее показать направление и предложить отправить спецификацию.",
          "Для B2B-сайта это нормально. Клиенту важнее получить корректный подбор и расчет, чем увидеть длинную таблицу неподтвержденных позиций."
        ]
      },
      {
        title: "Что приложить по PDC",
        paragraphs: [
          "Для PDC желательно приложить требуемый диаметр, задачу, условия породы, старую спецификацию или фото применявшегося инструмента. Если точных данных нет, можно отправить описание объекта и желаемый результат.",
          "В карточке PDC на сайте не указываются точные характеристики, если они не подтверждены. Используется формулировка: подбор выполняется по спецификации заказчика."
        ]
      },
      {
        title: "Что приложить по RC",
        paragraphs: [
          "Для RC-инструмента важно понимать состав поставки, систему, оборудование и задачу. Если клиенту нужны RC-молоты, коронки или сопутствующие элементы, это нужно перечислить в спецификации или комментарии.",
          "Если спецификация большая, ее можно отправить через форму как текст или приложить отдельно в Telegram после первого контакта."
        ],
        bullets: [
          "тип инструмента: PDC, RC-молот, RC-коронка или комплект",
          "диаметр или требуемый результат",
          "оборудование и система",
          "количество",
          "регион доставки",
          "сроки и ограничения по объекту"
        ]
      },
      {
        title: "Как сайт должен вести клиента",
        paragraphs: [
          "На странице PDC и RC клиент не должен попадать в тупик. Нужны крупные кнопки «Отправить спецификацию», блок с подсказкой, что писать, и форма заявки. Это делает категорию рабочей даже без полного каталога.",
          "После получения заявки менеджер проверяет возможность поставки, уточняет параметры и готовит расчет."
        ]
      }
    ]
  },
  {
    id: "acceptance",
    slug: "kak-proveryat-instrument-pri-poluchenii",
    label: "Приемка",
    title: "Как проверять буровой инструмент при получении партии",
    image: "/assets/images/local/stock-small-bits-box.jpg",
    summary:
      "Памятка для снабжения и склада: что проверить при получении партии и какие фото лучше сохранить до запуска в работу.",
    lead:
      "Приемка промышленного инструмента должна быть простой и документируемой. Даже если поставка согласована, при получении нужно проверить комплектность, маркировку и внешнее состояние.",
    sections: [
      {
        title: "Что проверить сразу",
        paragraphs: [
          "Проверьте количество мест, упаковку, соответствие позиций счету или спецификации, видимую маркировку и внешнее состояние инструмента. Если позиции пришли под разные системы или диаметры, разложите их по группам сразу.",
          "Фотографии при приемке помогают быстрее решать вопросы, если появятся уточнения. Лучше сделать фото упаковки, маркировки и общего вида партии до начала эксплуатации."
        ]
      },
      {
        title: "Что фиксировать в документах",
        paragraphs: [
          "Внутри компании стоит сохранять счет, спецификацию, контакт менеджера и фото полученного инструмента. Это поможет при повторном заказе: не придется заново искать систему и диаметр по памяти.",
          "Если у вас есть внутренняя номенклатура, добавьте ее в комментарий при следующей заявке. Это ускоряет повторные расчеты."
        ],
        bullets: [
          "номер счета или заявки",
          "система и диаметр",
          "количество",
          "фото маркировки",
          "дата получения",
          "объект или подразделение, куда передан инструмент"
        ]
      },
      {
        title: "Когда обращаться за уточнением",
        paragraphs: [
          "Если есть расхождения по количеству, маркировке, диаметру или внешнему виду, лучше связаться до передачи инструмента в работу. В сообщении приложите фото и кратко опишите вопрос.",
          "Такой порядок снижает риск конфликтов и помогает быстрее сопоставить фактическую поставку с заявкой."
        ]
      },
      {
        title: "Как сайт помогает повторным заказам",
        paragraphs: [
          "Если карточки и статьи сайта дают клиенту понятные формулировки, он проще формирует повторную заявку. Вместо длинного объяснения можно указать систему, диаметр, количество и приложить фото прошлой поставки.",
          "Поэтому справочник на сайте нужен не только для SEO, но и для реальной работы снабжения."
        ]
      }
    ]
  }
];

const siteArticles = articles;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function write(relPath, content) {
  const fullPath = path.join(root, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${content.trim()}\n`, "utf8");
}

function navLink(href, label, active, key) {
  return `<a class="${active === key ? "is-active" : ""}" href="${href}">${label}</a>`;
}

function header(active = "") {
  return `
    <header class="site-header">
      <div class="container header-grid">
        <a class="brand brand-image" href="/index.html" aria-label="Бето Инкам">
          <img class="brand-logo-wide" src="/assets/images/local/beto-incam-logo-header.png" alt="Бето Инкам">
        </a>
        <button class="menu-toggle" type="button" data-menu-toggle aria-label="Открыть меню">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" data-main-nav aria-label="Главное меню">
          ${navLink("/catalog.html", "Каталог", active, "catalog")}
          ${navLink("/availability.html", "В наличии", active, "availability")}
          ${navLink("/logistics.html", "Поставки", active, "logistics")}
          ${navLink("/articles.html", "Справочник", active, "articles")}
          ${navLink("/specification.html", "Спецификация", active, "specification")}
          ${navLink("/contacts.html", "Контакты", active, "contacts")}
        </nav>
        <button class="header-request" type="button" data-open-request>
          Заявка <span data-request-count>0</span>
        </button>
      </div>
    </header>
  `;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand brand-footer brand-image" href="/index.html" aria-label="Бето Инкам">
            <img class="brand-logo-footer" src="/assets/images/local/beto-incam-logo-main.png" alt="Бето Инкам">
          </a>
          <p>Бето Инкам - B2B-каталог бурового инструмента WONTECH и сопутствующих направлений. Наличие, сроки, совместимость и цена подтверждаются перед заказом.</p>
        </div>
        <div>
          <h3>Каталог</h3>
          ${categories.map((category) => `<a href="${category.page}">${category.nav}</a>`).join("")}
        </div>
        <div>
          <h3>Документы</h3>
          <a href="/availability.html">В наличии в России</a>
          <a href="/specification.html">Отправить спецификацию</a>
          <a href="/documents.html">Документы сайта</a>
          <a href="/assets/docs/beto-inkam-wontech.pdf" target="_blank" rel="noreferrer">PDF-каталог</a>
          <a href="/articles.html">Справочник</a>
          <a href="/privacy.html">Политика конфиденциальности</a>
          <a href="/cookies.html">Cookie</a>
          <a href="/personal-data.html">Персональные данные</a>
          <a href="/terms.html">Условия использования</a>
        </div>
        <div>
          <h3>Контакт</h3>
          <a href="tel:+79631800999">+7 963 180 09 99</a>
          <button class="footer-button" type="button" data-open-request>Получить расчет</button>
        </div>
      </div>
    </footer>
  `;
}

function requestDrawer() {
  return `
    <a class="floating-call" href="tel:+79631800999" aria-label="Позвонить">
      <span>Позвонить</span>
      <strong>+7 963 180 09 99</strong>
    </a>

    <div class="request-panel" id="requestPanel" aria-hidden="true">
      <div class="request-backdrop" data-close-request></div>
      <aside class="request-drawer" aria-label="Заявка на расчет">
        <div class="drawer-head">
          <div>
            <p class="eyebrow">Заявка</p>
            <h2>Получить расчет</h2>
          </div>
          <button class="icon-button" type="button" data-close-request aria-label="Закрыть">×</button>
        </div>
        <div class="telegram-status" id="telegramStatus">Проверяем подключение Telegram...</div>
        <div class="request-items" id="requestItems"></div>
        <form class="request-form" id="requestForm">
          <label>Имя<input name="name" type="text" placeholder="Как к вам обращаться"></label>
          <label>Компания<input name="company" type="text" placeholder="Название компании"></label>
          <label>Телефон / Telegram / e-mail<input name="contact" type="text" inputmode="tel" autocomplete="tel" data-contact-field placeholder="+7 (___) ___-__-__ или @username" required></label>
          <label>Регион доставки<input name="region" type="text" placeholder="Город или регион"></label>
          <label>Комментарий / спецификация<textarea name="comment" rows="5" placeholder="Позиции, количество, оборудование, сроки, условия работы"></textarea></label>
          <div class="drawer-actions">
            <button class="btn btn-primary full" type="submit">Отправить заявку</button>
            <button class="btn btn-light full" type="button" id="copyRequest">Скопировать текст заявки</button>
          </div>
          <p class="form-status" id="formStatus" role="status"></p>
        </form>
      </aside>
    </div>
  `;
}

function cookieWidget() {
  return `
    <div class="cookie-widget" data-cookie-widget hidden>
      <div>
        <strong>Cookie</strong>
        <p>Сайт использует технические cookie для работы формы, спецификации и сохранения выбранных позиций. Продолжая пользоваться сайтом, вы соглашаетесь с обработкой этих данных.</p>
      </div>
      <div class="cookie-actions">
        <a class="text-link" href="/cookies.html">Подробнее</a>
        <button class="btn btn-primary btn-small" type="button" data-cookie-accept>Понятно</button>
      </div>
    </div>
  `;
}

function page({ title, description, active, body }) {
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="/assets/images/local/beto-incam-logo-main.png">
  <link rel="icon" href="/assets/images/local/beto-inkam-logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
  ${header(active)}
  <main>${body}</main>
  ${footer()}
  ${requestDrawer()}
  ${cookieWidget()}
  <script src="/assets/js/data.js"></script>
  <script src="/assets/js/main.js"></script>
</body>
</html>`;
}

function hero(body) {
  return `<section class="hero hero-premium"><div class="container">${body}</div></section>`;
}

function sectionHead(eyebrow, title, text = "") {
  return `
    <div class="section-head">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
      </div>
      ${text ? `<p>${text}</p>` : ""}
    </div>
  `;
}

function productCard(product) {
  const search = `${product.title} ${product.label} ${product.system} ${product.positions}`.toLowerCase();
  return `
    <article class="product-card" data-product-card data-category="${product.category}" data-search="${esc(search)}">
      <a class="product-media" href="/products/${product.slug}.html">
        <img src="${product.image}" alt="${esc(product.title)}" loading="lazy">
      </a>
      <div class="product-body">
        <div class="tags">
          <span>${product.label}</span>
          <span>${product.system}</span>
        </div>
        <h3><a href="/products/${product.slug}.html">${product.title}</a></h3>
        <p>${product.summary}</p>
        <dl>
          <div><dt>Позиции</dt><dd>${product.positions}</dd></div>
          <div><dt>Цена</dt><dd>по расчету</dd></div>
        </dl>
        <div class="card-actions">
          <button class="btn btn-primary" type="button" data-add-product="${product.id}">В заявку</button>
          <a class="btn btn-light" href="/products/${product.slug}.html">Подробнее</a>
        </div>
      </div>
    </article>
  `;
}

function articleCard(article) {
  return `
    <article class="article-card">
      <a class="article-media" href="/articles/${article.slug}.html">
        <img src="${article.image}" alt="${esc(article.title)}" loading="lazy">
      </a>
      <div class="article-body">
        <p class="eyebrow">${article.label}</p>
        <h3><a href="/articles/${article.slug}.html">${article.title}</a></h3>
        <p>${article.summary}</p>
        <a class="text-link" href="/articles/${article.slug}.html">Читать статью</a>
      </div>
    </article>
  `;
}

function categoryCard(category) {
  return `
    <a class="category-card" href="${category.page}">
      <img src="${category.image}" alt="${esc(category.title)}" loading="lazy">
      <span>${category.nav}</span>
      <h3>${category.title}</h3>
      <p>${category.intro}</p>
    </a>
  `;
}

function locationList() {
  return locations.map((item) => `
    <article class="location-card">
      <strong>${item.city}</strong>
      <span>${item.note}</span>
    </article>
  `).join("");
}

function yandexMapBlock() {
  const staticMapUrl = "https://static-maps.yandex.ru/1.x/?ll=61.600000,58.300000&z=3&size=650,450&l=map&pt=30.314100,59.938600,pm2rdm~60.605700,56.838900,pm2rdm~92.893200,56.015300,pm2rdm";
  const yandexOpenUrl = "https://yandex.ru/maps/?mode=routes&rtext=59.938600%2C30.314100~56.838900%2C60.605700~56.015300%2C92.893200&rtt=auto";
  return `
    <div class="yandex-map-shell">
      <div class="yandex-map" data-yandex-map>
        <img src="${staticMapUrl}" alt="Яндекс.Карта: Санкт-Петербург, Екатеринбург, Красноярск" loading="lazy">
        <a class="map-open-link" href="${yandexOpenUrl}" target="_blank" rel="noreferrer">Открыть в Яндекс.Картах</a>
      </div>
      <div class="map-side">
        <p class="eyebrow">Яндекс.Карта</p>
        <h3>Точки возможной отгрузки</h3>
        <p>Склад, наличие и срок подтверждаются при обработке заявки. Карта нужна, чтобы клиент видел географию поставок и мог указать ближайший регион.</p>
        <div class="location-list">${locationList()}</div>
      </div>
    </div>
  `;
}

function homePage() {
  const featuredIds = [
    "hammer-cop44-ql40",
    "wt-series-hammers",
    "wql-series-hammers",
    "bits-dhd-series",
    "pdc-request",
    "rc-hammers",
    "casing-wing-system",
    "cluster-drill-wtc"
  ];
  const featured = featuredIds.map((id) => products.find((product) => product.id === id)).filter(Boolean).map(productCard).join("");
  const articleTeasers = siteArticles.slice(0, 3).map(articleCard).join("");
  const body = `
    ${hero(`
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">B2B-каталог бурового инструмента</p>
          <h1>Бето Инкам - буровой инструмент для промышленных задач</h1>
          <p class="lead">Многостраничный B2B-каталог инструмента WONTECH и смежных направлений: выберите серию, добавьте позиции в спецификацию и получите расчет по наличию, срокам и доставке.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" type="button" data-open-request>Получить расчет</button>
            <a class="btn btn-secondary" href="/catalog.html">Открыть каталог</a>
          </div>
          <div class="hero-facts">
            <span>Пневмоударники и коронки</span>
            <span>PDC и RC по спецификации</span>
            <span>Поставки по России и СНГ</span>
          </div>
        </div>
        <div class="hero-visual hero-brand-card" aria-label="Бето Инкам - буровой инструмент">
          <img class="hero-brand-logo" src="/assets/images/local/beto-incam-logo-main.png" alt="Бето Инкам">
          <div class="hero-brand-products">
            <img src="/assets/images/official/official-wt-hammers.png" alt="Пневмоударники WONTECH">
            <img src="/assets/images/local/stock-crowns-wrapped.jpg" alt="PDC / PDS-коронки">
            <img src="/assets/images/official/official-casing-wing.png" alt="Обсадные системы">
          </div>
        </div>
      </div>
    `)}
    <section class="section">
      <div class="container">
        ${sectionHead("Каталог", "Основные направления", "Сайт не дробит позиции без необходимости: размеры и системы сгруппированы, а точный подбор выполняется по спецификации заказчика.")}
        <div class="category-grid">${categories.map(categoryCard).join("")}</div>
      </div>
    </section>
    <section class="section section-dark">
      <div class="container">
        <div class="split">
          <div>
            <p class="eyebrow">Как работает</p>
            <h2>Не корзина с неподтвержденной ценой, а заявка на расчет</h2>
            <p>Для бурового инструмента важны совместимость, наличие, срок отгрузки и регион доставки. Поэтому главный сценарий сайта - не онлайн-оплата, а расчет по заявке.</p>
          </div>
          <div class="process-grid">
            <article><span>01</span><h3>Выбор</h3><p>Клиент открывает каталог, категорию или карточку товара.</p></article>
            <article><span>02</span><h3>Спецификация</h3><p>Позиции и комментарии собираются в заявку.</p></article>
            <article><span>03</span><h3>Проверка</h3><p>Уточняются наличие, совместимость и сроки.</p></article>
            <article><span>04</span><h3>Расчет</h3><p>Цена рассчитывается индивидуально и фиксируется в счете.</p></article>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHead("Популярные позиции", "Популярные позиции", "Все характеристики, наличие и сроки поставки уточняются перед заказом.")}
        <div class="product-grid">${featured}</div>
        <div class="center-line center-actions">
          <a class="btn btn-secondary" href="/catalog.html">Смотреть весь каталог</a>
          <a class="btn btn-light" href="/availability.html">Проверить наличие</a>
        </div>
      </div>
    </section>
    <section class="section muted">
      <div class="container">
        ${sectionHead("Поставки", "География отгрузки на Яндекс.Карте", "На карте отмечены точки возможной отгрузки по России. Конкретный склад подтверждается при обработке заявки.")}
        ${yandexMapBlock()}
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHead("Справочник", "Большие статьи для инженеров и снабжения", "Материалы вынесены на отдельные страницы, чтобы их можно было читать, отправлять клиентам и использовать как справочник.")}
        <div class="article-grid">${articleTeasers}</div>
        <div class="center-line"><a class="btn btn-light" href="/articles.html">Все статьи</a></div>
      </div>
    </section>
    <section class="section gallery-band">
      <div class="container">
        ${sectionHead("Фото", "Фотографии инструмента и склада", "Использованы переданные изображения и официальные продуктовые изображения BETO/WONTECH без водяных знаков.")}
        <div class="gallery-strip">
          <img src="/assets/images/local/workshop-stock.jpg" alt="Склад бурового инструмента">
          <img src="/assets/images/local/stock-crowns-wrapped.jpg" alt="Коронки в упаковке">
          <img src="/assets/images/local/stock-small-bits-box.jpg" alt="Буровые коронки в коробе">
          <img src="/assets/images/local/stock-grey-bits.jpg" alt="Серые буровые коронки">
        </div>
      </div>
    </section>
  `;
  write("index.html", page({
    title: "Бето Инкам - многостраничный B2B-каталог бурового инструмента",
    description: "Бето Инкам: пневмоударники, коронки, PDC, RC, обсадные системы и комплектующие WONTECH. Каталог, карта поставок и заявка на расчет.",
    active: "home",
    body
  }));
}

function catalogPage() {
  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">Каталог</p>
        <h1>Каталог бурового инструмента Бето Инкам</h1>
        <p class="lead">Выберите категорию или позицию, добавьте ее в заявку и отправьте спецификацию на расчет. Цены, наличие и сроки подтверждаются индивидуально.</p>
      </div>
    `)}
    <section class="section">
      <div class="container catalog-layout">
        <aside class="catalog-filter">
          <label>Поиск<input type="search" data-catalog-search placeholder="QL80, PDC, коронки"></label>
          <label>Категория<select data-catalog-category>
            <option value="all">Все категории</option>
            ${categories.map((category) => `<option value="${category.id}">${category.nav}</option>`).join("")}
          </select></label>
          <button class="btn btn-light full" type="button" data-reset-filter>Сбросить фильтр</button>
          <p>Если нужной позиции нет, отправьте спецификацию. Подбор выполняется по задаче, оборудованию и системе.</p>
        </aside>
        <div>
          <div class="catalog-topline">
            <strong data-catalog-count>${products.length} позиций</strong>
            <div class="catalog-topline-actions">
              <a class="btn btn-light btn-small" href="/availability.html">В наличии</a>
              <a class="btn btn-secondary btn-small" href="/specification.html">Отправить спецификацию</a>
            </div>
          </div>
          <div class="product-grid">${products.map(productCard).join("")}</div>
        </div>
      </div>
    </section>
  `;
  write("catalog.html", page({
    title: "Каталог Бето Инкам - пневмоударники, коронки, PDC, RC",
    description: "B2B-каталог Бето Инкам: буровой инструмент WONTECH, PDC/PDS, RC, обсадные системы и комплектующие с заявкой на расчет.",
    active: "catalog",
    body
  }));
}

function availabilityPage() {
  const groups = [
    {
      title: "COP44 / QL40",
      diameters: "110 / 115 / 130 мм",
      hammer: "Пневмоударник COP44 / QL40",
      links: [
        ["/products/hammer-cop44-ql40.html", "Пневмоударник"],
        ["/products/bits-cop44-ql40.html", "Коронки"]
      ]
    },
    {
      title: "COP54 / QL50",
      diameters: "140 / 146 / 152 мм",
      hammer: "Пневмоударник COP54 / QL50",
      links: [
        ["/products/hammer-cop54-ql50.html", "Пневмоударник"],
        ["/products/bits-cop54-ql50.html", "Коронки"]
      ]
    },
    {
      title: "COP64 / QL60",
      diameters: "165 / 171 / 178 / 190 мм",
      hammer: "Пневмоударник COP64 / QL60",
      links: [
        ["/products/hammer-cop64-ql60.html", "Пневмоударник"],
        ["/products/bits-cop64-ql60.html", "Коронки"]
      ]
    },
    {
      title: "QL80",
      diameters: "203 / 219 / 254 / 279 / 305 мм",
      hammer: "Пневмоударник QL80",
      links: [
        ["/products/hammer-ql80.html", "Пневмоударник"],
        ["/products/bits-ql80.html", "Коронки"]
      ]
    }
  ];

  const cards = groups.map((group) => `
    <article class="availability-card">
      <div>
        <p class="stock-badge">Проверка перед счетом</p>
        <h2>${group.title}</h2>
        <p>${group.hammer}. Коронки: ${group.diameters}. Наличие, склад и срок отгрузки подтверждаются на момент заявки.</p>
      </div>
      <div class="availability-links">
        ${group.links.map(([href, label]) => `<a class="btn btn-light btn-small" href="${href}">${label}</a>`).join("")}
      </div>
    </article>
  `).join("");

  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">В наличии в России</p>
        <h1>Популярные позиции для быстрой проверки наличия</h1>
        <p class="lead">Здесь собраны основные группы для первого расчета. Точный остаток, склад, срок отгрузки и цена подтверждаются перед выставлением счета.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" type="button" data-open-request>Уточнить наличие</button>
          <a class="btn btn-secondary" href="/specification.html">Отправить спецификацию</a>
        </div>
      </div>
    `)}
    <section class="section">
      <div class="container">
        ${sectionHead("Наличие", "Основные DTH-группы", "Страница не обещает фиксированные остатки. Она помогает быстро выбрать систему и отправить запрос на проверку.")}
        <div class="availability-grid">${cards}</div>
      </div>
    </section>
    <section class="section muted">
      <div class="container content-grid">
        <article class="text-card">
          <h2>Как подтвердить наличие</h2>
          <p>Добавьте нужную карточку в заявку или напишите систему и диаметр вручную. Для точного ответа укажите количество, регион доставки и желаемый срок.</p>
          <ul>
            <li>наличие и сроки поставки уточняются перед заказом;</li>
            <li>цена рассчитывается индивидуально;</li>
            <li>подбор выполняется по спецификации заказчика;</li>
            <li>при отсутствии позиции на складе может считаться поставка под заказ.</li>
          </ul>
        </article>
        <article class="text-card accent-card">
          <h2>Большая заявка</h2>
          <p>Если в списке несколько позиций, удобнее отправить спецификацию одной формой.</p>
          <a class="btn btn-primary" href="/specification.html">Отправить спецификацию</a>
        </article>
      </div>
    </section>
  `;

  write("availability.html", page({
    title: "В наличии в России - Бето Инкам",
    description: "Популярные позиции бурового инструмента Бето Инкам для проверки наличия: COP44, COP54, COP64, QL80 и коронки.",
    active: "availability",
    body
  }));
}

function categoryPages() {
  categories.forEach((category) => {
    const categoryProducts = products.filter((product) => product.category === category.id);
    const body = `
      ${hero(`
        <div class="category-hero">
          <div>
            <p class="eyebrow">Категория</p>
            <h1>${category.title}</h1>
            <p class="lead">${category.intro}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" type="button" data-open-request>${category.cta}</button>
              <a class="btn btn-secondary" href="/specification.html">Отправить спецификацию</a>
            </div>
          </div>
          <img src="${category.image}" alt="${category.title}">
        </div>
      `)}
      <section class="section">
        <div class="container">
          ${sectionHead("Позиции", "Карточки категории", "В карточках указаны только подтвержденные направления. Точные характеристики, наличие и цена уточняются перед заказом.")}
          <div class="product-grid">${categoryProducts.map(productCard).join("")}</div>
        </div>
      </section>
      <section class="section muted">
        <div class="container content-grid">
          <article class="text-card">
            <h2>Что указать в заявке</h2>
            <p>Укажите систему, диаметр или направление, количество, регион доставки и желаемый срок. Если точных данных нет, приложите фото или отправьте описание задачи.</p>
            <ul>
              <li>характеристики уточняются при подборе;</li>
              <li>наличие и сроки поставки уточняются перед заказом;</li>
              <li>цена рассчитывается индивидуально;</li>
              <li>фото и технические параметры могут быть добавлены позже.</li>
            </ul>
          </article>
          <article class="text-card accent-card">
            <h2>Нужна помощь с подбором?</h2>
            <p>Откройте форму заявки и опишите задачу. Если список большой, используйте страницу спецификации.</p>
            <button class="btn btn-primary" type="button" data-open-request>Получить расчет</button>
          </article>
        </div>
      </section>
    `;
    write(category.page.replace(/^\//, ""), page({
      title: `${category.title} - Бето Инкам`,
      description: `${category.title}. Подбор и расчет по спецификации заказчика.`,
      active: "catalog",
      body
    }));
  });
}

function productPages() {
  products.forEach((product) => {
    const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
    const specRows = product.specs.map(([key, value]) => `<tr><th>${key}</th><td>${value}</td></tr>`).join("");
    const gallery = product.gallery?.length
      ? `<section class="section muted">
          <div class="container">
            ${sectionHead("Фото", "Фотографии позиции", "Изображения помогают быстрее сопоставить направление, но точные параметры все равно подтверждаются при подборе.")}
            <div class="product-gallery">
              ${product.gallery.map((image) => `<img src="${image}" alt="${esc(product.title)}" loading="lazy">`).join("")}
            </div>
          </div>
        </section>`
      : "";
    const body = `
      ${hero(`
        <div class="product-hero">
          <div>
            <p class="breadcrumbs"><a href="/catalog.html">Каталог</a> / ${product.label}</p>
            <p class="eyebrow">${product.label}</p>
            <h1>${product.title}</h1>
            <p class="lead">${product.summary}</p>
            <div class="hero-actions">
              <button class="btn btn-primary" type="button" data-add-product="${product.id}" data-open-after-add>Добавить в заявку</button>
              <button class="btn btn-secondary" type="button" data-open-request>Получить расчет</button>
            </div>
          </div>
          <div class="product-hero-media">
            <img src="${product.image}" alt="${product.title}">
          </div>
        </div>
      `)}
      <section class="section">
        <div class="container product-detail-grid">
          <article class="spec-card">
            <h2>Спецификация карточки</h2>
            <table>${specRows}</table>
            <p>Точные технические параметры, фото и расширенные характеристики могут быть добавлены в карточку позже после подтверждения данных.</p>
          </article>
          <article class="text-card">
            <h2>Что уточнить перед заказом</h2>
            <ul>
              <li>количество и требуемый срок поставки;</li>
              <li>регион доставки и транспортную компанию, если она уже выбрана;</li>
              <li>оборудование и систему, с которой будет работать инструмент;</li>
              <li>фото старой позиции или спецификацию, если требуется подбор аналога.</li>
            </ul>
            <button class="btn btn-primary" type="button" data-open-request>Открыть заявку</button>
          </article>
        </div>
      </section>
      ${gallery}
      <section class="section muted">
        <div class="container">
          ${sectionHead("Похожие позиции", "Связанные карточки", "Можно добавить несколько позиций в одну заявку.")}
          <div class="product-grid">${related.map(productCard).join("") || products.slice(0, 3).map(productCard).join("")}</div>
        </div>
      </section>
    `;
    write(`products/${product.slug}.html`, page({
      title: `${product.title} - карточка Бето Инкам`,
      description: `${product.title}. Характеристики, наличие и цена уточняются при подборе.`,
      active: "catalog",
      body
    }));
  });
}

function articlesPage() {
  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">Справочник</p>
        <h1>Большие статьи по подбору бурового инструмента</h1>
        <p class="lead">Раздел для инженеров, снабжения и подрядчиков. Каждая статья открывается отдельной страницей и помогает подготовить корректную заявку.</p>
      </div>
    `)}
    <section class="section">
      <div class="container">
        <div class="article-grid article-grid-large">${siteArticles.map(articleCard).join("")}</div>
      </div>
    </section>
  `;
  write("articles.html", page({
    title: "Статьи Бето Инкам - справочник по буровому инструменту",
    description: "Большие статьи о заявках, подборе DTH, коронках, PDC, RC, логистике и B2B-каталоге.",
    active: "articles",
    body
  }));
}

function articlePages() {
  siteArticles.forEach((article) => {
    const sections = article.sections.map((section) => `
      <section>
        <h2>${section.title}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        ${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      </section>
    `).join("");
    const body = `
      <article class="article-page">
        <div class="article-hero">
          <img src="${article.image}" alt="${article.title}">
          <div class="container article-hero-copy">
            <p class="breadcrumbs"><a href="/articles.html">Справочник</a> / ${article.label}</p>
            <p class="eyebrow">${article.label}</p>
            <h1>${article.title}</h1>
            <p class="lead">${article.lead}</p>
          </div>
        </div>
        <div class="container article-layout">
          <aside class="article-aside">
            <strong>В статье</strong>
            ${article.sections.map((section) => `<span>${section.title}</span>`).join("")}
            <button class="btn btn-primary full" type="button" data-open-request>Получить расчет</button>
          </aside>
          <div class="article-content">${sections}</div>
        </div>
      </article>
    `;
    write(`articles/${article.slug}.html`, page({
      title: `${article.title} - Бето Инкам`,
      description: article.summary,
      active: "articles",
      body
    }));
  });
}

function logisticsPage() {
  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">Поставки</p>
        <h1>Карта поставок и точки возможной отгрузки</h1>
        <p class="lead">Санкт-Петербург, Екатеринбург и Красноярск отмечены на Яндекс.Карте. Конкретный склад, наличие и срок поставки подтверждаются при обработке заявки.</p>
      </div>
    `)}
    <section class="section">
      <div class="container">${yandexMapBlock()}</div>
    </section>
    <section class="section muted">
      <div class="container content-grid">
        <article class="text-card">
          <h2>Как считается доставка</h2>
          <p>Стоимость и срок зависят от региона, объема заказа, выбранного склада и транспортной компании. Для точного расчета укажите город доставки и желаемый срок.</p>
          <ul>
            <li>наличие и сроки поставки уточняются перед заказом;</li>
            <li>отгрузка согласуется с учетом доступного склада;</li>
            <li>цена доставки рассчитывается индивидуально;</li>
            <li>при необходимости позиция поставляется под заказ.</li>
          </ul>
        </article>
        <article class="text-card">
          <h2>Что написать в заявке</h2>
          <p>Укажите регион доставки, список позиций, количество, сроки и контакт. Если нужен подбор, добавьте систему инструмента, оборудование и фото старой позиции.</p>
          <a class="btn btn-primary" href="/specification.html">Отправить спецификацию</a>
        </article>
      </div>
    </section>
  `;
  write("logistics.html", page({
    title: "Поставки Бето Инкам - Яндекс.Карта и точки отгрузки",
    description: "Карта поставок Бето Инкам по России: Санкт-Петербург, Екатеринбург, Красноярск.",
    active: "logistics",
    body
  }));
}

function galleryPage() {
  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">Фото</p>
        <h1>Фотографии инструмента, склада и каталога</h1>
        <p class="lead">Галерея использует переданные изображения, официальные продуктовые изображения и материалы из каталогов.</p>
      </div>
    `)}
    <section class="section">
      <div class="container gallery-page-grid">
        <img src="/assets/images/local/workshop-stock.jpg" alt="Склад бурового инструмента">
        <img src="/assets/images/local/stock-crowns-wrapped.jpg" alt="Коронки в упаковке">
        <img src="/assets/images/local/stock-small-bits-box.jpg" alt="Коронки в коробе">
        <img src="/assets/images/local/stock-grey-bits.jpg" alt="Серые коронки">
        <img src="/assets/images/local/pdc-crowns-studio.png" alt="PDC / PDS коронки">
        <img src="/assets/images/local/pdc-bit-146.jpg" alt="PDC / PDS долото 146 мм">
        <img src="/assets/images/local/pdc-bit-gold.jpg" alt="PDC / PDS долото">
        <img src="/assets/images/local/pdc-bits-group.jpg" alt="PDC / PDS долота">
        <img src="/assets/images/local/casing-system-front.jpg" alt="Обсадная система">
        <img src="/assets/images/local/casing-system-side.jpg" alt="Обсадная система сбоку">
        <img src="/assets/images/local/casing-system-assembled.jpg" alt="Обсадная система в сборе">
        <img src="/assets/images/local/warehouse-aisle.jpg" alt="Склад бурового инструмента Бето Инкам">
        <img src="/assets/images/local/warehouse-hammers.jpg" alt="Пневмоударники на складе">
        <img src="/assets/images/local/warehouse-wide.jpg" alt="Широкий вид склада Бето Инкам">
        <img src="/assets/images/official/official-wt-hammers.png" alt="Пневмоударники WT-серии WONTECH">
        <img src="/assets/images/official/official-wql-hammers.png" alt="Пневмоударники WQL-серии WONTECH">
        <img src="/assets/images/official/official-wbr-hammers.png" alt="Пневмоударники WBR-серии WONTECH">
        <img src="/assets/images/official/official-bit-wt.png" alt="Коронка WT-серии WONTECH">
        <img src="/assets/images/official/official-bit-dhd.png" alt="Коронка DHD-серии WONTECH">
        <img src="/assets/images/official/official-bit-mission.png" alt="Коронка MISSION-серии WONTECH">
        <img src="/assets/images/official/official-casing-wing.png" alt="Крыльевая обсадная система WONTECH">
        <img src="/assets/images/official/official-cluster-wtc380.png" alt="Кластерный пневмоударник WONTECH">
        <img src="/assets/images/official/official-top-hammer-bits.png" alt="Коронки для гидроперфораторного бурения">
        <img src="/assets/images/external/tricone-drill-bit-usgs-public-domain.jpg" alt="Шарошечное долото">
        <img src="/assets/images/local/li-qichao-china.jpg" alt="LI qichao">
        <img src="/assets/images/local/hero-logistics.jpg" alt="Логистика бурового инструмента">
        <img src="/assets/images/local/hero-product-set.jpg" alt="Набор бурового инструмента">
      </div>
    </section>
  `;
  write("gallery.html", page({
    title: "Фото Бето Инкам - буровой инструмент и склад",
    description: "Фотографии бурового инструмента, склада и визуальных материалов Бето Инкам.",
    active: "gallery",
    body
  }));
}

function contactsPage() {
  const body = `
    ${hero(`
      <div class="contacts-hero">
        <div>
          <p class="eyebrow">Контакты</p>
          <h1>Связаться с Бето Инкам</h1>
          <p class="lead">Отправьте список позиций, спецификацию или описание задачи. После проверки наличия, совместимости и сроков будет подготовлен расчет.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="tel:+79631800999">Позвонить</a>
            <button class="btn btn-secondary" type="button" data-open-request>Получить расчет</button>
          </div>
          <div class="contact-quick-list">
            <span>Пневмоударники и коронки</span>
            <span>PDC / PDS, RC и обсадные системы</span>
            <span>Поставки по России и СНГ</span>
          </div>
        </div>
        <div class="contact-command-card">
          <img src="/assets/images/local/beto-incam-logo-main.png" alt="Бето Инкам">
          <div class="contact-command-line">
            <span>Основной телефон</span>
            <a href="tel:+79631800999">+7 963 180 09 99</a>
          </div>
          <div class="contact-command-line">
            <span>Заявка</span>
            <button class="btn btn-primary" type="button" data-open-request>Получить расчет</button>
          </div>
          <p>Для быстрой обработки укажите серию, диаметр, количество, регион доставки и фото старого инструмента, если нужен подбор аналога.</p>
        </div>
      </div>
    `)}
    <section class="section contact-team-section">
      <div class="container">
        ${sectionHead("Команда", "Контакты и представитель", "Основной контакт принимает заявки на расчет в России. Представитель в Китае помогает уточнять данные по производству и поставке.")}
        <div class="contact-team-grid">
          <article class="team-card team-card-primary">
            <img src="/assets/images/local/yuri-kozlovsky.jpg" alt="Юрий Козловский">
            <div>
              <p class="eyebrow">Россия / расчет</p>
              <h2>Юрий Козловский</h2>
              <a href="tel:+79631800999">+7 963 180 09 99</a>
              <p>Расчет бурового инструмента, обработка спецификаций, уточнение наличия и сроков поставки.</p>
            </div>
          </article>
          <article class="team-card">
            <img src="/assets/images/local/li-qichao-china.jpg" alt="LI qichao">
            <div>
              <p class="eyebrow">Китай / поставки</p>
              <h2>LI qichao</h2>
              <p>Представитель в Китае. Помогает по коммуникации с производством и уточнению данных по позициям.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container content-grid">
        <article class="text-card">
          <h2>Что отправить для расчета</h2>
          <p>Можно отправить позиции из каталога, текстовую спецификацию, фото старого инструмента или краткое описание задачи.</p>
          <ul>
            <li>система и диаметр;</li>
            <li>количество;</li>
            <li>регион доставки;</li>
            <li>оборудование и условия работы;</li>
            <li>сроки и комментарии.</li>
          </ul>
        </article>
        <article class="text-card accent-card">
          <h2>Быстрая заявка</h2>
          <p>Если нет готовой спецификации, откройте форму и напишите задачу своими словами.</p>
          <button class="btn btn-primary" type="button" data-open-request>Открыть форму</button>
        </article>
      </div>
    </section>
  `;
  write("contacts.html", page({
    title: "Контакты Бето Инкам - расчет бурового инструмента",
    description: "Контакт для расчета бурового инструмента Бето Инкам. Телефон +7 963 180 09 99.",
    active: "contacts",
    body
  }));
}

function specificationPage() {
  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">Спецификация</p>
        <h1>Отправить спецификацию на расчет</h1>
        <p class="lead">Эта страница нужна для больших заявок: PDC, RC, комплектующие, партии коронок и подбор аналога по старому инструменту.</p>
      </div>
    `)}
    <section class="section">
      <div class="container specification-layout">
        <form class="spec-form" id="specificationForm">
          <div class="form-grid">
            <label>Имя<input name="name" type="text" placeholder="Как к вам обращаться"></label>
            <label>Компания<input name="company" type="text" placeholder="Название компании"></label>
            <label>Телефон / Telegram / e-mail<input name="contact" type="text" inputmode="tel" autocomplete="tel" data-contact-field placeholder="+7 (___) ___-__-__ или @username" required></label>
            <label>Регион доставки<input name="region" type="text" placeholder="Город или регион"></label>
          </div>
          <label>Спецификация<textarea name="specification" rows="12" placeholder="Пример: QL80, коронки 219 мм - 6 шт.; регион доставки Красноярский край; нужна проверка наличия и сроков"></textarea></label>
          <label>Комментарий<textarea name="comment" rows="5" placeholder="Оборудование, условия работы, срочность, транспортная компания"></textarea></label>
          <button class="btn btn-primary" type="submit">Отправить спецификацию</button>
          <p class="form-status" data-spec-status></p>
        </form>
        <aside class="spec-aside">
          <h2>Подсказка</h2>
          <p>Если точных характеристик нет, не придумывайте их. Достаточно описать задачу и приложить данные, которые есть.</p>
          <ul>
            <li>характеристики уточняются при подборе;</li>
            <li>наличие и сроки поставки уточняются перед заказом;</li>
            <li>цена рассчитывается индивидуально;</li>
            <li>подбор выполняется по спецификации заказчика.</li>
          </ul>
          <button class="btn btn-light full" type="button" data-open-request>Открыть короткую заявку</button>
        </aside>
      </div>
    </section>
  `;
  write("specification.html", page({
    title: "Отправить спецификацию Бето Инкам",
    description: "Форма для отправки спецификации на расчет бурового инструмента Бето Инкам.",
    active: "specification",
    body
  }));
}

function documentsPage() {
  const docs = [
    {
      title: "Отправить спецификацию",
      text: "Форма для больших заявок, PDC, RC, комплектующих и подбора аналога.",
      href: "/specification.html"
    },
    {
      title: "PDF-каталог",
      text: "Сводный каталог Бето Инкам / WONTECH в PDF для скачивания и отправки.",
      href: "/assets/docs/beto-inkam-wontech.pdf",
      external: true
    },
    {
      title: "Политика конфиденциальности",
      text: "Как обрабатываются данные, отправленные через формы сайта.",
      href: "/privacy.html"
    },
    {
      title: "Политика cookie",
      text: "Какие технические данные сохраняются в браузере.",
      href: "/cookies.html"
    },
    {
      title: "Согласие на обработку персональных данных",
      text: "Текст согласия для отправки формы заявки.",
      href: "/personal-data.html"
    },
    {
      title: "Условия использования",
      text: "Каталог не является публичной офертой: цена, наличие и сроки подтверждаются отдельно.",
      href: "/terms.html"
    }
  ];

  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">Документы</p>
        <h1>Документы и условия работы сайта</h1>
        <p class="lead">Здесь собраны страницы, которые нужны для B2B-каталога: спецификация, PDF-каталог, политика конфиденциальности, cookie, согласие на обработку данных и условия использования.</p>
      </div>
    `)}
    <section class="section">
      <div class="container">
        <div class="document-grid">
          ${docs.map((doc) => `
            <article class="document-card">
              <h2>${doc.title}</h2>
              <p>${doc.text}</p>
              <a class="btn btn-light" href="${doc.href}" ${doc.external ? 'target="_blank" rel="noreferrer"' : ""}>Открыть</a>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  write("documents.html", page({
    title: "Документы Бето Инкам",
    description: "Документы сайта Бето Инкам: спецификация, PDF-каталог, политика конфиденциальности, cookie, персональные данные и условия использования.",
    active: "documents",
    body
  }));
}

function legalPage(filename, title, description, sections) {
  const body = `
    ${hero(`
      <div class="page-hero">
        <p class="eyebrow">Документы</p>
        <h1>${title}</h1>
        <p class="lead">${description}</p>
      </div>
    `)}
    <section class="section">
      <div class="container article-layout legal-layout">
        <aside class="article-aside">
          <strong>Разделы</strong>
          ${sections.map((section) => `<span>${section.title}</span>`).join("")}
        </aside>
        <div class="article-content">
          ${sections.map((section) => `
            <section>
              <h2>${section.title}</h2>
              ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
              ${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>` : ""}
            </section>
          `).join("")}
        </div>
      </div>
    </section>
  `;
  write(filename, page({ title: `${title} - Бето Инкам`, description, active: "documents", body }));
}

function legalPages() {
  legalPage("privacy.html", "Политика конфиденциальности", "Как сайт Бето Инкам обрабатывает данные, которые пользователь отправляет через формы заявки.", [
    {
      title: "Какие данные собираются",
      paragraphs: [
        "Сайт получает только те данные, которые пользователь сам указывает в форме: имя, компанию, телефон или другой контакт, регион доставки, комментарий и спецификацию.",
        "Также сайт может сохранять выбранные позиции в браузере пользователя, чтобы спецификация не пропадала при переходе между страницами."
      ]
    },
    {
      title: "Зачем нужны данные",
      paragraphs: [
        "Данные используются для подготовки расчета, уточнения наличия, проверки совместимости инструмента и связи по заявке.",
        "Сайт не выполняет онлайн-оплату и не собирает платежные данные."
      ]
    },
    {
      title: "Передача данных",
      paragraphs: [
        "Заявки отправляются в Telegram-бот компании для оперативной обработки. Доступ к заявкам должен быть ограничен ответственными сотрудниками.",
        "Если пользователь не хочет отправлять форму, он может позвонить по номеру, указанному на сайте."
      ]
    }
  ]);

  legalPage("cookies.html", "Политика cookie", "Какие cookie и локальные данные используются на сайте Бето Инкам.", [
    {
      title: "Технические cookie и localStorage",
      paragraphs: [
        "Сайт использует техническое хранение в браузере для выбранных позиций каталога, статуса cookie-уведомления и удобной работы формы.",
        "Эти данные нужны для работы интерфейса и не являются платежными или банковскими данными."
      ]
    },
    {
      title: "Cookie-виджет",
      paragraphs: [
        "Уведомление о cookie появляется через 10 секунд после открытия сайта, если пользователь еще не принял его.",
        "После нажатия кнопки согласие сохраняется в браузере, и виджет больше не показывается на этом устройстве."
      ]
    },
    {
      title: "Как отключить",
      paragraphs: [
        "Пользователь может очистить cookie и localStorage в настройках браузера. После очистки выбранные позиции и статус уведомления будут сброшены."
      ]
    }
  ]);

  legalPage("personal-data.html", "Согласие на обработку персональных данных", "Текст согласия для отправки заявки через формы сайта.", [
    {
      title: "Согласие",
      paragraphs: [
        "Отправляя форму на сайте, пользователь подтверждает, что указал данные добровольно и согласен на их обработку для подготовки ответа по заявке.",
        "Обработка включает получение, хранение, уточнение и использование данных для связи с пользователем и подготовки расчета."
      ]
    },
    {
      title: "Состав данных",
      paragraphs: [
        "Могут обрабатываться имя, компания, телефон, Telegram, e-mail, регион доставки, комментарий и текст спецификации."
      ]
    },
    {
      title: "Отзыв согласия",
      paragraphs: [
        "Пользователь может запросить прекращение обработки данных, связавшись по телефону, указанному на сайте."
      ]
    }
  ]);

  legalPage("terms.html", "Условия использования сайта", "Правила работы с каталогом Бето Инкам и заявками на расчет.", [
    {
      title: "Назначение сайта",
      paragraphs: [
        "Сайт является B2B-каталогом для предварительного выбора направления и отправки заявки на расчет.",
        "Карточки не являются публичной офертой. Цена, наличие, сроки, совместимость и комплектность подтверждаются индивидуально."
      ]
    },
    {
      title: "Каталог и характеристики",
      paragraphs: [
        "Если в карточке нет точных параметров, они уточняются при подборе. Неуказанные характеристики не считаются подтвержденными.",
        "Фотографии используются для визуальной ориентации и могут отличаться от конкретной поставки."
      ]
    },
    {
      title: "Заявки",
      paragraphs: [
        "Отправка заявки не создает обязательства покупки или поставки. Итоговые условия фиксируются после расчета и согласования."
      ]
    }
  ]);
}

function dataFile() {
  write("assets/js/data.js", `
window.BETO_INCAM_DATA = ${JSON.stringify({ products, categories, locations, articles: siteArticles.map(({ sections, ...rest }) => rest) }, null, 2)};
window.WONTECH_DATA = window.BETO_INCAM_DATA;
  `);
}

function mainJs() {
  write("assets/js/main.js", `
const DATA = window.BETO_INCAM_DATA || window.WONTECH_DATA || { products: [], locations: [] };
const requestKey = "betoIncamRequestV1";
const legacyRequestKey = "wontechRequestV2";
const cookieKey = "betoIncamCookieAccepted";
const legacyCookieKey = "wontechCookieAccepted";
let requestItems = loadRequest();

function loadRequest() {
  try {
    return JSON.parse(localStorage.getItem(requestKey) || localStorage.getItem(legacyRequestKey) || "[]");
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
  wrap.innerHTML = requestItems.map((item) => \`
    <div class="request-item">
      <div>
        <strong>\${escapeHtml(item.title)}</strong>
        <span>\${escapeHtml(item.label)} · \${escapeHtml(item.system)} · \${escapeHtml(item.positions)}</span>
      </div>
      <button type="button" data-remove-product="\${escapeHtml(item.id)}">Удалить</button>
    </div>
  \`).join("");
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
    "Заявка Бето Инкам",
    "",
    \`Имя: \${fields.name || "-"}\`,
    \`Компания: \${fields.company || "-"}\`,
    \`Контакт: \${fields.contact || "-"}\`,
    \`Регион доставки: \${fields.region || "-"}\`,
    ""
  ];
  if (payload.items && payload.items.length) {
    lines.push("Позиции:");
    payload.items.forEach((item, index) => {
      lines.push(\`\${index + 1}. \${item.title}\`);
      lines.push(\`   Система: \${item.system}\`);
      lines.push(\`   Позиции: \${item.positions}\`);
    });
    lines.push("");
  }
  if (fields.specification) {
    lines.push("Спецификация:");
    lines.push(fields.specification);
    lines.push("");
  }
  lines.push(\`Комментарий: \${fields.comment || "-"}\`);
  lines.push(\`Источник: \${payload.source || "-"}\`);
  return lines.join("\\n");
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
    status.className = \`telegram-status \${ready ? "ok" : "warning"}\`;
    status.textContent = ready
      ? "Telegram подключен. Заявка отправится через сайт."
      : "Telegram пока не готов. Заявку можно скопировать и отправить вручную.";
  } catch {
    status.className = "telegram-status warning";
    status.textContent = "Сервер заявок не отвечает. Заявку можно скопировать или отправить по телефону.";
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
      status.textContent = \`Не удалось отправить через Telegram: \${error.message}. Скопируйте текст заявки.\`;
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
      status.textContent = \`Не удалось отправить: \${error.message}. Откройте короткую заявку и скопируйте текст вручную.\`;
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
    if (count) count.textContent = \`\${visible} позиций\`;
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

function formatPhoneInput(value) {
  const raw = String(value || "").trim();
  if (!raw || raw.startsWith("@") || raw.includes("@")) return value;

  let digits = raw.replace(/\\D/g, "");
  if (!digits) return value;
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);

  const p1 = digits.slice(1, 4);
  const p2 = digits.slice(4, 7);
  const p3 = digits.slice(7, 9);
  const p4 = digits.slice(9, 11);

  let result = "+7";
  if (p1) result += " (" + p1;
  if (p1.length === 3) result += ")";
  if (p2) result += " " + p2;
  if (p3) result += "-" + p3;
  if (p4) result += "-" + p4;
  return result;
}

function initPhoneMask() {
  document.querySelectorAll("[data-contact-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const cursorAtEnd = input.selectionStart === input.value.length;
      input.value = formatPhoneInput(input.value);
      if (cursorAtEnd) input.setSelectionRange(input.value.length, input.value.length);
    });
  });
}

function initCookieWidget() {
  const widget = document.querySelector("[data-cookie-widget]");
  if (!widget || localStorage.getItem(cookieKey) === "yes" || localStorage.getItem(legacyCookieKey) === "yes") return;

  window.setTimeout(() => {
    widget.hidden = false;
    widget.classList.add("is-visible");
  }, 10000);

  widget.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
    localStorage.setItem(cookieKey, "yes");
    widget.classList.remove("is-visible");
    window.setTimeout(() => {
      widget.hidden = true;
    }, 250);
  });
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
initPhoneMask();
initCookieWidget();
checkTelegramStatus();
  `);
}

function cssFile() {
  write("assets/css/site.css", `
:root {
  --bg: #f4efe6;
  --surface: #fffaf2;
  --surface-strong: #ffffff;
  --dark: #0f0f0f;
  --dark-2: #191410;
  --text: #191714;
  --muted: #70675d;
  --line: #e3d7c7;
  --accent: #ed7415;
  --accent-2: #b94f0d;
  --accent-soft: #fff0df;
  --ok: #1f7a4c;
  --warn: #9a5b12;
  --danger: #b12b2b;
  --radius: 28px;
  --shadow: 0 24px 80px rgba(20, 16, 12, .16);
}
* { box-sizing: border-box; }
[hidden] { display: none !important; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.55;
  overflow-x: hidden;
}
body.panel-open { overflow: hidden; }
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; }
.container { width: min(1220px, calc(100% - 34px)); margin: 0 auto; }
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 15, 15, .94);
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,.08);
  backdrop-filter: blur(16px);
}
.header-grid {
  display: grid;
  grid-template-columns: auto 1fr auto;
  min-height: 82px;
  align-items: center;
  gap: 16px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 250px;
}
.brand img { width: 52px; height: 52px; object-fit: contain; }
.brand-image { min-width: 250px; }
.brand-logo-wide { width: 236px !important; height: 58px !important; border-radius: 14px; object-fit: cover !important; object-position: center; box-shadow: 0 14px 30px rgba(0,0,0,.28); }
.brand-logo-footer { width: 260px !important; height: auto !important; border-radius: 16px; object-fit: cover !important; box-shadow: 0 16px 34px rgba(0,0,0,.25); }
.brand strong { display: block; color: #fff; font-size: 25px; letter-spacing: .08em; line-height: 1; }
.brand small { display: block; margin-top: 4px; color: #d8d0c7; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
.brand-footer { min-width: 0; margin-bottom: 18px; }
.main-nav { display: flex; justify-content: center; gap: 4px; }
.main-nav a {
  border-radius: 999px;
  color: #eee3d7;
  padding: 10px 11px;
  font-size: 14px;
  font-weight: 800;
}
.main-nav a:hover, .main-nav a.is-active { background: rgba(255,255,255,.1); color: #fff; }
.header-request, .footer-button {
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  color: #fff;
  padding: 11px 15px;
  cursor: pointer;
  font-weight: 800;
}
.header-request span {
  display: inline-grid;
  min-width: 24px;
  height: 24px;
  margin-left: 8px;
  place-items: center;
  border-radius: 999px;
  background: var(--accent);
}
.menu-toggle { display: none; border: 0; background: transparent; padding: 8px; }
.menu-toggle span { display: block; width: 24px; height: 2px; margin: 5px 0; background: #fff; }
.hero-premium {
  overflow: hidden;
  background:
    radial-gradient(circle at 80% 16%, rgba(237,116,21,.4), transparent 28%),
    radial-gradient(circle at 18% 82%, rgba(237,116,21,.17), transparent 24%),
    linear-gradient(135deg, #0f0f0f 0%, #201712 62%, #0d0d0d 100%);
  color: #fff;
  padding: 86px 0 72px;
}
.hero-grid, .category-hero, .product-hero, .contacts-hero {
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(420px, 1.05fr);
  align-items: center;
  gap: 42px;
}
.page-hero { max-width: 920px; }
.eyebrow {
  margin: 0 0 12px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .16em;
  text-transform: uppercase;
}
h1, h2, h3, p { margin-top: 0; }
h1 {
  max-width: 940px;
  margin-bottom: 22px;
  font-size: clamp(40px, 6vw, 78px);
  line-height: .94;
  letter-spacing: -.06em;
}
h2 { margin-bottom: 14px; font-size: clamp(30px, 3.4vw, 50px); line-height: 1.02; letter-spacing: -.045em; }
h3 { margin-bottom: 10px; font-size: 22px; line-height: 1.16; letter-spacing: -.02em; }
.lead { max-width: 760px; color: #e3d8cc; font-size: clamp(18px, 2vw, 22px); }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.hero-visual, .category-hero img, .product-hero-media, .contact-person {
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 34px;
  box-shadow: var(--shadow);
}
.hero-visual img { width: 100%; min-height: 430px; object-fit: cover; }
.hero-video-card { position: relative; min-height: 500px; background: #15110d; padding: 14px; }
.hero-loop { position: relative; height: 100%; min-height: 470px; overflow: hidden; border-radius: 26px; background: #120f0c; }
.hero-loop::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 72% 28%, rgba(237,116,21,.55), transparent 22%),
    linear-gradient(110deg, rgba(0,0,0,.72), rgba(15,12,9,.25) 48%, rgba(237,116,21,.18));
}
.hero-loop > img { width: 100%; height: 100%; min-height: 470px; object-fit: cover; transform: scale(1.06); animation: slowZoom 13s ease-in-out infinite alternate; }
.loop-line { position: absolute; z-index: 2; height: 2px; border-radius: 999px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.65), var(--accent)); opacity: .9; transform-origin: left center; }
.loop-line-one { left: 11%; right: 16%; top: 38%; transform: rotate(-7deg); animation: linePulse 3.6s ease-in-out infinite; }
.loop-line-two { left: 18%; right: 22%; top: 62%; transform: rotate(8deg); animation: linePulse 4.2s ease-in-out infinite .6s; }
.loop-dot { position: absolute; z-index: 3; width: 13px; height: 13px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 8px rgba(237,116,21,.24), 0 0 22px rgba(237,116,21,.85); }
.loop-dot-one { left: 19%; top: 34%; animation: dotMoveOne 5.4s linear infinite; }
.loop-dot-two { left: 52%; top: 58%; animation: dotMoveTwo 6.2s linear infinite; }
.loop-dot-three { left: 78%; top: 29%; animation: dotBlink 2.8s ease-in-out infinite; }
.loop-tool { position: absolute; right: 24px; bottom: 24px; z-index: 4; width: 190px; height: 150px; border-radius: 26px; background: rgba(255,255,255,.9); box-shadow: 0 22px 52px rgba(0,0,0,.28); padding: 14px; animation: floatTool 5.2s ease-in-out infinite; }
.loop-tool img { width: 100%; height: 100%; min-height: 0; object-fit: contain; }
.beto-logo-card { position: absolute; left: 28px; bottom: 28px; z-index: 5; width: min(260px, 48%); min-height: 0 !important; border-radius: 20px; box-shadow: 0 18px 44px rgba(0,0,0,.22); }
.hero-brand-card { display: grid; gap: 18px; min-height: 500px; align-content: center; background: radial-gradient(circle at 70% 18%, rgba(237,116,21,.22), transparent 34%), #15110d; padding: 24px; }
.hero-brand-logo { width: 100%; min-height: 0 !important; border-radius: 28px; object-fit: cover; box-shadow: 0 24px 58px rgba(0,0,0,.32); }
.hero-brand-products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.hero-brand-products img { width: 100%; height: 150px; min-height: 0 !important; border-radius: 22px; background: #fff; object-fit: contain; padding: 12px; }
@keyframes slowZoom { from { transform: scale(1.02); } to { transform: scale(1.12); } }
@keyframes linePulse { 0%, 100% { opacity: .28; } 50% { opacity: .95; } }
@keyframes dotBlink { 0%, 100% { transform: scale(.72); opacity: .45; } 50% { transform: scale(1.1); opacity: 1; } }
@keyframes dotMoveOne { 0% { transform: translate(0,0); } 50% { transform: translate(250px, -24px); } 100% { transform: translate(0,0); } }
@keyframes dotMoveTwo { 0% { transform: translate(0,0); } 50% { transform: translate(160px, 22px); } 100% { transform: translate(0,0); } }
@keyframes floatTool { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.category-hero img { width: 100%; height: 420px; background: #fff; object-fit: contain; padding: 24px; }
.product-hero-media { display: grid; min-height: 420px; place-items: center; background: #fff; padding: 28px; }
.product-hero-media img { max-height: 360px; object-fit: contain; }
.product-gallery { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.product-gallery img { width: 100%; height: 260px; border-radius: 24px; background: #fff; object-fit: cover; box-shadow: 0 16px 34px rgba(20,16,12,.08); }
.hero-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 30px; }
.hero-facts span { border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: rgba(255,255,255,.07); color: #f3eadf; padding: 14px; font-weight: 800; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border: 0;
  border-radius: 999px;
  padding: 12px 20px;
  font-weight: 900;
  cursor: pointer;
  line-height: 1.1;
  white-space: nowrap;
}
.btn-primary { background: var(--accent); color: #fff; box-shadow: 0 18px 38px rgba(237,116,21,.28); }
.btn-primary:hover { background: var(--accent-2); }
.btn-secondary { background: #fff; color: var(--dark); }
.btn-light { background: #efe5d8; color: var(--text); }
.btn-small { min-height: 40px; padding: 9px 15px; font-size: 14px; }
.full { width: 100%; }
.section { padding: 82px 0; }
.muted { background: #ebe2d6; }
.section-dark { background: var(--dark); color: #fff; }
.section-head {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(290px, .75fr);
  gap: 32px;
  align-items: end;
  margin-bottom: 34px;
}
.section-head > p { color: var(--muted); margin-bottom: 0; }
.section-dark .section-head > p, .section-dark p { color: #d8cec3; }
.category-grid, .product-grid, .article-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.category-card, .product-card, .article-card, .text-card, .spec-card, .catalog-filter, .spec-form, .spec-aside {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface-strong);
  box-shadow: 0 18px 44px rgba(20, 16, 12, .08);
}
.category-card { display: grid; overflow: hidden; padding-bottom: 22px; }
.category-card img { width: 100%; height: 210px; object-fit: cover; }
.category-card span, .category-card h3, .category-card p { margin-left: 20px; margin-right: 20px; }
.category-card span { margin-top: 18px; color: var(--accent); font-weight: 900; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; }
.category-card p, .product-card p, .article-card p, .text-card p, .spec-card p, .spec-aside p { color: var(--muted); }
.product-card, .article-card { display: flex; flex-direction: column; overflow: hidden; }
.product-media { display: grid; min-height: 190px; place-items: center; background: #f8f4ee; padding: 14px; }
.product-media img { max-height: 165px; object-fit: contain; }
.product-body, .article-body { display: flex; flex: 1; flex-direction: column; padding: 16px; }
.tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px; }
.tags span { border-radius: 999px; background: var(--accent-soft); color: var(--accent-2); padding: 6px 10px; font-size: 12px; font-weight: 900; }
.product-card p {
  display: -webkit-box;
  min-height: 66px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.product-card dl { display: grid; gap: 6px; margin: 0 0 14px; font-size: 13px; }
.product-card dl div { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px solid #eee5db; padding-bottom: 7px; }
.product-card dt { color: var(--muted); font-size: 13px; }
.product-card dd { margin: 0; font-weight: 800; text-align: right; }
.card-actions { display: grid; grid-template-columns: .9fr 1.1fr; gap: 8px; margin-top: auto; }
.product-card .btn { min-height: 42px; border-radius: 16px; padding: 10px 12px; font-size: 14px; }
.split { display: grid; grid-template-columns: .85fr 1.15fr; gap: 34px; align-items: start; }
.process-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.process-grid article { border: 1px solid rgba(255,255,255,.12); border-radius: 24px; background: rgba(255,255,255,.07); padding: 20px; }
.process-grid span { display: inline-grid; width: 42px; height: 42px; margin-bottom: 18px; place-items: center; border-radius: 14px; background: var(--accent); font-weight: 900; }
.center-line { display: flex; justify-content: center; margin-top: 28px; }
.center-actions { flex-wrap: wrap; gap: 12px; }
.yandex-map-shell { display: grid; grid-template-columns: minmax(0, 1.25fr) 360px; overflow: hidden; border-radius: 34px; background: #111; box-shadow: var(--shadow); }
.yandex-map { position: relative; min-height: 520px; background: #1a1714; }
.yandex-map img { width: 100%; height: 100%; min-height: 520px; object-fit: cover; }
.map-open-link {
  position: absolute;
  left: 18px;
  bottom: 18px;
  border-radius: 999px;
  background: #fff;
  color: var(--text);
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 900;
  box-shadow: 0 10px 30px rgba(0,0,0,.18);
}
.map-side { background: linear-gradient(180deg, #17120f, #261a13); color: #fff; padding: 28px; }
.map-side p { color: #e1d5c8; }
.location-list { display: grid; gap: 12px; margin-top: 22px; }
.location-card { border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: rgba(255,255,255,.07); padding: 14px; }
.location-card strong { display: block; margin-bottom: 4px; }
.location-card span { color: #d8cfc5; font-size: 14px; }
.article-card img { width: 100%; height: 220px; object-fit: cover; }
.text-link { margin-top: auto; color: var(--accent-2); font-weight: 900; }
.gallery-band { background: #18120e; color: #fff; }
.gallery-strip, .gallery-page-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.gallery-strip img, .gallery-page-grid img { width: 100%; height: 260px; border-radius: 24px; object-fit: cover; box-shadow: 0 16px 36px rgba(0,0,0,.14); }
.gallery-page-grid { grid-template-columns: repeat(3, 1fr); }
.site-footer { background: #0f0f0f; color: #fff; padding: 54px 0; }
.footer-grid { display: grid; grid-template-columns: 1.2fr repeat(3, 1fr); gap: 34px; }
.footer-grid p { color: #cfc7bf; }
.footer-grid h3 { font-size: 16px; }
.footer-grid a, .footer-button { display: block; margin: 10px 0; color: #e9ded2; text-align: left; }
.footer-partner-logo { width: 210px; max-width: 100%; margin-top: 16px; border-radius: 16px; background: #fff; }
.catalog-layout { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 24px; align-items: start; }
.catalog-filter { position: sticky; top: 106px; display: grid; gap: 15px; padding: 20px; }
label { display: grid; gap: 8px; color: var(--muted); font-size: 13px; font-weight: 900; }
input, select, textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
  color: var(--text);
  padding: 13px 14px;
  outline: none;
}
textarea { resize: vertical; }
input:focus, select:focus, textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(237,116,21,.14); }
.catalog-topline { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 18px; }
.catalog-topline-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
.content-grid, .product-detail-grid, .specification-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; align-items: start; }
.text-card, .spec-card, .spec-aside { padding: 26px; }
.availability-grid, .document-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.availability-card, .document-card {
  display: grid;
  gap: 18px;
  align-content: space-between;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface-strong);
  box-shadow: 0 18px 44px rgba(20,16,12,.08);
  padding: 26px;
}
.availability-card h2, .document-card h2 { font-size: clamp(28px, 3vw, 42px); }
.availability-card p, .document-card p { color: var(--muted); }
.stock-badge {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 14px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-2);
  padding: 7px 11px;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .1em;
}
.availability-links { display: flex; flex-wrap: wrap; gap: 10px; }
.accent-card { background: var(--dark); color: #fff; }
.accent-card p, .accent-card li { color: #ddd1c5; }
.text-card ul, .spec-aside ul, .article-content ul { padding-left: 20px; color: var(--muted); }
.spec-card table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
.spec-card th, .spec-card td { border-bottom: 1px solid var(--line); padding: 14px 0; text-align: left; vertical-align: top; }
.spec-card th { width: 38%; color: var(--muted); }
.breadcrumbs { color: #d6cabe; }
.breadcrumbs a { color: #fff; text-decoration: underline; text-underline-offset: 4px; }
.article-hero { position: relative; background: #111; color: #fff; }
.article-hero > img { width: 100%; height: 520px; object-fit: cover; opacity: .48; }
.article-hero-copy { position: absolute; inset: auto 0 58px 0; }
.article-layout { display: grid; grid-template-columns: 280px minmax(0, 820px); gap: 48px; align-items: start; padding-top: 64px; padding-bottom: 78px; }
.article-aside { position: sticky; top: 110px; display: grid; gap: 12px; border: 1px solid var(--line); border-radius: 24px; background: #fff; padding: 18px; }
.article-aside span { color: var(--muted); font-size: 14px; }
.article-content { font-size: 19px; }
.article-content section { margin-bottom: 48px; }
.article-content p, .article-content li { color: #48413a; }
.legal-layout .article-content { max-width: 860px; }
.contacts-hero { grid-template-columns: minmax(0, 1fr) minmax(360px, 480px); }
.contact-quick-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 30px; }
.contact-quick-list span { border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: rgba(255,255,255,.07); color: #f3eadf; padding: 13px; font-weight: 800; }
.contact-command-card { display: grid; gap: 18px; border: 1px solid rgba(255,255,255,.14); border-radius: 34px; background: rgba(255,255,255,.08); padding: 24px; box-shadow: var(--shadow); }
.contact-command-card img { width: 100%; border-radius: 24px; box-shadow: 0 22px 52px rgba(0,0,0,.28); }
.contact-command-card p { color: #e0d6ca; }
.contact-command-line { display: flex; justify-content: space-between; gap: 18px; align-items: center; border-top: 1px solid rgba(255,255,255,.12); padding-top: 16px; }
.contact-command-line span { color: #cabfb2; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .12em; }
.contact-command-line a { color: #fff; font-size: 24px; font-weight: 900; }
.contact-team-section { background: #fff8ee; }
.contact-team-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 22px; }
.team-card { display: grid; grid-template-columns: 180px 1fr; gap: 22px; align-items: center; border: 1px solid var(--line); border-radius: 30px; background: #fff; padding: 20px; box-shadow: 0 16px 44px rgba(20,16,12,.08); }
.team-card-primary { background: #111; color: #fff; border-color: rgba(255,255,255,.12); }
.team-card img { width: 180px; height: 220px; border-radius: 24px; object-fit: cover; object-position: center 18%; }
.team-card h2 { margin-bottom: 8px; font-size: clamp(28px, 3vw, 42px); }
.team-card p { color: var(--muted); }
.team-card-primary p { color: #d8cfc5; }
.team-card a { color: var(--accent); font-size: 24px; font-weight: 900; }
.spec-form { display: grid; gap: 16px; padding: 24px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.request-panel { position: fixed; inset: 0; z-index: 100; display: none; }
.request-panel.is-open { display: block; }
.request-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.62); }
.request-drawer {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: min(590px, 100%);
  height: 100%;
  flex-direction: column;
  overflow: auto;
  background: var(--surface-strong);
  padding: 24px;
  box-shadow: -28px 0 80px rgba(0,0,0,.25);
}
.drawer-head { display: flex; justify-content: space-between; gap: 18px; align-items: start; }
.icon-button { display: grid; width: 42px; height: 42px; place-items: center; border: 0; border-radius: 14px; background: #eee3d7; font-size: 28px; cursor: pointer; }
.telegram-status { margin: 16px 0; border-radius: 16px; background: var(--accent-soft); color: var(--warn); padding: 13px 14px; font-size: 13px; font-weight: 800; }
.telegram-status.ok { background: #e8f6ed; color: var(--ok); }
.telegram-status.warning { background: #fff3df; color: var(--warn); }
.request-items { display: grid; gap: 10px; margin-bottom: 18px; }
.empty-request, .request-item { border: 1px dashed var(--line); border-radius: 18px; background: #fffcf8; padding: 14px; color: var(--muted); }
.request-item { display: grid; grid-template-columns: 1fr auto; gap: 12px; border-style: solid; }
.request-item strong { display: block; color: var(--text); }
.request-item span { font-size: 13px; }
.request-item button { border: 0; border-radius: 10px; background: #eee2d5; padding: 8px 10px; cursor: pointer; }
.request-form { display: grid; gap: 13px; margin-top: auto; }
.drawer-actions { display: grid; gap: 10px; }
.form-status { min-height: 22px; margin: 0; color: var(--ok); font-weight: 800; }
.form-status.error { color: var(--danger); }
.floating-call {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 80;
  display: grid;
  gap: 2px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  box-shadow: 0 18px 42px rgba(237,116,21,.34);
  padding: 13px 20px;
}
.floating-call span { font-size: 12px; opacity: .86; }
.floating-call strong { font-size: 15px; }
.cookie-widget {
  position: fixed;
  right: 22px;
  bottom: 98px;
  z-index: 90;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  width: min(680px, calc(100% - 44px));
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 26px;
  background: rgba(18, 14, 10, .94);
  color: #fff;
  box-shadow: var(--shadow);
  padding: 18px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .25s ease, transform .25s ease;
}
.cookie-widget.is-visible { opacity: 1; transform: translateY(0); }
.cookie-widget p { margin: 5px 0 0; color: #e1d7cb; font-size: 14px; }
.cookie-actions { display: flex; align-items: center; gap: 12px; }
.cookie-actions .text-link { color: #fff; }
@media (max-width: 1080px) {
  .header-grid { grid-template-columns: auto auto auto; }
  .menu-toggle { display: block; justify-self: center; }
  .main-nav {
    position: absolute;
    top: 82px;
    right: 16px;
    left: 16px;
    display: none;
    flex-direction: column;
    border-radius: 22px;
    background: #141414;
    padding: 14px;
    box-shadow: var(--shadow);
  }
  .main-nav.is-open { display: flex; }
  .hero-grid, .category-hero, .product-hero, .contacts-hero, .split, .catalog-layout, .content-grid, .product-detail-grid, .specification-layout, .yandex-map-shell, .footer-grid, .article-layout { grid-template-columns: 1fr; }
  .category-grid, .product-grid, .article-grid, .gallery-page-grid, .product-gallery { grid-template-columns: repeat(2, 1fr); }
  .availability-grid, .document-grid { grid-template-columns: 1fr; }
  .contact-quick-list, .contact-team-grid { grid-template-columns: 1fr; }
  .catalog-filter, .article-aside { position: static; }
  .yandex-map { min-height: 420px; }
}
@media (max-width: 680px) {
  html { overflow-x: hidden; }
  .container { width: calc(100% - 22px); max-width: 1220px; }
  .header-grid { grid-template-columns: 1fr auto; min-height: 70px; gap: 10px; }
  .brand { min-width: 0; }
  .brand img { width: 42px; height: 42px; }
  .brand-image { min-width: 0; }
  .brand-logo-wide { width: min(210px, 64vw) !important; height: 50px !important; border-radius: 12px; }
  .brand-logo-footer { width: min(260px, 100%) !important; }
  .brand strong { font-size: 19px; }
  .brand small { display: none; }
  .header-request { display: none; }
  .hero-premium { padding: 54px 0 46px; }
  .section { padding: 56px 0; }
  .hero-grid, .category-hero, .product-hero, .contacts-hero {
    min-width: 0;
    max-width: 100%;
  }
  .page-hero, .hero-copy, .category-hero > div, .product-hero > div, .contacts-hero > div {
    min-width: 0;
    width: 320px;
    max-width: 100%;
  }
  h1 {
    width: 100%;
    max-width: 320px;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    font-size: clamp(29px, 8.4vw, 33px);
    line-height: 1.08;
    letter-spacing: -.025em;
  }
  .lead { width: 100%; max-width: 320px; overflow-wrap: anywhere; word-break: break-word; font-size: 16px; }
  .category-grid, .product-grid, .article-grid, .process-grid, .gallery-strip, .gallery-page-grid, .form-grid, .product-gallery, .availability-grid, .document-grid, .cookie-widget { grid-template-columns: 1fr; }
  .hero-facts { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; }
  .hero-facts span { min-width: 215px; }
  .hero-actions { display: grid; }
  .hero-actions .btn { width: 100%; }
  .hero-visual img, .category-hero img { min-height: 260px; height: 280px; }
  .hero-brand-card { min-height: auto; padding: 14px; }
  .hero-brand-logo { height: auto !important; min-height: 0 !important; }
  .hero-brand-products { grid-template-columns: 1fr; }
  .hero-brand-products img { height: 160px; min-height: 0 !important; }
  .hero-video-card { min-height: 360px; }
  .hero-loop { min-height: 330px; }
  .hero-loop > img { height: 330px; min-height: 330px; }
  .loop-tool { width: 130px; height: 105px; right: 14px; bottom: 14px; }
  .loop-tool img { height: 100%; min-height: 0; }
  .beto-logo-card { width: 190px; left: 16px; bottom: 16px; }
  .hero-visual .beto-logo-card { height: auto; min-height: 0 !important; }
  .product-gallery img { height: 240px; }
  .product-hero-media { min-height: 260px; }
  .contact-command-line { display: grid; gap: 8px; }
  .contact-command-line a { font-size: 21px; }
  .team-card { grid-template-columns: 1fr; }
  .team-card img { width: 100%; height: 320px; }
  .card-actions { grid-template-columns: 1fr; }
  .article-hero > img { height: 470px; }
  .article-hero-copy { bottom: 28px; }
  .article-content { font-size: 17px; }
  .floating-call { right: 12px; bottom: 12px; left: auto; justify-items: center; min-width: 190px; padding: 11px 15px; text-align: center; }
  .cookie-widget { right: 12px; bottom: 84px; width: calc(100% - 24px); }
  body:not(.panel-open) .floating-call { transform: translateY(0); }
  .spec-form { padding-bottom: 92px; }
}
  `);
}

function legacyFiles() {
  write("styles.css", '@import url("/assets/css/site.css");');
  write("app.js", 'console.log("Beto Inkam multipage site uses /assets/js/main.js");');
}

function build() {
  dataFile();
  mainJs();
  cssFile();
  legacyFiles();
  homePage();
  catalogPage();
  availabilityPage();
  categoryPages();
  productPages();
  articlesPage();
  articlePages();
  logisticsPage();
  galleryPage();
  contactsPage();
  specificationPage();
  documentsPage();
  legalPages();
}

build();
console.log("Beto Inkam multipage site built");
