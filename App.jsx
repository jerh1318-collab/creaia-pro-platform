import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileSignature,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Palette,
  Phone,
  Send,
  ShieldAlert,
  Sparkles,
  Users,
  Wallet,
  Wand2,
  Wrench,
  X,
} from "lucide-react";

const PHONE = "991 561 272";
const WHATSAPP_NUMBER = "51991561272";
const EMAIL = "jerh1318@gmail.com";
const YAPE = "991 561 272";

const themes = {
  ocean: { name: "Océano", accent: "#14b8d4", soft: "#dff8fd", dark: "#0f172a" },
  emerald: { name: "Esmeralda", accent: "#10b981", soft: "#dcfce7", dark: "#052e2b" },
  royal: { name: "Royal", accent: "#6366f1", soft: "#e0e7ff", dark: "#1e1b4b" },
  sunset: { name: "Sunset", accent: "#f97316", soft: "#ffedd5", dark: "#431407" },
  rose: { name: "Rose", accent: "#ec4899", soft: "#fce7f3", dark: "#500724" },
  graphite: { name: "Grafito", accent: "#334155", soft: "#e2e8f0", dark: "#0f172a" },
};

const services = [
  {
    key: "cv",
    icon: FileText,
    title: "CV Pro moderno",
    price: "Desde S/40",
    category: "CV",
    short: "CV moderno con cambio de color, estructura profesional y entrega en PDF.",
    includes: ["Diseño moderno", "Cambio de color", "Perfil profesional", "PDF listo para enviar"],
    fields: ["Nombre completo", "Puesto u oficio", "Experiencia laboral", "Estudios", "Habilidades", "Color preferido"],
  },
  {
    key: "reclamo",
    icon: FileSignature,
    title: "Reclamo Pro",
    price: "Desde S/25",
    category: "Documentos",
    short: "Carta de reclamo clara, firme y formal para empresas o proveedores.",
    includes: ["Carta de reclamo", "Texto para correo", "Mensaje WhatsApp", "PDF final"],
    fields: ["Nombre", "Empresa reclamada", "Qué ocurrió", "Qué solicitas", "Monto", "Tono"],
  },
  {
    key: "carta",
    icon: ClipboardList,
    title: "Carta formal / solicitud",
    price: "Desde S/20",
    category: "Documentos",
    short: "Cartas y solicitudes con estructura clara, formal y lista para presentar.",
    includes: ["Redacción formal", "Formato limpio", "1 ajuste", "PDF/Word"],
    fields: ["Nombre", "Destinatario", "Asunto", "Motivo", "Solicitud", "Tono"],
  },
  {
    key: "cotizacion",
    icon: BriefcaseBusiness,
    title: "Cotización Pro",
    price: "Desde S/20",
    category: "Negocios",
    short: "Cotizaciones profesionales para negocios, técnicos y servicios.",
    includes: ["Datos del negocio", "Alcance", "Precio", "Condiciones de pago"],
    fields: ["Negocio", "Cliente", "Servicio", "Precio", "Plazo", "Condiciones"],
  },
  {
    key: "comparativo",
    icon: LayoutDashboard,
    title: "Cuadro comparativo tipo dashboard",
    price: "Desde S/80",
    category: "Dashboards",
    short: "Comparativos técnicos/económicos con indicadores, puntajes y recomendación.",
    includes: ["Matriz comparativa", "Evaluación técnica", "Evaluación económica", "Lectura final"],
    fields: ["Proveedores", "Propuestas", "Precios", "Criterios técnicos", "Observaciones"],
  },
  {
    key: "proveedores",
    icon: Users,
    title: "Selección de proveedores",
    price: "Desde S/100",
    category: "Dashboards",
    short: "Comparativo para seleccionar proveedores con sustento y recomendación.",
    includes: ["Ranking", "Puntajes", "Riesgos", "Recomendación ejecutiva"],
    fields: ["Proveedores", "Experiencia", "Precio", "Plazo", "Alcance", "Garantía"],
  },
  {
    key: "presupuestoProyecto",
    icon: Wallet,
    title: "Presupuesto para proyecto",
    price: "Desde S/120",
    category: "Presupuestos",
    short: "Presupuesto por partidas, metrados, costos unitarios y dashboard.",
    includes: ["Partidas", "Metrados", "PU", "Total", "Dashboard"],
    fields: ["Proyecto", "Partidas", "Metrados", "Costos", "Plazo", "Moneda"],
  },
  {
    key: "presupuestoMantenimiento",
    icon: BadgeDollarSign,
    title: "Presupuesto para mantenimiento",
    price: "Desde S/120",
    category: "Presupuestos",
    short: "Costos de mantenimiento por actividad, equipo, frecuencia y responsable.",
    includes: ["Mano de obra", "Materiales", "Equipos", "Resumen económico"],
    fields: ["Equipos", "Actividades", "Frecuencia", "Materiales", "Responsables"],
  },
  {
    key: "planMantenimiento",
    icon: Wrench,
    title: "Plan de mantenimiento",
    price: "Desde S/150",
    category: "Mantenimiento",
    short: "Plan preventivo/correctivo con cronograma, frecuencias y checklist.",
    includes: ["Cronograma", "Frecuencias", "Checklist", "Responsables", "Estado"],
    fields: ["Activos", "Frecuencia", "Actividades", "Responsables", "Fechas"],
  },
  {
    key: "criticidad",
    icon: ShieldAlert,
    title: "Análisis de criticidad",
    price: "Desde S/150",
    category: "Mantenimiento",
    short: "Matriz de criticidad por impacto, frecuencia, riesgo y prioridad.",
    includes: ["Matriz de riesgo", "Ranking de activos", "Prioridad", "Acciones"],
    fields: ["Activos", "Impacto", "Frecuencia", "Probabilidad", "Consecuencia"],
  },
];

