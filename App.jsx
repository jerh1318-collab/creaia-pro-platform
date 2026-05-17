"use client";

import React, { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Palette,
  Sparkles,
  Wallet,
  Wrench,
  ShieldAlert,
} from "lucide-react";

const WHATSAPP_NUMBER = "51991561272";
const YAPE = "991 561 272";

const services = [
  { key: "cv", title: "CV Pro moderno", price: "S/40", format: "PDF / Word", icon: FileText },
  { key: "reclamo", title: "Reclamo Pro", price: "S/25", format: "PDF / Word", icon: BriefcaseBusiness },
  { key: "comparativo", title: "Cuadro comparativo dashboard", price: "Desde S/80", format: "Excel / PDF", icon: LayoutDashboard },
  { key: "presupuesto", title: "Presupuesto de proyecto", price: "Desde S/120", format: "Excel / PDF", icon: Wallet },
  { key: "mantenimiento", title: "Plan de mantenimiento", price: "Desde S/150", format: "Excel / PDF", icon: Wrench },
  { key: "criticidad", title: "Análisis de criticidad", price: "Desde S/150", format: "Excel / PDF", icon: ShieldAlert },
];

const colors = [
  { name: "Turquesa", value: "#10bcd4" },
  { name: "Azul", value: "#2563eb" },
  { name: "Verde", value: "#10b981" },
  { name: "Morado", value: "#6366f1" },
  { name: "Grafito", value: "#334155" },
];

const initial = {
  nombre: "",
  puesto: "",
  whatsapp: "",
  correo: "",
  ciudad: "",
  perfil: "",
  experiencia: "",
  estudios: "",
  habilidades: "",
  herramientas: "",
  idiomas: "",
  logros: "",
};

