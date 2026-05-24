import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { getPlanById } from "../src/plans/plans.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distSitesRoot = path.join(projectRoot, "dist", "sites");

function parseEnvFile(text) {
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((line) => !line.trim().startsWith("#"))
    .reduce((acc, line) => {
      const separatorIndex = line.indexOf("=");

      if (separatorIndex === -1) {
        return acc;
      }

      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1).trim();
      const value = rawValue.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
      acc[key] = value;
      return acc;
    }, {});
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderButton(text, primaryColor, filled) {
  return `
    <a
      href="#contact"
      style="
        display:inline-block;
        padding:0.95rem 1.35rem;
        border-radius:999px;
        text-decoration:none;
        font-weight:700;
        margin-right:0.85rem;
        margin-bottom:0.85rem;
        ${filled
          ? `background:white;color:${primaryColor};`
          : "border:1px solid rgba(255,255,255,0.5);color:white;"}
      "
    >${escapeHtml(text)}</a>
  `;
}

function renderPublishedHtml(website) {
  const siteData = website.siteData ?? {};
  const plan = getPlanById(website.planId);
  const servicesSection = plan.features.servicesSection;
  const contactSection = plan.features.contactSection;
  const businessExtras = plan.features.businessExtras;
  const removeBranding = plan.features.removeBranding;

  const services = [siteData.serviceOne, siteData.serviceTwo, siteData.serviceThree]
    .filter(Boolean)
    .map(
      (service) => `
        <div style="background:white;border-radius:18px;padding:1.4rem;box-shadow:0 16px 40px rgba(15,23,42,0.08);">
          <div style="width:0.9rem;height:0.9rem;border-radius:999px;background:${escapeHtml(siteData.accentColor)};margin-bottom:1rem;"></div>
          <h3 style="margin:0;font-size:1.15rem;color:#0f172a;">${escapeHtml(service)}</h3>
        </div>
      `,
    )
    .join("");

  const contactHtml = `
    <section id="contact" style="margin-top:2rem;background:#0f172a;color:white;padding:2rem;border-radius:20px;text-align:left;">
      <h2 style="color:white;margin:0 0 1rem;">Contact</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
        <div><strong>Phone</strong><p style="margin-top:0.5rem;opacity:0.9;">${escapeHtml(siteData.phone)}</p></div>
        <div><strong>Email</strong><p style="margin-top:0.5rem;opacity:0.9;">${escapeHtml(siteData.email)}</p></div>
        <div><strong>Address</strong><p style="margin-top:0.5rem;opacity:0.9;white-space:pre-line;">${escapeHtml(siteData.address)}</p></div>
        <div><strong>Hours</strong><p style="margin-top:0.5rem;opacity:0.9;">${escapeHtml(siteData.hours)}</p></div>
      </div>
    </section>
  `;

  const announcementHtml = businessExtras && siteData.announcementText
    ? `<div style="margin-bottom:1rem;padding:0.9rem 1.2rem;border-radius:16px;background:#0f172a;color:white;text-align:center;font-weight:700;letter-spacing:0.01em;">${escapeHtml(siteData.announcementText)}</div>`
    : "";

  const testimonialHtml =
    businessExtras && siteData.testimonialQuote
      ? `<section style="margin-top:2rem;padding:2rem;border-radius:22px;background:linear-gradient(135deg, #fff7ed, white);text-align:left;box-shadow:0 18px 45px rgba(15, 23, 42, 0.06);">
        <h2 style="margin:0 0 1rem;">Customer Spotlight</h2>
        <p style="margin:0;font-size:1.2rem;line-height:1.8;color:#0f172a;font-style:italic;">&ldquo;${escapeHtml(siteData.testimonialQuote)}&rdquo;</p>
        <p style="margin-top:1rem;color:#475569;font-weight:700;">${escapeHtml(siteData.testimonialAuthor)}</p>
      </section>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(website.name ?? siteData.businessName)} | ${escapeHtml(siteData.tagline ?? "")}</title>
    <meta
      name="description"
      content="${escapeHtml(siteData.heroSubtext ?? siteData.aboutText ?? "")}"
    />
    <style>
      :root {
        color-scheme: light;
        font-family: "Segoe UI", Arial, sans-serif;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: ${escapeHtml(siteData.backgroundColor ?? "#f8fafc")};
        color: #0f172a;
      }
      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 2rem;
      }
      .hero {
        background: linear-gradient(135deg, ${escapeHtml(siteData.primaryColor ?? "#1d4ed8")}, ${escapeHtml(siteData.accentColor ?? "#f59e0b")});
        color: white;
        padding: 4rem;
        border-radius: 24px;
        text-align: left;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
      }
      .card {
        margin-top: 2rem;
        background: ${escapeHtml(siteData.surfaceColor ?? "#fff7ed")};
        padding: 2rem;
        border-radius: 20px;
        text-align: left;
      }
      .services {
        margin-top: 2rem;
        text-align: left;
      }
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
      }
      h1 {
        margin: 0 0 1rem;
        font-size: clamp(2.5rem, 6vw, 4.8rem);
        line-height: 1;
      }
      h2 { margin: 0 0 1rem; }
      p { line-height: 1.75; }
      .tag {
        margin-bottom: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.85rem;
        opacity: 0.85;
      }
      .brand {
        display: inline-flex;
        margin-top: 1.5rem;
        padding: 0.65rem 0.95rem;
        border-radius: 999px;
        background: #0f172a;
        color: white;
        font-weight: 700;
      }
      @media (max-width: 768px) {
        .container { padding: 1rem; }
        .hero { padding: 2rem; }
      }
    </style>
  </head>
  <body>
    <main class="container">
      ${announcementHtml}
      <section class="hero">
        <p class="tag">${escapeHtml(siteData.tagline)}</p>
        <h1>${escapeHtml(siteData.heroText)}</h1>
        <p style="max-width:42rem;opacity:0.92;">${escapeHtml(siteData.heroSubtext)}</p>
        <div style="margin-top:2rem;">
          ${renderButton(siteData.ctaText ?? "Learn More", siteData.primaryColor ?? "#1d4ed8", true)}
          ${renderButton(siteData.secondaryCtaText ?? "Contact", siteData.primaryColor ?? "#1d4ed8", false)}
        </div>
      </section>

      <section class="card">
        <h2>${escapeHtml(siteData.aboutTitle)}</h2>
        <p>${escapeHtml(siteData.aboutText)}</p>
      </section>

      ${
        servicesSection || contactSection
          ? `${servicesSection
            ? `<section class="services">
        <h2>${escapeHtml(siteData.servicesTitle)}</h2>
        <div class="services-grid">${services}</div>
      </section>`
            : ""}
      ${contactSection ? contactHtml : ""}
      ${testimonialHtml}`
          : ""
      }

      ${removeBranding ? "" : '<div class="brand">Built with JAK&#39;s Website Builder</div>'}
    </main>
  </body>
</html>`;
}

async function main() {
  const envText = await readFile(path.join(projectRoot, ".env.local"), "utf8");
  const env = parseEnvFile(envText);

  const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const snapshot = await getDocs(collection(db, "publishedWebsites"));

  await rm(distSitesRoot, { recursive: true, force: true });
  await mkdir(distSitesRoot, { recursive: true });

  for (const websiteDoc of snapshot.docs) {
    const website = {
      id: websiteDoc.id,
      ...websiteDoc.data(),
    };
    const siteDir = path.join(distSitesRoot, website.slug);
    await mkdir(siteDir, { recursive: true });
    await writeFile(
      path.join(siteDir, "index.html"),
      renderPublishedHtml(website),
      "utf8",
    );
  }

  console.log(`Exported ${snapshot.docs.length} published site(s) to dist/sites.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