const packages = [
  {
    title: "Pack CV Pro",
    price: "S/40 - S/65",
    text: "CV moderno con cambio de color. Puede incluir carta de presentación.",
    items: ["CV moderno", "Colores personalizables", "Perfil profesional", "PDF final"],
  },
  {
    title: "Pack Reclamo Pro",
    price: "S/45",
    text: "Carta + correo + WhatsApp + guía para Libro de Reclamaciones.",
    items: ["Carta formal", "Correo", "WhatsApp", "Texto para reclamo"],
  },
  {
    title: "Pack Dashboard Ejecutivo",
    price: "Desde S/180",
    text: "Comparativo + indicadores + lectura final + recomendación.",
    items: ["Matriz", "Dashboard", "Puntajes", "Recomendación"],
  },
  {
    title: "Pack Mantenimiento",
    price: "Desde S/250",
    text: "Plan + criticidad + presupuesto + dashboard de seguimiento.",
    items: ["Plan", "Criticidad", "Presupuesto", "Dashboard"],
  },
];

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Logo({ dark = false }) {
  return (
    <div className="logo">
      <div className="logoMark">
        <span className="ring" />
        <span className="dot dotA" />
        <span className="dot dotB" />
      </div>
      <strong className={dark ? "dark" : ""}>CreaIA Pro</strong>
    </div>
  );
}

function Header({ openRequest }) {
  return (
    <header className="header">
      <Logo />
      <nav>
        <a href="#servicios">Servicios</a>
        <a href="#cv">CV Pro</a>
        <a href="#dashboards">Dashboards</a>
        <a href="#paquetes">Paquetes</a>
        <a href="#faq">FAQ</a>
      </nav>
      <button onClick={() => openRequest(null)} className="headerBtn">
        <Send size={16} /> Solicitar
      </button>
    </header>
  );
}

