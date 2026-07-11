const SUPABASE_URL = "https://njaqzgmdevbjrultlqci.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qYXF6Z21kZXZianJ1bHRscWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MTczMDAsImV4cCI6MjA5OTI5MzMwMH0.TArE1M9rYdJDRWtOfJAmWyW_6TKC_9kcjPO08x6_gBc";
const SUPABASE_LEADS_TABLE = "entire_newsletter_leads";

const products = {
  full: {
    name: "Entire® Full",
    copy: "Una fórmula completa para complementar la alimentación diaria con proteína, vitaminas y minerales.",
    bullets: ["Nutrición completa para el día a día", "Práctico para rutinas activas", "Apoyo nutricional balanceado"],
    reason: "Es una opción versátil cuando buscas complementar tu alimentación diaria sin una necesidad específica como control de azúcar o proteína elevada.",
    bestFor: "Ideal para mantener una rutina nutricional más completa todos los días.",
    action: "Empieza con Entire® Full y revisa cómo se adapta a tu rutina diaria.",
    url: "https://viveentire.com/entire-full-suplemento-nutricional-completo/"
  },
  master: {
    name: "Entire® Master",
    copy: "Pensado para adultos después de los 40 años que buscan apoyar fuerza, movilidad y masa muscular.",
    bullets: ["Ideal para mayores de 40 años", "Apoya fuerza y movilidad", "Enfoque en masa muscular"],
    reason: "Tus respuestas indican una etapa en la que conviene priorizar fuerza, movilidad y soporte muscular.",
    bestFor: "Ideal si quieres cuidar vitalidad y bienestar después de los 40.",
    action: "Elige Entire® Master como apoyo nutricional para tu etapa actual.",
    url: "https://viveentire.com/entire-master-suplemento-nutricional-para-adulto-mayor/"
  },
  zero: {
    name: "Entire® Zero",
    copy: "Una opción para adultos que desean controlar el consumo de azúcar sin dejar de priorizar proteína y fibra.",
    bullets: ["Control del consumo de azúcar", "Alta proteína", "Rico en fibra"],
    reason: "Marcaste control del azúcar como prioridad, por eso la recomendación se enfoca en una fórmula sin azúcar añadida.",
    bestFor: "Ideal si buscas proteína, fibra y una alternativa pensada para controlar el consumo de azúcar.",
    action: "Revisa Entire® Zero y confirma si se ajusta a tus hábitos diarios.",
    url: "https://viveentire.com/entire-zero-suplemento-nutricional-sin-azucar/"
  },
  protein: {
    name: "Entire® Proteína",
    copy: "Recomendado cuando tu objetivo principal es complementar requerimientos elevados de proteína.",
    bullets: ["23 g de proteína por porción", "Ideal para actividad física frecuente", "Complementa requerimientos elevados"],
    reason: "Tus respuestas muestran un objetivo de mayor aporte proteico o una rutina con más demanda física.",
    bestFor: "Ideal para complementar proteína cuando entrenas, eres activo o tienes requerimientos elevados.",
    action: "Empieza por Entire® Proteína si tu prioridad es aumentar el aporte proteico.",
    url: "https://viveentire.com/entire-proteina-suplemento-nutricional-alto-en-proteina/"
  },
  kido: {
    name: "Entire® Kido",
    copy: "Una fórmula orientada a niños en crecimiento, con proteína, hierro, calcio y zinc.",
    bullets: ["Nutrición para niños", "Apoya crecimiento", "Con proteína, hierro, calcio y zinc"],
    reason: "Tus respuestas apuntan a una necesidad nutricional infantil, por eso la recomendación prioriza crecimiento y micronutrientes clave.",
    bestFor: "Ideal para niños en crecimiento que necesitan apoyo nutricional práctico.",
    action: "Conoce Entire® Kido y revisa si se ajusta a la rutina del niño.",
    url: "https://viveentire.com/producto/entire-kido-complemento-nutricional-para-ninos/"
  }
};

