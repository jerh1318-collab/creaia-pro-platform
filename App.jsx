"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  Download,
  FileSignature,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Palette,
  ShieldAlert,
  Sparkles,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

const WHATSAPP_NUMBER = "51991561272";
const YAPE = "991 561 272";

const services = [
  { key: "cv", icon: FileText, title: "CV Pro moderno", price: "S/40", format: "PDF / Word", description: "CV moderno con perfil profesional, experiencia redactada y diseño limpio.", fields: ["Puesto u oficio", "Experiencia laboral", "Estudios", "Habilidades"] },
  { key: "reclamo", icon: FileSignature, title: "Reclamo Pro", price: "S/25", format: "PDF / Word", description: "Carta de reclamo clara, firme y formal.", fields: ["Empresa reclamada", "Qué ocurrió", "Qué solicitas", "Monto involucrado"] },
  { key: "carta", icon: ClipboardList, title: "Carta Formal", price: "S/20", format: "PDF / Word", description: "Carta formal o solicitud lista para presentar.", fields: ["Destinatario", "Asunto", "Motivo", "Solicitud"] },
  { key: "cotizacion", icon: BriefcaseBusiness, title: "Cotización Pro", price: "S/20", format: "PDF / Word", description: "Cotización ordenada con alcance, plazo, precio y condiciones.", fields: ["Cliente", "Servicio", "Precio", "Condiciones"] },
  { key: "comparativo", icon: LayoutDashboard, title: "Cuadro comparativo dashboard", price: "Desde S/80", format: "Excel / PDF", description: "Comparativo técnico/económico con puntaje y recomendación.", fields: ["Proveedores", "Precios", "Criterios técnicos", "Observaciones"] },
  { key: "proveedores", icon: Users, title: "Selección de proveedores", price: "Desde S/100", format: "Excel / PDF", description: "Ranking de proveedores con sustento y lectura final.", fields: ["Proveedores", "Experiencia", "Garantía", "Plazos"] },
  { key: "presupuestoProyecto", icon: Wallet, title: "Presupuesto para proyecto", price: "Desde S/120", format: "Excel / PDF", description: "Presupuesto por partidas, metrados, precios unitarios y total.", fields: ["Proyecto", "Partidas", "Metrados", "Costos"] },
  { key: "presupuestoMantenimiento", icon: BadgeDollarSign, title: "Presupuesto mantenimiento", price: "Desde S/120", format: "Excel / PDF", description: "Costos de mantenimiento por actividad, frecuencia y responsable.", fields: ["Equipos", "Actividades", "Frecuencia", "Materiales"] },
  { key: "planMantenimiento", icon: Wrench, title: "Plan de mantenimiento", price: "Desde S/150", format: "Excel / PDF", description: "Cronograma, checklist, responsables y estado de actividades.", fields: ["Activos", "Frecuencia", "Actividades", "Responsables"] },
  { key: "criticidad", icon: ShieldAlert, title: "Análisis de criticidad", price: "Desde S/150", format: "Excel / PDF", description: "Matriz de criticidad por impacto, frecuencia, riesgo y prioridad.", fields: ["Activos", "Impacto", "Frecuencia", "Consecuencia"] },
];