function Hero({ openRequest }) {
  return (
    <section className="hero" id="inicio">
      <div className="heroPattern" />
      <Header openRequest={openRequest} />
      <div className="heroGrid">
        <div>
          <span className="eyebrow">
            <Sparkles size={14} /> Documentos, CVs y dashboards con IA
          </span>
          <h1>
            Crea archivos profesionales, <span>modernos y listos para usar</span>
          </h1>
          <p>
            Una página para vender CVs modernos, documentos, presupuestos, planes de mantenimiento,
            análisis de criticidad y cuadros comparativos tipo dashboard.
          </p>
          <div className="heroActions">
            <button onClick={() => openRequest(services[0])} className="primaryBtn">
              Crear mi archivo <ArrowRight size={18} />
            </button>
            <a href="#servicios" className="secondaryBtn">Ver servicios</a>
          </div>
          <div className="heroTags">
            <span>Vista moderna</span>
            <span>WhatsApp integrado</span>
            <span>Precios visibles</span>
            <span>Listo para lanzar</span>
          </div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="heroDashboard">
      <div className="dashHeader">
        <BarChart3 size={20} />
        <strong>Panel CreaIA Pro</strong>
      </div>
      <div className="dashStats">
        <div><small>Servicios</small><strong>10+</strong></div>
        <div><small>Solicitud</small><strong>WhatsApp</strong></div>
        <div><small>Entrega</small><strong>PDF / Excel</strong></div>
      </div>
      <div className="mockChart">
        <span style={{ height: "45%" }} />
        <span style={{ height: "65%" }} />
        <span style={{ height: "78%" }} />
        <span style={{ height: "52%" }} />
        <span style={{ height: "88%" }} />
      </div>
      <div className="progressRows">
        <i style={{ width: "92%" }} />
        <i style={{ width: "72%" }} />
        <i style={{ width: "84%" }} />
      </div>
    </div>
  );
}