function wa(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function splitList(text, fallback = []) {
  const items = String(text || "")
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter(Boolean);
  return items.length ? items : fallback;
}

function makeDocText(service, form) {
  if (service.key === "cv") {
    return `CURRÍCULUM VITAE

${form.nombre || "Nombre del candidato"}
${form.puesto || "Puesto profesional"}
WhatsApp: ${form.whatsapp || "-"}
Correo: ${form.correo || "-"}
Ciudad: ${form.ciudad || "-"}

PERFIL PROFESIONAL
${form.perfil || "Profesional responsable, orientado a resultados y con capacidad para resolver problemas operativos."}

EXPERIENCIA
${form.experiencia || "Describe aquí la experiencia laboral principal."}

FORMACIÓN
${form.estudios || "Estudios, cursos o certificaciones."}

HABILIDADES
${form.habilidades || "Responsabilidad, liderazgo, comunicación, Excel, mantenimiento."}

HERRAMIENTAS
${form.herramientas || "Microsoft Excel, Word, AutoCAD."}

IDIOMAS
${form.idiomas || "Español nativo."}

LOGROS
${form.logros || "Mejora de procesos, cumplimiento de objetivos y reducción de tiempos."}`;
  }

  return `${service.title.toUpperCase()}

Cliente / Proyecto:
${form.nombre || "Nombre del cliente o proyecto"}

Resumen:
${form.perfil || "Resumen ejecutivo del documento."}

Detalle:
${form.experiencia || "Detalle principal del servicio solicitado."}

Datos adicionales:
- ${form.puesto || "Dato principal"}
- ${form.estudios || "Estudios / partidas / criterios"}
- ${form.habilidades || "Habilidades / observaciones"}
- ${form.logros || "Conclusión o recomendación"}

Documento generado por CreaIA Pro.`;
}

function downloadStyledCvPDF(form, accent) {
  const doc = new jsPDF("p", "mm", "a4");
  const W = 210;
  const H = 297;
  const leftW = 64;
  const dark = "#06213a";
  const light = "#eef7fb";
  const text = "#0f172a";
  const muted = "#64748b";

  doc.setFillColor(dark);
  doc.roundedRect(8, 8, W - 16, H - 16, 4, 4, "F");
  doc.setFillColor("#ffffff");
  doc.roundedRect(leftW, 8, W - leftW - 8, H - 16, 0, 4, "F");

  doc.setFillColor(accent);
  doc.rect(leftW, 8, 4, H - 16, "F");

  doc.setFillColor("#ffffff");
  doc.circle(36, 30, 18, "F");
  doc.setFillColor("#d1d5db");
  doc.circle(36, 25, 7, "F");
  doc.circle(36, 40, 12, "F");
  doc.setDrawColor(accent);
  doc.setLineWidth(1.8);
  doc.circle(36, 30, 20, "S");

  doc.setTextColor("#ffffff");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("CONTACTO", 16, 70);
  doc.setDrawColor(accent);
  doc.setLineWidth(1);
  doc.line(16, 73, 38, 73);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const contact = [
    form.whatsapp || "WhatsApp",
    form.correo || "correo@email.com",
    form.ciudad || "Ciudad, País",
  ];
  let y = 82;
  contact.forEach((item) => {
    doc.text("• " + item, 16, y);
    y += 8;
  });

  const skills = splitList(form.habilidades, ["Mantenimiento", "Resolución de fallas", "Trabajo en equipo", "Excel", "Comunicación"]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("HABILIDADES", 16, 124);
  doc.setDrawColor(accent);
  doc.line(16, 127, 42, 127);
  y = 136;
  skills.slice(0, 7).forEach((s, i) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.6);
    doc.text(s, 16, y);
    doc.setFillColor("#64748b");
    doc.roundedRect(16, y + 2, 38, 2.2, 1, 1, "F");
    doc.setFillColor(accent);
    doc.roundedRect(16, y + 2, 22 + (i % 4) * 4, 2.2, 1, 1, "F");
    y += 11;
  });

  const tools = splitList(form.herramientas, ["Microsoft Excel", "Microsoft Word", "AutoCAD"]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("HERRAMIENTAS", 16, 220);
  doc.setDrawColor(accent);
  doc.line(16, 223, 47, 223);
  y = 232;
  tools.slice(0, 4).forEach((t) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.4);
    doc.roundedRect(16, y - 5, 38, 7, 2, 2, "S");
    doc.text(t, 19, y);
    y += 10;
  });

  doc.setTextColor(text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(25);
  doc.text((form.nombre || "TU NOMBRE").toUpperCase(), 75, 28);
  doc.setTextColor(accent);
  doc.text("", 75, 28);

  doc.setTextColor("#0f172a");
  doc.setFontSize(10);
  doc.setCharSpace(1.6);
  doc.text((form.puesto || "PUESTO PROFESIONAL").toUpperCase(), 76, 38);
  doc.setCharSpace(0);
  doc.setDrawColor(accent);
  doc.setLineWidth(1.1);
  doc.line(76, 43, 91, 43);

  function section(title, body, x, y0, maxH = 42) {
    doc.setTextColor("#0f172a");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title, x, y0);
    doc.setDrawColor(accent);
    doc.setLineWidth(1);
    doc.line(x, y0 + 3, x + 14, y0 + 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor("#334155");
    const lines = doc.splitTextToSize(body || "Información pendiente.", 112);
    doc.text(lines.slice(0, Math.floor(maxH / 4)), x, y0 + 12);
    return y0 + 14 + Math.min(lines.length * 4.2, maxH);
  }

  let ry = 58;
  doc.setFillColor(light);
  doc.roundedRect(74, ry - 8, 122, 30, 4, 4, "F");
  ry = section("PERFIL PROFESIONAL", form.perfil || "Profesional responsable, orientado a resultados, con capacidad de organización y enfoque en mejora continua.", 80, ry, 26) + 10;

  ry = section("EXPERIENCIA LABORAL", form.experiencia || "Describe la experiencia principal, funciones, responsabilidades y resultados obtenidos.", 76, ry, 44) + 8;
  doc.setDrawColor("#e2e8f0");
  doc.line(76, ry - 2, 194, ry - 2);

  ry = section("FORMACIÓN", form.estudios || "Estudios, cursos y certificaciones relevantes.", 76, ry + 5, 25) + 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor("#0f172a");
  doc.text("LOGROS CLAVE", 76, ry);
  doc.setDrawColor(accent);
  doc.line(76, ry + 3, 94, ry + 3);
  const logros = splitList(form.logros, ["Mejora de eficiencia operativa", "Cumplimiento de objetivos", "Reducción de tiempos o costos"]);
  let x = 76;
  y = ry + 14;
  logros.slice(0, 3).forEach((l) => {
    doc.setFillColor("#f8fafc");
    doc.roundedRect(x, y - 7, 36, 26, 3, 3, "F");
    doc.setFillColor(accent);
    doc.circle(x + 6, y, 4, "F");
    doc.setTextColor("#334155");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    const lns = doc.splitTextToSize(l, 24);
    doc.text(lns.slice(0, 3), x + 12, y);
    x += 40;
  });

  doc.save("cv-pro-moderno-creaia-pro.pdf");
}