const themes = [
  { name: "Turquesa", value: "#14b8d4" },
  { name: "Azul", value: "#2563eb" },
  { name: "Verde", value: "#10b981" },
  { name: "Morado", value: "#6366f1" },
  { name: "Grafito", value: "#334155" },
];

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildDocument(service, form, revisionStyle = "normal") {
  const tone =
    revisionStyle === "formal"
      ? "con un tono más formal y ejecutivo"
      : revisionStyle === "corto"
      ? "en una versión más breve y directa"
      : revisionStyle === "mejorado"
      ? "con una redacción más profesional y mejor estructurada"
      : "con una estructura clara y profesional";

  if (service.key === "cv") {
    return `CURRÍCULUM VITAE

${form.nombre || "[Nombre completo]"}
${form.campo1 || "[Puesto u oficio]"}
WhatsApp: ${form.whatsapp || "[WhatsApp]"}
Correo: ${form.correo || "[Correo]"}

PERFIL PROFESIONAL
Profesional ${tone}, con experiencia en ${form.campo2 || "[experiencia laboral]"}. Destaca por su responsabilidad, capacidad de organización, orientación a resultados y disposición para asumir nuevos retos.

EXPERIENCIA LABORAL
${form.detalle || "[Describe aquí tu experiencia laboral]"}

FORMACIÓN
${form.campo3 || "[Estudios, cursos o certificaciones]"}

HABILIDADES
${form.campo4 || "[Habilidades principales]"}

Documento generado por CreaIA Pro.`;
  }

  if (service.key === "reclamo") {
    return `CARTA DE RECLAMO

A quien corresponda:

Yo, ${form.nombre || "[Nombre completo]"}, presento el siguiente reclamo contra ${form.campo1 || "[Empresa reclamada]"}.

HECHOS
${form.detalle || "[Describe claramente lo ocurrido]"}

SOLICITUD
Solicito ${form.campo2 || "[indicar solución solicitada]"}, considerando que el hecho descrito me ha generado perjuicio y requiere una respuesta oportuna.

MONTO INVOLUCRADO
${form.campo3 || "[Monto opcional]"}

El presente reclamo se redacta ${tone}, dejando constancia de mi solicitud para la atención correspondiente.

Atentamente,

${form.nombre || "[Nombre completo]"}`;
  }

  if (service.key === "cotizacion") {
    return `COTIZACIÓN FORMAL

Proveedor: ${form.nombre || "[Nombre / Empresa]"}
Cliente: ${form.campo1 || "[Cliente]"}
Servicio: ${form.campo2 || "[Servicio cotizado]"}

ALCANCE DEL SERVICIO
${form.detalle || "[Describe el servicio o producto]"}

PRECIO
${form.campo3 || "[Precio]"}

CONDICIONES
${form.campo4 || "[Condiciones de pago, plazo y entrega]"}

Quedamos atentos a su confirmación.

Atentamente,
${form.nombre || "[Nombre / Empresa]"}`;
  }

  if (["comparativo", "proveedores", "presupuestoProyecto", "presupuestoMantenimiento", "planMantenimiento", "criticidad"].includes(service.key)) {
    return `${service.title.toUpperCase()}

Cliente / Proyecto:
${form.nombre || "[Nombre del cliente o proyecto]"}

RESUMEN EJECUTIVO
${form.detalle || "[Describe la información base]"}

DATOS PRINCIPALES
1. ${form.campo1 || "[Dato / criterio 1]"}
2. ${form.campo2 || "[Dato / criterio 2]"}
3. ${form.campo3 || "[Dato / criterio 3]"}
4. ${form.campo4 || "[Dato / criterio 4]"}

ESTRUCTURA PROPUESTA
- Resumen ejecutivo
- Tabla principal
- Indicadores
- Semáforo de evaluación
- Observaciones
- Recomendación final

LECTURA FINAL
El análisis se presenta ${tone}. La información permite tomar una decisión más ordenada y sustentada, considerando costos, criterios técnicos, prioridad y riesgos.

Documento generado por CreaIA Pro.`;
  }

  return `DOCUMENTO FORMAL

Nombre:
${form.nombre || "[Nombre]"}

Detalle:
${form.detalle || "[Detalle]"}

Solicitud:
${form.campo1 || "[Solicitud]"}

Documento generado ${tone} por CreaIA Pro.`;
}

