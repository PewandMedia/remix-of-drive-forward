// Server-only: PDF-Vertrags-Generator (Platzhalter-Vorlage).
// Später kann der Inhalt dieser Datei durch die finale Vertragsvorlage ersetzt werden,
// ohne dass sich Formular, DB, Storage oder Versand ändern müssen.
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export interface ContractData {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  licenseClass: string;
  message?: string | null;
  inquiryId: string;
  createdAt: string;
}

const LICENSE_LABEL: Record<string, string> = {
  B: "Klasse B (Pkw)",
  B197: "Klasse B197 (Automatik-Ausbildung mit Schalter-Prüfung)",
  B78: "Klasse B78 (Automatik)",
  A: "Klasse A / Motorrad",
  AM: "Klasse AM (Mofa/Roller)",
  "Erste-Hilfe": "Erste-Hilfe-Kurs",
};

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return iso;
  }
}

export async function generateContractPdf(data: ContractData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const red = rgb(0.86, 0.15, 0.15);
  const dark = rgb(0.09, 0.09, 0.11);
  const grey = rgb(0.42, 0.42, 0.46);
  const light = rgb(0.94, 0.94, 0.96);

  // Header-Balken
  page.drawRectangle({ x: 0, y: height - 90, width, height: 90, color: red });
  page.drawText("MIRO-DRIVE", {
    x: 40, y: height - 45, size: 24, font: bold, color: rgb(1, 1, 1),
  });
  page.drawText("Fahrschule Bochum · Ausbildungsvertrag", {
    x: 40, y: height - 70, size: 11, font, color: rgb(1, 1, 1),
  });

  let y = height - 130;

  page.drawText("Ausbildungsvertrag (Entwurf)", { x: 40, y, size: 18, font: bold, color: dark });
  y -= 22;
  page.drawText(
    "Dies ist ein automatisch erzeugter Entwurf auf Basis Ihrer Online-Anmeldung.",
    { x: 40, y, size: 10, font, color: grey },
  );
  y -= 14;
  page.drawText(
    "Der finale Vertrag wird Ihnen persönlich in der Filiale zur Unterschrift vorgelegt.",
    { x: 40, y, size: 10, font, color: grey },
  );

  y -= 30;

  // Sektion: Persönliche Daten
  const section = (title: string) => {
    page.drawRectangle({ x: 40, y: y - 4, width: width - 80, height: 22, color: light });
    page.drawText(title, { x: 48, y: y + 2, size: 11, font: bold, color: dark });
    y -= 32;
  };

  const field = (label: string, value: string) => {
    page.drawText(label, { x: 48, y, size: 9, font: bold, color: grey });
    page.drawText(value || "–", { x: 200, y, size: 11, font, color: dark });
    y -= 20;
  };

  section("Persönliche Daten");
  field("Vorname", data.firstName);
  field("Nachname", data.lastName);
  field("Geburtsdatum", formatDate(data.birthDate));

  y -= 6;
  section("Anschrift");
  field("Straße & Hausnummer", data.address);
  field("PLZ / Ort", `${data.postalCode} ${data.city}`.trim());

  y -= 6;
  section("Kontakt");
  field("Telefon", data.phone);
  field("E-Mail", data.email);

  y -= 6;
  section("Gewünschte Ausbildung");
  field("Führerscheinklasse", LICENSE_LABEL[data.licenseClass] ?? data.licenseClass);

  if (data.message) {
    y -= 6;
    section("Nachricht des Fahrschülers");
    const lines = wrapText(data.message, 90);
    for (const line of lines.slice(0, 8)) {
      page.drawText(line, { x: 48, y, size: 10, font, color: dark });
      y -= 14;
    }
  }

  y -= 20;
  page.drawLine({ start: { x: 40, y }, end: { x: width - 40, y }, thickness: 0.5, color: grey });
  y -= 18;

  page.drawText("Nächste Schritte", { x: 40, y, size: 12, font: bold, color: dark });
  y -= 16;
  const steps = [
    "1. Sehbescheinigung beim Optiker oder Augenarzt einholen.",
    "2. Erste-Hilfe-Kurs (9 UE) absolvieren – bei uns oder extern.",
    "3. Biometrisches Passbild mitbringen.",
    "4. Antrag beim Straßenverkehrsamt der Stadt Bochum stellen.",
  ];
  for (const s of steps) {
    page.drawText(s, { x: 48, y, size: 10, font, color: dark });
    y -= 14;
  }

  // Footer
  const footerY = 60;
  page.drawLine({ start: { x: 40, y: footerY + 30 }, end: { x: width - 40, y: footerY + 30 }, thickness: 0.5, color: grey });
  page.drawText("Fahrschule MIRO-DRIVE · Brückstraße 53 · 44787 Bochum", {
    x: 40, y: footerY + 14, size: 9, font, color: grey,
  });
  page.drawText("Tel. +49 234 6404050 · info@miro-drive.de · www.miro-drive.de", {
    x: 40, y: footerY + 2, size: 9, font, color: grey,
  });
  page.drawText(`Vorgang: ${data.inquiryId.slice(0, 8)} · Erstellt am ${formatDate(data.createdAt)}`, {
    x: 40, y: footerY - 12, size: 8, font, color: grey,
  });

  return await doc.save();
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = (current ? current + " " : "") + w;
    }
  }
  if (current) lines.push(current);
  return lines;
}