function downloadPlainPDF(title, text) {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(title, 16, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, 178);
  let y = 32;
  lines.forEach((line) => {
    if (y > 280) {
      doc.addPage();
      y = 18;
    }
    doc.text(line, 16, y);
    y += 5.6;
  });
  doc.save(`${title.toLowerCase().replaceAll(" ", "-")}-creaia-pro.pdf`);
}

function downloadWord(title, content) {
  const blob = new Blob([
    `<html><head><meta charset="utf-8"></head><body style="font-family:Arial;line-height:1.6"><h1>${title}</h1><pre style="white-space:pre-wrap;font-family:Arial">${content}</pre></body></html>`,
  ], { type: "application/msword" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${title.toLowerCase().replaceAll(" ", "-")}.doc`;
  a.click();
}

function downloadCSV(title, form, content) {
  const rows = [
    ["Campo", "Dato"],
    ["Nombre", form.nombre],
    ["Puesto", form.puesto],
    ["WhatsApp", form.whatsapp],
    ["Correo", form.correo],
    ["Detalle", content.replace(/\n/g, " ")],
  ];
  const csv = rows.map(r => r.map(c => `"${String(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${title.toLowerCase().replaceAll(" ", "-")}.csv`;
  a.click();
}

function CvPreview({ form, accent }) {
  const skills = splitList(form.habilidades, ["Instalaciones eléctricas", "Mantenimiento preventivo", "Diagnóstico de fallas", "Excel", "Trabajo en equipo"]);
  const tools = splitList(form.herramientas, ["AutoCAD", "Microsoft Excel", "Microsoft Word"]);
  return (
    <div className="cvSheet" style={{ "--accent": accent }}>
      <aside className="cvSide">
        <div className="avatar"><span /></div>
        <h4>CONTACTO</h4>
        <p>☎ {form.whatsapp || "+51 999 999 999"}</p>
        <p>✉ {form.correo || "correo@email.com"}</p>
        <p>⌖ {form.ciudad || "Ciudad, País"}</p>

        <h4>HABILIDADES</h4>
        {skills.slice(0, 7).map((s, i) => (
          <div className="skill" key={s}>
            <span>{s}</span>
            <b><i style={{ width: `${65 + (i % 3) * 10}%` }} /></b>
          </div>
        ))}

        <h4>HERRAMIENTAS</h4>
        <div className="tools">
          {tools.slice(0, 5).map((t) => <em key={t}>{t}</em>)}
        </div>
      </aside>

      <section className="cvMain">
        <h1>{form.nombre || "YOUR NAME"}</h1>
        <h2>{form.puesto || "INDUSTRIAL ELECTRICIAN"}</h2>

        <div className="cvBox">
          <strong>PROFESSIONAL SUMMARY</strong>
          <p>{form.perfil || "Profesional responsable y orientado al detalle, con experiencia en mantenimiento, operación y mejora de procesos."}</p>
        </div>

        <article>
          <h3>WORK EXPERIENCE</h3>
          <p>{form.experiencia || "Describe aquí tu experiencia laboral, funciones, responsabilidades y logros principales."}</p>
        </article>

        <article>
          <h3>EDUCATION</h3>
          <p>{form.estudios || "Estudios técnicos, cursos, certificaciones y formación relevante."}</p>
        </article>

        <article>
          <h3>KEY ACHIEVEMENTS</h3>
          <div className="achievements">
            {splitList(form.logros, ["Mejora de eficiencia", "Seguridad operativa", "Ahorro de costos"]).slice(0, 3).map((l) => <span key={l}>{l}</span>)}
          </div>
        </article>
      </section>
    </div>
  );
}

export default function App() {
  const [serviceKey, setServiceKey] = useState("cv");
  const [form, setForm] = useState(initial);
  const [accent, setAccent] = useState("#10bcd4");
  const [generated, setGenerated] = useState(false);
  const [paid, setPaid] = useState(false);
  const [revisions, setRevisions] = useState(3);

  const service = services.find((s) => s.key === serviceKey);
  const docText = useMemo(() => makeDocText(service, form), [service, form]);

  const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const paymentText = `Hola CreaIA Pro, ya realicé el pago para liberar descarga.
Servicio: ${service.title}
Cliente: ${form.nombre || "No indicado"}
Monto: ${service.price}
Yape: ${YAPE}
Adjunto comprobante.`;

  return (
    <main>
      <section className="hero">
        <header>
          <div className="brand"><span /> CreaIA Pro</div>
          <a href="#generador">Crear archivo</a>
        </header>
        <div className="heroContent">
          <div>
            <small><Sparkles size={15} /> Vista previa + descarga</small>
            <h1>Genera archivos modernos, listos para usar</h1>
            <p>El cliente elige, completa datos, revisa el modelo, valida pago y descarga PDF, Word o Excel.</p>
            <a className="mainCta" href="#generador">Probar ahora <ArrowRight size={18} /></a>
          </div>
          <div className="dashMock">
            <BarChart3 />
            <h3>Panel CreaIA Pro</h3>
            <div><b /> <b /> <b /> <b /></div>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>Servicios disponibles</h2>
        <div className="cards">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.key} className={serviceKey === s.key ? "active" : ""} onClick={() => { setServiceKey(s.key); setGenerated(false); setPaid(false); }}>
                <Icon />
                <strong>{s.title}</strong>
                <p>{s.format}</p>
                <span>{s.price}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="generator" id="generador">
        <div className="form">
          <h2>Generador directo</h2>
          <p className="muted">Primero se genera vista previa. WhatsApp solo se usa para enviar comprobante de pago.</p>

          <label>Nombre completo / empresa<input value={form.nombre} onChange={update("nombre")} placeholder="Ej. Juan Pérez" /></label>
          <label>Puesto / título / proyecto<input value={form.puesto} onChange={update("puesto")} placeholder="Ej. Técnico electricista industrial" /></label>
          <div className="two">
            <label>WhatsApp<input value={form.whatsapp} onChange={update("whatsapp")} /></label>
            <label>Correo<input value={form.correo} onChange={update("correo")} /></label>
          </div>
          <label>Ciudad<input value={form.ciudad} onChange={update("ciudad")} /></label>
          <label>Perfil / resumen<textarea value={form.perfil} onChange={update("perfil")} /></label>
          <label>Experiencia / detalle principal<textarea value={form.experiencia} onChange={update("experiencia")} /></label>
          <label>Estudios / partidas / criterios<textarea value={form.estudios} onChange={update("estudios")} /></label>
          <label>Habilidades<textarea value={form.habilidades} onChange={update("habilidades")} placeholder="Separar por comas" /></label>
          <label>Herramientas<textarea value={form.herramientas} onChange={update("herramientas")} placeholder="Excel, AutoCAD, Word" /></label>
          <label>Logros / conclusión<textarea value={form.logros} onChange={update("logros")} /></label>

          {serviceKey === "cv" && (
            <div className="palette">
              <strong><Palette size={17} /> Cambiar color del CV</strong>
              {colors.map((c) => <button key={c.value} onClick={() => setAccent(c.value)} className={accent === c.value ? "selected" : ""}><i style={{ background: c.value }} />{c.name}</button>)}
            </div>
          )}

          <button className="generate" onClick={() => { setGenerated(true); setPaid(false); setRevisions(3); }}>
            <Sparkles size={18} /> Generar vista previa
          </button>
        </div>

        <div className="preview">
          <div className="previewHead">
            <div>
              <span>Vista previa</span>
              <h2>{service.title}</h2>
            </div>
            {generated && <CheckCircle2 color={accent} />}
          </div>

          {!generated ? (
            <div className="empty">Completa los datos y presiona “Generar vista previa”.</div>
          ) : serviceKey === "cv" ? (
            <CvPreview form={form} accent={accent} />
          ) : (
            <pre className="documentPreview">{docText}</pre>
          )}

          {generated && (
            <>
              <div className="review">
                <b>Revisiones disponibles: {revisions}/3</b>
                <button disabled={revisions === 0} onClick={() => setRevisions((r) => Math.max(0, r - 1))}>Aplicar mejora</button>
                <button disabled={revisions === 0} onClick={() => setRevisions((r) => Math.max(0, r - 1))}>Más formal</button>
                <button disabled={revisions === 0} onClick={() => setRevisions((r) => Math.max(0, r - 1))}>Más corto</button>
              </div>

              <div className="pay">
                <p>Pago: <b>{service.price}</b> · Yape: <b>{YAPE}</b></p>
                <a href={wa(paymentText)} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Enviar comprobante</a>
                <button onClick={() => setPaid(true)}>Ya pagué / liberar descarga</button>
              </div>

              <div className="downloads">
                <button disabled={!paid} onClick={() => serviceKey === "cv" ? downloadStyledCvPDF(form, accent) : downloadPlainPDF(service.title, docText)}><Download size={17} /> PDF</button>
                <button disabled={!paid} onClick={() => downloadWord(service.title, docText)}><Download size={17} /> Word</button>
                <button disabled={!paid} onClick={() => downloadCSV(service.title, form, docText)}><Download size={17} /> Excel</button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}