function SectionHead({ label, title, text }) {
  return (
    <div className="sectionHead">
      <span>{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Services({ openRequest }) {
  const [category, setCategory] = useState("Todos");
  const categories = ["Todos", ...Array.from(new Set(services.map(s => s.category)))];
  const filtered = category === "Todos" ? services : services.filter(s => s.category === category);

  return (
    <section className="section" id="servicios">
      <SectionHead
        label="Servicios"
        title="Oferta completa para lanzar"
        text="Cada servicio tiene botón de solicitud, campos sugeridos y mensaje automático a WhatsApp."
      />
      <div className="filters">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={category === c ? "active" : ""}>{c}</button>
        ))}
      </div>
      <div className="serviceGrid">
        {filtered.map((service) => {
          const Icon = service.icon;
          return (
            <article className="serviceCard" key={service.key}>
              <div className="serviceTop">
                <div className="serviceIcon"><Icon size={24} /></div>
                <strong>{service.price}</strong>
              </div>
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <ul>
                {service.includes.map((x) => (
                  <li key={x}><CheckCircle2 size={15} /> {x}</li>
                ))}
              </ul>
              <button onClick={() => openRequest(service)}>
                Solicitar <ArrowRight size={16} />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CVPreview() {
  const [themeKey, setThemeKey] = useState("ocean");
  const theme = themes[themeKey];

  return (
    <section className="section cvSection" id="cv">
      <div className="splitHead">
        <SectionHead
          label="CV Pro"
          title="CV moderno con cambio de colores"
          text="El usuario puede elegir el tono visual que más le guste antes de solicitarlo."
        />
      </div>

      <div className="cvGrid">
        <div className="colorPanel">
          <div className="panelTitle">
            <Palette size={20} />
            <div>
              <strong>Selector de estilo</strong>
              <small>Prueba los tonos disponibles</small>
            </div>
          </div>
          <div className="themeGrid">
            {Object.entries(themes).map(([key, t]) => (
              <button key={key} onClick={() => setThemeKey(key)} className={themeKey === key ? "selected" : ""}>
                <span style={{ background: t.accent }} />
                {t.name}
              </button>
            ))}
          </div>
          <div className="noteBox">
            <Wand2 size={18} />
            <p>Este modelo puede venderse como CV Pro básico o CV Pro premium según nivel de diseño.</p>
          </div>
        </div>

        <div className="resume" style={{ "--accent": theme.accent, "--soft": theme.soft, "--dark": theme.dark }}>
          <aside>
            <div className="avatar" />
            <h3>Juan Pérez</h3>
            <span>Supervisor de Operaciones</span>
            <div className="resumeBlock">
              <strong>Contacto</strong>
              <p>+51 999 888 777</p>
              <p>juanperez@gmail.com</p>
              <p>Chepén, Perú</p>
            </div>
            <div className="resumeBlock">
              <strong>Habilidades</strong>
              <p>Gestión de proyectos</p>
              <p>Excel y dashboards</p>
              <p>Presupuestos</p>
              <p>Mantenimiento</p>
            </div>
            <div className="resumeBlock">
              <strong>Herramientas</strong>
              <div className="skillBar"><i style={{ width: "85%" }} /></div>
              <div className="skillBar"><i style={{ width: "72%" }} /></div>
              <div className="skillBar"><i style={{ width: "64%" }} /></div>
            </div>
          </aside>
          <main>
            <header>
              <h3>Currículum Vitae</h3>
              <p>Diseño moderno personalizable</p>
            </header>
            <section>
              <h4>Perfil profesional</h4>
              <p>Profesional orientado a resultados, con experiencia en control operativo, seguimiento de indicadores, reportes ejecutivos y coordinación de actividades.</p>
            </section>
            <section>
              <h4>Experiencia laboral</h4>
              <div className="timelineItem">
                <b>Supervisor de operaciones</b>
                <span>2023 - Actualidad</span>
                <p>Control de avance, costos, reportes y coordinación de equipos.</p>
              </div>
              <div className="timelineItem">
                <b>Asistente de proyectos</b>
                <span>2021 - 2023</span>
                <p>Apoyo en presupuestos, comparativos, documentación y seguimiento.</p>
              </div>
            </section>
            <section>
              <h4>Formación</h4>
              <p>Estudios técnicos/profesionales, cursos de Excel, mantenimiento, presupuestos y gestión.</p>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}

function DashboardServices({ openRequest }) {
  const dashItems = services.filter(s => ["Dashboards", "Presupuestos", "Mantenimiento"].includes(s.category));

  return (
    <section className="section dashboards" id="dashboards">
      <SectionHead
        label="Dashboards"
        title="Cuadros modernos para gestión, proyectos y mantenimiento"
        text="Todos estos servicios quedan presentados como productos claros y vendibles."
      />
      <div className="dashboardGrid">
        {dashItems.map((item) => {
          const Icon = item.icon;
          return (
            <div className="dashCard" key={item.key}>
              <div className="dashTitle"><Icon size={22} /><h3>{item.title}</h3></div>
              <p>{item.short}</p>
              <div className="miniDash">
                <div className="miniTop"><span /><span /><span /></div>
                <div className="miniKpis"><i /><i /><i /></div>
                <div className="miniBars">
                  <b style={{ width: "90%" }} />
                  <b style={{ width: "70%" }} />
                  <b style={{ width: "80%" }} />
                </div>
              </div>
              <button onClick={() => openRequest(item)}>Solicitar dashboard</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Packages({ openRequest }) {
  return (
    <section className="section" id="paquetes">
      <SectionHead
        label="Paquetes"
        title="Paquetes listos para vender"
        text="Estos paquetes ayudan a que el cliente compre más de un servicio."
      />
      <div className="packageGrid">
        {packages.map((pack) => (
          <div className="packageCard" key={pack.title}>
            <h3>{pack.title}</h3>
            <strong>{pack.price}</strong>
            <p>{pack.text}</p>
            <ul>
              {pack.items.map(i => <li key={i}><CheckCircle2 size={15} /> {i}</li>)}
            </ul>
            <button onClick={() => openRequest({ title: pack.title, price: pack.price, fields: pack.items })}>
              Solicitar paquete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section how">
      <SectionHead
        label="Proceso"
        title="Cómo funcionará para el cliente"
        text="El flujo está pensado para que el cliente no dependa de explicaciones largas."
      />
      <div className="steps">
        {[
          ["Elige servicio", "El cliente selecciona CV, dashboard, presupuesto, plan o documento."],
          ["Completa datos", "La página le pide la información mínima necesaria para cotizar o generar."],
          ["Envía solicitud", "Te llega todo ordenado por WhatsApp con el servicio seleccionado."],
          ["Pago y entrega", "Se coordina pago por Yape y entrega del archivo final."],
        ].map(([title, text], index) => (
          <div className="step" key={title}>
            <span>{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const rows = [
    ["¿El cliente paga antes?", "Sí. Puedes manejar pago por Yape antes de entregar el archivo final."],
    ["¿Qué archivos se entregan?", "PDF, Excel, Word o imagen, según el servicio."],
    ["¿Incluye cambios?", "Puedes incluir 1 ajuste básico y cobrar ajustes adicionales."],
    ["¿Se puede hacer algo personalizado?", "Sí. La página incluye contacto para servicios a medida."],
  ];
  return (
    <section className="section faq" id="faq">
      <SectionHead label="Preguntas frecuentes" title="Información clara para evitar dudas" />
      <div className="faqGrid">
        {rows.map(([q, a]) => (
          <div key={q} className="faqItem">
            <HelpCircle size={18} />
            <div>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ openRequest }) {
  return (
    <section className="section contact" id="contacto">
      <div className="contactBox">
        <div>
          <span className="eyebrow dark">Contacto</span>
          <h2>Listo para recibir pedidos</h2>
          <p>
            La página queda con servicios, precios, solicitud por WhatsApp, paquetes y presentación moderna.
          </p>
          <div className="contactRows">
            <span><Phone size={16} /> {PHONE}</span>
            <span><Mail size={16} /> {EMAIL}</span>
            <span><Wallet size={16} /> Yape: {YAPE}</span>
          </div>
        </div>
        <div className="contactActions">
          <button onClick={() => openRequest(null)} className="primaryBtn">Solicitar servicio</button>
          <a className="secondaryBtn" href={`mailto:${EMAIL}`}>Enviar correo</a>
        </div>
      </div>
    </section>
  );
}

function RequestModal({ selected, close }) {
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    correo: "",
    detalle: "",
    urgencia: "Normal",
    formato: "PDF",
  });

  const serviceName = selected?.title || "Servicio personalizado";
  const fields = selected?.fields || ["Servicio requerido", "Datos base", "Formato", "Fecha de entrega"];

  const message = useMemo(() => {
    return [
      "Hola CreaIA Pro, quiero solicitar un servicio.",
      "",
      `Servicio: ${serviceName}`,
      `Precio referencial: ${selected?.price || "Por cotizar"}`,
      `Nombre: ${form.nombre || "No indicado"}`,
      `WhatsApp: ${form.whatsapp || "No indicado"}`,
      `Correo: ${form.correo || "No indicado"}`,
      `Formato: ${form.formato}`,
      `Urgencia: ${form.urgencia}`,
      "",
      "Información del pedido:",
      form.detalle || "No indicado",
      "",
      "Campos sugeridos para este servicio:",
      fields.map(f => `- ${f}`).join("\n"),
      "",
      "Por favor, confírmame el precio final, tiempo de entrega y forma de pago.",
    ].join("\n");
  }, [form, selected, serviceName, fields]);

  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modalHead">
          <div>
            <span>Solicitud rápida</span>
            <h2>{serviceName}</h2>
          </div>
          <button onClick={close}><X size={20} /></button>
        </div>

        <div className="formGrid">
          <label>Nombre<input value={form.nombre} onChange={update("nombre")} placeholder="Tu nombre" /></label>
          <label>WhatsApp<input value={form.whatsapp} onChange={update("whatsapp")} placeholder="+51..." /></label>
        </div>
        <label>Correo<input value={form.correo} onChange={update("correo")} placeholder="correo@email.com" /></label>
        <label>Detalle del pedido<textarea value={form.detalle} onChange={update("detalle")} placeholder="Cuéntame qué necesitas, datos, alcance, fechas o referencias..." /></label>
        <div className="formGrid">
          <label>Formato
            <select value={form.formato} onChange={update("formato")}>
              <option>PDF</option>
              <option>Excel</option>
              <option>Word</option>
              <option>PowerPoint</option>
              <option>Imagen</option>
            </select>
          </label>
          <label>Urgencia
            <select value={form.urgencia} onChange={update("urgencia")}>
              <option>Normal</option>
              <option>Hoy</option>
              <option>Menos de 24 horas</option>
            </select>
          </label>
        </div>

        <div className="modalTips">
          <strong>Este servicio puede requerir:</strong>
          <ul>{fields.map(f => <li key={f}>{f}</li>)}</ul>
        </div>

        <a className="sendWhats" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> Enviar solicitud por WhatsApp
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <Logo dark />
      <p>© 2026 CreaIA Pro · Documentos, CVs, presupuestos y dashboards modernos.</p>
    </footer>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openRequest = (service) => {
    setSelected(service);
    setModalOpen(true);
  };

  return (
    <>
      <Hero openRequest={openRequest} />
      <Services openRequest={openRequest} />
      <CVPreview />
      <DashboardServices openRequest={openRequest} />
      <Packages openRequest={openRequest} />
      <HowItWorks />
      <FAQ />
      <Contact openRequest={openRequest} />
      <Footer />
      {modalOpen && <RequestModal selected={selected} close={() => setModalOpen(false)} />}
    </>
  );
}