const landing = document.querySelector(".entire-landing") || document;
const controls = ["age", "goal", "activity", "condition"].map((id) => landing.querySelector(`#${id}`));
const resultName = landing.querySelector("#result-name");
const resultCopy = landing.querySelector("#result-copy");
const resultList = landing.querySelector("#result-list");
const resultLink = landing.querySelector("#result-link");
const resultReason = landing.querySelector("#result-reason");
const resultBestFor = landing.querySelector("#result-best-for");
const resultAction = landing.querySelector("#result-action");
const newsletterForm = landing.querySelector("#newsletter-form");
const newsletterStatus = landing.querySelector("#newsletter-status");
const leadName = landing.querySelector("#lead-name");
const leadEmail = landing.querySelector("#lead-email");
const leadConsent = landing.querySelector("#lead-consent");

function chooseProduct() {
  const [age, goal, activity, condition] = controls.map((control) => control.value);

  if (age === "kido" || goal === "kido") return products.kido;
  if (condition === "sugar") return products.zero;
  if (age === "master" || goal === "master") return products.master;
  if (goal === "protein" || activity === "high" || condition === "protein") return products.protein;
  return products.full;
}

function renderRecommendation() {
  const product = chooseProduct();
  resultName.textContent = product.name;
  resultCopy.textContent = product.copy;
  resultLink.href = product.url;
  if (resultReason) resultReason.textContent = product.reason;
  if (resultBestFor) resultBestFor.textContent = product.bestFor;
  if (resultAction) resultAction.textContent = product.action;
  resultList.replaceChildren(
    ...product.bullets.map((bullet) => {
      const item = document.createElement("li");
      item.textContent = bullet;
      return item;
    })
  );
}

if (controls.every(Boolean) && resultName && resultCopy && resultList && resultLink) {
  controls.forEach((control) => control.addEventListener("change", renderRecommendation));
  renderRecommendation();
}

function setNewsletterStatus(message, type = "") {
  if (!newsletterStatus) return;
  newsletterStatus.textContent = message;
  newsletterStatus.className = `form-status${type ? ` is-${type}` : ""}`;
}

function getQuizAnswers() {
  const labels = {
    age: "Edad",
    goal: "Objetivo",
    activity: "Actividad física",
    condition: "Condición especial"
  };

  return Object.fromEntries(
    controls.filter(Boolean).map((control) => [
      control.id,
      {
        label: labels[control.id],
        value: control.value,
        text: control.options[control.selectedIndex]?.text || control.value
      }
    ])
  );
}

async function saveNewsletterLead(payload) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase no está configurado.");
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_LEADS_TABLE}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("Este correo ya está suscrito.");
    }
    throw new Error("No pudimos guardar tu suscripción en este momento.");
  }
}

if (newsletterForm && leadEmail && leadConsent) {
  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const product = chooseProduct();
    const email = leadEmail.value.trim().toLowerCase();
    const name = leadName?.value.trim() || null;

    if (!email || !leadEmail.checkValidity()) {
      setNewsletterStatus("Escribe un correo válido.", "error");
      leadEmail.focus();
      return;
    }

    if (!leadConsent.checked) {
      setNewsletterStatus("Debes aceptar el tratamiento de datos para suscribirte.", "error");
      leadConsent.focus();
      return;
    }

    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setNewsletterStatus("Guardando suscripción...");

    try {
      await saveNewsletterLead({
        email,
        name,
        recommended_product: product.name,
        quiz_answers: getQuizAnswers(),
        consent: true,
        source: "landing_entire_selector",
        page_path: window.location.pathname + window.location.hash,
        user_agent: navigator.userAgent
      });

      newsletterForm.reset();
      setNewsletterStatus("Listo. Te suscribiste correctamente.", "success");
    } catch (error) {
      setNewsletterStatus(
        error.message === "Supabase no está configurado."
          ? "Formulario listo. Falta conectar Supabase para guardar correos."
          : error.message,
        "error"
      );
    } finally {
      submitButton.disabled = false;
    }
  });
}
