// Server-only: Vertrag per Resend versenden (via Lovable Connector Gateway).
const RESEND_GATEWAY = "https://connector-gateway.lovable.dev/resend";

// In der Testphase liefert `onboarding@resend.dev` nur an die
// E-Mail-Adresse des Resend-Account-Inhabers aus. Für den echten Kundenversand
// später auf eine in Resend verifizierte MIRO-DRIVE-Domain umstellen.
const FROM_ADDRESS = "MIRO-DRIVE Fahrschule <onboarding@resend.dev>";

// Optional: interne Kopie. Sobald die richtige Adresse feststeht, hier eintragen
// (z. B. "info@miro-drive.de") — für den Test bewusst leer.
const INTERNAL_BCC: string | null = null;

export interface SendContractParams {
  to: string;
  firstName: string;
  lastName: string;
  licenseClass: string;
  pdfBytes: Uint8Array;
  inquiryId: string;
}

export async function sendContractEmail(params: SendContractParams): Promise<void> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!lovableKey) throw new Error("LOVABLE_API_KEY ist nicht konfiguriert");
  if (!resendKey) throw new Error("RESEND_API_KEY ist nicht konfiguriert");

  const fileName = `MIRO-DRIVE_Vertrag_${params.lastName || "Anmeldung"}.pdf`
    .replace(/[^A-Za-z0-9._-]+/g, "_");

  // Base64-kodieren ohne Buffer, damit es im Worker-Runtime funktioniert.
  const base64 = uint8ToBase64(params.pdfBytes);

  const html = renderEmailHtml({
    firstName: params.firstName,
    licenseClass: params.licenseClass,
  });

  const body: Record<string, unknown> = {
    from: FROM_ADDRESS,
    to: [params.to],
    subject: "Deine Anmeldung bei MIRO-DRIVE – Vertragsentwurf",
    html,
    attachments: [
      { filename: fileName, content: base64 },
    ],
    tags: [
      { name: "type", value: "anmeldung" },
      { name: "inquiry_id", value: params.inquiryId },
    ],
  };
  if (INTERNAL_BCC) body.bcc = [INTERNAL_BCC];

  const res = await fetch(`${RESEND_GATEWAY}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend fehlgeschlagen [${res.status}]: ${text}`);
  }
}

function renderEmailHtml({ firstName, licenseClass }: { firstName: string; licenseClass: string }) {
  const safeName = escapeHtml(firstName || "");
  const safeClass = escapeHtml(licenseClass || "");
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="background:#dc2626;color:#fff;padding:20px 24px;border-radius:16px 16px 0 0;">
      <div style="font-size:22px;font-weight:800;letter-spacing:0.5px;">MIRO-DRIVE</div>
      <div style="font-size:12px;opacity:0.9;">Fahrschule Bochum</div>
    </div>
    <div style="background:#fff;padding:28px 24px;border-radius:0 0 16px 16px;box-shadow:0 8px 24px rgba(0,0,0,0.05);">
      <h1 style="font-size:20px;margin:0 0 14px;">Hallo ${safeName || "und willkommen"}!</h1>
      <p style="margin:0 0 12px;line-height:1.55;">
        vielen Dank für deine Online-Anmeldung bei der Fahrschule MIRO-DRIVE
        ${safeClass ? `für <strong>${safeClass}</strong>` : ""}.
      </p>
      <p style="margin:0 0 12px;line-height:1.55;">
        Im Anhang findest du deinen Vertragsentwurf mit deinen Anmeldedaten.
        Bitte prüfe die Angaben in Ruhe – der finale Vertrag wird bei deinem ersten
        Besuch in einer unserer Filialen unterschrieben.
      </p>
      <p style="margin:16px 0 8px;font-weight:600;">Das brauchst du für den Antrag beim Straßenverkehrsamt:</p>
      <ul style="margin:0 0 16px;padding-left:20px;line-height:1.6;">
        <li>Sehbescheinigung (Optiker oder Augenarzt)</li>
        <li>Erste-Hilfe-Kurs (9 UE) – bei uns oder extern</li>
        <li>Biometrisches Passbild</li>
      </ul>
      <p style="margin:0 0 12px;line-height:1.55;">
        Wir melden uns in Kürze telefonisch oder per WhatsApp, um alles Weitere zu besprechen.
      </p>
      <p style="margin:20px 0 0;line-height:1.55;">
        Viele Grüße<br />
        <strong>Dein MIRO-DRIVE Team</strong>
      </p>
    </div>
    <div style="text-align:center;font-size:11px;color:#888;padding:16px 12px 0;">
      Fahrschule MIRO-DRIVE · Brückstraße 53 · 44787 Bochum · info@miro-drive.de
    </div>
  </div>
</body></html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function uint8ToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  // btoa ist im Worker-Runtime global verfügbar.
  return btoa(binary);
}