function buildExcelCSV(service, form, documentText) {
  return [
    ["Servicio", service.title],
    ["Cliente / Proyecto", form.nombre],
    ["WhatsApp", form.whatsapp],
    ["Correo", form.correo],
    ["Campo 1", form.campo1],
    ["Campo 2", form.campo2],
    ["Campo 3", form.campo3],
    ["Campo 4", form.campo4],
    ["Detalle", form.detalle],
    ["Resumen generado", documentText.replace(/\n/g, " ")],
  ]
    .map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

function downloadPDF(title, content) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 16;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const height = doc.internal.pageSize.getHeight();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(title, margin, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  const lines = doc.splitTextToSize(content, width);
  let y = 30;

  lines.forEach((line) => {
    if (y > height - 18) {
      doc.addPage();
      y = 18;
    }
    doc.text(line, margin, y);
    y += 5.8;
  });

  doc.save(`${title.toLowerCase().replaceAll(" ", "-")}-creaia-pro.pdf`);
}

function downloadWord(title, content) {
  const safe = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1>${title}</h1>
        <pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${safe}</pre>
        <p style="font-size:12px;color:#666;">Generado por CreaIA Pro</p>
      </body>
    </html>
  `;
  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.toLowerCase().replaceAll(" ", "-")}-creaia-pro.doc`;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadExcelCSV(title, csv) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.toLowerCase().replaceAll(" ", "-")}-creaia-pro.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function Logo() {
  return (
    <div className="logo">
      <div className="logoIcon"><span /></div>
      <strong>CreaIA Pro</strong>
    </div>
  );
}

export default function App() {
  const [serviceKey, setServiceKey] = useState("cv");
  const [color, setColor] = useState("#14b8d4");
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    correo: "",
    detalle: "",
    campo1: "",
    campo2: "",
    campo3: "",
    campo4: "",
  });
  const [documentText, setDocumentText] = useState("");
  const [revisionsLeft, setRevisionsLeft] = useState(3);
  const [paid, setPaid] = useState(false);

  const service = services.find((item) => item.key === serviceKey);
  const isExcelService = ["comparativo", "proveedores", "presupuestoProyecto", "presupuestoMantenimiento", "planMantenimiento", "criticidad"].includes(serviceKey);

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const generate = () => {
    const text = buildDocument(service, form, "normal");
    setDocumentText(text);
    setPaid(false);
    setRevisionsLeft(3);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 100);
  };

  const revise = (style) => {
    if (!documentText || revisionsLeft <= 0) return;
    const text = buildDocument(service, form, style);
    setDocumentText(text);
    setPaid(false);
    setRevisionsLeft((prev) => Math.max(0, prev - 1));
  };

  const paymentMessage = `Hola CreaIA Pro, ya realicé el pago para liberar descarga.

Servicio: ${service.title}
Cliente: ${form.nombre || "No indicado"}
Monto referencial: ${service.price}
Yape: ${YAPE}

Adjunto mi comprobante.`;

  const paidNotice = `Pedido pagado / validado en CreaIA Pro.

Servicio: ${service.title}
Cliente: ${form.nombre || "No indicado"}
WhatsApp: ${form.whatsapp || "No indicado"}
Correo: ${form.correo || "No indicado"}
Formato: ${service.format}
Monto: ${service.price}

El cliente ya puede descargar su archivo.`;

  const excelCSV = buildExcelCSV(service, form, documentText);

  return (
    <main>
      <section className="hero">
        <header className="topbar">
          <Logo />
          <nav>
            <a href="#servicios">Servicios</a>
            <a href="#generador">Generador</a>
            <a href="#modelos">Modelos</a>
          </nav>
          <a className="topButton" href="#generador">Crear archivo</a>
        </header>

        <div className="heroGrid">
          <div>
            <span className="badge"><Sparkles size={15} /> Plataforma automática</span>
            <h1>Crea archivos <span>profesionales</span> con vista previa y descarga</h1>
            <p>El cliente elige el servicio, llena sus datos, visualiza el archivo, realiza hasta 3 revisiones, valida pago y descarga en PDF, Word o Excel.</p>
            <div className="heroActions">
              <a className="primary" href="#generador">Probar generador <ArrowRight size={18} /></a>
              <a className="secondary" href="#servicios">Ver servicios</a>
            </div>
          </div>

          <div className="heroPanel">
            <div className="panelHead"><BarChart3 /><strong>Panel CreaIA Pro</strong></div>
            <div className="kpiGrid">
              <div><small>Servicios</small><b>10+</b></div>
              <div><small>Vista previa</small><b>Online</b></div>
              <div><small>Descarga</small><b>PDF / Word / Excel</b></div>
            </div>
            <div className="bars">
              <span style={{ height: "48%" }} />
              <span style={{ height: "70%" }} />
              <span style={{ height: "86%" }} />
              <span style={{ height: "58%" }} />
              <span style={{ height: "92%" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="sectionHead">
          <span>Servicios</span>
          <h2>Elige qué archivo quieres crear</h2>
          <p>Cada servicio genera una vista previa y permite descarga después de validar pago.</p>
        </div>

        <div className="serviceGrid">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={`serviceCard ${serviceKey === item.key ? "active" : ""}`}
                onClick={() => {
                  setServiceKey(item.key);
                  setDocumentText("");
                  setPaid(false);
                  setRevisionsLeft(3);
                  setTimeout(() => document.getElementById("generador")?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
              >
                <div className="serviceTop">
                  <div className="serviceIcon"><Icon size={24} /></div>
                  <strong>{item.price}</strong>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.format}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section generator" id="generador">
        <div className="sectionHead">
          <span>Generador</span>
          <h2>Genera tu archivo directamente</h2>
          <p>No se envía solicitud por WhatsApp. Primero se crea la vista previa en la web.</p>
        </div>

        <div className="generatorGrid">
          <div className="formCard">
            <div className="selectedService">
              <div>
                <strong>{service.title}</strong>
                <p>{service.description}</p>
              </div>
              <span>{service.price}</span>
            </div>

            <label>Nombre completo / empresa
              <input value={form.nombre} onChange={update("nombre")} placeholder="Ej. Juan Pérez" />
            </label>

            <div className="two">
              <label>WhatsApp
                <input value={form.whatsapp} onChange={update("whatsapp")} placeholder="Ej. 999888777" />
              </label>
              <label>Correo
                <input value={form.correo} onChange={update("correo")} placeholder="correo@email.com" />
              </label>
            </div>

            <label>Detalle principal
              <textarea value={form.detalle} onChange={update("detalle")} placeholder="Describe la información principal para generar el archivo..." />
            </label>

            <div className="two">
              <label>{service.fields[0] || "Campo 1"}
                <input value={form.campo1} onChange={update("campo1")} />
              </label>
              <label>{service.fields[1] || "Campo 2"}
                <input value={form.campo2} onChange={update("campo2")} />
              </label>
            </div>

            <div className="two">
              <label>{service.fields[2] || "Campo 3"}
                <input value={form.campo3} onChange={update("campo3")} />
              </label>
              <label>{service.fields[3] || "Campo 4"}
                <input value={form.campo4} onChange={update("campo4")} />
              </label>
            </div>

            {service.key === "cv" && (
              <div className="colorBox">
                <strong><Palette size={17} /> Color del modelo</strong>
                <div className="colors">
                  {themes.map((theme) => (
                    <button key={theme.value} type="button" onClick={() => setColor(theme.value)} className={color === theme.value ? "selected" : ""}>
                      <span style={{ background: theme.value }} />
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="generateButton" onClick={generate} disabled={!form.nombre || !form.detalle}>
              <Sparkles size={18} /> Generar vista previa
            </button>
          </div>

          <div className="previewCard">
            <div className="previewHeader">
              <div>
                <span>Vista previa</span>
                <h3>{service.title}</h3>
              </div>
              <b style={{ background: color }}>{documentText ? "Generado" : "Pendiente"}</b>
            </div>

            <div className="paper" style={{ borderTopColor: color }}>
              {documentText ? <pre>{documentText}</pre> : <div className="emptyPreview">Completa los datos y toca “Generar vista previa”.</div>}
            </div>

            {documentText && (
              <>
                <div className="revisionBox">
                  <strong>Revisiones disponibles: {revisionsLeft}/3</strong>
                  <div>
                    <button onClick={() => revise("mejorado")} disabled={revisionsLeft === 0}>Mejorar</button>
                    <button onClick={() => revise("formal")} disabled={revisionsLeft === 0}>Más formal</button>
                    <button onClick={() => revise("corto")} disabled={revisionsLeft === 0}>Más corto</button>
                  </div>
                </div>

                <div className="paymentBox">
                  <strong>Validar pago para descargar</strong>
                  <p>Pago referencial: <b>{service.price}</b> · Yape: <b>{YAPE}</b></p>
                  <div className="paymentActions">
                    <a href={whatsappUrl(paymentMessage)} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Enviar comprobante por WhatsApp</a>
                    <button onClick={() => setPaid(true)}>Ya pagué / liberar descarga</button>
                  </div>
                </div>

                <div className="downloadBox">
                  <button disabled={!paid} onClick={() => downloadPDF(service.title, documentText)}><Download size={17} /> PDF</button>
                  <button disabled={!paid} onClick={() => downloadWord(service.title, documentText)}><Download size={17} /> Word</button>
                  <button disabled={!paid || !isExcelService} onClick={() => downloadExcelCSV(service.title, excelCSV)}><Download size={17} /> Excel</button>
                </div>

                {paid && <a className="noticeButton" href={whatsappUrl(paidNotice)} target="_blank" rel="noreferrer">Avisar a CreaIA Pro que el pedido fue pagado</a>}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section" id="modelos">
        <div className="sectionHead">
          <span>Modelos modernos</span>
          <h2>Visuales limpios para vender mejor</h2>
          <p>El usuario puede probar colores, revisar la vista previa y descargar fácil.</p>
        </div>

        <div className="modelGrid">
          <div className="modelCard">
            <h3>CV Pro</h3>
            <div className="miniResume" style={{ "--accent": color }}>
              <aside />
              <main><span /><span /><span /><span /></main>
            </div>
          </div>

          <div className="modelCard">
            <h3>Dashboard Ejecutivo</h3>
            <div className="miniDashboard">
              <div /><div /><div />
              <span style={{ width: "90%" }} />
              <span style={{ width: "74%" }} />
              <span style={{ width: "82%" }} />
            </div>
          </div>

          <div className="modelCard">
            <h3>Documento Formal</h3>
            <div className="miniDoc"><span /><span /><span /><span /><span /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
