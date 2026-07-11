# Estrategia de ventas Club Vive Entire

## Objetivo de 90 dias

Convertir la landing en un embudo medible que capture leads, recomiende el producto correcto y lleve a compra o conversacion por WhatsApp.

Metas iniciales:

- Capturar leads segmentados por producto recomendado.
- Medir clics de compra, uso del selector y suscripciones.
- Activar una secuencia educativa por correo.
- Crear contenido constante para SEO, Instagram, Facebook y WhatsApp.

## Embudo principal

1. Trafico: redes sociales, pauta, SEO, WhatsApp, aliados y referidos.
2. Diagnostico: CTA "Descubre cual Entire es para ti".
3. Recomendacion: producto sugerido con explicacion personalizada.
4. Captura: newsletter con resultado del quiz.
5. Conversion: compra directa o conversacion por WhatsApp.
6. Recompra: recordatorio entre dia 25 y 30.

## Eventos que ya debe medir la landing

- `landing_view`: visita a la landing.
- `selector_cta_click`: clic en el CTA del selector.
- `quiz_started`: primer cambio en el quiz.
- `quiz_result_changed`: cambio de producto recomendado.
- `newsletter_submit_attempt`: intento de suscripcion.
- `newsletter_signup_success`: lead guardado.
- `newsletter_signup_error`: error de suscripcion.
- `commerce_click`: clic hacia compra o producto en viveentire.com.

## Integraciones por prioridad

### Fase 1: Medicion

- Google Analytics 4.
- Meta Pixel.
- Google Search Console.
- Microsoft Clarity.

Datos necesarios:

- ID de GA4.
- ID de Meta Pixel.
- URL final del sitio.
- Cuenta de Search Console.

### Fase 2: Email

Opciones recomendadas:

- Brevo: buena relacion costo-beneficio y automatizaciones.
- MailerLite: facil para newsletters.
- Klaviyo: potente si se integra con ecommerce.

Flujos:

- Bienvenida con resultado del quiz.
- Educacion por producto recomendado.
- Objeciones frecuentes.
- Oferta o incentivo.
- Recompra dia 25-30.

### Fase 3: WhatsApp

Opciones:

- Boton directo a WhatsApp Business.
- Manychat si se quiere automatizar conversaciones.
- Wati, Zoko o Kommo si se quiere CRM con WhatsApp.

Flujos:

- "Quiero ayuda para elegir mi Entire".
- "Ya hice el quiz y me recomendo Entire Master".
- "Quiero comprar para mi familia".

## Automatizacion de emails

### Email 1: Resultado inmediato

Asunto: Tu Entire recomendado esta listo

Contenido:

- Producto recomendado.
- Por que se recomienda.
- Beneficios principales.
- Boton de compra.
- Boton de WhatsApp.

### Email 2: Educacion

Enviar al dia siguiente.

Contenido:

- Necesidad nutricional segun segmento.
- Como usar el producto en la rutina.
- Pregunta frecuente.

### Email 3: Comparacion

Enviar al dia 3.

Contenido:

- Diferencia entre el producto recomendado y otros Entire.
- Tabla simple.
- CTA al producto.

### Email 4: Objeciones

Enviar al dia 5.

Contenido:

- Frecuencia de consumo.
- Para quien es.
- Cuando consultar profesional de salud.
- CTA a WhatsApp.

### Email 5: Cierre

Enviar al dia 7.

Contenido:

- Resumen de beneficios.
- Oferta, bundle o incentivo si aplica.
- CTA de compra.

### Email 6: Recompra

Enviar al dia 25-30.

Contenido:

- Recordatorio de continuidad.
- Beneficio de mantener rutina.
- CTA de recompra.

## Segmentos

- Entire Master: adultos 40+, fuerza, movilidad, masa muscular.
- Entire Full: nutricion diaria completa.
- Entire Zero: control de azucar, fibra, alta proteina.
- Entire Proteina: requerimiento proteico elevado, actividad fisica.
- Entire Kido: ninos en crecimiento.

## Calendario de contenido: 30 dias

Semana 1:

- Lunes: Carrusel "Descubre cual Entire es para ti".
- Martes: Historia con encuesta sobre objetivo nutricional.
- Miercoles: Reel mostrando la familia Entire.
- Jueves: Post educativo "Por que la nutricion cambia con la edad".
- Viernes: CTA al quiz.
- Sabado: Historia de preguntas frecuentes.
- Domingo: Post suave de comunidad Club Vive Entire.

Semana 2:

- Lunes: Entire Master y fuerza despues de los 40.
- Martes: Historia "Que producto te recomendo el quiz".
- Miercoles: Reel de uso diario de Entire Full.
- Jueves: Post "Proteina, vitaminas y minerales".
- Viernes: Comparativo Master vs Full vs Zero.
- Sabado: CTA a WhatsApp.
- Domingo: FAQ "Puedo tomar Entire todos los dias".

Semana 3:

- Lunes: Entire Zero y control de azucar.
- Martes: Historia de verdadero/falso.
- Miercoles: Reel "Alta proteina y fibra".
- Jueves: Post de Entire Proteina.
- Viernes: Carrusel "23 g de proteina por porcion".
- Sabado: CTA al quiz.
- Domingo: Receta o idea de consumo.

Semana 4:

- Lunes: Entire Kido y crecimiento.
- Martes: Historia para padres.
- Miercoles: Reel familia Entire.
- Jueves: Post SEO corto "Cuanta proteina necesito".
- Viernes: Oferta o bundle.
- Sabado: Recordatorio de recompra.
- Domingo: Resumen mensual y CTA al selector.

## Skills recomendadas para Codex

- Skill de contenido Entire: posts, reels, carruseles y captions.
- Skill de SEO Entire: articulos, FAQs, schemas y keywords.
- Skill de automatizaciones Entire: emails, WhatsApp y segmentacion.
- Skill de analitica Entire: revisar eventos y proponer mejoras.

## Proxima accion

1. Conectar GA4 y Meta Pixel cuando tengamos los IDs.
2. Elegir herramienta de email.
3. Conectar Supabase con la herramienta elegida via Make, Zapier o API.
4. Crear los 6 emails por segmento.
5. Crear los primeros 30 contenidos.
