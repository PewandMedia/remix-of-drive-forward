import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung – MIRO-DRIVE Fahrschule" },
      {
        name: "description",
        content:
          "Datenschutzerklärung der Fahrschule MIRO-DRIVE in Bochum: Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.",
      },
      { property: "og:title", content: "Datenschutzerklärung – MIRO-DRIVE Fahrschule" },
      {
        property: "og:description",
        content:
          "Wie MIRO-DRIVE personenbezogene Daten verarbeitet – transparent nach Datenschutz-Grundverordnung (DSGVO).",
      },
      { property: "og:url", content: "/datenschutz" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <SiteLayout>
      <PageHero title="Datenschutzerklärung" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-foreground/80 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-wide text-foreground/50">Stand: Juli 2026</p>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Verarbeitung personenbezogener Daten im Sinne der Datenschutz-Grundverordnung (DSGVO)
            ist:
          </p>
          <p>
            <strong>Fahrschule Miro-Drive</strong>
            <br />
            Ilkay Altin (Einzelunternehmen)
            <br />
            Herner Str. 365
            <br />
            44807 Bochum
            <br />
            Telefon: <a href="tel:01772358248" className="text-primary hover:underline">01772358248</a>
            <br />
            E-Mail:{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">2. Allgemeine Hinweise & Rechtsgrundlagen</h2>
          <p>
            Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website,
            zur Erbringung unserer Leistungen als Fahrschule oder zur Bearbeitung Ihrer Anfragen erforderlich ist.
            Rechtsgrundlagen sind insbesondere:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung</li>
            <li>Art. 6 Abs. 1 lit. b DSGVO – Vertrag / vorvertragliche Maßnahmen</li>
            <li>Art. 6 Abs. 1 lit. c DSGVO – rechtliche Verpflichtung</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">3. Zugriffsdaten / Server-Logfiles</h2>
          <p>
            Beim Aufruf unserer Website werden durch den Hoster automatisch technische Daten in sogenannten Server-Logfiles
            verarbeitet, die Ihr Browser übermittelt. Dazu gehören insbesondere:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>anonymisierte bzw. gekürzte IP-Adresse</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene Seite / Datei</li>
            <li>übertragene Datenmenge und HTTP-Statuscode</li>
            <li>verwendeter Browser und Betriebssystem</li>
            <li>Referrer-URL (zuvor besuchte Seite)</li>
          </ul>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Gewährleistung eines
            störungsfreien Betriebs und der IT-Sicherheit. Die Logfiles werden nach kurzer Zeit gelöscht, spätestens
            sobald sie für die genannten Zwecke nicht mehr erforderlich sind.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">4. Hosting</h2>
          <p>
            Unsere Website wird auf einem Server in der Europäischen Union gehostet. Der Hosting-Anbieter verarbeitet
            in unserem Auftrag die oben genannten Zugriffsdaten. Mit dem Anbieter besteht ein Vertrag zur
            Auftragsverarbeitung gemäß Art. 28 DSGVO.
          </p>
          <p className="text-foreground/60">
            <em>Hinweis für den Betreiber:</em> konkreter Hosting-Anbieter (Firma, Anschrift, Sitzland) wird hier
            ergänzt.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">5. Cookies und lokale Speicherung</h2>
          <p>
            Unsere Website verwendet ausschließlich technisch notwendige Speichermechanismen (z. B. für den Login in den
            internen Verwaltungsbereich sowie zur Sicherstellung der Grundfunktionen der Seite). Diese sind für den
            Betrieb erforderlich und daher nach Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG
            einwilligungsfrei.
          </p>
          <p>
            Wir setzen derzeit <strong>kein</strong> Web-Tracking, keine Analyse-Dienste und keine Marketing-Cookies
            ein. Sobald wir künftig einwilligungspflichtige Dienste einsetzen, wird zusätzlich ein Cookie-/
            Consent-Banner eingebunden.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">6. Online-Anmeldung</h2>
          <p>
            Über unser Formular „Online-Anmeldung" (<Link to="/anmeldung" className="text-primary hover:underline">/anmeldung</Link>)
            können Sie sich für die Fahrausbildung anmelden. Wir verarbeiten dabei folgende Daten:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Vorname, Nachname</li>
            <li>Geburtsdatum</li>
            <li>Adresse, Postleitzahl, Ort</li>
            <li>Telefonnummer</li>
            <li>E-Mail-Adresse</li>
            <li>gewünschte Führerscheinklasse</li>
            <li>optionale Nachricht</li>
            <li>Angabe, ob Interesse an einem Erste-Hilfe-Kurs besteht</li>
          </ul>
          <p>
            <strong>Zweck:</strong> Bearbeitung Ihrer Anmeldung, Kontaktaufnahme und Vorbereitung des
            Ausbildungsvertrags.
            <br />
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen bzw. Vertrag) sowie
            Art. 6 Abs. 1 lit. a DSGVO, soweit Sie beim Absenden ausdrücklich eingewilligt haben.
            <br />
            <strong>Empfänger:</strong> Inhaber der Fahrschule sowie ausschließlich intern beauftragte Fahrlehrerinnen
            und Fahrlehrer.
            <br />
            <strong>Speicherdauer:</strong> Die Daten werden gespeichert, solange sie für den Ausbildungszweck
            erforderlich sind. Anschließend gelten die gesetzlichen Aufbewahrungsfristen (z. B. bis zu 10 Jahre nach
            § 147 AO / § 257 HGB, soweit einschlägig).
          </p>
          <p>
            Nach dem Absenden der Anmeldung erhalten Sie an die angegebene E-Mail-Adresse eine automatische Bestätigung
            über den Eingang. Für den E-Mail-Versand setzen wir einen Auftragsverarbeiter ein; mit diesem besteht ein
            Vertrag nach Art. 28 DSGVO.
          </p>
          <p className="text-foreground/60">
            <em>Hinweis für den Betreiber:</em> konkreter E-Mail-Versand-Dienstleister (Name, Sitz) wird hier ergänzt,
            sobald der Versand aktiviert ist.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">7. Kontaktaufnahme per E-Mail und Telefon</h2>
          <p>
            Wenn Sie uns per E-Mail (<a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">{CONTACT.email}</a>)
            oder telefonisch (<a href="tel:01772358248" className="text-primary hover:underline">01772358248</a>)
            kontaktieren, verarbeiten wir Ihre Angaben zur Beantwortung Ihrer Anfrage. Rechtsgrundlage ist
            Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO. Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr
            erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">8. WhatsApp-Kommunikation</h2>
          <p>
            Auf unserer Website finden Sie einen WhatsApp-Button, über den Sie uns unter{" "}
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {CONTACT.whatsappText}
            </a>{" "}
            direkt anschreiben können. Der Chat findet auf Servern von WhatsApp Ireland Ltd. bzw. Meta Platforms Inc.
            statt und unterliegt deren Datenschutzbestimmungen. Dabei kann es zu einer Übermittlung personenbezogener
            Daten in Drittländer (u. a. USA) kommen.
          </p>
          <p>
            Die Nutzung von WhatsApp ist freiwillig und erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
            DSGVO), die Sie durch das Anschreiben erteilen. Alternativ stehen Ihnen jederzeit E-Mail und Telefon zur
            Verfügung.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">9. Externe Links und eingebettete Inhalte</h2>
          <p>
            Unsere Website verweist auf externe Angebote, z. B. Kartendienste zur Anzeige unserer Filialen sowie unsere
            Social-Media-Profile (u. a. Instagram, TikTok). Beim Aufruf dieser externen Angebote gelten ausschließlich
            die Datenschutzbestimmungen der jeweiligen Anbieter. Wir haben keinen Einfluss auf die dortige
            Datenverarbeitung.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">10. Interner Verwaltungsbereich</h2>
          <p>
            Der interne Verwaltungsbereich (Login unter <code>/auth</code>) ist ausschließlich für berechtigtes Personal
            der Fahrschule zugänglich. Für Authentifizierung und Datenhaltung nutzen wir Supabase (Supabase Inc., mit
            Servern in der EU). Es besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Rechtsgrundlage
            für die Verarbeitung im Verwaltungsbereich ist Art. 6 Abs. 1 lit. b und lit. f DSGVO.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">11. Auftragsverarbeiter</h2>
          <p>
            Zur Bereitstellung unserer Website und unserer Leistungen setzen wir sorgfältig ausgewählte Dienstleister
            ein, insbesondere in den Kategorien:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Hosting der Website</li>
            <li>Datenbank- und Authentifizierungsdienst (Supabase)</li>
            <li>Versand von Bestätigungs-E-Mails (E-Mail-Dienstleister)</li>
          </ul>
          <p>Mit allen Auftragsverarbeitern bestehen Verträge nach Art. 28 DSGVO.</p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">12. Ihre Rechte als betroffene Person</h2>
          <p>Sie haben uns gegenüber folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die oben genannten Kontaktdaten. Ihnen steht
            zudem ein Beschwerderecht bei einer Aufsichtsbehörde zu. Zuständig für uns ist:
          </p>
          <p>
            Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)
            <br />
            Kavalleriestraße 2–4
            <br />
            40213 Düsseldorf
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">13. SSL-/TLS-Verschlüsselung</h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-
            bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am „https://" in der Adresszeile
            Ihres Browsers.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="font-display text-lg text-foreground">14. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir passen diese Datenschutzerklärung an, sobald Änderungen in der Datenverarbeitung dies erforderlich
            machen (z. B. neue Funktionen der Website oder geänderte gesetzliche Vorgaben). Es gilt jeweils die auf
            dieser Seite veröffentlichte Fassung.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
